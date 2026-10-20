import React, { useState } from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { SIZE_CHART } from '../data/products';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  // Conversion helper
  const convert = (valStr: string) => {
    const num = parseFloat(valStr.replace('"', ''));
    if (unit === 'inches') return `${num}"`;
    return `${Math.round(num * 2.54)} cm`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-cream">
          <div className="flex items-center gap-2">
            <Ruler className="text-brand-gold" size={20} />
            <h2 className="text-lg font-serif font-semibold text-brand-dark">
              SEHR Panjabi & Kurta Size Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-500 hover:text-brand-dark hover:bg-stone-200 transition"
            aria-label="Close size guide"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Unit Toggle & Intro */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-stone-600 font-light">
              All garments are regular tailored fit engineered for comfort and graceful silhouette.
            </p>
            <div className="inline-flex rounded-lg border border-brand-border p-0.5 bg-brand-cream">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                  unit === 'inches'
                    ? 'bg-brand-dark text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${
                  unit === 'cm'
                    ? 'bg-brand-dark text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Size Chart Table */}
          <div className="border border-brand-border rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-sand/80 text-brand-dark font-serif uppercase tracking-wider text-[11px] border-b border-brand-border">
                <tr>
                  <th className="py-3 px-4 font-semibold">Standard Size</th>
                  <th className="py-3 px-4 font-semibold">Chest (Body)</th>
                  <th className="py-3 px-4 font-semibold">Panjabi Length</th>
                  <th className="py-3 px-4 font-semibold">Shoulder</th>
                  <th className="py-3 px-4 font-semibold">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {SIZE_CHART.map((item, idx) => (
                  <tr
                    key={item.size}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-brand-cream/50'}
                  >
                    <td className="py-3 px-4 font-bold font-mono text-brand-dark">
                      Size {item.size}
                    </td>
                    <td className="py-3 px-4 text-stone-700">{convert(item.chest)}</td>
                    <td className="py-3 px-4 text-stone-700">{convert(item.length)}</td>
                    <td className="py-3 px-4 text-stone-700">{convert(item.shoulder)}</td>
                    <td className="py-3 px-4 text-stone-700">{convert(item.sleeve)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure Guidelines */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-800">
              <HelpCircle size={15} className="text-brand-gold" />
              <span>How To Measure Your Size</span>
            </div>
            <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside font-light">
              <li><strong>Chest:</strong> Measure around the fullest part of your chest, keeping tape horizontal.</li>
              <li><strong>Length:</strong> Measure from the base of the neck down to your desired hemline (typically around mid-calf or below knee).</li>
              <li><strong>Shoulder:</strong> Measure across the back from shoulder tip to shoulder tip.</li>
              <li><strong>Sleeve:</strong> Measure from the top of the shoulder bone down to your wrist joint.</li>
            </ul>
          </div>

          {/* Bespoke Tailoring CTA */}
          <div className="p-4 bg-brand-cream border border-brand-border rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-xs font-semibold text-brand-dark">
                Require custom length or bespoke shoulder fitting?
              </p>
              <p className="text-[11px] text-stone-500 font-light mt-0.5">
                Our master craftsmen in Dhaka offer complimentary tailoring adjustments before dispatch.
              </p>
            </div>
            <a
              href="https://ig.me/m/sehr.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-4 py-2 bg-[#2c221e] text-white text-xs font-medium rounded-md hover:bg-black transition flex items-center gap-1.5 shadow"
            >
              <InstagramIcon size={14} />
              <span>DM on Instagram</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-brand-border bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-brand-dark text-white rounded text-xs tracking-wider uppercase font-medium hover:bg-stone-800 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
