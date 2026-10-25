import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup' | 'reset';
  openAuthModal: (mode?: 'signin' | 'signup' | 'reset') => void;
  closeAuthModal: () => void;
  signIn: (email: string) => void;
  signOut: () => void;
  togglePremiumMembership: () => void;
  upgradeToPremium: (plan?: 'monthly' | 'annual') => void;
  toggleFavorite: (storyId: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-velvet-1',
  name: 'Camilla Hayes',
  email: 'camilla.hayes@velvetstories.com',
  isPremium: false,
  membershipPlan: 'free',
  memberSince: 'October 2026',
  listeningHistory: [
    {
      storyId: 'story-summer-stayed',
      chapterId: 'chap-ss-1',
      chapterNumber: 1,
      progressSeconds: 142,
      totalSeconds: 780,
      lastListenedAt: '2026-10-25T09:15:00Z',
    },
  ],
  favorites: ['story-summer-stayed', 'story-contract-winter'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'reset'>('signin');

  useEffect(() => {
    const saved = localStorage.getItem('velvet_user_session');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('velvet_user_session', JSON.stringify(u));
    } else {
      localStorage.removeItem('velvet_user_session');
    }
  };

  const openAuthModal = (mode: 'signin' | 'signup' | 'reset' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signIn = (email: string) => {
    const name = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: formattedName || 'Camilla Hayes',
      email,
      isPremium: false,
      membershipPlan: 'free',
      memberSince: 'October 2026',
      listeningHistory: [],
      favorites: ['story-summer-stayed'],
    };
    saveUser(newUser);
    closeAuthModal();
  };

  const signOut = () => {
    saveUser(null);
  };

  const togglePremiumMembership = () => {
    if (!user) return;
    const nextStatus = !user.isPremium;
    const updated: UserProfile = {
      ...user,
      isPremium: nextStatus,
      membershipPlan: nextStatus ? 'monthly' : 'free',
    };
    saveUser(updated);
  };

  const upgradeToPremium = (plan: 'monthly' | 'annual' = 'monthly') => {
    if (!user) {
      signIn('listener@velvetstories.com');
      return;
    }
    const updated: UserProfile = {
      ...user,
      isPremium: true,
      membershipPlan: plan,
    };
    saveUser(updated);
  };

  const toggleFavorite = (storyId: string) => {
    if (!user) {
      openAuthModal('signin');
      return;
    }
    const exists = user.favorites.includes(storyId);
    const updated: UserProfile = {
      ...user,
      favorites: exists ? user.favorites.filter((id) => id !== storyId) : [...user.favorites, storyId],
    };
    saveUser(updated);
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
        togglePremiumMembership,
        upgradeToPremium,
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
