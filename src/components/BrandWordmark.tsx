import React from 'react';

interface BrandWordmarkProps {
  className?: string;
  onClick?: () => void;
  size?: 'normal' | 'large';
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({ className = '', onClick, size = 'normal' }) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
      role="banner"
    >
      {/* Restrained line-art symbol: subtle open book with gentle heart page fold */}
      <svg
        width={size === 'large' ? '28' : '22'}
        height={size === 'large' ? '28' : '22'}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#873F55] transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Book spine & pages forming subtle heart curvature at the top crease */}
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M12 6.5c-.8-1.5-3-1.8-3.8-.4-.9 1.4.2 3.1 3.8 5.4 3.6-2.3 4.7-4 3.8-5.4-.8-1.4-3-1.1-3.8.4z" />
      </svg>

      <span
        className={`font-editorial tracking-tight text-[#292421] transition-colors duration-200 group-hover:text-[#873F55] ${
          size === 'large' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-[22px]'
        }`}
      >
        Velvet Stories
      </span>
    </div>
  );
};
