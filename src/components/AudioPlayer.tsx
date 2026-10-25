import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Gauge,
  BookOpen,
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const AudioPlayer: React.FC = () => {
  const {
    currentStory,
    currentChapter,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    volume,
    isMuted,
    togglePlay,
    seek,
    setSpeed,
    setAudioVolume,
    toggleMute,
    nextChapter,
    prevChapter,
    setIsExpanded,
    readingMode,
    setReadingMode,
  } = useAudio();

  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const speeds = [0.75, 1, 1.25, 1.5, 2];

  if (!currentStory || !currentChapter) {
    return null;
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remainingTime = Math.max(0, duration - currentTime);

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  return (
    <>
      {/* DESKTOP PLAYER (Bottom persistent bar: 88px - 100px) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#2C2528] text-[#FFF9F5] border-t border-[#453A3E] shadow-2xl transition-all duration-200">
        {/* Subtle Top Progress Scrubber for effortless tracking */}
        <div className="w-full h-1 bg-[#453A3E] relative cursor-pointer group">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            aria-label="Audio progress scrub"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div
            className="h-full bg-[#D9A5B5] transition-all duration-100 group-hover:bg-[#E8BAC7]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="max-w-[1360px] mx-auto h-[88px] px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* LEFT: Cover Thumbnail, Story & Chapter Info */}
          <div className="flex items-center gap-3.5 min-w-0 max-w-[30%]">
            <div
              onClick={() => setIsExpanded(true)}
              className="relative w-12 h-16 shrink-0 rounded-[6px] overflow-hidden bg-[#3F3539] cursor-pointer shadow-xs group"
            >
              <img
                src={currentStory.coverImage}
                alt={currentStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="min-w-0">
              <h4
                onClick={() => setIsExpanded(true)}
                className="font-editorial text-sm sm:text-base text-[#FFF9F5] truncate cursor-pointer hover:text-[#D9A5B5] transition-colors"
              >
                {currentStory.title}
              </h4>
              <p className="text-xs text-[#D1C3C6] truncate mt-0.5">
                Chapter {currentChapter.number}: {currentChapter.title}
              </p>
              <p className="text-[11px] text-[#A6969B] truncate hidden lg:block">
                Narrated by {currentStory.narrator.name}
              </p>
            </div>
          </div>

          {/* CENTER: Playback Controls & Scrubber */}
          <div className="flex flex-col items-center justify-center flex-1 max-w-[520px] px-2">
            <div className="flex items-center gap-4 sm:gap-6 mb-1.5">
              <button
                onClick={prevChapter}
                className="p-2 text-[#D1C3C6] hover:text-[#FFF9F5] transition-colors rounded-full hover:bg-white/5"
                title="Previous Chapter"
                aria-label="Previous Chapter"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#D9A5B5] text-[#2C2528] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={nextChapter}
                className="p-2 text-[#D1C3C6] hover:text-[#FFF9F5] transition-colors rounded-full hover:bg-white/5"
                title="Next Chapter"
                aria-label="Next Chapter"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Time Bar & Numbers */}
            <div className="w-full flex items-center gap-2.5 text-[11px] text-[#D1C3C6] tabular-nums">
              <span className="w-9 text-right">{formatTime(currentTime)}</span>
              <div className="relative flex-1 h-1.5 bg-[#453A3E] rounded-full overflow-hidden flex items-center cursor-pointer">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeekChange}
                  aria-label="Seek time"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className="h-full bg-[#D9A5B5] rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="w-9 text-left">-{formatTime(remainingTime)}</span>
            </div>
          </div>

          {/* RIGHT: Speed, Volume, Reading Mode, Fullscreen Expand */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 min-w-0 max-w-[30%]">
            {/* Speed Control Button */}
            <div className="relative">
              <button
                onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
                className="px-2.5 py-1 text-xs font-medium text-[#D1C3C6] hover:text-[#FFF9F5] rounded-md hover:bg-white/5 transition-colors border border-[#453A3E] flex items-center gap-1"
                title="Playback Speed"
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>{playbackRate}x</span>
              </button>

              {isSpeedMenuOpen && (
                <div className="absolute bottom-full mb-2 right-0 bg-[#241E20] border border-[#453A3E] rounded-lg p-1.5 shadow-xl flex flex-col gap-1 min-w-[75px] z-50">
                  {speeds.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => {
                        setSpeed(rate);
                        setIsSpeedMenuOpen(false);
                      }}
                      className={`px-3 py-1 text-xs rounded text-left transition-colors ${
                        playbackRate === rate
                          ? 'bg-[#873F55] text-white font-semibold'
                          : 'text-[#D1C3C6] hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Read Mode Toggle */}
            <button
              onClick={() => {
                setReadingMode((prev) => !prev);
                setIsExpanded(true);
              }}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 text-xs text-[#D1C3C6] hover:text-[#FFF9F5] rounded-md hover:bg-white/5 border border-[#453A3E] transition-colors"
              title="Toggle Reading View"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read</span>
            </button>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="p-1.5 text-[#D1C3C6] hover:text-[#FFF9F5] transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-[#B54747]" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
                aria-label="Volume"
                className="w-16 h-1 bg-[#453A3E] accent-[#D9A5B5] rounded-lg cursor-pointer"
              />
            </div>

            {/* Expand / Fullscreen View */}
            <button
              onClick={() => setIsExpanded(true)}
              className="p-2 text-[#D1C3C6] hover:text-[#FFF9F5] rounded-md hover:bg-white/5 transition-colors"
              title="Open Distraction-Free Listening Mode"
              aria-label="Expand player"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
