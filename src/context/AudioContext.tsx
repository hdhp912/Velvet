import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Story, Chapter } from '../types';
import { SAMPLE_STORIES } from '../data/sampleStories';

interface AudioContextType {
  currentStory: Story | null;
  currentChapter: Chapter | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  isExpanded: boolean;
  readingMode: boolean;
  playChapter: (story: Story, chapter: Chapter) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seek: (seconds: number) => void;
  setSpeed: (rate: number) => void;
  setAudioVolume: (volume: number) => void;
  toggleMute: () => void;
  nextChapter: () => void;
  prevChapter: () => void;
  setIsExpanded: (expanded: boolean) => void;
  setReadingMode: (mode: boolean | ((prev: boolean) => boolean)) => void;
  continueListening: (storyId: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [readingMode, setReadingMode] = useState<boolean>(false);

  // References for Web Speech API and Web Audio API
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);
  const ambientAudioCtx = useRef<AudioContext | null>(null);
  const ambientGain = useRef<GainNode | null>(null);

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Load initial story from history if available
    const saved = localStorage.getItem('velvet_last_listening');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const story = SAMPLE_STORIES.find((s) => s.id === parsed.storyId);
        if (story) {
          const chapter = story.chapters.find((c) => c.id === parsed.chapterId) || story.chapters[0];
          setCurrentStory(story);
          setCurrentChapter(chapter);
          setDuration(chapter.durationSeconds);
          setCurrentTime(Math.min(parsed.progressSeconds || 0, chapter.durationSeconds));
        }
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    } else {
      // Default initial story for instant exploration
      const initialStory = SAMPLE_STORIES[0];
      const initialChapter = initialStory.chapters[0];
      setCurrentStory(initialStory);
      setCurrentChapter(initialChapter);
      setDuration(initialChapter.durationSeconds);
      setCurrentTime(142); // 2m 22s progress for realistic "continue" state
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (synthRef.current) synthRef.current.cancel();
      if (ambientAudioCtx.current) ambientAudioCtx.current.close();
    };
  }, []);

  // Save progress periodically
  useEffect(() => {
    if (currentStory && currentChapter) {
      localStorage.setItem(
        'velvet_last_listening',
        JSON.stringify({
          storyId: currentStory.id,
          chapterId: currentChapter.id,
          chapterNumber: currentChapter.number,
          progressSeconds: currentTime,
          totalSeconds: duration,
          lastListenedAt: new Date().toISOString(),
        })
      );
    }
  }, [currentStory, currentChapter, currentTime, duration]);

  // Audio timer ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            if (synthRef.current) synthRef.current.cancel();
            return duration;
          }
          return Math.min(prev + playbackRate, duration);
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration, playbackRate]);

  // Handle Speech Narration
  const startSpeechNarration = (chapter: Chapter, startFraction: number = 0) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const textToRead = `${chapter.title}. ${chapter.proseExcerpt}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current = utterance;

    utterance.rate = playbackRate;
    utterance.volume = isMuted ? 0 : volume;

    // Pick a natural English voice if available
    const voices = synthRef.current.getVoices();
    const englishVoices = voices.filter((v) => v.lang.startsWith('en'));
    const preferred = englishVoices.find((v) => v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Serena')) || englishVoices[0];
    if (preferred) {
      utterance.voice = preferred;
    }

    utterance.onend = () => {
      // Finished speaking the excerpt
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
    };

    try {
      synthRef.current.speak(utterance);
    } catch (err) {
      console.error(err);
    }
  };

  const playChapter = (story: Story, chapter: Chapter) => {
    setCurrentStory(story);
    setCurrentChapter(chapter);
    setDuration(chapter.durationSeconds);
    setCurrentTime(0);
    setIsPlaying(true);
    startSpeechNarration(chapter, 0);
  };

  const togglePlay = () => {
    if (!currentChapter || !currentStory) return;

    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const pause = () => {
    setIsPlaying(false);
    if (synthRef.current && synthRef.current.speaking) {
      synthRef.current.pause();
    }
  };

  const resume = () => {
    setIsPlaying(true);
    if (synthRef.current && synthRef.current.paused) {
      synthRef.current.resume();
    } else if (currentChapter) {
      startSpeechNarration(currentChapter);
    }
  };

  const seek = (seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(clamped);
    if (synthRef.current) {
      synthRef.current.cancel();
      if (isPlaying && currentChapter) {
        startSpeechNarration(currentChapter);
      }
    }
  };

  const setSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (synthRef.current && utteranceRef.current && isPlaying) {
      synthRef.current.cancel();
      if (currentChapter) startSpeechNarration(currentChapter);
    }
  };

  const setAudioVolume = (vol: number) => {
    setVolume(vol);
    setIsMuted(vol === 0);
    if (utteranceRef.current) {
      utteranceRef.current.volume = vol;
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (utteranceRef.current) {
        utteranceRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  };

  const nextChapter = () => {
    if (!currentStory || !currentChapter) return;
    const currentIndex = currentStory.chapters.findIndex((c) => c.id === currentChapter.id);
    if (currentIndex >= 0 && currentIndex < currentStory.chapters.length - 1) {
      playChapter(currentStory, currentStory.chapters[currentIndex + 1]);
    }
  };

  const prevChapter = () => {
    if (!currentStory || !currentChapter) return;
    const currentIndex = currentStory.chapters.findIndex((c) => c.id === currentChapter.id);
    if (currentIndex > 0) {
      playChapter(currentStory, currentStory.chapters[currentIndex - 1]);
    } else {
      seek(0);
    }
  };

  const continueListening = (storyId: string) => {
    const story = SAMPLE_STORIES.find((s) => s.id === storyId);
    if (!story) return;
    const saved = localStorage.getItem('velvet_last_listening');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.storyId === storyId) {
          const chapter = story.chapters.find((c) => c.id === parsed.chapterId) || story.chapters[0];
          setCurrentStory(story);
          setCurrentChapter(chapter);
          setDuration(chapter.durationSeconds);
          setCurrentTime(parsed.progressSeconds || 0);
          setIsPlaying(true);
          startSpeechNarration(chapter);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    // Fallback to first chapter
    playChapter(story, story.chapters[0]);
  };

  return (
    <AudioContext.Provider
      value={{
        currentStory,
        currentChapter,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        volume,
        isMuted,
        isExpanded,
        readingMode,
        playChapter,
        togglePlay,
        pause,
        resume,
        seek,
        setSpeed,
        setAudioVolume,
        toggleMute,
        nextChapter,
        prevChapter,
        setIsExpanded,
        setReadingMode,
        continueListening,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
