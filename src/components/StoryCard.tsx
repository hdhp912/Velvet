import React, { useState } from 'react';
import { Play, Sparkles, BookOpen } from 'lucide-react';
import { Story } from '../types';
import { useAudio } from '../context/AudioContext';

interface StoryCardProps {
  story: Story;
  onSelect: (storyId: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onSelect }) => {
  const { playChapter, currentStory, isPlaying, togglePlay } = useAudio();
  const [imageError, setImageError] = useState(false);

  const isCurrentStoryPlaying = currentStory?.id === story.id && isPlaying;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentStory?.id === story.id) {
      togglePlay();
    } else if (story.chapters.length > 0) {
      playChapter(story, story.chapters[0]);
    }
  };

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
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#F2EEEA] text-[#746B65] text-center">
            <BookOpen className="w-8 h-8 text-[#948982] mb-2" />
            <span className="font-editorial text-sm text-[#292421] line-clamp-2">{story.title}</span>
          </div>
        )}

        {/* Hover Quick-Play Button Overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
          <button
            onClick={handlePlayClick}
            aria-label={`Listen to ${story.title}`}
            className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#873F55] flex items-center justify-center shadow-md transform transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Play className={`w-5 h-5 ml-0.5 ${isCurrentStoryPlaying ? 'text-[#873F55]' : ''}`} fill="currentColor" />
          </button>
        </div>

        {/* Status / Series indicator (Clean restrained label) */}
        {story.totalPlannedChapters >= 100 && (
          <div className="absolute top-2.5 left-2.5 bg-[#292421]/80 backdrop-blur-xs text-[#FFF9F5] text-[10px] font-medium px-2 py-0.5 rounded-[5px]">
            100 Chapters
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

        {/* Footer info: Chapters count & Narrator */}
        <div className="pt-2.5 border-t border-[#F2EEEA] flex items-center justify-between text-[11px] text-[#948982]">
          <span>{story.publishedChaptersCount} chapters released</span>
          <span className="font-medium text-[#746B65] truncate max-w-[110px]">{story.narrator.name}</span>
        </div>
      </div>
    </div>
  );
};
