import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Timer,
} from 'lucide-react';
import { Story, Chapter } from '../types';
import { StoryCard } from './StoryCard';
import { BROWSE_MOODS } from '../data/sampleStories';
import { BOOK_COVERS } from '../assets/images';
import { useAuth } from '../context/AuthContext';
import { getDailyAutomationState, getNextDropCountdown } from '../data/dailySchedule';

interface HomeViewProps {
  stories: Story[];
  onSelectStory: (id: string) => void;
  onNavigateTab: (tab: string, param?: string) => void;
  onNavigateMembership: () => void;
  onReadChapter?: (storyId: string, chapterId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  stories,
  onSelectStory,
  onNavigateTab,
  onNavigateMembership,
  onReadChapter,
}) => {
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(getNextDropCountdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getNextDropCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const automationState = getDailyAutomationState();
  const featuredStory = stories.find((s) => s.isFeatured) || stories[0];
  const completedStories = stories.filter((s) => s.status === 'Completed');
  const popularStories = stories.slice(0, 4);

  // Today's automated chapter drops
  const todayDrops = automationState.schedule.filter((item) => item.status === 'released' && item.date === '2026-10-28');

  return (
    <div className="space-y-16 md:space-y-24 pb-12">
      {/* A. HERO SECTION (Editorial Split Layout) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-6 sm:pt-10">
        {/* Highlight notification pill */}
        <div className="mb-6 inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4E8EC] border border-[#E7E0DA] text-xs text-[#873F55] font-medium shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#873F55] shrink-0" />
          <span>
            <strong>20 Complete Sagas 100% Free:</strong> Unabridged full-length chapters · Chapters 1–10 Free on Serialized series
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#873F55] uppercase mb-3">
              SERIALIZED FICTION &amp; MYSTERY NOVELS
            </span>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[56px] leading-[1.12] text-[#292421] mb-5 text-balance">
              Mysteries Unveiled by Dino
            </h1>

            <p className="text-base sm:text-[17px] text-[#746B65] leading-relaxed max-w-[560px] mb-8">
              Immerse yourself in rich, atmospheric storytelling crafted chapter by chapter. Enjoy 20 fully completed sagas 100% free, automated daily chapter releases, and generous free previews for continuous immersive reading.
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={() => onNavigateTab('discover')}
                className="px-6 py-3.5 bg-[#873F55] text-white text-sm font-semibold rounded-lg hover:bg-[#6F3044] transition-colors shadow-xs"
              >
                Explore all {stories.length} stories
              </button>

              <button
                onClick={() => onNavigateTab('completed')}
                className="px-5 py-3.5 bg-white border border-[#D6CCC4] text-[#292421] hover:border-[#873F55] hover:text-[#873F55] text-sm font-semibold rounded-lg transition-colors shadow-2xs"
              >
                20 Free Complete Sagas ({completedStories.length})
              </button>

              <button
                onClick={onNavigateMembership}
                className="text-sm font-medium text-[#746B65] hover:text-[#292421] transition-colors inline-flex items-center gap-1 group py-2"
              >
                <span>Membership &amp; VIP perks</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Cinematic Cover Art */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              onClick={() => onSelectStory(featuredStory.id)}
              className="group cursor-pointer relative aspect-[3/4] w-full max-w-[360px] rounded-[16px] overflow-hidden shadow-[0_12px_36px_rgba(41,36,33,0.12)] border border-[#E7E0DA] bg-[#F2EEEA]"
            >
              <img
                src={featuredStory.coverImage || BOOK_COVERS.hero}
                alt="Mysteries Unveiled by Dino Featured Novel"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/cover_summer_stayed.jpg';
                }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* Minimal floating metadata overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#292421]/90 backdrop-blur-md rounded-lg text-white border border-white/10 shadow-lg">
                <div className="flex items-center justify-between text-[11px] text-[#D1C3C6] mb-1">
                  <span>Dino Original Series</span>
                  <span className="text-[#D9A5B5] font-semibold">
                    {featuredStory.status === 'Completed' ? 'Complete Saga · 100% Free' : 'Ch. 1–10 Free'}
                  </span>
                </div>
                <h3 className="font-editorial text-base text-[#FFF9F5] leading-snug">
                  {featuredStory.title}
                </h3>
                <p className="text-xs text-[#D1C3C6] mt-0.5">
                  {featuredStory.publishedChaptersCount} Chapters · Full Unabridged Text
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. DAILY AUTOMATED CHAPTER DROPS SHOWCASE (Cập nhật chương mới mỗi ngày) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-white to-[#FAF8F5] border border-[#E7E0DA] rounded-[16px] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E7E0DA]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF5EF] text-[#39745A] font-semibold text-xs border border-[#C6E6D4]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Automated Daily Publishing Active
                </span>
                <span className="text-xs text-[#948982]">Runs every day at 06:00 UTC</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#292421]">
                Today’s Fresh Chapter Releases
              </h2>
              <p className="text-xs sm:text-sm text-[#746B65] mt-1">
                New chapters automatically published daily for deep, atmospheric reading.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-[#FAF8F5] border border-[#E7E0DA] rounded-xl px-4 py-3 shrink-0 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#873F55]/10 text-[#873F55] flex items-center justify-center shrink-0">
                <Timer className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#948982] font-semibold">Next Daily Release In</p>
                <p className="text-sm font-mono font-bold text-[#292421]">
                  {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                </p>
              </div>
            </div>
          </div>

          {/* Today's released chapters list */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayDrops.map((drop) => {
              const matchedStory = stories.find((s) => s.id === drop.storyId);
              const targetChapter = matchedStory?.chapters.find((c) => c.number === drop.chapterNumber) || matchedStory?.chapters[0];

              return (
                <div
                  key={drop.id}
                  onClick={() => {
                    if (matchedStory && targetChapter && onReadChapter) {
                      onReadChapter(matchedStory.id, targetChapter.id);
                    } else if (matchedStory) {
                      onSelectStory(matchedStory.id);
                    }
                  }}
                  className="group cursor-pointer bg-white border border-[#E7E0DA] hover:border-[#873F55] rounded-xl p-4 transition-all duration-200 shadow-2xs hover:shadow-sm flex items-start gap-3.5"
                >
                  <img
                    src={matchedStory?.coverImage || BOOK_COVERS.summerStayed}
                    alt={drop.storyTitle}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/cover_summer_stayed.jpg';
                    }}
                    className="w-14 h-20 object-cover rounded-md border border-[#E7E0DA] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-[#873F55] text-white px-2 py-0.5 rounded-[4px]">
                        Today’s Drop
                      </span>
                      <span className="text-xs font-semibold text-[#873F55]">
                        Chapter {drop.chapterNumber}
                      </span>
                      {drop.isPremium && !user?.isPremium && (
                        <span className="text-[10px] text-[#746B65] bg-[#F2EEEA] px-1.5 py-0.5 rounded">
                          VIP
                        </span>
                      )}
                    </div>
                    <h3 className="font-editorial text-base text-[#292421] group-hover:text-[#873F55] transition-colors truncate">
                      {drop.chapterTitle}
                    </h3>
                    <p className="text-xs text-[#746B65] truncate mt-0.5">
                      {drop.storyTitle}
                    </p>
                    {drop.summary && (
                      <p className="text-xs text-[#746B65] line-clamp-1 italic mt-1 font-serif">
                        "{drop.summary}"
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-[11px] text-[#948982] mt-1.5">
                      <span className="font-medium text-[#873F55] bg-[#F4E8EC] px-1.5 py-0.5 rounded">
                        Unabridged Chapter
                      </span>
                    </div>
                  </div>
                  <div className="self-center shrink-0">
                    <span className="w-8 h-8 rounded-full bg-[#FAF8F5] group-hover:bg-[#873F55] group-hover:text-white flex items-center justify-center text-[#746B65] transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* C. FEATURED NOVEL (Editorial Panel) */}
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
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/cover_summer_stayed.jpg';
                  }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Info Column */}
            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#746B65] mb-2 font-medium">
                <span className="text-[#873F55] font-semibold">{featuredStory.genre}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#39745A] font-semibold">{featuredStory.status}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredStory.publishedChaptersCount} Long-form Chapters Released</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-[#292421] mb-3 leading-snug">
                {featuredStory.title}
              </h2>

              <p className="text-sm sm:text-base text-[#746B65] leading-relaxed mb-4 max-w-[640px]">
                {featuredStory.synopsis}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#948982] mb-6">
                <span>By <strong className="text-[#292421]">{featuredStory.author}</strong></span>
                <span>·</span>
                <span className="text-[#873F55] font-medium">Full Unabridged Editions</span>
                <span>·</span>
                <span>{featuredStory.status === 'Completed' ? '100% Free Complete Saga' : 'Chapters 1–10 Free'}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    if (onReadChapter && featuredStory.chapters[0]) {
                      onReadChapter(featuredStory.id, featuredStory.chapters[0].id);
                    } else {
                      onSelectStory(featuredStory.id);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#873F55] text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#6F3044] transition-colors shadow-xs"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Reading Chapter 1</span>
                </button>

                <button
                  onClick={() => onSelectStory(featuredStory.id)}
                  className="px-5 py-3 bg-white border border-[#D6CCC4] text-[#292421] hover:border-[#873F55] hover:text-[#873F55] text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-2xs"
                >
                  View Chapter Index ({featuredStory.chapters.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. 20 COMPLETED 100% FREE SAGAS SPOTLIGHT */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-editorial text-2xl sm:text-[28px] text-[#292421]">
                20 Complete Sagas — 100% Free
              </h2>
              <span className="text-xs font-bold uppercase tracking-wider bg-[#39745A] text-white px-2 py-0.5 rounded">
                No Paywall
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#746B65] mt-1">
              Read all complete multi-chapter mysteries from beginning to end with zero limits and full narrative depth.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('completed')}
            className="text-xs font-semibold text-[#873F55] hover:underline shrink-0"
          >
            View all {completedStories.length} completed sagas →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {completedStories.slice(0, 8).map((story) => (
            <StoryCard key={story.id} story={story} onSelect={onSelectStory} onReadChapter={onReadChapter} />
          ))}
        </div>
      </section>

      {/* E. BROWSE BY MOOD (Horizontal Collection) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="mb-6">
          <h2 className="font-editorial text-2xl sm:text-[28px] text-[#292421]">Browse by mood &amp; atmosphere</h2>
          <p className="text-xs sm:text-sm text-[#746B65] mt-1">
            Choose your emotional pace—from gothic coastal puzzles to slow-burn secrets.
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

      {/* F. POPULAR STORIES */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-editorial text-2xl sm:text-[28px] text-[#292421]">Popular stories</h2>
            <p className="text-xs sm:text-sm text-[#746B65] mt-1">
              Top reader favorites across contemporary mystery and serialized romance.
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
            <StoryCard key={story.id} story={story} onSelect={onSelectStory} onReadChapter={onReadChapter} />
          ))}
        </div>
      </section>

      {/* G. MEMBERSHIP SECTION (Restrained Dark Charcoal/Burgundy Panel) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="bg-[#2C2528] text-[#FFF9F5] rounded-[16px] p-8 sm:p-12 border border-[#423A3E]">
          <div className="max-w-[640px]">
            <span className="text-xs uppercase font-semibold text-[#D9A5B5] tracking-widest block mb-3">
              Mysteries Unveiled by Dino Membership
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#FFF9F5] leading-tight mb-4">
              Make room for another mystery.
            </h2>
            <p className="text-sm sm:text-base text-[#D1C3C6] leading-relaxed mb-8">
              Experience all 20 complete mystery sagas 100% free with full chapters. On serialized romance series, enjoy chapters 1 through 10 free. Unlock VIP membership for unrestricted access to chapters 11+ and daily automated chapter releases.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onNavigateMembership}
                className="px-6 py-3 bg-[#873F55] hover:bg-[#6F3044] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-sm"
              >
                Explore membership plans
              </button>
              <button
                onClick={() => onNavigateTab('completed')}
                className="text-xs sm:text-sm text-[#D1C3C6] hover:text-white transition-colors"
              >
                Browse 20 Free Complete Sagas →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
