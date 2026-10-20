import React, { useState } from 'react';
import { Product } from '../types';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onOpenProductPage: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenProductPage,
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || primaryImage;

  const formattedPrice = `৳ ${product.price.toLocaleString()}`;

  return (
    <div
      className="group flex flex-col bg-white overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenProductPage(product)}
    >
      {/* 1. Image Container (Guzel Screenshot 2 Style: 3:4 portrait, clean) */}
      <div className="relative aspect-[3/4] w-full bg-[#f4ede4] overflow-hidden">
        {/* Primary & Hover Flip Images */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
            isHovered && secondaryImage !== primaryImage ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {secondaryImage !== primaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} detail view`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-in-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition duration-200 shadow-sm backdrop-blur-md ${
            isFavorited
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/80 text-stone-700 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* 2. Product Name & Price (Exact Guzel Screenshot 2 Typography - Clean, No Clutter) */}
      <div className="pt-4 pb-2 px-2 text-center space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-serif font-normal text-stone-900 group-hover:text-[#5a483c] transition">
          {product.name}
        </h3>

        <div className="text-sm sm:text-base font-serif font-medium text-stone-900">
          {formattedPrice}
        </div>
      </div>
    </div>
  );
};
