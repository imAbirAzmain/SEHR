import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Phone, ArrowRight, Check } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide, onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-dark text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-stone-800">
          {/* Brand Bio & Socials (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <img
              src="/images/sehr_logo_white.png"
              alt="SEHR"
              className="h-10 w-auto object-contain"
            />
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm mt-2">
              Where Tradition Meets Timeless Elegance. Crafted in Dhaka for moments that matter. Bespoke menswear & luxury Eid ul Fitr 2026 collection.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://www.instagram.com/sehr.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-white hover:border-brand-gold transition"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-emerald-400 hover:border-emerald-500 transition"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Curated Collections (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-brand-gold font-bold font-sans">
              Collections
            </h4>
            <ul className="space-y-2 text-xs font-light text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateSection('shop-catalog')}
                  className="hover:text-white transition"
                >
                  All Creations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('shop-catalog')}
                  className="hover:text-white transition"
                >
                  Eid ul Fitr '26
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('shop-catalog')}
                  className="hover:text-white transition"
                >
                  Signature Panjabi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('shop-catalog')}
                  className="hover:text-white transition"
                >
                  Bespoke Couture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('lookbook')}
                  className="hover:text-white transition"
                >
                  Campaign Lookbook
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge (Col 7-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-brand-gold font-bold font-sans">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs font-light text-stone-400">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition text-left"
                >
                  Panjabi Size Chart & Measuring Guide
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/8801700000000?text=Hello%20SEHR,%20I%20would%20like%20to%20inquire%20about%20delivery%20and%20tracking."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition block"
                >
                  Express Courier & Delivery Info
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801700000000?text=Hello%20SEHR,%20I%20need%20custom%20alteration%20support."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition block"
                >
                  Complimentary Alteration Support
                </a>
              </li>
              <li className="pt-2 flex items-start gap-2 text-stone-400">
                <MapPin size={14} className="text-brand-gold flex-shrink-0 mt-0.5" />
                <span>Atelier: Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2 text-stone-400">
                <Phone size={14} className="text-brand-gold flex-shrink-0" />
                <span>+880 1700-000000</span>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter (Col 9-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-brand-gold font-bold font-sans">
              The SEHR Circle
            </h4>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Subscribe to receive private preview access for festive drops and complimentary styling advice.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-stone-900 border border-brand-gold/40 rounded-lg text-xs text-brand-gold-light">
                <Check size={16} className="text-brand-gold" />
                <span>Welcome to the SEHR Circle.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-stone-900 border border-stone-700 text-white placeholder-stone-500 rounded-l-lg focus:outline-none focus:border-brand-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-dark rounded-r-lg text-xs font-bold transition flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
                <span className="text-[10px] text-stone-500 block">
                  Use coupon <strong>EID2026</strong> for 10% off your debut order.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Location */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-light gap-4">
          <p>© 2026 SEHR Atelier. All Rights Reserved. Dhaka, Bangladesh.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-300 transition cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-300 transition cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-stone-300 transition cursor-pointer">Ethical Craft</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
