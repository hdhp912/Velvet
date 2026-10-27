import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  Headphones,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lock,
  Type,
  Sun,
  Moon,
  Volume2,
} from 'lucide-react';
import { Story, Chapter } from '../types';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface ChapterReaderViewProps {
  story: Story;
  chapter: Chapter;
  onBackToStory: () => void;
  onSelectChapter: (chapterId: string) => void;
  onNavigateMembership?: () => void;
}

type ReaderTheme = 'ivory' | 'white' | 'sepia' | 'dark';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export const ChapterReaderView: React.FC<ChapterReaderViewProps> = ({
  story,
  chapter,
  onBackToStory,
  onSelectChapter,
  onNavigateMembership,
}) => {
  const { playChapter, currentStory, currentChapter, isPlaying, togglePlay } = useAudio();
  const { user, togglePremiumMembership } = useAuth();
  const { showToast } = useToast();

  const [theme, setTheme] = useState<ReaderTheme>('ivory');
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');

  const isCurrentAudioPlaying =
    currentStory?.id === story.id && currentChapter?.id === chapter.id && isPlaying;
  const isCurrentAudioLoaded =
    currentStory?.id === story.id && currentChapter?.id === chapter.id;

  const isLocked = chapter.isPremium && !user?.isPremium;

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapter.id]);

  const currentIndex = story.chapters.findIndex((c) => c.id === chapter.id);
  const prevChapter = currentIndex > 0 ? story.chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < story.chapters.length - 1 ? story.chapters[currentIndex + 1] : null;

  const handleToggleAudio = () => {
    if (chapter.isPremium && !user?.isPremium) {
      togglePremiumMembership();
      showToast('⭐ Premium VIP Mode Activated: Playing audio for Chapter ' + chapter.number, 'success');
      playChapter(story, chapter);
      return;
    }

    if (isCurrentAudioLoaded) {
      togglePlay();
    } else {
      playChapter(story, chapter);
      showToast(`🎧 Now narrating Chapter ${chapter.number}: ${chapter.title}`, 'info');
    }
  };

  const handleUnlockVip = () => {
    togglePremiumMembership();
    showToast('⭐ Premium VIP Mode Activated! All chapters unlocked.', 'success');
  };

  // Theme styling definitions
  const themeStyles = {
    ivory: {
      bg: 'bg-[#FAF8F5]',
      card: 'bg-white',
      text: 'text-[#292421]',
      muted: 'text-[#746B65]',
      border: 'border-[#E7E0DA]',
      bar: 'bg-[#FAF8F5]/90 backdrop-blur-md border-[#E7E0DA]',
    },
    white: {
      bg: 'bg-[#F9F9FB]',
      card: 'bg-white',
      text: 'text-[#1E2022]',
      muted: 'text-[#687076]',
      border: 'border-[#E4E7EB]',
      bar: 'bg-white/95 backdrop-blur-md border-[#E4E7EB]',
    },
    sepia: {
      bg: 'bg-[#FBF0D9]',
      card: 'bg-[#F4E8CB]',
      text: 'text-[#433422]',
      muted: 'text-[#7D6649]',
      border: 'border-[#E3D4B6]',
      bar: 'bg-[#FBF0D9]/95 backdrop-blur-md border-[#E3D4B6]',
    },
    dark: {
      bg: 'bg-[#1C1819]',
      card: 'bg-[#252022]',
      text: 'text-[#F5EFEB]',
      muted: 'text-[#B8ACB0]',
      border: 'border-[#3D3538]',
      bar: 'bg-[#1C1819]/95 backdrop-blur-md border-[#3D3538]',
    },
  };

  const currentTheme = themeStyles[theme];

  // Font size styling
  const fontSizeClasses = {
    sm: 'text-[15px] sm:text-[16px] leading-[1.7]',
    md: 'text-[17px] sm:text-[18px] leading-[1.75]',
    lg: 'text-[19px] sm:text-[20px] leading-[1.8]',
    xl: 'text-[21px] sm:text-[23px] leading-[1.85]',
  };

  // Split prose into readable paragraphs
  const paragraphs = chapter.proseExcerpt.split('\n\n').filter((p) => p.trim().length > 0);

  return (
    <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-200 pb-28`}>
      {/* 1. Sticky Reader Top Navigation Bar */}
      <div className={`sticky top-0 z-30 border-b ${currentTheme.bar} transition-colors duration-200`}>
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Back button */}
          <button
            onClick={onBackToStory}
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium ${currentTheme.muted} hover:${currentTheme.text} transition-colors shrink-0`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Story details</span>
            <span className="sm:hidden">Back</span>
          </button>

          {/* Center Title Indicator */}
          <div className="min-w-0 text-center px-2 flex-1 hidden md:block">
            <p className={`text-[11px] ${currentTheme.muted} truncate uppercase tracking-wider font-medium`}>
              {story.title}
            </p>
            <p className={`text-xs font-semibold ${currentTheme.text} truncate`}>
              Chapter {chapter.number}: {chapter.title}
            </p>
          </div>

          {/* Right Controls: Play Audio & Reading Settings */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Audio narration button */}
            <button
              onClick={handleToggleAudio}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all ${
                isCurrentAudioPlaying
                  ? 'bg-[#873F55] text-white animate-pulse'
                  : 'bg-[#873F55] hover:bg-[#6F3044] text-white'
              }`}
              title="Listen to voice narration"
            >
              {isCurrentAudioPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause Audio</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>Play Audio</span>
                </>
              )}
            </button>

            {/* Reading preferences buttons */}
            <div className="flex items-center border rounded-lg overflow-hidden border-[#D6CCC4]/50 bg-white/40">
              {/* Font size toggle */}
              <button
                onClick={() => {
                  const sizes: FontSize[] = ['sm', 'md', 'lg', 'xl'];
                  const nextIdx = (sizes.indexOf(fontSize) + 1) % sizes.length;
                  setFontSize(sizes[nextIdx]);
                }}
                className={`p-2 text-xs font-serif font-bold ${currentTheme.muted} hover:${currentTheme.text} transition-colors`}
                title="Change font size"
              >
                <Type className="w-3.5 h-3.5" />
              </button>

              {/* Theme toggle */}
              <button
                onClick={() => {
                  const themes: ReaderTheme[] = ['ivory', 'sepia', 'dark', 'white'];
                  const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
                  setTheme(themes[nextIdx]);
                }}
                className={`p-2 text-xs ${currentTheme.muted} hover:${currentTheme.text} transition-colors`}
                title="Switch reading theme (Ivory / Sepia / Dark / White)"
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Font family toggle (Serif / Sans) */}
              <button
                onClick={() => setFontFamily(fontFamily === 'serif' ? 'sans' : 'serif')}
                className={`px-2 py-1 text-[11px] font-semibold ${currentTheme.muted} hover:${currentTheme.text} transition-colors hidden sm:block`}
                title="Switch Serif / Sans-serif"
              >
                {fontFamily === 'serif' ? 'Serif' : 'Sans'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Editorial Reader Body */}
      <div className="max-w-[760px] mx-auto px-5 sm:px-8 pt-8 sm:pt-12">
        {/* Story & Chapter Header */}
        <div className="border-b border-[#E7E0DA]/70 pb-6 mb-8 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2 text-xs font-medium text-[#873F55]">
            <span className="uppercase tracking-widest">{story.genre}</span>
            <span className="text-[#D6CCC4]">·</span>
            <span>{story.title}</span>
            {chapter.publishedAt.includes('Today') && (
              <span className="bg-[#873F55] text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider ml-1">
                New Today
              </span>
            )}
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl text-[#292421] leading-tight mb-3">
            Chapter {chapter.number}: {chapter.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-[#746B65]">
            <span>Written by <strong className="text-[#292421]">{story.author}</strong></span>
            <span>·</span>
            <span>Narrated by {story.narrator.name}</span>
            <span>·</span>
            <span>{chapter.wordCount} words</span>
            <span>·</span>
            <span>Published {chapter.publishedAt}</span>
          </div>

          {/* Quick Audio Bar in Reader Header */}
          <div className="mt-5 p-3.5 bg-white/70 border border-[#E7E0DA] rounded-[10px] flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#F4E8EC] text-[#873F55] flex items-center justify-center shrink-0">
                <Volume2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 text-xs">
                <p className="font-medium text-[#292421] truncate">
                  {isCurrentAudioPlaying ? 'Narration is currently playing' : 'Audio narration is available'}
                </p>
                <p className="text-[#948982] truncate">
                  Voice: {story.narrator.name} ({story.narrator.accent} accent)
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleAudio}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#873F55] hover:bg-[#6F3044] text-white text-xs font-semibold rounded-md transition-colors shrink-0 shadow-2xs"
            >
              {isCurrentAudioPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>Listen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. Chapter Prose Text */}
        <article
          className={`max-w-[680px] mx-auto ${
            fontFamily === 'serif' ? 'font-serif' : 'font-sans'
          } ${fontSizeClasses[fontSize]} ${currentTheme.text} space-y-6 transition-all duration-150`}
        >
          {isLocked ? (
            /* Locked Preview with VIP Unlock */
            <>
              {/* First paragraph readable preview */}
              <p className="first-letter:text-5xl first-letter:font-editorial first-letter:text-[#873F55] first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                {paragraphs[0]}
              </p>

              {/* Faded blur lock box */}
              <div className="relative mt-8 pt-8 pb-12 px-6 sm:px-10 bg-gradient-to-b from-white/30 to-white/90 border border-[#E7E0DA] rounded-[16px] text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#F4E8EC] text-[#873F55] flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6" />
                </div>

                <h3 className="font-editorial text-2xl text-[#292421] mb-2">
                  Unlock Chapter {chapter.number}
                </h3>
                <p className="text-sm text-[#746B65] max-w-md mx-auto mb-6 leading-relaxed">
                  This chapter (Chapter {chapter.number}) is part of the Mysteries Unveiled by Dino Premium serial catalog. Chapters 1 through 10 are completely free; unlock instant access to continue reading and listening.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleUnlockVip}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>⭐ Unlock VIP Demo (Instant Access)</span>
                  </button>

                  {onNavigateMembership && (
                    <button
                      onClick={onNavigateMembership}
                      className="px-5 py-3 bg-[#873F55] hover:bg-[#6F3044] text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      View All Membership Plans
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Full Prose Chapter Reading */
            paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'first-letter:text-5xl first-letter:font-editorial first-letter:text-[#873F55] first-letter:mr-2.5 first-letter:float-left first-letter:leading-none'
                    : ''
                }
              >
                {paragraph}
              </p>
            ))
          )}
        </article>

        {/* 4. Bottom Chapter Navigation & Controls */}
        <div className="mt-14 pt-8 border-t border-[#E7E0DA]/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Prev Chapter */}
            {prevChapter ? (
              <button
                onClick={() => onSelectChapter(prevChapter.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#E7E0DA] bg-white text-xs sm:text-sm font-medium text-[#292421] hover:border-[#873F55] hover:text-[#873F55] transition-colors shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <div className="text-left">
                  <span className="block text-[10px] text-[#948982]">Previous</span>
                  <span>Ch. {prevChapter.number}: {prevChapter.title}</span>
                </div>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {/* Chapter Selection Dropdown */}
            <div className="w-full sm:w-auto flex items-center justify-center gap-2">
              <select
                aria-label="Select chapter"
                value={chapter.id}
                onChange={(e) => onSelectChapter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-white border border-[#E7E0DA] text-xs sm:text-sm font-medium rounded-lg text-[#292421] focus:outline-none focus:border-[#873F55]"
              >
                {story.chapters.map((c) => (
                  <option key={c.id} value={c.id}>
                    Chapter {c.number}: {c.title} {c.publishedAt.includes('Today') ? '★ New Today' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Next Chapter */}
            {nextChapter ? (
              <button
                onClick={() => onSelectChapter(nextChapter.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#E7E0DA] bg-white text-xs sm:text-sm font-medium text-[#292421] hover:border-[#873F55] hover:text-[#873F55] transition-colors shadow-2xs"
              >
                <div className="text-right">
                  <span className="block text-[10px] text-[#948982]">Next</span>
                  <span>Ch. {nextChapter.number}: {nextChapter.title}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onBackToStory}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#873F55] text-white text-xs sm:text-sm font-semibold hover:bg-[#6F3044] transition-colors shadow-2xs"
              >
                <span>End of preview · Back to Story</span>
              </button>
            )}
          </div>

          {/* Quick back to story link */}
          <div className="text-center mt-8">
            <button
              onClick={onBackToStory}
              className="text-xs text-[#746B65] hover:text-[#292421] hover:underline font-medium"
            >
              ← Back to {story.title} overview & full series catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
