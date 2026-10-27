import React from 'react';
import { BrandWordmark } from './BrandWordmark';

interface SiteFooterProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenAdmin: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-[#E7E0DA] mt-20 pb-32 pt-14 text-xs text-[#746B65]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E7E0DA]">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-5 space-y-3">
            <BrandWordmark onClick={() => onNavigate('home')} />
            <p className="text-[#746B65] text-xs sm:text-sm max-w-sm leading-relaxed mt-2">
              Mysteries Unveiled by Dino is an independent audiobook studio crafting serialized romance fiction and complete mystery sagas. Every production features dedicated voice narration, synchronized prose, and generous free chapter access.
            </p>
            <p className="text-[11px] text-[#948982]">
              Curated by Dino for listeners who adore slow burns, atmospheric mysteries, and emotional depth.
            </p>
          </div>

          {/* Col 2: Discover */}
          <div className="md:col-span-2 space-y-2.5">
            <span className="font-semibold text-[#292421] text-xs uppercase tracking-wider block mb-1">
              Discover
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="hover:text-[#873F55] transition-colors"
                >
                  All Audiobooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('romance')}
                  className="hover:text-[#873F55] transition-colors"
                >
                  Romance Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('new-releases')}
                  className="hover:text-[#873F55] transition-colors"
                >
                  New Daily Chapters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('completed')}
                  className="hover:text-[#873F55] transition-colors"
                >
                  Completed Sagas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Browse Tropes */}
          <div className="md:col-span-2 space-y-2.5">
            <span className="font-semibold text-[#292421] text-xs uppercase tracking-wider block mb-1">
              Top Tropes
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('discover', 'Slow Burn')}
                  className="hover:text-[#873F55] transition-colors"
                >
                  Slow Burn
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover', 'Second Chance')}
                  className="hover:text-[#873F55] transition-colors"
                >
                  Second Chance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover', 'Enemies to Lovers')}
                  className="hover:text-[#873F55] transition-colors"
                >
                  Enemies to Lovers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover', 'Billionaire Romance')}
                  className="hover:text-[#873F55] transition-colors"
                >
                  Billionaire Romance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Membership & Studio */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="font-semibold text-[#292421] text-xs uppercase tracking-wider block mb-1">
              Platform & Studio
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('membership')}
                  className="hover:text-[#873F55] transition-colors font-medium text-[#873F55]"
                >
                  Membership & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-[#873F55] transition-colors"
                >
                  Publisher Console / Studio
                </button>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Mysteries Unveiled by Dino Editorial Desk: dino@mysteriesunveiled.com');
                  }}
                  className="hover:text-[#873F55] transition-colors"
                >
                  Editorial & Narrator Submissions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#948982]">
          <p>© {new Date().getFullYear()} Mysteries Unveiled by Dino. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#292421]">
              Terms of Service
            </a>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#292421]">
              Privacy Policy
            </a>
            <a href="#cookies" onClick={(e) => e.preventDefault()} className="hover:text-[#292421]">
              Audio Licensing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
