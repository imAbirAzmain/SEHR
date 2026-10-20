import React from 'react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onLookbookClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section id="hero" className="relative h-screen w-full flex items-end justify-center bg-stone-900 overflow-hidden">
      {/* 1. Hero Background Image: hero_cover.jpg */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_cover.jpg"
          alt="SEHR Debut Presentation"
          className="w-full h-full object-cover object-[center_35%] sm:object-[center_30%] filter brightness-[0.94] contrast-[1.02]"
          loading="eager"
        />

        {/* Subtle Bottom & Top Vignette (Guzel Style) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />
      </div>

      {/* 2. Hero Overlay Text (Exact Guzel Style from Screenshot 1) */}
      <div className="relative z-10 max-w-xl mx-auto px-4 text-center text-white pb-14 sm:pb-20 space-y-2.5">
        {/* New Arrivals Subtitle */}
        <p className="text-sm sm:text-base font-serif font-normal text-stone-200 tracking-wider">
          New Arrivals
        </p>

        {/* Prominent S E H R Display Typography */}
        <h1 className="text-3xl sm:text-5xl font-serif uppercase tracking-[0.35em] text-white font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          S E H R
        </h1>

        {/* Underlined Direct Link (Guzel Style "Pre Book Now") */}
        <div className="pt-2">
          <button
            onClick={onExploreClick}
            className="inline-block text-xs uppercase tracking-[0.25em] font-medium text-white border-b border-white pb-1 hover:text-[#dfc29c] hover:border-[#dfc29c] transition-colors duration-200 cursor-pointer"
          >
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};
