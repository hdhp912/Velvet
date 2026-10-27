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
  isScrubbing: boolean;
  setIsScrubbing: (scrubbing: boolean) => void;
  playChapter: (story: Story, chapter: Chapter) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seek: (seconds: number, immediateSpeech?: boolean) => void;
  commitSeek: (seconds: number) => void;
  skipForward: (seconds?: number) => void;
  skipBackward: (seconds?: number) => void;
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
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);

  // References
  const isScrubbingRef = useRef<boolean>(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);

  const handleSetIsScrubbing = (scrubbing: boolean) => {
    isScrubbingRef.current = scrubbing;
    setIsScrubbing(scrubbing);
  };
  
  // Ambient Soundscape Web Audio API refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  // Initialize browser Speech Synthesis & Web Audio context
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Load initial story from history or defaults
    const saved = localStorage.getItem('dino_last_listening') || localStorage.getItem('velvet_last_listening');
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
      const initialStory = SAMPLE_STORIES[0];
      const initialChapter = initialStory.chapters[0];
      setCurrentStory(initialStory);
      setCurrentChapter(initialChapter);
      setDuration(initialChapter.durationSeconds);
      setCurrentTime(45);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (synthRef.current) synthRef.current.cancel();
      stopAmbientTone();
    };
  }, []);

  // Web Audio Warm Acoustic Drone synthesizer for uninterrupted immersion
  const startAmbientTone = () => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      stopAmbientTone(); // clear existing

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Warm acoustic chords
      const freqs = [174.61, 220.0, 261.63, 349.23];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        gain.gain.setValueAtTime(0.25 / freqs.length, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start();
        oscs.push(osc);
      });

      oscNodesRef.current = oscs;
    } catch (e) {
      console.warn('Web Audio ambient note:', e);
    }
  };

  const stopAmbientTone = () => {
    try {
      oscNodesRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (_) {}
      });
      oscNodesRef.current = [];
      if (masterGainRef.current) {
        masterGainRef.current.disconnect();
        masterGainRef.current = null;
      }
    } catch (_) {}
  };

  // Sync ambient tone volume
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0 : volume * 0.08;
      masterGainRef.current.gain.setValueAtTime(targetGain, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  // Audio timer ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        // Prevent ticker from jumping back while user is dragging/seeking
        if (isScrubbingRef.current) return;

        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            if (synthRef.current) synthRef.current.cancel();
            stopAmbientTone();
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

  // Save progress periodically to localStorage
  useEffect(() => {
    if (currentStory && currentChapter) {
      localStorage.setItem(
        'dino_last_listening',
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

  // Start Speech Narration from a specific time offset
  const startSpeechNarrationAtTime = (chapter: Chapter, timeInSeconds: number) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const fullText = `${chapter.title}. ${chapter.proseExcerpt}`;
    
    // Split full text into sentence chunks
    const sentences = fullText.split(/(?<=[.?!])\s+/);
    const fraction = duration > 0 ? timeInSeconds / duration : 0;
    const startIndex = Math.min(Math.floor(fraction * sentences.length), sentences.length - 1);
    const textToRead = sentences.slice(startIndex).join(' ');

    if (!textToRead.trim()) return;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current = utterance;

    utterance.rate = playbackRate;
    utterance.volume = isMuted ? 0 : volume;

    // Select British or American voice matching narrator
    const voices = synthRef.current.getVoices();
    const preferredLang = chapter.storyId.includes('contract') ? 'en-US' : 'en-GB';
    const matchingVoice =
      voices.find((v) => v.lang.startsWith(preferredLang) && (v.name.includes('Natural') || v.name.includes('Serena') || v.name.includes('Daniel') || v.name.includes('Oliver'))) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      voices[0];

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => {
      // If reached end of utterance before end of chapter duration, let ambient warmth complete
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis event notice:', e);
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
    startAmbientTone();
    startSpeechNarrationAtTime(chapter, 0);
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
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    stopAmbientTone();
  };

  const resume = () => {
    if (!currentChapter) return;
    setIsPlaying(true);
    startAmbientTone();
    startSpeechNarrationAtTime(currentChapter, currentTime);
  };

  const seek = (seconds: number, immediateSpeech: boolean = true) => {
    const clamped = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(clamped);
    if (immediateSpeech && isPlaying && currentChapter) {
      startSpeechNarrationAtTime(currentChapter, clamped);
    }
  };

  const commitSeek = (seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(clamped);
    isScrubbingRef.current = false;
    setIsScrubbing(false);
    if (isPlaying && currentChapter) {
      startSpeechNarrationAtTime(currentChapter, clamped);
    }
  };

  const skipForward = (seconds: number = 15) => {
    seek(currentTime + seconds);
  };

  const skipBackward = (seconds: number = 15) => {
    seek(currentTime - seconds);
  };

  const setSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (isPlaying && currentChapter) {
      startSpeechNarrationAtTime(currentChapter, currentTime);
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
    const saved = localStorage.getItem('dino_last_listening') || localStorage.getItem('velvet_last_listening');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.storyId === storyId) {
          const chapter = story.chapters.find((c) => c.id === parsed.chapterId) || story.chapters[0];
          setCurrentStory(story);
          setCurrentChapter(chapter);
          setDuration(chapter.durationSeconds);
          const startSecs = parsed.progressSeconds || 0;
          setCurrentTime(startSecs);
          setIsPlaying(true);
          startAmbientTone();
          startSpeechNarrationAtTime(chapter, startSecs);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
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
        isScrubbing,
        setIsScrubbing: handleSetIsScrubbing,
        playChapter,
        togglePlay,
        pause,
        resume,
        seek,
        commitSeek,
        skipForward,
        skipBackward,
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
