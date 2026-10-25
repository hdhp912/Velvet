import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    openAuthModal,
    signIn,
  } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }

    if (authModalMode === 'reset') {
      setResetSent(true);
      showToast(`Password reset link sent to ${email}`, 'info');
      return;
    }

    if (authModalMode === 'signup' && !name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    signIn(email);
    showToast(`Welcome back to Velvet Stories, ${name || email.split('@')[0]}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-[#E7E0DA] rounded-[16px] w-full max-w-md p-6 sm:p-8 shadow-[0_20px_60px_rgba(41,36,33,0.14)] relative">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-1.5 text-[#948982] hover:text-[#292421] rounded-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#292421]">
            {authModalMode === 'signin' && 'Sign in to Velvet Stories'}
            {authModalMode === 'signup' && 'Create your listener account'}
            {authModalMode === 'reset' && 'Reset your password'}
          </h2>
          <p className="text-xs sm:text-sm text-[#746B65] mt-1.5">
            {authModalMode === 'signin' && 'Pick up right where your last chapter ended.'}
            {authModalMode === 'signup' && 'Save bookmarks, track chapter progress, and explore free previews.'}
            {authModalMode === 'reset' && 'Enter your account email to receive a password reset link.'}
          </p>
        </div>

        {/* Form Body */}
        {resetSent ? (
          <div className="p-4 bg-[#F2EEEA] rounded-[10px] text-center space-y-3">
            <CheckCircle className="w-8 h-8 text-[#39745A] mx-auto" />
            <p className="text-sm font-medium text-[#292421]">Reset Instructions Sent</p>
            <p className="text-xs text-[#746B65]">
              Check your inbox at <strong>{email}</strong> for instructions to reset your password.
            </p>
            <button
              onClick={() => {
                setResetSent(false);
                openAuthModal('signin');
              }}
              className="text-xs text-[#873F55] font-semibold hover:underline pt-2 block mx-auto"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-[#F4E8EC] border border-[#D6CCC4] rounded-lg text-xs text-[#B54747] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {authModalMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#292421] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Camilla Vance"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E7E0DA] rounded-[8px] text-sm text-[#292421] focus:outline-hidden focus:border-[#873F55] focus:ring-1 focus:ring-[#873F55] transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#292421] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E7E0DA] rounded-[8px] text-sm text-[#292421] focus:outline-hidden focus:border-[#873F55] focus:ring-1 focus:ring-[#873F55] transition-all"
              />
            </div>

            {authModalMode !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#292421]">
                    Password
                  </label>
                  {authModalMode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => openAuthModal('reset')}
                      className="text-xs text-[#873F55] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E7E0DA] rounded-[8px] text-sm text-[#292421] focus:outline-hidden focus:border-[#873F55] focus:ring-1 focus:ring-[#873F55] transition-all"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 bg-[#873F55] text-white text-xs sm:text-sm font-semibold rounded-[8px] hover:bg-[#6F3044] transition-colors shadow-xs"
            >
              {authModalMode === 'signin' && 'Sign in'}
              {authModalMode === 'signup' && 'Create account'}
              {authModalMode === 'reset' && 'Send reset link'}
            </button>
          </form>
        )}

        {/* Footer switch between modes */}
        <div className="mt-6 pt-5 border-t border-[#F2EEEA] text-center text-xs text-[#746B65]">
          {authModalMode === 'signin' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                onClick={() => openAuthModal('signup')}
                className="text-[#873F55] font-semibold hover:underline"
              >
                Sign up free
              </button>
            </p>
          ) : authModalMode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => openAuthModal('signin')}
                className="text-[#873F55] font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Remember your password?{' '}
              <button
                onClick={() => openAuthModal('signin')}
                className="text-[#873F55] font-semibold hover:underline"
              >
                Back to sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
