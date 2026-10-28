import React from 'react';
import { BrandWordmark } from './BrandWordmark';

interface SiteFooterProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenAdmin: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-[#E7E0DA] mt-20 pb-16 pt-14 text-xs text-[#746B65]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E7E0DA]">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-5 space-y-3">
            <BrandWordmark onClick={() => onNavigate('home')} />
            <p className="text-[#746B65] text-xs sm:text-sm max-w-sm leading-relaxed mt-2">
              Mysteries Unveiled by Dino is an independent publishing platform crafting serialized fiction and complete atmospheric mysteries. Every single chapter is strictly verified &gt;1,500 words for immersive long-form reading, supported by 20 complete 100% free sagas and automated daily releases.
            </p>
            <p className="text-[11px] text-[#948982]">
              Curated by Dino for readers who cherish slow burns, atmospheric puzzles, and genuine emotional depth.
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
                  All Stories &amp; Sagas
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
                  Daily Chapter Releases
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('completed')}
                  className="hover:text-[#873F55] transition-colors font-medium text-[#873F55]"
                >
                  20 Free Complete Sagas
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
              Platform &amp; Studio
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('membership')}
                  className="hover:text-[#873F55] transition-colors font-medium text-[#873F55]"
                >
                  Membership &amp; VIP Perks
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-[#873F55] transition-colors"
                >
                  Publisher Console &amp; Automation
                </button>
              </li>
              <li>
                <span className="text-[#948982]">
                  Editorial: dino@mysteriesunveiled.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#948982]">
          <p>© {new Date().getFullYear()} Mysteries Unveiled by Dino. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#292421] cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-[#292421] cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#292421] cursor-pointer">
              Content &amp; Editorial Ethics
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
