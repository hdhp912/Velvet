import React, { useState } from 'react';
import { Search, User, Menu, X, Shield, Sparkles } from 'lucide-react';
import { BrandWordmark } from './BrandWordmark';
import { useAuth } from '../context/AuthContext';

interface SiteHeaderProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAdmin: () => void;
  isAdminActive: boolean;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentTab,
  onNavigate,
  searchQuery,
  onSearchChange,
  onOpenAdmin,
  isAdminActive,
}) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'discover', label: 'Discover' },
    { id: 'romance', label: 'Romance' },
    { id: 'new-releases', label: 'New Releases' },
    { id: 'completed', label: 'Completed Stories' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5] border-b border-[#E7E0DA] transition-colors">
      <div className="max-w-[1200px] mx-auto h-[76px] px-4 sm:px-8 flex items-center justify-between gap-6">
        {/* Left: Brand Wordmark */}
        <div className="flex items-center gap-8">
          <BrandWordmark onClick={() => onNavigate('home')} />

          {/* Center Navigation Links (Single-Line, 4-5 links) */}
          {!isAdminActive && (
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#746B65]">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`whitespace-nowrap transition-colors duration-150 py-1 border-b-2 ${
                      isActive
                        ? 'text-[#292421] border-[#873F55] font-semibold'
                        : 'border-transparent hover:text-[#292421] hover:border-[#D6CCC4]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right Zone: Search, Admin Toggle, Auth & Premium CTA */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Studio / Admin Switcher for Platform Owner */}
          <button
            onClick={onOpenAdmin}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              isAdminActive
                ? 'bg-[#873F55] text-white border-[#873F55]'
                : 'text-[#746B65] bg-[#FFFFFF] border-[#E7E0DA] hover:text-[#292421] hover:border-[#D6CCC4]'
            }`}
            title="Toggle Creator Studio / Admin Dashboard"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{isAdminActive ? 'Exit Studio' : 'Creator Studio'}</span>
          </button>

          {/* Search Box / Toggle */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-white border border-[#D6CCC4] rounded-lg px-2.5 py-1.5 w-48 sm:w-60 shadow-xs">
                <Search className="w-4 h-4 text-[#948982] shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search stories, tropes..."
                  value={searchQuery}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    if (currentTab !== 'discover') onNavigate('discover');
                  }}
                  autoFocus
                  className="w-full text-xs sm:text-sm bg-transparent border-none outline-hidden text-[#292421] placeholder:text-[#948982]"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-[#948982] hover:text-[#292421] ml-1 p-0.5"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  if (currentTab !== 'discover') onNavigate('discover');
                }}
                className="p-2 text-[#746B65] hover:text-[#292421] rounded-lg hover:bg-[#F2EEEA] transition-colors"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* User Sign In / Profile */}
          {isAuthenticated && user ? (
            <button
              onClick={() => onNavigate('account')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#292421] hover:text-[#873F55] transition-colors px-2 py-1"
            >
              <div className="w-7 h-7 rounded-full bg-[#F4E8EC] text-[#873F55] flex items-center justify-center font-semibold text-xs border border-[#E7E0DA]">
                {user.name.charAt(0)}
              </div>
              <span className="hidden lg:inline truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('signin')}
              className="text-sm font-medium text-[#746B65] hover:text-[#292421] transition-colors px-2 py-1"
            >
              Sign in
            </button>
          )}

          {/* Primary Action: Join Premium */}
          {user?.isPremium ? (
            <button
              onClick={() => onNavigate('membership')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#873F55] bg-[#F4E8EC] border border-[#E7E0DA] rounded-lg hover:bg-[#ebd5dc] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#873F55]" />
              <span>Premium Member</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('membership')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#873F55] rounded-lg hover:bg-[#6F3044] transition-colors whitespace-nowrap shadow-xs"
            >
              Join Premium
            </button>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#746B65] hover:text-[#292421] rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E0DA] bg-[#FAF8F5] px-6 py-4 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-[#746B65]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left py-2 px-1 transition-colors ${
                  currentTab === link.id ? 'text-[#873F55] font-semibold' : 'hover:text-[#292421]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#E7E0DA] flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenAdmin();
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 text-xs font-medium text-[#746B65] flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-[#873F55]" />
                <span>{isAdminActive ? 'Exit Studio' : 'Creator Studio / Admin'}</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('membership');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left py-2 text-xs font-medium text-[#873F55] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Membership & Pricing</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
