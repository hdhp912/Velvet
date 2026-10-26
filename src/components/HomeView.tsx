import React from 'react';
import {
  Play,
  ArrowRight,
  Clock,
  Sparkles,
  BookOpen,
  Volume2,
  Lock,
} from 'lucide-react';
import { Story, Chapter } from '../types';
import { StoryCard } from './StoryCard';
import { BROWSE_MOODS, RECENT_CHAPTERS } from '../data/sampleStories';
import { BOOK_COVERS } from '../assets/images';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface HomeViewProps {
  stories: Story[];
  onSelectStory: (id: string) => void;
  onNavigateTab: (tab: string, param?: string) => void;
  onNavigateMembership: () => void;
  onReadChapter?: (storyId: string, chapterId: string) => void;
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

export const HomeView: React.FC<HomeViewProps> = ({
  stories,
  onSelectStory,
  onNavigateTab,
  onNavigateMembership,
  onReadChapter,
}) => {
  const { playChapter, continueListening, currentStory, currentChapter, isPlaying } = useAudio();
  const { user, togglePremiumMembership } = useAuth();
  const { showToast } = useToast();

  const featuredStory = stories.find((s) => s.isFeatured) || stories[0];
  const popularStories = stories.slice(0, 4);

  // Check if user has active listening history
  const activeListeningItem = user?.listeningHistory?.[0];
  const activeHistoryStory = activeListeningItem
    ? stories.find((s) => s.id === activeListeningItem.storyId)
    : null;

  const handlePlayRecentChapter = (recent: (typeof RECENT_CHAPTERS)[0]) => {
    const story = stories.find((s) => s.id === recent.storyId);
    if (!story) return;

    if (recent.isPremium && !user?.isPremium) {
      togglePremiumMembership();
      showToast('⭐ Premium VIP Mode Activated: Playing ' + recent.chapterTitle, 'success');
      const chapter = story.chapters.find((c) => c.number === recent.chapterNumber) || story.chapters[0];
      playChapter(story, chapter);
      return;
    }

    const chapter = story.chapters.find((c) => c.number === recent.chapterNumber) || story.chapters[0];
    playChapter(story, chapter);
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-12">
      {/* A. HERO SECTION (Editorial Split Layout) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#873F55] uppercase mb-3">
              YOUR NEXT GREAT LOVE STORY
            </span>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[56px] leading-[1.12] text-[#292421] mb-5 text-balance">
              Some stories stay with you.
            </h1>

            <p className="text-base sm:text-[17px] text-[#746B65] leading-relaxed max-w-[560px] mb-8">
              Velvet Stories brings you serialized romance audiobooks recorded with single-narrator intimacy. Discover slow burns, emotional second chances, and immersive hundred-chapter sagas crafted for daily listening.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={() => onNavigateTab('discover')}
                className="px-6 py-3.5 bg-[#873F55] text-white text-sm font-semibold rounded-lg hover:bg-[#6F3044] transition-colors shadow-xs"
              >
                Explore stories
              </button>

              <button
                onClick={onNavigateMembership}
                className="text-sm font-medium text-[#746B65] hover:text-[#292421] transition-colors inline-flex items-center gap-1 group py-2"
              >
                <span>How membership works</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Cinematic Romance Cover Art */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              onClick={() => onSelectStory(featuredStory.id)}
              className="group cursor-pointer relative aspect-[3/4] w-full max-w-[360px] rounded-[16px] overflow-hidden shadow-[0_12px_36px_rgba(41,36,33,0.12)] border border-[#E7E0DA] bg-[#F2EEEA]"
            >
              <img
                src={BOOK_COVERS.hero}
                alt="Velvet Stories Featured Production"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* Minimal floating metadata overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#292421]/90 backdrop-blur-md rounded-lg text-white border border-white/10 shadow-lg">
                <div className="flex items-center justify-between text-[11px] text-[#D1C3C6] mb-1">
                  <span>Velvet Original Audio</span>
                  <span>100 Chapter Series</span>
                </div>
                <h3 className="font-editorial text-base text-[#FFF9F5] leading-snug">
                  The Cliffside Vows
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. CONTINUE LISTENING (Only for listeners with history) */}
      {activeHistoryStory && activeListeningItem && (
        <section className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="bg-white border border-[#E7E0DA] rounded-[12px] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-4 w-full sm:w-auto min-w-0">
              <img
                src={activeHistoryStory.coverImage}
                alt={activeHistoryStory.title}
                className="w-12 h-16 object-cover rounded-[6px] shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-[#873F55] uppercase tracking-wider block">
                  Continue Listening
                </span>
                <h4 className="font-editorial text-base text-[#292421] truncate">
                  {activeHistoryStory.title}
                </h4>
                <p className="text-xs text-[#746B65] truncate mt-0.5">
                  Chapter {activeListeningItem.chapterNumber} · {formatTime(activeListeningItem.progressSeconds)} listened
                </p>

                {/* Progress bar */}
                <div className="w-full sm:w-48 h-1 bg-[#F2EEEA] rounded-full overflow-hidden mt-1.5">
                  <div
                    className="h-full bg-[#873F55]"
                    style={{
                      width: `${Math.round(
                        (activeListeningItem.progressSeconds / activeListeningItem.totalSeconds) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => continueListening(activeHistoryStory.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FAF8F5] border border-[#D6CCC4] text-xs sm:text-sm font-semibold text-[#292421] rounded-lg hover:bg-[#873F55] hover:text-white hover:border-[#873F55] transition-colors shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume Chapter</span>
            </button>
          </div>
        </section>
      )}

      {/* C. FEATURED STORY (Editorial Panel) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="bg-white border border-[#E7E0DA] rounded-[16px] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Cover Column */}
            <div className="md:col-span-4 flex justify-center">
              <div
                onClick={() => onSelectStory(featuredStory.id)}
                className="group cursor-pointer relative aspect-[3/4] w-full max-w-[280px] rounded-[10px] overflow-hidden shadow-[0_6px_24px_rgba(41,36,33,0.08)] border border-[#E7E0DA]"
              >
                <img
                  src={featuredStory.coverImage}
                  alt={featuredStory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Info Column */}
            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs text-[#746B65] mb-2 font-medium">
                <span className="text-[#873F55] font-semibold">{featuredStory.genre}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredStory.status}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredStory.publishedChaptersCount} Chapters Released</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-[#292421] mb-3 leading-snug">
                {featuredStory.title}
              </h2>

              <p className="text-sm sm:text-base text-[#746B65] leading-relaxed mb-4 max-w-[640px]">
                {featuredStory.synopsis}
              </p>

              <div className="flex items-center gap-4 text-xs text-[#948982] mb-6">
                <span>Narrated by {featuredStory.narrator.name}</span>
                <span>·</span>
                <span>{formatDuration(featuredStory.totalDurationSeconds)} total audio</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    if (onReadChapter) {
                      onReadChapter(featuredStory.id, featuredStory.chapters[0].id);
                    } else {
                      onSelectStory(featuredStory.id);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#873F55] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#6F3044] transition-colors shadow-xs"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Chapter 1</span>
                </button>

                <button
                  onClick={() => playChapter(featuredStory, featuredStory.chapters[0])}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-[#D6CCC4] text-[#292421] hover:border-[#873F55] hover:text-[#873F55] text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-2xs"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5 text-[#873F55]" />
                  <span>Listen to preview</span>
                </button>

                <button
                  onClick={() => onSelectStory(featuredStory.id)}
                  className="text-xs sm:text-sm font-semibold text-[#746B65] hover:text-[#292421] transition-colors px-2 py-2"
                >
                  View series details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. BROWSE BY MOOD (Horizontal Collection) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="mb-6">
          <h2 className="font-editorial text-2xl sm:text-[28px] text-[#292421]">Browse by mood</h2>
          <p className="text-xs sm:text-sm text-[#746B65] mt-1">
            Choose your emotional pace—from agonizing slow burns to witty office rivals.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {BROWSE_MOODS.map((mood) => (
            <div
              key={mood.id}
              onClick={() => onNavigateTab('discover', mood.name)}
              className="group cursor-pointer bg-white border border-[#E7E0DA] rounded-[10px] p-4 transition-all duration-200 hover:border-[#873F55] hover:bg-[#FAF8F5]"
            >
              <h3 className="font-editorial text-base sm:text-lg text-[#292421] group-hover:text-[#873F55] transition-colors mb-1">
                {mood.name}
              </h3>
              <p className="text-[11px] text-[#746B65] leading-normal line-clamp-1">
                {mood.description}
              </p>
              <span className="text-[10px] text-[#948982] mt-2 block font-medium">
                {mood.count} stories
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* E. NEW CHAPTERS (Recently Published Rows) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-editorial text-2xl sm:text-[28px] text-[#292421]">New chapters</h2>
            <p className="text-xs sm:text-sm text-[#746B65] mt-1">
              Fresh narrations released daily for ongoing serialized sagas.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('new-releases')}
            className="text-xs font-semibold text-[#873F55] hover:underline"
          >
            View all releases →
          </button>
        </div>

        <div className="bg-white border border-[#E7E0DA] rounded-[12px] divide-y divide-[#F2EEEA] overflow-hidden">
          {RECENT_CHAPTERS.map((recent, idx) => (
            <div
              key={`${recent.storyId}-${recent.chapterNumber}-${idx}`}
              onClick={() => {
                const story = stories.find((s) => s.id === recent.storyId);
                const chapter =
                  story?.chapters.find((c) => c.number === recent.chapterNumber) ||
                  story?.chapters[0];
                if (story && chapter && onReadChapter) {
                  onReadChapter(story.id, chapter.id);
                } else {
                  onSelectStory(recent.storyId);
                }
              }}
              className="p-3.5 sm:px-5 sm:py-3.5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors group"
              title="Click to read chapter text"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={recent.coverImage}
                  alt={recent.storyTitle}
                  className="w-9 h-12 object-cover rounded-[4px] shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#873F55]">
                      Chapter {recent.chapterNumber}
                    </span>
                    {recent.publishedAt.includes('Today') && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#873F55] text-white px-2 py-0.5 rounded-[4px] shadow-xs">
                        New Today
                      </span>
                    )}
                    {recent.isPremium && (
                      <span className="text-[10px] text-[#746B65] bg-[#F2EEEA] px-1.5 py-0.5 rounded-[4px]">
                        Premium
                      </span>
                    )}
                  </div>
                  <h4 className="font-editorial text-sm sm:text-base text-[#292421] group-hover:text-[#873F55] transition-colors truncate mt-0.5">
                    {recent.chapterTitle}
                  </h4>
                  <p className="text-xs text-[#746B65] truncate">
                    {recent.storyTitle} · {recent.narratorName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 text-xs text-[#746B65] shrink-0 tabular-nums">
                <span className="hidden sm:inline text-[#948982]">{recent.publishedAt}</span>
                <span className="font-medium text-[#292421] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#948982]" />
                  <span>{formatTime(recent.durationSeconds)}</span>
                </span>

                {/* Read Badge */}
                <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF8F5] group-hover:bg-[#873F55] group-hover:text-white text-[#292421] font-medium text-xs border border-[#E7E0DA] transition-colors">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read</span>
                </div>

                {/* Dedicated Audio Play Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayRecentChapter(recent);
                  }}
                  className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#873F55] hover:text-white flex items-center justify-center text-[#292421] transition-colors shadow-2xs"
                  aria-label="Listen to audio narration"
                  title="Listen to audio narration"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F. POPULAR STORIES (4 Columns Responsive Grid) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-editorial text-2xl sm:text-[28px] text-[#292421]">Popular stories</h2>
            <p className="text-xs sm:text-sm text-[#746B65] mt-1">
              Top listener favorites across our contemporary and historical series.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('discover')}
            className="text-xs font-semibold text-[#873F55] hover:underline"
          >
            Explore all {stories.length} stories →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularStories.map((story) => (
            <StoryCard key={story.id} story={story} onSelect={onSelectStory} />
          ))}
        </div>
      </section>

      {/* G. MEMBERSHIP SECTION (Restrained Dark Charcoal/Burgundy Panel) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="bg-[#2C2528] text-[#FFF9F5] rounded-[16px] p-8 sm:p-12 border border-[#423A3E]">
          <div className="max-w-[640px]">
            <span className="text-xs uppercase font-semibold text-[#D9A5B5] tracking-widest block mb-3">
              Velvet Stories Membership
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#FFF9F5] leading-tight mb-4">
              Make room for another story.
            </h2>
            <p className="text-sm sm:text-base text-[#D1C3C6] leading-relaxed mb-8">
              Join our listener community to unlock all 100-chapter serialized sagas, uninterrupted audio streaming, and daily chapter releases the moment they drop.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onNavigateMembership}
                className="px-6 py-3 bg-[#873F55] hover:bg-[#6F3044] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-sm"
              >
                Explore membership
              </button>
              <button
                onClick={() => onNavigateTab('completed')}
                className="text-xs sm:text-sm text-[#D1C3C6] hover:text-white transition-colors"
              >
                Browse completed preview sagas →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
