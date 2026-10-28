import React from 'react';
import {
  User,
  Sparkles,
  Heart,
  Clock,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_STORIES } from '../data/sampleStories';
import { useToast } from '../context/ToastContext';

interface AccountViewProps {
  onSelectStory: (id: string) => void;
  onNavigateMembership: () => void;
  onReadChapter?: (storyId: string, chapterId: string) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  onSelectStory,
  onNavigateMembership,
  onReadChapter,
}) => {
  const { user, signOut, togglePremiumMembership } = useAuth();
  const { showToast } = useToast();

  if (!user) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-16 text-center">
        <h2 className="font-editorial text-2xl text-[#292421] mb-2">Reader Account</h2>
        <p className="text-sm text-[#746B65] mb-6">Please sign in to view your profile and reading progress.</p>
      </div>
    );
  }

  const favoriteStories = SAMPLE_STORIES.filter((s) => user.favorites.includes(s.id));

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-8 py-8 md:py-12">
      {/* Account Overview Header */}
      <div className="bg-white border border-[#E7E0DA] rounded-[16px] p-6 sm:p-8 mb-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#F2EEEA]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#F4E8EC] text-[#873F55] flex items-center justify-center font-editorial text-2xl border border-[#E7E0DA]">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-editorial text-2xl sm:text-3xl text-[#292421]">
                {user.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#746B65]">{user.email}</p>
              <p className="text-[11px] text-[#948982] mt-0.5">
                Member since {user.memberSince || 'October 2026'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Testing Toggle for Reviewers */}
            <button
              onClick={() => {
                togglePremiumMembership();
                showToast(
                  user.isPremium ? 'Switched to Free Tier' : 'Switched to Premium VIP Tier',
                  'info'
                );
              }}
              className="px-3.5 py-2 text-xs font-medium text-[#746B65] bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg hover:text-[#292421] transition-colors"
              title="Toggle tier between Free and Premium for quick testing"
            >
              Toggle Demo Status: {user.isPremium ? 'Make Free' : 'Make Premium'}
            </button>

            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#B54747] hover:bg-[#F4E8EC] rounded-lg transition-colors border border-transparent"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>

        {/* Membership Status Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                user.isPremium ? 'bg-[#F4E8EC] text-[#873F55]' : 'bg-[#F2EEEA] text-[#746B65]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#292421]">
                  {user.isPremium ? 'Mysteries Unveiled by Dino Premium VIP' : 'Free Reader Account'}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-[4px] uppercase tracking-wider ${
                    user.isPremium ? 'bg-[#873F55] text-white' : 'bg-[#E7E0DA] text-[#746B65]'
                  }`}
                >
                  {user.isPremium ? 'VIP Active' : 'Basic Free'}
                </span>
              </div>
              <p className="text-xs text-[#746B65] mt-0.5">
                {user.isPremium
                  ? 'Unlimited access to all serialized sagas, long-form chapters (>1,500 words), and daily automated releases.'
                  : 'Includes 20 complete 100% free sagas and chapters 1–10 free on serialized romance. Upgrade to unlock chapters 11+.'}
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateMembership}
            className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              user.isPremium
                ? 'bg-[#FAF8F5] text-[#292421] border border-[#E7E0DA] hover:bg-[#F2EEEA]'
                : 'bg-[#873F55] text-white hover:bg-[#6F3044]'
            }`}
          >
            {user.isPremium ? 'Manage Membership' : 'Upgrade to VIP'}
          </button>
        </div>
      </div>

      {/* Reading Progress & Saved Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Saved Library */}
        <div className="bg-white border border-[#E7E0DA] rounded-[16px] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-editorial text-xl text-[#292421] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#873F55]" />
              <span>Saved in Library</span>
            </h3>
            <span className="text-xs text-[#948982]">{favoriteStories.length} titles</span>
          </div>

          {favoriteStories.length > 0 ? (
            <div className="divide-y divide-[#F2EEEA]">
              {favoriteStories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => onSelectStory(story.id)}
                  className="py-3 flex items-center justify-between gap-3 cursor-pointer group hover:bg-[#FAF8F5] -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/cover_summer_stayed.jpg';
                      }}
                      className="w-10 h-13 object-cover rounded-[4px] shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-editorial text-sm text-[#292421] truncate group-hover:text-[#873F55]">
                        {story.title}
                      </h4>
                      <p className="text-xs text-[#746B65] truncate">{story.genre} · {story.status}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onReadChapter && story.chapters[0]) {
                        onReadChapter(story.id, story.chapters[0].id);
                      } else {
                        onSelectStory(story.id);
                      }
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-[#FAF8F5] group-hover:bg-[#873F55] group-hover:text-white text-[#746B65] shrink-0 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#948982] py-6 text-center">No saved titles yet.</p>
          )}
        </div>

        {/* Active Reading Progress */}
        <div className="bg-white border border-[#E7E0DA] rounded-[16px] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-editorial text-xl text-[#292421] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#873F55]" />
              <span>Recent Reading Bookmarks</span>
            </h3>
            <span className="text-xs text-[#948982]">Resumes chapter text</span>
          </div>

          <div className="divide-y divide-[#F2EEEA]">
            {user.listeningHistory.map((item) => {
              const story = SAMPLE_STORIES.find((s) => s.id === item.storyId);
              if (!story) return null;

              const chapter = story.chapters.find((c) => c.id === item.chapterId) || story.chapters[0];

              return (
                <div key={item.chapterId} className="py-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4
                      onClick={() => onSelectStory(story.id)}
                      className="font-editorial text-sm text-[#292421] hover:text-[#873F55] cursor-pointer truncate"
                    >
                      {story.title}
                    </h4>
                    <span className="text-[11px] text-[#39745A] font-medium bg-[#EAF5EF] px-1.5 py-0.5 rounded">
                      ✓ {chapter?.wordCount || 1940} words
                    </span>
                  </div>
                  <p className="text-xs text-[#746B65] mb-2">
                    Chapter {item.chapterNumber}: {chapter?.title || 'Chapter ' + item.chapterNumber}
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => onReadChapter?.(story.id, item.chapterId)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#873F55] hover:text-[#6F3044]"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Resume Chapter {item.chapterNumber}</span>
                    </button>

                    <button
                      onClick={() => onSelectStory(story.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#746B65] hover:text-[#292421]"
                    >
                      <span>Story Index</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
