import React, { useState } from 'react';
import {
  Play,
  Pause,
  Clock,
  Sparkles,
  Lock,
  Heart,
  Share2,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';
import { Story, Chapter } from '../types';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface StoryDetailViewProps {
  story: Story;
  onBack: () => void;
  onNavigateMembership: () => void;
}

const formatDuration = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }
  return `${minutes} min`;
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const StoryDetailView: React.FC<StoryDetailViewProps> = ({
  story,
  onBack,
  onNavigateMembership,
}) => {
  const { playChapter, currentStory, currentChapter, isPlaying, togglePlay } = useAudio();
  const { user, toggleFavorite } = useAuth();
  const { showToast } = useToast();

  const [imageError, setImageError] = useState(false);

  const isFavorite = user?.favorites.includes(story.id);

  const handlePlayChapter = (chapter: Chapter) => {
    if (chapter.isPremium && !user?.isPremium) {
      showToast('Unlock this chapter with Velvet Stories Premium', 'info');
      onNavigateMembership();
      return;
    }

    if (currentStory?.id === story.id && currentChapter?.id === chapter.id) {
      togglePlay();
    } else {
      playChapter(story, chapter);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link copied to clipboard');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 md:py-12">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#746B65] hover:text-[#292421] transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to catalog</span>
      </button>

      {/* Main Story Overview (Split Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-14">
        {/* Left Column: Large Portrait Cover */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="relative aspect-[3/4] w-full rounded-[12px] overflow-hidden shadow-[0_12px_36px_rgba(41,36,33,0.10)] border border-[#E7E0DA] bg-[#F2EEEA]">
            {!imageError ? (
              <img
                src={story.coverImage}
                alt={story.title}
                onError={() => setImageError(true)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#F2EEEA] text-[#746B65] text-center">
                <BookOpen className="w-12 h-12 text-[#948982] mb-3" />
                <span className="font-editorial text-lg text-[#292421]">{story.title}</span>
                <span className="text-xs text-[#948982] mt-1">{story.author}</span>
              </div>
            )}
          </div>

          {/* Quick Stats Box */}
          <div className="mt-4 p-4 bg-white border border-[#E7E0DA] rounded-[10px] space-y-2 text-xs text-[#746B65]">
            <div className="flex justify-between">
              <span>Status</span>
              <span className="font-medium text-[#292421]">{story.status}</span>
            </div>
            <div className="flex justify-between">
              <span>Published Chapters</span>
              <span className="font-medium text-[#292421] tabular-nums">
                {story.publishedChaptersCount} of {story.totalPlannedChapters}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Audio Duration</span>
              <span className="font-medium text-[#292421]">{formatDuration(story.totalDurationSeconds)}</span>
            </div>
            <div className="flex justify-between">
              <span>Narrator</span>
              <span className="font-medium text-[#292421]">{story.narrator.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Accent & Voice</span>
              <span className="font-medium text-[#292421]">{story.narrator.accent} ({story.narrator.tone})</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Metadata, Actions, Synopsis */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col">
          {/* Tropes / Metadata as clean unboxed text */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#873F55] mb-2">
            <span>{story.genre}</span>
            {story.tropes.map((trope) => (
              <React.Fragment key={trope}>
                <span className="text-[#D6CCC4]" aria-hidden="true">·</span>
                <span className="text-[#746B65]">{trope}</span>
              </React.Fragment>
            ))}
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[42px] leading-tight text-[#292421] mb-2">
            {story.title}
          </h1>

          <p className="text-sm sm:text-base text-[#746B65] mb-5">
            Written by <span className="text-[#292421] font-medium">{story.author}</span> · Velvet Original Audio Production
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={() => handlePlayChapter(story.chapters[0])}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#873F55] text-white text-sm font-semibold rounded-lg hover:bg-[#6F3044] transition-colors shadow-xs"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>
                {currentStory?.id === story.id && isPlaying ? 'Pause Story' : 'Play First Chapter'}
              </span>
            </button>

            <button
              onClick={() => toggleFavorite(story.id)}
              className={`p-3 rounded-lg border transition-colors ${
                isFavorite
                  ? 'bg-[#F4E8EC] border-[#873F55] text-[#873F55]'
                  : 'bg-white border-[#E7E0DA] text-[#746B65] hover:text-[#292421]'
              }`}
              title={isFavorite ? 'Saved in library' : 'Save to library'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-3 rounded-lg border border-[#E7E0DA] bg-white text-[#746B65] hover:text-[#292421] transition-colors"
              title="Share story"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Synopsis */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#948982] mb-2">
              Synopsis
            </h3>
            <p className="text-base text-[#292421] leading-relaxed max-w-[680px]">
              {story.synopsis}
            </p>
          </div>

          {/* Premium banner if free user */}
          {!user?.isPremium && (
            <div className="p-4 bg-[#F2EEEA] border border-[#E7E0DA] rounded-[10px] flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#873F55] shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-[#292421] block">
                    Free preview active
                  </span>
                  <span className="text-[#746B65]">
                    First 2 chapters are free. Upgrade to Premium to listen to the entire serialized saga.
                  </span>
                </div>
              </div>
              <button
                onClick={onNavigateMembership}
                className="px-3 py-1.5 bg-[#873F55] text-white text-xs font-medium rounded-md hover:bg-[#6F3044] transition-colors shrink-0 whitespace-nowrap"
              >
                Join Premium
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chapters Section */}
      <div className="border-t border-[#E7E0DA] pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-editorial text-2xl text-[#292421]">Chapters</h2>
            <p className="text-xs text-[#746B65] mt-0.5">
              New serialized chapters published regularly
            </p>
          </div>
          <span className="text-xs text-[#948982]">
            {story.chapters.length} available
          </span>
        </div>

        {/* Chapter List */}
        <div className="bg-white border border-[#E7E0DA] rounded-[12px] divide-y divide-[#F2EEEA] overflow-hidden">
          {story.chapters.map((chapter) => {
            const isPlayingThis =
              currentStory?.id === story.id && currentChapter?.id === chapter.id && isPlaying;
            const isCurrent =
              currentStory?.id === story.id && currentChapter?.id === chapter.id;
            const isLocked = chapter.isPremium && !user?.isPremium;

            return (
              <div
                key={chapter.id}
                onClick={() => handlePlayChapter(chapter)}
                className={`p-4 sm:px-6 sm:py-4 flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                  isCurrent ? 'bg-[#F4E8EC]' : 'hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Play / Lock Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayChapter(chapter);
                    }}
                    className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center transition-transform ${
                      isCurrent
                        ? 'bg-[#873F55] text-white'
                        : isLocked
                        ? 'bg-[#F2EEEA] text-[#948982]'
                        : 'bg-[#F2EEEA] text-[#292421] hover:bg-[#873F55] hover:text-white'
                    }`}
                  >
                    {isLocked ? (
                      <Lock className="w-4 h-4" />
                    ) : isPlayingThis ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#873F55]">
                        Chapter {chapter.number}
                      </span>
                      {chapter.isPremium && (
                        <span className="text-[10px] text-[#746B65] bg-[#F2EEEA] px-1.5 py-0.5 rounded-[4px] font-medium">
                          Premium
                        </span>
                      )}
                    </div>
                    <h4 className="font-editorial text-base sm:text-lg text-[#292421] truncate mt-0.5">
                      {chapter.title}
                    </h4>
                    {chapter.synopsis && (
                      <p className="text-xs text-[#746B65] truncate hidden sm:block mt-0.5">
                        {chapter.synopsis}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#746B65] shrink-0 tabular-nums">
                  <span className="hidden sm:inline text-[#948982]">{chapter.publishedAt}</span>
                  <div className="flex items-center gap-1 font-medium text-[#292421]">
                    <Clock className="w-3.5 h-3.5 text-[#948982]" />
                    <span>{formatTime(chapter.durationSeconds)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
