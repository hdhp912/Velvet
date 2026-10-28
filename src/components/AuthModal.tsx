import React, { useState } from 'react';
import { X, BookOpen, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>(authModalMode);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    signIn(email, name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292421]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-[16px] border border-[#E7E0DA] w-full max-w-[420px] p-6 sm:p-8 shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 text-[#948982] hover:text-[#292421] rounded-lg hover:bg-[#F2EEEA] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-full bg-[#F4E8EC] text-[#873F55] flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="font-editorial text-2xl text-[#292421]">
            {mode === 'signin' && 'Welcome back'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'reset' && 'Reset your password'}
          </h2>
          <p className="text-xs text-[#746B65] mt-1">
            {mode === 'signin' && 'Sign in to access your reading bookmarks & library'}
            {mode === 'signup' && 'Join Mysteries Unveiled by Dino for complete reading access'}
            {mode === 'reset' && 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-[#292421] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Camilla Hayes"
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg text-sm text-[#292421] focus:outline-hidden focus:border-[#873F55]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#292421] mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg text-sm text-[#292421] focus:outline-hidden focus:border-[#873F55]"
            />
          </div>

          {mode !== 'reset' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#292421]">Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setMode('reset')}
                    className="text-[11px] text-[#873F55] hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E7E0DA] rounded-lg text-sm text-[#292421] focus:outline-hidden focus:border-[#873F55]"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-[#873F55] hover:bg-[#6F3044] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors shadow-2xs mt-2"
          >
            {mode === 'signin' && 'Sign In'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'reset' && 'Send Reset Link'}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-6 pt-4 border-t border-[#F2EEEA] text-center text-xs text-[#746B65]">
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#873F55] font-semibold hover:underline"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-[#873F55] font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
