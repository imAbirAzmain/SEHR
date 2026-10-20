import React from 'react';
import { CategoryFilter, SortOption } from '../types';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface CollectionFilterProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  sortBy: SortOption;
  onSelectSort: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalResults: number;
  onResetFilters: () => void;
}

const AVAILABLE_SIZES = ['38', '40', '42', '44', '46'];

export const CollectionFilter: React.FC<CollectionFilterProps> = ({
  activeCategory,
  onSelectCategory,
  selectedSize,
  onSelectSize,
  sortBy,
  onSelectSort,
  searchQuery,
  totalResults,
  onResetFilters
}) => {
  const hasActiveFilters = activeCategory !== 'all' || selectedSize !== '' || searchQuery !== '';

  return (
    <div className="bg-white border-y border-stone-200 py-5 px-4 sm:px-6 lg:px-8 mb-10">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Row 1: Direct Piece Selection */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.18em] transition font-medium ${
              activeCategory === 'all'
                ? 'bg-[#5a483c] text-white shadow-sm'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All Creations
          </button>
          <button
            onClick={() => onSelectCategory('azhar')}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.18em] transition font-medium ${
              activeCategory === 'azhar'
                ? 'bg-[#5a483c] text-white shadow-sm'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Azhar (Maroon)
          </button>
          <button
            onClick={() => onSelectCategory('yazeer')}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.18em] transition font-medium ${
              activeCategory === 'yazeer'
                ? 'bg-[#5a483c] text-white shadow-sm'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            Yazeer (Olive)
          </button>
        </div>

        {/* Row 2: Sizes & Sizing Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-stone-150">
          {/* Size Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mr-1">
              Filter Size:
            </span>
            <button
              onClick={() => onSelectSize('')}
              className={`px-2.5 py-1 text-xs rounded border transition ${
                selectedSize === ''
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
              }`}
            >
              All
            </button>
            {AVAILABLE_SIZES.map(sz => (
              <button
                key={sz}
                onClick={() => onSelectSize(selectedSize === sz ? '' : sz)}
                className={`px-2.5 py-1 text-xs rounded border transition font-mono ${
                  selectedSize === sz
                    ? 'bg-[#5a483c] text-white font-bold border-[#5a483c]'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Results count & Reset */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-500 font-serif italic">
              Showing {totalResults} {totalResults === 1 ? 'creation' : 'creations'}
            </span>

            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 text-xs text-[#603500] hover:underline font-medium"
                title="Reset filters"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
