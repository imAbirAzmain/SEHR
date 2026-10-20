import React from 'react';
import { MessageCircle, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';

export const BrandStory: React.FC = () => {
  return (
    <section id="about" className="bg-[#fbfaf8] text-stone-900 border-t border-stone-200">
      {/* 1. Atelier & Craftsmanship Editorial Showcase */}
      <div className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Campaign Imagery */}
          <div className="lg:col-span-6 space-y-6">
            <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100">
              <img
                src="/images/c3.png"
                alt="SEHR Azhar and Yazeer Panjabi Silhouettes"
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
            
            {/* Dual Craftsmanship Detail Pair */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src="/images/azhar_collar.jpg"
                  alt="Azhar Handcrafted Collar & Clustered Buttons"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src="/images/yazeer_embroidery.png"
                  alt="Yazeer Antique Gold Needlework Detail"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative (Pure Typography, No AI Boxes) */}
          <div className="lg:col-span-6 space-y-8 lg:pl-6">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#5a483c] font-semibold block">
                Atelier & Craftsmanship
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
                Where Tradition Meets <span className="italic text-[#5a483c]">Timeless Elegance</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed font-serif">
              Conceived in Dhaka, SEHR was founded on the singular principle of elevating traditional celebratory menswear into contemporary wearable art. We do not mass-produce garments; every silhouette from the debut <em>Echoes of Grace</em> collection undergoes meticulous tailoring, structured collar engineering, and individual quality inspection.
            </p>

            {/* Editorial Craft Notes (Minimalist Serif Enumeration) */}
            <div className="space-y-6 pt-4 border-t border-stone-200">
              <div className="space-y-1.5">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-serif italic text-[#5a483c] font-medium tracking-wider">I.</span>
                  <h3 className="text-sm font-serif font-bold uppercase tracking-widest text-stone-900">
                    Premium Bamboo Cotton Blend
                  </h3>
                </div>
                <p className="text-xs text-stone-600 font-light leading-relaxed pl-6">
                  Selected for its naturally breathable, silky drape and moisture-wicking comfort under warm celebratory days.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-serif italic text-[#5a483c] font-medium tracking-wider">II.</span>
                  <h3 className="text-sm font-serif font-bold uppercase tracking-widest text-stone-900">
                    Artisanal Embroidered Body
                  </h3>
                </div>
                <p className="text-xs text-stone-600 font-light leading-relaxed pl-6">
                  Intricate motif needlework across the yoke and chest placket. Azhar features tone-on-tone embroidery; Yazeer is adorned with antique gold threadwork.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-serif italic text-[#5a483c] font-medium tracking-wider">III.</span>
                  <h3 className="text-sm font-serif font-bold uppercase tracking-widest text-stone-900">
                    Signature Clustered Potli Buttons
                  </h3>
                </div>
                <p className="text-xs text-stone-600 font-light leading-relaxed pl-6">
                  Individually crafted loop buttons fastened tightly along the placket, embodying the grandeur of heritage subcontinental tailoring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dhaka Architectural Heritage Strip */}
      <div className="border-y border-stone-200 bg-stone-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#5a483c] font-semibold">
                Inspiration
              </span>
              <h4 className="text-xl font-serif text-stone-900">
                Architectural Roots of Dhaka
              </h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                The classical colonnades, pediments, and arched corridors of heritage Dhaka provide the aesthetic canvas for the Echoes of Grace collection.
              </p>
            </div>

            <div className="aspect-[16/10] overflow-hidden bg-stone-200">
              <img
                src="/images/scene1.jpg"
                alt="Dhaka Heritage Architectural Spires"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>

            <div className="aspect-[16/10] overflow-hidden bg-stone-200">
              <img
                src="/images/scene3.jpg"
                alt="Classical Colonial Pediment Dhaka"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Atelier Location & Contact Concierge (Placed at bottom as requested) */}
      <div id="atelier-location" className="py-16 sm:py-20 bg-[#f4ede4] border-b border-stone-300/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#5a483c] font-semibold">
              Visit & Inquire
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-stone-900">
              The Dhaka Atelier & Client Concierge
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-serif italic font-light">
              We welcome private fittings, bespoke sizing consultations, and international order inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-stone-800">
            {/* Location */}
            <div className="space-y-3 p-6 bg-white/70 border border-stone-200/90 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#f4ede4] flex items-center justify-center text-[#5a483c]">
                <MapPin size={18} />
              </div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 font-sans">
                Atelier Location
              </h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Dhaka, Bangladesh
                <br />
                <span className="text-stone-500 text-[11px]">Private studio viewings by prior appointment</span>
              </p>
            </div>

            {/* WhatsApp Concierge */}
            <div className="space-y-3 p-6 bg-white/70 border border-stone-200/90 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#f4ede4] flex items-center justify-center text-[#5a483c]">
                <MessageCircle size={18} />
              </div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 font-sans">
                Direct Concierge
              </h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                WhatsApp: <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-[#5a483c]">+880 1700-000000</a>
                <br />
                <span className="text-stone-500 text-[11px]">Direct sizing advice & order placement</span>
              </p>
            </div>

            {/* Hours & Digital Contact */}
            <div className="space-y-3 p-6 bg-white/70 border border-stone-200/90 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#f4ede4] flex items-center justify-center text-[#5a483c]">
                <Clock size={18} />
              </div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-stone-900 font-sans">
                Atelier Hours
              </h4>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Sat – Thu: 10:00 AM – 8:00 PM BST
                <br />
                <a href="mailto:concierge@sehr.bd" className="text-stone-500 hover:text-stone-900 text-[11px] underline">concierge@sehr.bd</a>
              </p>
            </div>
          </div>

          {/* Centered WhatsApp Action */}
          <div className="mt-10 text-center">
            <a
              href="https://wa.me/8801700000000?text=Hello%20SEHR,%20I%20would%20like%20to%20inquire%20about%20visiting%20the%20Dhaka%20Atelier."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#603500] hover:bg-[#4a2800] text-white rounded-lg text-xs font-semibold tracking-[0.18em] uppercase transition duration-300 shadow hover:shadow-md"
            >
              <MessageCircle size={16} />
              <span>Connect with Dhaka Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
