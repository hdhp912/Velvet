import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup' | 'reset';
  openAuthModal: (mode?: 'signin' | 'signup' | 'reset') => void;
  closeAuthModal: () => void;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  upgradeToPremium: (plan: 'monthly' | 'annual') => void;
  togglePremiumMembership: () => void;
  toggleFavorite: (storyId: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-dino-1',
  name: 'Camilla Hayes',
  email: 'camilla.hayes@mysteriesunveiled.com',
  isPremium: false,
  membershipPlan: 'free',
  memberSince: 'October 2026',
  listeningHistory: [
    {
      storyId: 'story-summer-stayed',
      chapterId: 'chap-ss-1',
      chapterNumber: 1,
      progressPercentage: 18,
      lastReadAt: '2026-10-25T09:15:00Z',
      progressSeconds: 142,
      totalSeconds: 780,
    },
  ],
  favorites: ['story-summer-stayed', 'story-contract-winter'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('dino_user_session');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return DEFAULT_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'reset'>('signin');

  useEffect(() => {
    if (user) {
      localStorage.setItem('dino_user_session', JSON.stringify(user));
    }
  }, [user]);

  const openAuthModal = (mode: 'signin' | 'signup' | 'reset' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signIn = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      isPremium: false,
      membershipPlan: 'free',
      memberSince: 'October 2026',
      listeningHistory: [],
      favorites: [],
    };
    setUser(newUser);
    closeAuthModal();
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('dino_user_session');
  };

  const upgradeToPremium = (plan: 'monthly' | 'annual') => {
    if (!user) return;
    setUser({
      ...user,
      isPremium: true,
      membershipPlan: plan,
    });
  };

  const togglePremiumMembership = () => {
    if (!user) return;
    setUser({
      ...user,
      isPremium: !user.isPremium,
      membershipPlan: !user.isPremium ? 'monthly' : 'free',
    });
  };

  const toggleFavorite = (storyId: string) => {
    if (!user) return;
    const exists = user.favorites.includes(storyId);
    const newFavorites = exists
      ? user.favorites.filter((id) => id !== storyId)
      : [...user.favorites, storyId];
    setUser({
      ...user,
      favorites: newFavorites,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signIn,
        signOut,
        upgradeToPremium,
        togglePremiumMembership,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
