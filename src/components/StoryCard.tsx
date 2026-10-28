import React, { useState } from 'react';
import { BookOpen, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { Story } from '../types';

interface StoryCardProps {
  story: Story;
  onSelect: (storyId: string) => void;
  onReadChapter?: (storyId: string, chapterId: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onSelect, onReadChapter }) => {
  const [imageError, setImageError] = useState(false);

  // Calculate average words per chapter
  const avgWords = story.chapters.length > 0 
    ? Math.round(story.chapters.reduce((acc, c) => acc + c.wordCount, 0) / story.chapters.length)
    : 1940;

  return (
    <div
      onClick={() => onSelect(story.id)}
      className="group cursor-pointer flex flex-col bg-white border border-[#E7E0DA] rounded-[12px] p-3 transition-all duration-200 hover:border-[#D6CCC4] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(41,36,33,0.06)]"
    >
      {/* Book Cover Container (Aspect Ratio 3:4, 8px radius) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[8px] bg-[#F2EEEA]">
        {!imageError ? (
          <img
            src={story.coverImage}
            alt={story.title}
            onError={(e) => {
              // Try fallback local image before showing placeholder
              const target = e.currentTarget as HTMLImageElement;
              if (!target.src.includes('cover_summer_stayed.jpg')) {
                target.src = '/images/cover_summer_stayed.jpg';
              } else {
                setImageError(true);
              }
            }}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#F2EEEA] text-[#746B65] text-center">
            <BookOpen className="w-8 h-8 text-[#948982] mb-2" />
            <span className="font-editorial text-sm text-[#292421] line-clamp-2">{story.title}</span>
          </div>
        )}

        {/* Hover Quick-Read Overlay */}
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onReadChapter && story.chapters[0]) {
                onReadChapter(story.id, story.chapters[0].id);
              } else {
                onSelect(story.id);
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F5] text-[#873F55] font-semibold text-xs shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Chapter 1</span>
          </button>
        </div>

        {/* Status / Series indicator */}
        {story.status === 'Completed' ? (
          <div className="absolute top-2.5 left-2.5 bg-[#39745A]/95 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-[5px] shadow-xs">
            Complete · 100% Free
          </div>
        ) : (
          <div className="absolute top-2.5 left-2.5 bg-[#292421]/80 backdrop-blur-xs text-[#FFF9F5] text-[10px] font-medium px-2 py-0.5 rounded-[5px]">
            Ch 1–10 Free
          </div>
        )}

        {/* New chapter updated today badge */}
        {story.chapters?.some((c) => c.publishedAt?.includes('Today')) && (
          <div className="absolute top-2.5 right-2.5 bg-[#873F55] text-white text-[10px] font-semibold px-2 py-0.5 rounded-[5px] shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            New Today
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="mt-3 flex flex-col flex-1">
        {/* Unboxed Metadata (Zero-Pill discipline) */}
        <div className="flex items-center gap-1.5 text-xs text-[#746B65] mb-1">
          <span className="font-medium text-[#873F55]">{story.genre}</span>
          <span aria-hidden="true">·</span>
          <span>{story.status}</span>
        </div>

        {/* Title in DM Serif Display */}
        <h3 className="font-editorial text-[19px] leading-snug text-[#292421] group-hover:text-[#873F55] transition-colors line-clamp-1 mb-1.5">
          {story.title}
        </h3>

        {/* Synopsis snippet */}
        <p className="text-xs text-[#746B65] line-clamp-2 leading-relaxed mb-3 flex-1">
          {story.synopsis}
        </p>

        {/* Footer info: Chapters count & Story teaser */}
        <div className="pt-2.5 border-t border-[#F2EEEA] flex items-center justify-between text-[11px] text-[#948982]">
          <span className="flex items-center gap-1 shrink-0">
            <FileText className="w-3 h-3 text-[#948982]" />
            <span>{story.publishedChaptersCount} chapters</span>
          </span>
          <span className="text-[#873F55] italic text-[10px] truncate max-w-[140px] font-serif" title={story.chapters[0]?.synopsis || story.synopsis}>
            "{story.chapters[0]?.synopsis ? story.chapters[0].synopsis.slice(0, 32) + '...' : story.genre}"
          </span>
        </div>
      </div>
    </div>
  );
};
