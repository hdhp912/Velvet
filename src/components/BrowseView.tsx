import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Story } from '../types';
import { StoryCard } from './StoryCard';

interface BrowseViewProps {
  stories: Story[];
  onSelectStory: (id: string) => void;
  onReadChapter?: (storyId: string, chapterId: string) => void;
  initialQuery?: string;
  initialMood?: string;
  initialStatus?: 'All' | 'Ongoing Serial' | 'Completed' | 'Ongoing';
}

export const BrowseView: React.FC<BrowseViewProps> = ({
  stories,
  onSelectStory,
  onReadChapter,
  initialQuery = '',
  initialMood = '',
  initialStatus = 'All',
}) => {
  const [search, setSearch] = useState(initialQuery);
  const [selectedMood, setSelectedMood] = useState(initialMood);
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);
  const [selectedAccess, setSelectedAccess] = useState<'All' | 'Free' | 'Premium'>('All');
  const [sortBy, setSortBy] = useState<'updated' | 'chapters' | 'title'>('updated');

  const moods = [
    'All',
    'Mystery',
    'Romantic Suspense',
    'Gothic Romance',
    'Slow Burn',
    'Second Chance',
    'Enemies to Lovers',
    'Billionaire Romance',
    'Small Town Romance',
    'Friends to Lovers',
    'Workplace Romance',
  ];

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      // Search text match
      const query = search.toLowerCase().trim();
      if (query) {
        const matchesTitle = story.title.toLowerCase().includes(query);
        const matchesAuthor = story.author.toLowerCase().includes(query);
        const matchesSynopsis = story.synopsis.toLowerCase().includes(query);
        const matchesTrope = story.tropes.some((t) => t.toLowerCase().includes(query));
        const matchesGenre = story.genre.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesSynopsis && !matchesTrope && !matchesGenre) {
          return false;
        }
      }

      // Mood / Trope filter
      if (selectedMood && selectedMood !== 'All') {
        const hasTrope = story.tropes.some(
          (t) => t.toLowerCase() === selectedMood.toLowerCase()
        ) || story.genre.toLowerCase() === selectedMood.toLowerCase();
        if (!hasTrope) return false;
      }

      // Status filter
      if (selectedStatus !== 'All') {
        if (selectedStatus === 'Completed' && story.status !== 'Completed') return false;
        if (
          (selectedStatus === 'Ongoing' || selectedStatus === 'Ongoing Serial') &&
          story.status !== 'Ongoing Serial'
        ) {
          return false;
        }
      }

      // Access filter (has free chapters or strictly premium)
      if (selectedAccess === 'Free') {
        const hasFree = story.status === 'Completed' || story.chapters.some((c) => !c.isPremium);
        if (!hasFree) return false;
      } else if (selectedAccess === 'Premium') {
        const hasPremium = story.chapters.some((c) => c.isPremium);
        if (!hasPremium) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'updated') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (sortBy === 'chapters') {
        return b.publishedChaptersCount - a.publishedChaptersCount;
      }
      return a.title.localeCompare(b.title);
    });
  }, [stories, search, selectedMood, selectedStatus, selectedAccess, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedMood('All');
    setSelectedStatus('All');
    setSelectedAccess('All');
    setSortBy('updated');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#292421] mb-2">
          Discover Stories &amp; Sagas
        </h1>
        <p className="text-sm text-[#746B65]">
          Explore 20 complete 100% free sagas, serialized romances, and newly published chapters (&gt;1,500 words per chapter).
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E7E0DA] rounded-[12px] p-4 sm:p-5 mb-8 shadow-xs">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#948982] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, author, trope, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg text-sm text-[#292421] placeholder:text-[#948982] focus:outline-hidden focus:border-[#873F55] transition-colors"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#746B65] font-medium">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg px-2.5 py-2 text-xs font-medium text-[#292421] focus:outline-hidden"
              >
                <option value="All">All statuses</option>
                <option value="Completed">Completed (20 Free Sagas)</option>
                <option value="Ongoing Serial">Ongoing Serials (Ch 1–10 Free)</option>
              </select>
            </div>

            {/* Access Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#746B65] font-medium">Tier:</span>
              <select
                value={selectedAccess}
                onChange={(e) => setSelectedAccess(e.target.value as any)}
                className="bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg px-2.5 py-2 text-xs font-medium text-[#292421] focus:outline-hidden"
              >
                <option value="All">All chapters</option>
                <option value="Free">100% Free / Includes Free</option>
                <option value="Premium">VIP / Premium</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#746B65] font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg px-2.5 py-2 text-xs font-medium text-[#292421] focus:outline-hidden"
              >
                <option value="updated">Recently Updated</option>
                <option value="chapters">Most Chapters</option>
                <option value="title">Alphabetical (A-Z)</option>
              </select>
            </div>

            {(search || selectedMood !== 'All' || selectedStatus !== 'All' || selectedAccess !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-[#873F55] hover:text-[#6F3044] font-medium px-2 py-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Mood / Trope Tag Bar */}
        <div className="mt-4 pt-4 border-t border-[#F2EEEA] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-[#948982] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Mood:
          </span>
          {moods.map((mood) => {
            const isSelected = (selectedMood || 'All') === mood;
            return (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood === 'All' ? '' : mood)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#873F55] text-white'
                    : 'bg-[#FAF8F5] text-[#746B65] hover:text-[#292421] border border-[#E7E0DA]'
                }`}
              >
                {mood}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6 text-xs text-[#746B65]">
        <span>
          Showing <strong className="text-[#292421] font-semibold">{filteredStories.length}</strong>{' '}
          {filteredStories.length === 1 ? 'story' : 'stories'}
        </span>
      </div>

      {/* Story Grid */}
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} onSelect={onSelectStory} onReadChapter={onReadChapter} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white border border-[#E7E0DA] rounded-[16px]">
          <p className="font-editorial text-xl text-[#292421] mb-2">No matching stories found</p>
          <p className="text-sm text-[#746B65] max-w-md mx-auto mb-5">
            We couldn't find any stories matching your current search or filter criteria. Try resetting your filters to explore the full library of 24 stories.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#873F55] text-white text-xs font-medium rounded-lg hover:bg-[#6F3044] transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
