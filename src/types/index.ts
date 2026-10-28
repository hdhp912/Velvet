export type Genre = 
  | 'Contemporary'
  | 'Historical'
  | 'Billionaire'
  | 'Small Town'
  | 'Second Chance'
  | 'Enemies to Lovers'
  | 'Slow Burn'
  | 'Workplace'
  | 'Forbidden'
  | 'Friends to Lovers'
  | 'Mystery'
  | 'Romantic Suspense'
  | 'Gothic Romance';

export type StoryStatus = 'Ongoing' | 'Completed' | 'Ongoing Serial';

export interface Chapter {
  id: string;
  storyId: string;
  number: number;
  title: string;
  publishedAt: string; // ISO date or release note
  isPremium: boolean;
  wordCount: number;
  readingTimeMinutes?: number;
  synopsis?: string;
  proseExcerpt: string;
  durationSeconds?: number;
  audioUrl?: string;
}

export interface Narrator {
  id: string;
  name: string;
  accent: 'British' | 'American' | 'Irish' | 'Scottish';
  tone: string;
  gender: 'female' | 'male';
}

export interface Story {
  id: string;
  title: string;
  author: string;
  narrator?: Narrator;
  coverImage: string;
  synopsis: string;
  genre: Genre;
  tropes: string[];
  status: StoryStatus;
  totalPlannedChapters: number;
  publishedChaptersCount: number;
  totalWords?: number;
  totalReadingTimeMinutes?: number;
  totalDurationSeconds?: number;
  isFeatured?: boolean;
  releasedAt: string;
  updatedAt: string;
  chapters: Chapter[];
}

export interface UserReadingProgress {
  storyId: string;
  chapterId: string;
  chapterNumber: number;
  progressPercentage?: number;
  lastReadAt?: string;
  progressSeconds?: number;
  totalSeconds?: number;
  lastListenedAt?: string;
}

// Backward compatibility alias
export type UserListeningProgress = UserReadingProgress;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  membershipPlan?: 'free' | 'monthly' | 'annual';
  memberSince?: string;
  listeningHistory: UserReadingProgress[];
  readingHistory?: UserReadingProgress[];
  favorites: string[]; // storyIds
}

export interface DailyScheduleItem {
  id: string;
  storyId: string;
  storyTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  date: string;
  wordCount: number;
  status: 'released' | 'queued';
  isPremium: boolean;
  estimatedReadMinutes: number;
  releaseDate?: string;
  isReleased?: boolean;
  autoScheduledTime?: string;
  summary?: string;
}

export interface AdminJob {
  id: string;
  storyId: string;
  storyTitle: string;
  chapterNumber: number;
  type: 'text_generation' | 'content_expansion' | 'validation' | 'publishing' | 'tts_narration';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  startedAt: string;
  progress: number;
  error?: string;
}
