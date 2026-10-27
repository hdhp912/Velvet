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

export type StoryStatus = 'Ongoing' | 'Completed';

export interface Chapter {
  id: string;
  storyId: string;
  number: number;
  title: string;
  durationSeconds: number; // e.g. 780 for 13 mins
  publishedAt: string; // ISO date
  isPremium: boolean;
  wordCount: number;
  synopsis?: string;
  proseExcerpt: string;
  audioUrl?: string; // fallback synthetic voice or audio stream
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
  narrator: Narrator;
  coverImage: string;
  synopsis: string;
  genre: Genre;
  tropes: string[];
  status: StoryStatus;
  totalPlannedChapters: number;
  publishedChaptersCount: number;
  totalDurationSeconds: number;
  isFeatured?: boolean;
  releasedAt: string;
  updatedAt: string;
  chapters: Chapter[];
}

export interface UserListeningProgress {
  storyId: string;
  chapterId: string;
  chapterNumber: number;
  progressSeconds: number;
  totalSeconds: number;
  lastListenedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  membershipPlan?: 'free' | 'monthly' | 'annual';
  memberSince?: string;
  listeningHistory: UserListeningProgress[];
  favorites: string[]; // storyIds
}

export interface AdminJob {
  id: string;
  storyId: string;
  storyTitle: string;
  chapterNumber: number;
  type: 'text_generation' | 'tts_narration' | 'validation' | 'publishing';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  startedAt: string;
  progress: number;
  error?: string;
}
