import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, MembershipPlanId, AgeGroup } from '../types';
import { MEMBERSHIP_PLANS } from '../data/dailyPlanData';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isPremium: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup' | 'profile';
  openAuthModal: (mode?: 'signin' | 'signup' | 'profile') => void;
  closeAuthModal: () => void;
  signIn: (email: string, name?: string, phone?: string) => void;
  signOut: () => void;
  updateChildInfo: (childName: string, childAge: AgeGroup) => void;
  toggleFavoriteActivity: (activityId: string) => void;
  toggleCompletedActivity: (activityId: string) => void;
  toggleFavoriteColoring: (coloringId: string) => void;
  requestSubscription: (planId: MembershipPlanId, refCode?: string) => void;
  activateSubscriptionForTest: (planId: MembershipPlanId) => void;
  resetSubscriptionToFree: () => void;
  toggleFavorite: (id: string) => void;
  togglePremiumMembership: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-demo-1',
  name: 'Mẹ Thu Hà',
  email: 'thuha.nguyen@gmail.com',
  phoneNumber: '0988123456',
  childName: 'Bé Bông',
  childAge: '3-4',
  isPremium: false,
  subscription: {
    planId: 'free',
    planName: 'Gói Miễn Phí',
    status: 'free',
  },
  memberSince: '10/2026',
  savedActivities: ['act-01', 'act-03'],
  completedActivities: ['act-02'],
  savedColoringPages: ['color-01', 'color-02'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ccmn_user_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved user:', e);
    }
    return DEFAULT_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'profile'>('signin');

  const saveUser = (u: UserProfile | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('ccmn_user_session', JSON.stringify(u));
    } else {
      localStorage.removeItem('ccmn_user_session');
    }
  };

  const openAuthModal = (mode: 'signin' | 'signup' | 'profile' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signIn = (email: string, name?: string, phone?: string) => {
    const displayName = name || email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    const existing = user;
    const updated: UserProfile = {
      id: existing?.id || `user-${Date.now()}`,
      name: formattedName || 'Phụ huynh Cùng Con',
      email,
      phoneNumber: phone || existing?.phoneNumber || '0988123456',
      childName: existing?.childName || 'Bé Cưng',
      childAge: existing?.childAge || '3-4',
      isPremium: existing?.isPremium || false,
      subscription: existing?.subscription || {
        planId: 'free',
        planName: 'Gói Miễn Phí',
        status: 'free'
      },
      memberSince: existing?.memberSince || new Date().toLocaleDateString('vi-VN'),
      savedActivities: existing?.savedActivities || ['act-01'],
      completedActivities: existing?.completedActivities || [],
      savedColoringPages: existing?.savedColoringPages || ['color-01']
    };
    saveUser(updated);
    closeAuthModal();
  };

  const signOut = () => {
    saveUser(null);
  };

  const updateChildInfo = (childName: string, childAge: AgeGroup) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      childName,
      childAge
    };
    saveUser(updated);
  };

  const toggleFavoriteActivity = (activityId: string) => {
    if (!user) {
      openAuthModal('signin');
      return;
    }
    const current = user.savedActivities || [];
    const exists = current.includes(activityId);
    const updated: UserProfile = {
      ...user,
      savedActivities: exists ? current.filter((id) => id !== activityId) : [...current, activityId]
    };
    saveUser(updated);
  };

  const toggleCompletedActivity = (activityId: string) => {
    if (!user) {
      openAuthModal('signin');
      return;
    }
    const current = user.completedActivities || [];
    const exists = current.includes(activityId);
    const updated: UserProfile = {
      ...user,
      completedActivities: exists ? current.filter((id) => id !== activityId) : [...current, activityId]
    };
    saveUser(updated);
  };

  const toggleFavoriteColoring = (coloringId: string) => {
    if (!user) {
      openAuthModal('signin');
      return;
    }
    const current = user.savedColoringPages || [];
    const exists = current.includes(coloringId);
    const updated: UserProfile = {
      ...user,
      savedColoringPages: exists ? current.filter((id) => id !== coloringId) : [...current, coloringId]
    };
    saveUser(updated);
  };

  const requestSubscription = (planId: MembershipPlanId, refCode?: string) => {
    if (!user) {
      openAuthModal('signin');
      return;
    }
    const targetPlan = MEMBERSHIP_PLANS.find(p => p.id === planId) || MEMBERSHIP_PLANS[1];
    const updated: UserProfile = {
      ...user,
      subscription: {
        planId: targetPlan.id,
        planName: targetPlan.name,
        status: 'pending_approval',
        startedAt: new Date().toISOString(),
        paymentRef: refCode || `CCMN-${user.phoneNumber || '985726'}`
      }
    };
    saveUser(updated);
  };

  const activateSubscriptionForTest = (planId: MembershipPlanId) => {
    if (!user) return;
    const targetPlan = MEMBERSHIP_PLANS.find(p => p.id === planId) || MEMBERSHIP_PLANS[1];
    const now = new Date();
    const expiresDate = new Date(now.getTime() + targetPlan.durationDays * 24 * 60 * 60 * 1000);

    const updated: UserProfile = {
      ...user,
      isPremium: true,
      subscription: {
        planId: targetPlan.id,
        planName: targetPlan.name,
        status: 'active',
        startedAt: now.toLocaleDateString('vi-VN'),
        expiresAt: expiresDate.toLocaleDateString('vi-VN'),
        daysRemaining: targetPlan.durationDays,
        paymentRef: `TEST-${Math.floor(100000 + Math.random() * 900000)}`
      }
    };
    saveUser(updated);
  };

  const resetSubscriptionToFree = () => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      isPremium: false,
      subscription: {
        planId: 'free',
        planName: 'Gói Miễn Phí',
        status: 'free'
      }
    };
    saveUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isPremium: !!user?.isPremium,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signIn,
        signOut,
        updateChildInfo,
        toggleFavoriteActivity,
        toggleCompletedActivity,
        toggleFavoriteColoring,
        requestSubscription,
        activateSubscriptionForTest,
        resetSubscriptionToFree,
        toggleFavorite: toggleFavoriteActivity,
        togglePremiumMembership: () => (user?.isPremium ? resetSubscriptionToFree() : activateSubscriptionForTest('monthly'))
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
