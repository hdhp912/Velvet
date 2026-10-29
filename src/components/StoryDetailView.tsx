import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Heart,
  Share2,
  BookOpen,
  ArrowLeft,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { Story, Chapter } from '../types';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface StoryDetailViewProps {
  story: Story;
  onBack: () => void;
  onNavigateMembership: () => void;
  onReadChapter: (chapter: Chapter) => void;
}

export const StoryDetailView: React.FC<StoryDetailViewProps> = ({
  story,
  onBack,
  onNavigateMembership,
  onReadChapter,
}) => {
  const { user, toggleFavorite, togglePremiumMembership } = useAuth();
  const { showToast } = useToast();

  const [imageError, setImageError] = useState(false);
  const isFavorite = user?.favorites.includes(story.id);

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
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes('cover_summer_stayed.jpg')) {
                    target.src = '/images/cover_summer_stayed.jpg';
                  } else {
                    setImageError(true);
                  }
                }}
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

          {/* Quick Reading Stats Box */}
          <div className="mt-4 p-4 bg-white border border-[#E7E0DA] rounded-[10px] space-y-2.5 text-xs text-[#746B65]">
            <div className="flex justify-between items-center">
              <span>Status</span>
              <span className="font-semibold text-[#292421]">{story.status}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Published Chapters</span>
              <span className="font-semibold text-[#292421] tabular-nums">
                {story.publishedChaptersCount} of {story.totalPlannedChapters}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Format</span>
              <span className="font-semibold text-[#873F55]">
                Full Unabridged Serial
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Reading Format</span>
              <span className="font-semibold text-[#39745A] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Deep Immersion Prose</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Metadata, Actions, Synopsis */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col">
          {/* Tropes / Metadata */}
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
            Written by <span className="text-[#292421] font-medium">{story.author}</span> · Mysteries Unveiled by Dino Production
          </p>

          {/* Action Row: Read Chapter primary */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={() => onReadChapter(story.chapters[0])}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#873F55] text-white text-sm font-semibold rounded-lg hover:bg-[#6F3044] transition-colors shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Chapter 1 · Start Reading</span>
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

          {/* Free access info banner */}
          <div className="p-4 bg-[#F2EEEA] border border-[#E7E0DA] rounded-[10px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#873F55] shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-[#292421] block">
                  {story.status === 'Completed' ? '100% Free Complete Saga' : 'Chapters 1 to 10 Free'}
                </span>
                <span className="text-[#746B65]">
                  {story.status === 'Completed'
                    ? 'All chapters of this saga are 100% free to read with complete, unabridged narrative depth.'
                    : 'Chapters 1 through 10 are completely free to read. Only Chapter 11+ requires membership.'}
                </span>
              </div>
            </div>
            {!user?.isPremium && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    togglePremiumMembership();
                    showToast('⭐ Premium VIP Mode Activated! All chapters unlocked.', 'success');
                  }}
                  className="px-3.5 py-1.5 bg-amber-600 text-white text-xs font-semibold rounded-md hover:bg-amber-700 transition-colors shadow-xs whitespace-nowrap"
                >
                  ⭐ VIP Mode
                </button>
                <button
                  onClick={onNavigateMembership}
                  className="px-3.5 py-1.5 bg-[#873F55] text-white text-xs font-medium rounded-md hover:bg-[#6F3044] transition-colors whitespace-nowrap"
                >
                  Membership Plans
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chapters Section */}
      <div className="border-t border-[#E7E0DA] pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="font-editorial text-2xl text-[#292421]">Chapters</h2>
            <p className="text-xs text-[#746B65] mt-0.5">
              Select any chapter to read complete, unabridged story text.
            </p>
          </div>
          <span className="text-xs font-medium text-[#873F55] bg-[#F4E8EC] px-2.5 py-1 rounded-md">
            {story.chapters.length} chapters available · Unabridged editions
          </span>
        </div>

        {/* Chapter List */}
        <div className="bg-white border border-[#E7E0DA] rounded-[12px] divide-y divide-[#F2EEEA] overflow-hidden">
          {story.chapters.map((chapter) => {
            const isLocked = chapter.isPremium && !user?.isPremium;

            return (
              <a
                key={chapter.id}
                href={`#/story/${story.id}/chapter/${chapter.id}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    onReadChapter(chapter);
                  }
                }}
                className="p-4 sm:px-6 sm:py-4 flex items-center justify-between gap-4 cursor-pointer transition-colors group hover:bg-[#FAF8F5] block no-underline text-inherit"
                title="Click to open and read chapter text"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <span className="font-editorial text-lg text-[#948982] w-6 shrink-0 mt-0.5">
                    {chapter.number < 10 ? `0${chapter.number}` : chapter.number}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-editorial text-base sm:text-lg text-[#292421] group-hover:text-[#873F55] transition-colors truncate">
                        {chapter.title}
                      </h3>
                      {chapter.publishedAt.includes('Today') && (
                        <span className="bg-[#873F55] text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider shrink-0">
                          New Today
                        </span>
                      )}
                      {chapter.isPremium && (
                        <span className="bg-[#F2EEEA] text-[#746B65] text-[10px] font-medium px-2 py-0.5 rounded-[4px] shrink-0">
                          Premium (Ch 11+)
                        </span>
                      )}
                    </div>
                    {chapter.synopsis && (
                      <p className="text-xs text-[#746B65] line-clamp-1 mt-1">
                        {chapter.synopsis}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-[11px] text-[#948982] mt-1.5">
                      <span className="text-[#873F55] font-semibold flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>Unabridged Text</span>
                      </span>
                      <span>·</span>
                      <span>Published {chapter.publishedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isLocked ? (
                    <div className="flex items-center gap-1 text-xs text-[#948982] bg-[#F2EEEA] px-3 py-1.5 rounded-lg">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </div>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] group-hover:bg-[#873F55] group-hover:text-white text-[#292421] text-xs font-semibold border border-[#E7E0DA] transition-colors">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read</span>
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
