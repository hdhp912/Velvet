import React from 'react';
import {
  User,
  Sparkles,
  Heart,
  Clock,
  Play,
  LogOut,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { SAMPLE_STORIES } from '../data/sampleStories';
import { useToast } from '../context/ToastContext';

interface AccountViewProps {
  onSelectStory: (id: string) => void;
  onNavigateMembership: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const AccountView: React.FC<AccountViewProps> = ({
  onSelectStory,
  onNavigateMembership,
}) => {
  const { user, signOut, togglePremiumMembership } = useAuth();
  const { continueListening } = useAudio();
  const { showToast } = useToast();

  if (!user) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-16 text-center">
        <h2 className="font-editorial text-2xl text-[#292421] mb-2">Listener Account</h2>
        <p className="text-sm text-[#746B65] mb-6">Please sign in to view your profile and listening history.</p>
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
                  user.isPremium ? 'Switched to Free Tier' : 'Switched to Premium Member Tier',
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
                  {user.isPremium ? 'Velvet Stories Premium' : 'Free Listener Account'}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-[4px] uppercase tracking-wider ${
                    user.isPremium ? 'bg-[#873F55] text-white' : 'bg-[#E7E0DA] text-[#746B65]'
                  }`}
                >
                  {user.isPremium ? 'Active' : 'Basic'}
                </span>
              </div>
              <p className="text-xs text-[#746B65] mt-0.5">
                {user.isPremium
                  ? 'Unlimited access to all serialized sagas, narrator recordings, and daily releases.'
                  : 'Includes free preview chapters. Upgrade to unlock full series.'}
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
            {user.isPremium ? 'Manage Subscription' : 'Upgrade to Premium'}
          </button>
        </div>
      </div>

      {/* Listening History & Saved Stories Tabs */}
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
                      continueListening(story.id);
                    }}
                    className="w-8 h-8 rounded-full bg-[#FAF8F5] group-hover:bg-[#873F55] group-hover:text-white flex items-center justify-center text-[#746B65] shrink-0 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#948982] py-6 text-center">No saved titles yet.</p>
          )}
        </div>

        {/* Active Listening Progress */}
        <div className="bg-white border border-[#E7E0DA] rounded-[16px] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-editorial text-xl text-[#292421] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#873F55]" />
              <span>Recent Listening</span>
            </h3>
            <span className="text-xs text-[#948982]">Resumes automatically</span>
          </div>

          <div className="divide-y divide-[#F2EEEA]">
            {user.listeningHistory.map((item) => {
              const story = SAMPLE_STORIES.find((s) => s.id === item.storyId);
              if (!story) return null;

              const progress = Math.round((item.progressSeconds / item.totalSeconds) * 100);

              return (
                <div key={item.chapterId} className="py-3.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4
                      onClick={() => onSelectStory(story.id)}
                      className="font-editorial text-sm text-[#292421] hover:text-[#873F55] cursor-pointer truncate"
                    >
                      {story.title}
                    </h4>
                    <span className="text-[11px] text-[#948982] tabular-nums">
                      {formatTime(item.progressSeconds)} / {formatTime(item.totalSeconds)}
                    </span>
                  </div>
                  <p className="text-xs text-[#746B65] mb-2">Chapter {item.chapterNumber}</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-[#E7E0DA] rounded-full overflow-hidden mb-2.5">
                    <div className="h-full bg-[#873F55]" style={{ width: `${progress}%` }} />
                  </div>

                  <button
                    onClick={() => continueListening(story.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#873F55] hover:text-[#6F3044]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Resume Chapter</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
