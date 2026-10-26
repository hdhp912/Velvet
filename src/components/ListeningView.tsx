import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
  BookOpen,
  Headphones,
  List,
  Info,
  Lock,
  Gauge,
  Share2,
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const ListeningView: React.FC = () => {
  const {
    currentStory,
    currentChapter,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    togglePlay,
    seek,
    setSpeed,
    nextChapter,
    prevChapter,
    setIsExpanded,
    readingMode,
    setReadingMode,
    playChapter,
  } = useAudio();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [showChaptersDrawer, setShowChaptersDrawer] = useState(false);
  const [showSynopsis, setShowSynopsis] = useState(false);

  if (!currentStory || !currentChapter) return null;

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const remainingTime = Math.max(0, duration - currentTime);
  const speeds = [0.75, 1, 1.25, 1.5, 2];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Story link copied to clipboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F5] text-[#292421] overflow-y-auto flex flex-col animate-in fade-in duration-200">
      {/* Top Bar of Listening View */}
      <div className="max-w-[1000px] w-full mx-auto px-6 py-5 flex items-center justify-between border-b border-[#E7E0DA]">
        <button
          onClick={() => setIsExpanded(false)}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#746B65] hover:text-[#292421] transition-colors p-1"
        >
          <ChevronDown className="w-5 h-5" />
          <span>Minimize player</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Reading Mode vs Audio Focus Toggle */}
          <button
            onClick={() => setReadingMode(!readingMode)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              readingMode
                ? 'bg-[#873F55] text-white border-[#873F55]'
                : 'bg-white text-[#746B65] border-[#E7E0DA] hover:text-[#292421]'
            }`}
          >
            {readingMode ? <Headphones className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
            <span>{readingMode ? 'Audio Mode' : 'Read Prose'}</span>
          </button>

          {/* Chapter Drawer Toggle */}
          <button
            onClick={() => setShowChaptersDrawer(!showChaptersDrawer)}
            className={`p-2 rounded-lg border transition-colors ${
              showChaptersDrawer
                ? 'bg-[#873F55] text-white border-[#873F55]'
                : 'bg-white text-[#746B65] border-[#E7E0DA] hover:text-[#292421]'
            }`}
            title="All Chapters"
          >
            <List className="w-4 h-4" />
          </button>

          {/* Synopsis Toggle */}
          <button
            onClick={() => setShowSynopsis(!showSynopsis)}
            className={`p-2 rounded-lg border transition-colors ${
              showSynopsis
                ? 'bg-[#873F55] text-white border-[#873F55]'
                : 'bg-white text-[#746B65] border-[#E7E0DA] hover:text-[#292421]'
            }`}
            title="Story Details & Synopsis"
          >
            <Info className="w-4 h-4" />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg border border-[#E7E0DA] bg-white text-[#746B65] hover:text-[#292421] transition-colors"
            title="Share Story"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-[800px] w-full mx-auto px-6 py-8 flex flex-col justify-center">
        {/* If Synopsis is toggled */}
        {showSynopsis && (
          <div className="mb-6 p-5 bg-white border border-[#E7E0DA] rounded-[12px] animate-in fade-in">
            <h4 className="font-editorial text-lg text-[#292421] mb-2">{currentStory.title}</h4>
            <p className="text-sm text-[#746B65] leading-relaxed mb-3">{currentStory.synopsis}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#948982]">
              <span>Author: {currentStory.author}</span>
              <span>·</span>
              <span>Narrator: {currentStory.narrator.name} ({currentStory.narrator.accent} Accent)</span>
              <span>·</span>
              <span>Genre: {currentStory.genre}</span>
            </div>
          </div>
        )}

        {/* If Reading Mode is active */}
        {readingMode ? (
          <div className="bg-white border border-[#E7E0DA] rounded-[16px] p-6 sm:p-10 mb-8 max-w-[680px] mx-auto shadow-xs">
            <div className="text-center pb-6 border-b border-[#F2EEEA] mb-8">
              <span className="text-xs uppercase tracking-wider text-[#873F55] font-semibold">
                Chapter {currentChapter.number}
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#292421] mt-2">
                {currentChapter.title}
              </h2>
              <p className="text-xs text-[#948982] mt-1.5">
                Narrated by {currentStory.narrator.name} · {currentChapter.wordCount} words
              </p>
            </div>

            {/* Prose Reader Text */}
            <div className="prose max-w-none text-[#292421] font-serif leading-[1.8] text-[17px] sm:text-[18px] space-y-5">
              <p className="first-letter:text-4xl first-letter:font-editorial first-letter:text-[#873F55] first-letter:mr-1.5 first-letter:float-left">
                {currentChapter.proseExcerpt}
              </p>
              <p className="text-[#746B65] italic text-[15px] pt-4 border-t border-[#F2EEEA]">
                Full chapter audio is streaming live above. Listen to hear subtle vocal inflection and original pacing.
              </p>
            </div>
          </div>
        ) : (
          /* Audio Centric Visualizer */
          <div className="flex flex-col items-center text-center">
            {/* Story Portrait Artwork */}
            <div className="relative w-48 sm:w-60 md:w-64 aspect-[3/4] rounded-[12px] overflow-hidden shadow-[0_12px_36px_rgba(41,36,33,0.12)] border border-[#E7E0DA] mb-7">
              <img
                src={currentStory.coverImage}
                alt={currentStory.title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/cover_summer_stayed.jpg';
                }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Metadata */}
            <span className="text-xs font-medium text-[#873F55] tracking-wide uppercase mb-1">
              Chapter {currentChapter.number} of {currentStory.publishedChaptersCount}
            </span>
            <h1 className="font-editorial text-2xl sm:text-3xl text-[#292421] mb-1">
              {currentChapter.title}
            </h1>
            <p className="text-sm text-[#746B65] mb-2 font-medium">
              {currentStory.title}
            </p>
            <p className="text-xs text-[#948982] mb-6">
              Narrated by {currentStory.narrator.name} ({currentStory.narrator.accent})
            </p>
          </div>
        )}

        {/* Persistent Scrubber in Listening View */}
        <div className="w-full max-w-[560px] mx-auto mb-6">
          <div className="relative h-2 bg-[#E7E0DA] rounded-full overflow-hidden flex items-center cursor-pointer mb-2">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Seek track"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              className="h-full bg-[#873F55] rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[#746B65] tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(remainingTime)}</span>
          </div>
        </div>

        {/* Large Playback Controls */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6">
          <button
            onClick={prevChapter}
            className="p-3 text-[#746B65] hover:text-[#292421] hover:bg-[#F2EEEA] rounded-full transition-colors"
            title="Previous chapter"
          >
            <SkipBack className="w-6 h-6" />
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
            className="w-16 h-16 rounded-full bg-[#873F55] text-white flex items-center justify-center shadow-lg hover:bg-[#6F3044] transition-all transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </button>

          <button
            onClick={nextChapter}
            className="p-3 text-[#746B65] hover:text-[#292421] hover:bg-[#F2EEEA] rounded-full transition-colors"
            title="Next chapter"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        {/* Playback Speed Selector */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs text-[#948982] flex items-center gap-1 mr-2">
            <Gauge className="w-3.5 h-3.5" /> Speed:
          </span>
          {speeds.map((rate) => (
            <button
              key={rate}
              onClick={() => setSpeed(rate)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                playbackRate === rate
                  ? 'bg-[#873F55] text-white'
                  : 'bg-white text-[#746B65] border border-[#E7E0DA] hover:text-[#292421]'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Slide-Out Drawer */}
      {showChaptersDrawer && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white border-l border-[#E7E0DA] shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
          <div className="p-4 border-b border-[#E7E0DA] flex items-center justify-between">
            <h3 className="font-editorial text-lg text-[#292421]">Chapters</h3>
            <button
              onClick={() => setShowChaptersDrawer(false)}
              className="text-xs text-[#746B65] hover:text-[#292421] font-medium"
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-[#F2EEEA] p-2">
            {currentStory.chapters.map((ch) => {
              const isCurrent = ch.id === currentChapter.id;
              const isLocked = ch.isPremium && !user?.isPremium;

              return (
                <div
                  key={ch.id}
                  onClick={() => {
                    if (!isLocked) {
                      playChapter(currentStory, ch);
                      setShowChaptersDrawer(false);
                    } else {
                      showToast('This chapter requires Velvet Stories Premium');
                    }
                  }}
                  className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-[#F4E8EC] text-[#873F55]'
                      : isLocked
                      ? 'opacity-60 hover:bg-[#F2EEEA]'
                      : 'hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-medium">Chapter {ch.number}</p>
                    <p className="text-sm font-editorial text-[#292421] truncate">{ch.title}</p>
                    <p className="text-[11px] text-[#948982]">{formatTime(ch.durationSeconds)}</p>
                  </div>
                  <div>
                    {isLocked ? (
                      <Lock className="w-4 h-4 text-[#948982]" />
                    ) : isCurrent && isPlaying ? (
                      <Pause className="w-4 h-4 text-[#873F55]" />
                    ) : (
                      <Play className="w-4 h-4 text-[#746B65]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
