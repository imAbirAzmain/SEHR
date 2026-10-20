import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.fabricDetails.some(f => f.toLowerCase().includes(query.toLowerCase()))
      );

  const popularSearches = ['Maroon Panjabi', 'Olive Kurta', "Eid '26", 'Handloom Silk', 'Mandarin Collar'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden border border-brand-border">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-brand-border bg-brand-cream/80">
          <Search size={20} className="text-brand-gold mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Panjabis, Kurtas, Fabrics (e.g. Maroon, Silk, Eid)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm sm:text-base bg-transparent text-brand-dark placeholder-stone-400 focus:outline-none font-serif"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-brand-dark transition mr-2"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase font-medium tracking-wider text-stone-500 hover:text-brand-dark"
          >
            Esc
          </button>
        </div>

        {/* Content & Results */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-brand-muted font-bold block">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full text-xs bg-brand-sand/70 text-stone-700 hover:bg-brand-dark hover:text-white transition border border-brand-border/60"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-8 text-center text-stone-500 text-xs font-light">
              No creations found matching "{query}". Try searching for Maroon, Olive, or Panjabi.
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-brand-muted font-bold block mb-2">
                Creations ({filtered.length})
              </span>
              {filtered.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-2 rounded-xl hover:bg-brand-cream cursor-pointer transition border border-transparent hover:border-brand-border/60"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-14 object-cover object-top rounded-lg bg-stone-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-serif font-medium text-brand-dark truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-stone-500 font-light truncate">
                      {product.categoryLabel} • {product.tagline}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-serif font-semibold text-brand-dark">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    <ArrowRight size={14} className="text-brand-gold ml-auto mt-1" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
