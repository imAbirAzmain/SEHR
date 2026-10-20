import React, { useState } from 'react';
import { Product } from '../types';
import { Heart, MessageCircle, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenProductPage: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenProductPage,
  onQuickView,
  onOpenSizeGuide
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('40');
  const [addedToast, setAddedToast] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || primaryImage;

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSize(size);
    addToCart(product, size, 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1200);
  };

  const formattedPrice = `৳ ${product.price.toLocaleString()}`;

  const whatsappMessage = encodeURIComponent(
    `Hello SEHR,\nI would like to order "${product.name} | Echoes of Grace" in Size ${selectedSize} (${formattedPrice}).\nPlease let me know the availability.`
  );

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

      {/* 2. Product Name & Price (Exact Guzel Screenshot 2 Typography) */}
      <div className="pt-4 pb-6 px-2 text-center space-y-2">
        <h3 className="text-xl sm:text-2xl font-serif font-normal text-stone-900 group-hover:text-[#5a483c] transition">
          {product.name}
        </h3>

        <div className="text-sm sm:text-base font-serif font-medium text-stone-900">
          {formattedPrice}
        </div>

        {/* Guzel Style WhatsApp Button */}
        <div className="pt-2 max-w-xs mx-auto" onClick={(e) => e.stopPropagation()}>
          <a
            href={`https://wa.me/8801700000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#603500] hover:bg-[#4a2800] text-white py-3 px-4 rounded-lg font-semibold text-xs tracking-[0.16em] uppercase transition duration-300 shadow hover:shadow-md hover:-translate-y-0.5 border border-[#482700]"
          >
            <MessageCircle size={15} />
            <span>Order via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
