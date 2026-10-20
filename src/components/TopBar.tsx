import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, MapPin } from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/products';

export const TopBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % ANNOUNCEMENTS.length);
  };

  return (
    <div className="bg-[#5a483c] text-[#f7f4ee] text-[11px] sm:text-xs py-2 px-4 tracking-wider border-b border-[#47392f]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Location */}
        <div className="hidden lg:flex items-center gap-2 text-stone-300">
          <MapPin size={13} className="text-[#dfc29c]" />
          <span className="tracking-widest uppercase text-[10px]">Dhaka, Bangladesh</span>
        </div>

        {/* Center: Rotating Announcements */}
        <div className="flex-1 flex items-center justify-center gap-3 text-center">
          <button
            onClick={handlePrev}
            className="p-1 hover:text-[#dfc29c] transition opacity-70 hover:opacity-100"
            aria-label="Previous announcement"
          >
            <ChevronLeft size={13} />
          </button>

          <span className="font-light tracking-wider truncate max-w-xs sm:max-w-md md:max-w-xl transition-all duration-300 text-stone-100">
            {ANNOUNCEMENTS[currentIndex]}
          </span>

          <button
            onClick={handleNext}
            className="p-1 hover:text-[#dfc29c] transition opacity-70 hover:opacity-100"
            aria-label="Next announcement"
          >
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Right: Concierge Phone & Currency */}
        <div className="hidden lg:flex items-center gap-4 text-stone-300">
          <a
            href="https://wa.me/8801700000000?text=Hello%20SEHR,%20I%20would%20like%20to%20inquire%20about%20the%20Echoes%20of%20Grace%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#dfc29c] transition"
          >
            <Phone size={12} className="text-[#dfc29c]" />
            <span className="text-[11px]">Concierge: +880 1700-000000</span>
          </a>
          <span className="text-stone-500">|</span>
          <span className="font-medium text-stone-200">BDT (৳)</span>
        </div>
      </div>
    </div>
  );
};
