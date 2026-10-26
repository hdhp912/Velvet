import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AudioProvider, useAudio } from './context/AudioContext';
import { ToastProvider } from './context/ToastContext';
import { SAMPLE_STORIES } from './data/sampleStories';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { HomeView } from './components/HomeView';
import { BrowseView } from './components/BrowseView';
import { StoryDetailView } from './components/StoryDetailView';
import { MembershipView } from './components/MembershipView';
import { AccountView } from './components/AccountView';
import { AudioPlayer } from './components/AudioPlayer';
import { ListeningView } from './components/ListeningView';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ChapterReaderView } from './components/ChapterReaderView';

function MainApp() {
  const { isExpanded } = useAudio();

  const [currentTab, setCurrentTab] = useState<
    'home' | 'discover' | 'romance' | 'new-releases' | 'completed' | 'detail' | 'reader' | 'membership' | 'account'
  >('home');
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState('');
  const [isAdminActive, setIsAdminActive] = useState(false);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedStoryId, selectedChapterId, isAdminActive]);

  const handleSelectStory = (id: string) => {
    setSelectedStoryId(id);
    setSelectedChapterId(null);
    setCurrentTab('detail');
  };

  const handleReadChapter = (storyId: string, chapterId: string) => {
    setSelectedStoryId(storyId);
    setSelectedChapterId(chapterId);
    setCurrentTab('reader');
  };

  const handleNavigate = (tab: string, param?: string) => {
    if (tab === 'romance') {
      setCurrentTab('discover');
      setMoodFilter('');
    } else if (tab === 'new-releases') {
      setCurrentTab('discover');
      setMoodFilter('');
    } else if (tab === 'completed') {
      setCurrentTab('discover');
      setMoodFilter('');
    } else if (tab === 'discover') {
      setCurrentTab('discover');
      if (param) setMoodFilter(param);
    } else {
      setCurrentTab(tab as any);
      if (param) setMoodFilter(param);
    }

    if (tab !== 'detail' && tab !== 'reader') {
      setSelectedStoryId(null);
      setSelectedChapterId(null);
    }
  };

  const selectedStory = SAMPLE_STORIES.find((s) => s.id === selectedStoryId) || SAMPLE_STORIES[0];
  const selectedChapter =
    selectedStory.chapters.find((c) => c.id === selectedChapterId) || selectedStory.chapters[0];

  if (isAdminActive) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <AdminDashboard onExit={() => setIsAdminActive(false)} />
        <AudioPlayer />
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
            stories={SAMPLE_STORIES}
            onSelectStory={handleSelectStory}
            initialQuery={searchQuery}
            initialMood={moodFilter}
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

      {/* Persistent Audio Player (bottom bar) */}
      <AudioPlayer />

      {/* Distraction-Free Full-Screen Listening Modal */}
      {isExpanded && <ListeningView />}

      {/* Sign-in / Sign-up / Password Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <ToastProvider>
          <MainApp />
        </ToastProvider>
      </AudioProvider>
    </AuthProvider>
  );
}
