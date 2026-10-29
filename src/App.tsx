import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { SAMPLE_STORIES } from './data/sampleStories';
import { runDailyAutomationCheck } from './data/dailySchedule';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { HomeView } from './components/HomeView';
import { BrowseView } from './components/BrowseView';
import { StoryDetailView } from './components/StoryDetailView';
import { MembershipView } from './components/MembershipView';
import { AccountView } from './components/AccountView';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ChapterReaderView } from './components/ChapterReaderView';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<
    'home' | 'discover' | 'romance' | 'new-releases' | 'completed' | 'detail' | 'reader' | 'membership' | 'account'
  >('home');
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState('');
  const [isAdminActive, setIsAdminActive] = useState(false);

  // Synchronize state with URL hash so every story, chapter, and tab has its own URL
  const parseHash = () => {
    const rawHash = window.location.hash.replace(/^#\/?/, '');
    if (!rawHash) {
      setCurrentTab('home');
      setSelectedStoryId(null);
      setSelectedChapterId(null);
      setIsAdminActive(false);
      return;
    }

    if (rawHash === 'admin') {
      setIsAdminActive(true);
      return;
    } else {
      setIsAdminActive(false);
    }

    if (rawHash.startsWith('story/')) {
      const parts = rawHash.split('/');
      const sId = parts[1];
      const storyExists = SAMPLE_STORIES.find((s) => s.id === sId);
      if (storyExists) {
        setSelectedStoryId(sId);
        if (parts[2] === 'chapter' && parts[3]) {
          const chapExists = storyExists.chapters.find((c) => c.id === parts[3]);
          if (chapExists) {
            setSelectedChapterId(parts[3]);
            setCurrentTab('reader');
            return;
          }
        }
        setSelectedChapterId(null);
        setCurrentTab('detail');
        return;
      }
    }

    if (rawHash.startsWith('discover')) {
      setCurrentTab('discover');
      const queryIdx = rawHash.indexOf('?');
      if (queryIdx !== -1) {
        const params = new URLSearchParams(rawHash.slice(queryIdx));
        const mood = params.get('mood') || params.get('genre');
        if (mood) setMoodFilter(mood);
      }
      return;
    }

    if (rawHash === 'membership') {
      setCurrentTab('membership');
      return;
    }

    if (rawHash === 'account') {
      setCurrentTab('account');
      return;
    }

    setCurrentTab('home');
  };

  useEffect(() => {
    parseHash();
    const handleHashChange = () => parseHash();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Run automated daily chapter release engine check on app load
  useEffect(() => {
    runDailyAutomationCheck();
  }, []);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedStoryId, selectedChapterId, isAdminActive]);

  const handleSelectStory = (id: string) => {
    window.location.hash = `#/story/${id}`;
  };

  const handleReadChapter = (storyId: string, chapterId: string) => {
    window.location.hash = `#/story/${storyId}/chapter/${chapterId}`;
  };

  const handleNavigate = (tab: string, param?: string) => {
    if (tab === 'home') {
      window.location.hash = '#/';
    } else if (tab === 'romance' || tab === 'new-releases' || tab === 'completed' || tab === 'discover') {
      if (param) {
        window.location.hash = `#/discover?genre=${encodeURIComponent(param)}`;
      } else {
        window.location.hash = '#/discover';
      }
    } else if (tab === 'membership') {
      window.location.hash = '#/membership';
    } else if (tab === 'account') {
      window.location.hash = '#/account';
    } else {
      window.location.hash = `#/${tab}`;
    }
  };

  const selectedStory = SAMPLE_STORIES.find((s) => s.id === selectedStoryId) || SAMPLE_STORIES[0];
  const selectedChapter =
    selectedStory.chapters.find((c) => c.id === selectedChapterId) || selectedStory.chapters[0];

  if (isAdminActive) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <AdminDashboard onExit={() => { window.location.hash = '#/'; }} />
        <AuthModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col selection:bg-[#F4E8EC] selection:text-[#873F55]">
      {/* Top Header */}
      <SiteHeader
        currentTab={currentTab}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAdmin={() => setIsAdminActive(!isAdminActive)}
        isAdminActive={isAdminActive}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            stories={SAMPLE_STORIES}
            onSelectStory={handleSelectStory}
            onNavigateTab={handleNavigate}
            onNavigateMembership={() => setCurrentTab('membership')}
            onReadChapter={handleReadChapter}
          />
        )}

        {(currentTab === 'discover' ||
          currentTab === 'romance' ||
          currentTab === 'new-releases' ||
          currentTab === 'completed') && (
          <BrowseView
            key={currentTab}
            stories={SAMPLE_STORIES}
            onSelectStory={handleSelectStory}
            onReadChapter={handleReadChapter}
            initialQuery={searchQuery}
            initialMood={moodFilter}
            initialStatus={currentTab === 'completed' ? 'Completed' : 'All'}
          />
        )}

        {currentTab === 'detail' && selectedStory && (
          <StoryDetailView
            story={selectedStory}
            onBack={() => setCurrentTab('home')}
            onNavigateMembership={() => setCurrentTab('membership')}
            onReadChapter={(chapter) => handleReadChapter(selectedStory.id, chapter.id)}
          />
        )}

        {currentTab === 'reader' && selectedStory && selectedChapter && (
          <ChapterReaderView
            story={selectedStory}
            chapter={selectedChapter}
            onBackToStory={() => setCurrentTab('detail')}
            onSelectChapter={(chapId) => setSelectedChapterId(chapId)}
            onNavigateMembership={() => setCurrentTab('membership')}
          />
        )}

        {currentTab === 'membership' && (
          <MembershipView onExploreStories={() => setCurrentTab('discover')} />
        )}

        {currentTab === 'account' && (
          <AccountView
            onSelectStory={handleSelectStory}
            onNavigateMembership={() => setCurrentTab('membership')}
            onReadChapter={handleReadChapter}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <SiteFooter
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminActive(true)}
      />

      {/* Sign-in / Sign-up / Password Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <MainApp />
      </ToastProvider>
    </AuthProvider>
  );
}
