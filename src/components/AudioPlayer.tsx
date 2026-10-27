import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Gauge,
  BookOpen,
  Sparkles,
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
    skipForward,
    skipBackward,
    setSpeed,
    setAudioVolume,
    toggleMute,
    nextChapter,
    prevChapter,
    setIsExpanded,
    setReadingMode,
    commitSeek,
    setIsScrubbing,
  } = useAudio();

  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [scrubTime, setScrubTime] = useState<number | null>(null);

  const topBarRef = useRef<HTMLDivElement>(null);
  const isTopScrubbingRef = useRef(false);
  const speeds = [0.75, 1, 1.25, 1.5, 2];

  if (!currentStory || !currentChapter) {
    return null;
  }

  const activeTime = isDragging && scrubTime !== null ? scrubTime : currentTime;
  const progressPercentage = duration > 0 ? (activeTime / duration) * 100 : 0;
  const remainingTime = Math.max(0, duration - activeTime);

  const calculateTimeFromClientX = (clientX: number) => {
    if (!topBarRef.current || duration <= 0) return { time: 0, positionX: 0 };
    const rect = topBarRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    return {
      time: Math.round(ratio * duration),
      positionX: Math.max(0, Math.min(rect.width, clickX)),
    };
  };

  const handlePointerDownTopBar = (e: React.PointerEvent<HTMLDivElement>) => {
    isTopScrubbingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
    setIsScrubbing(true);
    setIsDragging(true);
    const { time, positionX } = calculateTimeFromClientX(e.clientX);
    setHoverTime(time);
    setHoverPosition(positionX);
    setScrubTime(time);
    seek(time, false);
  };

  const handlePointerMoveTopBar = (e: React.PointerEvent<HTMLDivElement>) => {
    const { time, positionX } = calculateTimeFromClientX(e.clientX);
    setHoverTime(time);
    setHoverPosition(positionX);
    if (isTopScrubbingRef.current) {
      setScrubTime(time);
      seek(time, false);
    }
  };

  const handlePointerUpTopBar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTopScrubbingRef.current) {
      isTopScrubbingRef.current = false;
      const { time } = calculateTimeFromClientX(e.clientX);
      commitSeek(time);
      setIsDragging(false);
      setScrubTime(null);
      setIsScrubbing(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#2C2528] text-[#FFF9F5] border-t border-[#453A3E] shadow-2xl transition-all duration-200">
      {/* Interactive Top Scrubber Bar with Drag-to-Seek & Live Floating Preview */}
      <div
        ref={topBarRef}
        onPointerDown={handlePointerDownTopBar}
        onPointerMove={handlePointerMoveTopBar}
        onPointerUp={handlePointerUpTopBar}
        onPointerLeave={() => {
          if (!isTopScrubbingRef.current) setHoverTime(null);
        }}
        className="w-full h-3 bg-[#453A3E]/70 hover:h-4 relative cursor-pointer group transition-all touch-none select-none"
        title="Click or drag anywhere to seek"
      >
        {/* Floating preview badge */}
        {(hoverTime !== null || (isDragging && scrubTime !== null)) && (
          <div
            className="absolute bottom-4 -translate-x-1/2 bg-[#241E20] text-[#D9A5B5] border border-[#6E5961] text-xs font-mono font-semibold px-2 py-0.5 rounded-md shadow-lg pointer-events-none z-30"
            style={{
              left: `${
                hoverTime !== null
                  ? hoverPosition
                  : duration > 0
                  ? ((scrubTime || 0) / duration) * 100 + '%'
                  : '0%'
              }`,
            }}
          >
            {formatTime(hoverTime !== null ? hoverTime : scrubTime || 0)}
          </div>
        )}

        <div
          className="h-full bg-[#D9A5B5] transition-[width] duration-75 relative pointer-events-none"
          style={{ width: `${progressPercentage}%` }}
        >
          {/* Scrubber Knob */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-md border-2 border-[#873F55] opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto h-[88px] px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* LEFT: Cover Thumbnail, Story & Chapter Info */}
        <div className="flex items-center gap-3.5 min-w-0 max-w-[32%]">
          <div
            onClick={() => setIsExpanded(true)}
            className="relative w-12 h-16 shrink-0 rounded-[6px] overflow-hidden bg-[#3F3539] cursor-pointer shadow-xs group"
          >
            <img
              src={currentStory.coverImage}
              alt={currentStory.title}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/cover_summer_stayed.jpg';
              }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4
                onClick={() => setIsExpanded(true)}
                className="font-editorial text-sm sm:text-base text-[#FFF9F5] truncate cursor-pointer hover:text-[#D9A5B5] transition-colors"
              >
                {currentStory.title}
              </h4>
              {currentChapter.publishedAt.includes('Today') && (
                <span className="shrink-0 text-[9px] font-bold uppercase bg-[#873F55] text-white px-1.5 py-0.2 rounded">
                  New Today
                </span>
              )}
            </div>
            <p className="text-xs text-[#D1C3C6] truncate mt-0.5">
              Chapter {currentChapter.number}: {currentChapter.title}
            </p>
            <p className="text-[11px] text-[#A6969B] truncate hidden lg:block">
              Narrated by {currentStory.narrator.name} ({currentStory.narrator.accent})
            </p>
          </div>
        </div>

        {/* CENTER: Playback Controls & Precision Scrubber */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-[540px] px-2">
          <div className="flex items-center gap-3 sm:gap-5 mb-1.5">
            {/* Previous Chapter */}
            <button
              onClick={prevChapter}
              className="p-1.5 text-[#D1C3C6] hover:text-[#FFF9F5] transition-colors rounded-full hover:bg-white/5"
              title="Previous Chapter"
              aria-label="Previous Chapter"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Jump Backward 15s */}
            <button
              onClick={() => skipBackward(15)}
              className="p-1.5 text-[#D1C3C6] hover:text-[#FFF9F5] transition-colors rounded-full hover:bg-white/5 flex items-center justify-center relative group"
              title="Rewind 15 seconds"
              aria-label="Rewind 15 seconds"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-[9px] font-mono font-bold absolute -bottom-1 text-[#D9A5B5]">15</span>
            </button>

            {/* Play / Pause Circular Button */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#D9A5B5] text-[#2C2528] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md mx-1"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Jump Forward 15s */}
            <button
              onClick={() => skipForward(15)}
              className="p-1.5 text-[#D1C3C6] hover:text-[#FFF9F5] transition-colors rounded-full hover:bg-white/5 flex items-center justify-center relative group"
              title="Fast forward 15 seconds"
              aria-label="Fast forward 15 seconds"
            >
              <RotateCw className="w-4 h-4" />
              <span className="text-[9px] font-mono font-bold absolute -bottom-1 text-[#D9A5B5]">15</span>
            </button>

            {/* Next Chapter */}
            <button
              onClick={nextChapter}
              className="p-1.5 text-[#D1C3C6] hover:text-[#FFF9F5] transition-colors rounded-full hover:bg-white/5"
              title="Next Chapter"
              aria-label="Next Chapter"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Time Bar & Responsive Slider */}
          <div className="w-full flex items-center gap-3 text-[11px] text-[#D1C3C6] tabular-nums">
            <span className="w-10 text-right font-mono font-medium">{formatTime(activeTime)}</span>
            
            <div className="relative flex-1 flex items-center py-1">
              {/* Floating Scrub Time Tooltip Badge */}
              {isDragging && scrubTime !== null && (
                <div
                  className="absolute -top-7 -translate-x-1/2 bg-[#D9A5B5] text-[#2C2528] font-mono font-bold text-[11px] px-2 py-0.5 rounded shadow-lg pointer-events-none z-30"
                  style={{
                    left: `${duration > 0 ? Math.max(0, Math.min(100, (scrubTime / duration) * 100)) : 0}%`,
                  }}
                >
                  {formatTime(scrubTime)}
                </div>
              )}

              <input
                type="range"
                min={0}
                max={duration || 100}
                step="1"
                value={activeTime}
                onPointerDown={(e) => {
                  setIsDragging(true);
                  const val = Number((e.currentTarget as HTMLInputElement).value);
                  setScrubTime(val);
                  setIsScrubbing(true);
                }}
                onInput={(e) => {
                  const val = Number((e.target as HTMLInputElement).value);
                  setScrubTime(val);
                  seek(val, false);
                }}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setScrubTime(val);
                  commitSeek(val);
                  setIsDragging(false);
                  setIsScrubbing(false);
                }}
                onPointerUp={(e) => {
                  const val = Number((e.target as HTMLInputElement).value);
                  commitSeek(val);
                  setIsDragging(false);
                  setIsScrubbing(false);
                  setScrubTime(null);
                }}
                aria-label="Seek time in chapter"
                className="w-full h-2 bg-[#453A3E] rounded-full accent-[#D9A5B5] cursor-pointer focus:outline-hidden"
              />
            </div>

            <span className="w-10 text-left font-mono font-medium">-{formatTime(remainingTime)}</span>
          </div>
        </div>

        {/* RIGHT: Speed, Volume, Reading Mode, Fullscreen Expand */}
        <div className="flex items-center justify-end gap-2 sm:gap-4 min-w-0 max-w-[30%]">
          {/* Speed Selector */}
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
            title="Open Synced Reading View"
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
              className="w-16 h-1.5 bg-[#453A3E] accent-[#D9A5B5] rounded-lg cursor-pointer"
            />
          </div>

          {/* Expand / Fullscreen View */}
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 text-[#D1C3C6] hover:text-[#FFF9F5] rounded-md hover:bg-white/5 transition-colors"
            title="Open Distraction-Free Listening Studio"
            aria-label="Expand player"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
