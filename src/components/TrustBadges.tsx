import React from 'react';
import { Sparkles, ShieldCheck, Truck, MessageCircle } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const perks = [
    {
      icon: <Sparkles className="text-[#5a483c]" size={22} />,
      title: 'Dhaka Master Tailoring',
      desc: 'Individually crafted by heritage artisans with reinforced seams and structured collar.'
    },
    {
      icon: <ShieldCheck className="text-[#5a483c]" size={22} />,
      title: 'Premium Bamboo Cotton',
      desc: 'Breathable, hypoallergenic bamboo cotton blend engineered for tropical ease and festive grace.'
    },
    {
      icon: <Truck className="text-[#5a483c]" size={22} />,
      title: 'Express Delivery',
      desc: '24-48h Dhaka Metro express. Complimentary shipping on all orders over ৳10,000.'
    },
    {
      icon: <MessageCircle className="text-[#5a483c]" size={22} />,
      title: 'WhatsApp Concierge',
      desc: 'Instant stylist support, size recommendation, and bespoke length consultation.'
    }
  ];

  return (
    <section className="py-12 bg-[#faf7f2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-white shadow-xs border border-stone-200 flex-shrink-0">
                {perk.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-stone-900 uppercase tracking-wider">
                  {perk.title}
                </h4>
                <p className="text-xs text-stone-600 font-light mt-1 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
