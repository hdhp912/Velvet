import React from 'react';
import { BookOpen } from 'lucide-react';

interface BrandWordmarkProps {
  className?: string;
  onClick?: () => void;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({ className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
      role="banner"
    >
      <div className="w-8 h-8 rounded-lg bg-[#873F55] text-[#FFF9F5] flex items-center justify-center shadow-2xs group-hover:bg-[#6F3044] transition-colors">
        <BookOpen className="w-4 h-4 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="font-editorial text-lg sm:text-xl text-[#292421] tracking-tight group-hover:text-[#873F55] transition-colors leading-tight">
          Mysteries Unveiled
        </span>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#873F55] -mt-0.5">
          by Dino
        </span>
      </div>
    </div>
  );
};
