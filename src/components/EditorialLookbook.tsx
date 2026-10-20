import React from 'react';
import { ArrowRight } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';

interface EditorialLookbookProps {
  onSelectCollection: () => void;
}

export const EditorialLookbook: React.FC<EditorialLookbookProps> = ({ onSelectCollection }) => {
  const lookbookGallery = [
    {
      img: '/images/c1.png',
      title: 'Staircase Silhouette',
      subtitle: 'Azhar & Yazeer Ensemble',
      productName: 'Echoes of Grace'
    },
    {
      img: '/images/azhar_standing.png',
      title: 'Azhar by the Colonnade',
      subtitle: 'Tone-on-Tone Burgundy Panjabi',
      productName: 'Azhar'
    },
    {
      img: '/images/yazeer_archway.jpg',
      title: 'Yazeer under the Arch',
      subtitle: 'Heritage Olive Gold Threadwork',
      productName: 'Yazeer'
    },
    {
      img: '/images/azhar_reading.png',
      title: 'Courtyard Reading Look',
      subtitle: 'Natural Sunlit Portrait',
      productName: 'Azhar'
    }
  ];

  return (
    <section id="lookbook" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#5a483c] font-semibold block">
            Campaign Editorial
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900">
            Echoes of Grace • Visual Journal
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-serif italic font-light">
            Captured amidst timeless colonial pillars and sculpted natural daylight in Dhaka.
          </p>
        </div>

        {/* 4-Item Seamless Editorial Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {lookbookGallery.map((item, idx) => (
            <div
              key={idx}
              className="group cursor-pointer flex flex-col"
              onClick={onSelectCollection}
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-stone-100 relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/95 text-stone-900 text-[11px] tracking-widest uppercase font-semibold px-4 py-2 shadow-lg backdrop-blur-sm">
                    View Look
                  </span>
                </div>
              </div>

              {/* Minimalist Editorial Caption */}
              <div className="pt-3.5 text-center space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-[#5a483c] font-medium">
                  {item.subtitle}
                </p>
                <h3 className="text-sm font-serif font-medium text-stone-900 group-hover:text-[#5a483c] transition">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Instagram Link */}
        <div className="mt-16 text-center">
          <a
            href="https://www.instagram.com/sehr.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-800 hover:border-[#5a483c] hover:text-[#5a483c] text-xs uppercase tracking-widest font-medium transition"
          >
            <InstagramIcon size={15} />
            <span>Follow @sehr.bd on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
