import React from 'react';

interface BrandWordmarkProps {
  className?: string;
  onClick?: () => void;
  size?: 'normal' | 'large';
  showSubtitle?: boolean;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  className = '',
  onClick,
  size = 'normal',
  showSubtitle = true
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
      role="banner"
    >
      {/* Warm, friendly logo mark: Parent and child hands holding a sprout of sunshine */}
      <div
        className={`rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105 ${
          size === 'large' ? 'w-12 h-12' : 'w-10 h-10'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={size === 'large' ? 'w-7 h-7' : 'w-6 h-6'}
        >
          {/* Sprout & heart warmth */}
          <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z" />
          <path d="M12 8c-1.5 2-3 4-3 6a3 3 0 0 0 6 0c0-2-1.5-4-3-6z" fill="currentColor" fillOpacity="0.25" />
          <circle cx="12" cy="14" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-extrabold tracking-tight text-neutral-900 group-hover:text-amber-800 transition-colors leading-tight ${
            size === 'large' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-[22px]'
          }`}
        >
          Cùng Con Mỗi Ngày
        </span>
        {showSubtitle && (
          <span className="text-[11px] sm:text-xs font-semibold text-amber-700 tracking-wide uppercase">
            Phát triển toàn diện 2 - 6 tuổi
          </span>
        )}
      </div>
    </div>
  );
};
