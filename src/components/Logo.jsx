'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Logo({ size = 'default', showLink = true, variant = 'dark', onClick }) {
  const pathname = usePathname();

  const iconSizes = {
    small: 'w-7 h-7',
    default: 'w-9 h-9',
    large: 'w-11 h-11',
  };

  const textSizes = {
    small: 'text-lg',
    default: 'text-2xl',
    large: 'text-3xl',
  };

  const badgeSizes = {
    small: 'text-[10px] px-1.5 py-0.5',
    default: 'text-xs px-2 py-0.5',
    large: 'text-sm px-2.5 py-1',
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-[#0A1E3F]';

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }
    if (pathname === '/') {
      e.preventDefault();
      if (typeof window !== 'undefined') {
        if (window.location.hash) {
          window.history.pushState(null, '', '/');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const content = (
    <div className="flex items-center gap-2.5 group select-none">
      {/* Official United States (Stars and Stripes) Flag Icon */}
      <div
        className={`relative ${iconSizes[size]} rounded-xl overflow-hidden border border-blue-400/40 shadow-md shadow-blue-900/25 group-hover:scale-105 transition-transform duration-200 shrink-0 flex items-center justify-center bg-[#002868]`}
        title="Televo IPTV - United States"
      >
        <svg
          viewBox="0 0 60 40"
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <g id="logo-star">
              <polygon fill="#FFFFFF" points="0,-1.2 0.35,-0.37 1.2,-0.37 0.52,0.13 0.77,0.96 0,0.48 -0.77,0.96 -0.52,0.13 -1.2,-0.37 -0.35,-0.37"/>
            </g>
          </defs>

          {/* 13 Stripes */}
          <rect width="60" height="40" fill="#B22234"/>
          <rect y="3.077" width="60" height="3.077" fill="#FFFFFF"/>
          <rect y="9.231" width="60" height="3.077" fill="#FFFFFF"/>
          <rect y="15.385" width="60" height="3.077" fill="#FFFFFF"/>
          <rect y="21.538" width="60" height="3.077" fill="#FFFFFF"/>
          <rect y="27.692" width="60" height="3.077" fill="#FFFFFF"/>
          <rect y="33.846" width="60" height="3.077" fill="#FFFFFF"/>

          {/* Blue Canton (covering top 7 stripes) */}
          <rect width="25" height="21.538" fill="#002868"/>

          {/* Clean Star Constellation */}
          <use href="#logo-star" x="3.5" y="3.5"/>
          <use href="#logo-star" x="9" y="3.5"/>
          <use href="#logo-star" x="14.5" y="3.5"/>
          <use href="#logo-star" x="20" y="3.5"/>

          <use href="#logo-star" x="6.25" y="7"/>
          <use href="#logo-star" x="11.75" y="7"/>
          <use href="#logo-star" x="17.25" y="7"/>

          <use href="#logo-star" x="3.5" y="10.5"/>
          <use href="#logo-star" x="9" y="10.5"/>
          <use href="#logo-star" x="14.5" y="10.5"/>
          <use href="#logo-star" x="20" y="10.5"/>

          <use href="#logo-star" x="6.25" y="14"/>
          <use href="#logo-star" x="11.75" y="14"/>
          <use href="#logo-star" x="17.25" y="14"/>

          <use href="#logo-star" x="3.5" y="17.5"/>
          <use href="#logo-star" x="9" y="17.5"/>
          <use href="#logo-star" x="14.5" y="17.5"/>
          <use href="#logo-star" x="20" y="17.5"/>

          {/* Inner subtle border for crisp contrast */}
          <rect
            width="60"
            height="40"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex items-center gap-1.5">
        <span className={`font-black tracking-tight ${textColor} ${textSizes[size]}`}>
          TELEVO
        </span>
        <span
          className={`font-extrabold uppercase rounded-md bg-[#B22234] text-white shadow-sm ${badgeSizes[size]} tracking-wider`}
        >
          IPTV
        </span>
      </div>
    </div>
  );

  if (showLink) {
    return (
      <Link
        href="/"
        scroll={true}
        onClick={handleClick}
        className="inline-block cursor-pointer"
        aria-label="Televo IPTV USA - Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
