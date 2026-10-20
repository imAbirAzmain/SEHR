import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ChevronLeft, ChevronRight, Truck, RotateCcw, ShoppingBag, Ruler, Check, Heart, Maximize2 } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductPageProps {
  product: Product;
  onNavigateHome: () => void;
  onSelectProduct: (p: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onNavigateHome,
  onSelectProduct,
  onOpenSizeGuide
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('40');
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const isFavorited = isInWishlist(product.id);
  const formattedPrice = `৳ ${product.price.toLocaleString()}`;

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id);

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev + 1) % product.images.length);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1500);
  };

  return (
    <div className="bg-white text-stone-900 min-h-screen pt-4 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation (Guzel Style) */}
        <div className="flex items-center justify-between text-xs text-stone-500 py-4 mb-6 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateHome}
              className="hover:text-stone-900 transition"
            >
              Home
            </button>
            <span>&gt;</span>
            <button
              onClick={onNavigateHome}
              className="hover:text-stone-900 transition"
            >
              {product.categoryLabel}
            </button>
            <span>&gt;</span>
            <span className="text-stone-900 font-medium">{product.name}</span>
          </div>

          {/* Prev/Next Product Navigation */}
          {relatedProducts.length > 0 && (
            <div className="flex items-center gap-3 text-stone-600">
              <button
                onClick={() => onSelectProduct(relatedProducts[0])}
                className="hover:text-stone-900 flex items-center gap-1 text-[11px] uppercase tracking-wider"
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </button>
              <span>|</span>
              <button
                onClick={() => onSelectProduct(relatedProducts[0])}
                className="hover:text-stone-900 flex items-center gap-1 text-[11px] uppercase tracking-wider"
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Product Hero Layout: Left Gallery + Right Details (Exact Guzel Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Vertical Thumbnails + Large Main Image (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Vertical Thumbnails (Guzel Style) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 md:w-full aspect-[3/4] rounded-md overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#5a483c] ring-1 ring-[#5a483c]'
                      : 'border-stone-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

            {/* Large Active Photo with Carousel Controls */}
            <div className="relative flex-1 aspect-[3/4] rounded-lg overflow-hidden bg-[#faf7f2] border border-stone-150">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />

              {/* Expand / Zoom Button */}
              <button
                onClick={() => setZoomModalOpen(true)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md transition"
                aria-label="View Fullscreen"
              >
                <Maximize2 size={16} />
              </button>

              {/* Prev / Next Circular Arrows (Guzel Style) */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition"
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Column: Product Metadata, Sizing, and Order Actions (Col 8-12) */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            {/* Category Breadcrumb */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#b83838] font-semibold">
                Category: {product.categoryLabel}
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-1 font-normal tracking-wide">
                {product.name}
              </h1>
            </div>

            {/* In Stock Badge */}
            <div>
              <span className="inline-block px-3 py-1 rounded-[4px] border border-stone-800 text-[11px] font-mono uppercase tracking-widest text-stone-800">
                In Stock
              </span>
            </div>

            {/* Price (Guzel typography: ৳ 7,999) */}
            <div>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {formattedPrice}
              </span>
            </div>

            {/* Key Fabric & Specification Highlight Box */}
            <div className="bg-[#faf7f2] p-4 rounded-lg border border-stone-200 text-xs text-stone-700 space-y-1.5 leading-relaxed">
              <p className="font-semibold text-stone-900">• Premium Bamboo Cotton Blend</p>
              <p>• Artisanal Embroidered Body</p>
              <p>• Handcrafted Clustered Fabric Loop Buttons</p>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-medium tracking-wider text-stone-800">
                  Select Size:
                </span>
                <button
                  onClick={onOpenSizeGuide}
                  className="text-xs text-[#5a483c] hover:underline flex items-center gap-1 font-medium"
                >
                  <Ruler size={13} />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 rounded-lg text-xs font-mono font-bold transition border ${
                      selectedSize === sz
                        ? 'bg-[#5a483c] text-white border-[#5a483c] shadow-sm'
                        : 'bg-white text-stone-800 border-stone-300 hover:border-stone-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase font-medium tracking-wider text-stone-800">
                Quantity:
              </span>
              <div className="inline-flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-1.5 text-stone-600 hover:bg-stone-100 transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-mono font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-1.5 text-stone-600 hover:bg-stone-100 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: Add to Bag & Instagram Inquiry */}
            <div className="space-y-3 pt-2">
              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-lg bg-[#2c221e] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium transition duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <ShoppingBag size={16} className="text-[#dfc29c]" />
                <span>{addedToast ? 'Added to Bag ✓' : `Add Size ${selectedSize} to Bag`}</span>
              </button>

              {/* Instagram Order Direct Link */}
              <a
                href="https://ig.me/m/sehr.bd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs uppercase tracking-[0.18em] font-medium transition duration-300 flex items-center justify-center gap-2"
              >
                <InstagramIcon size={15} className="text-[#5a483c]" />
                <span>Inquire / Order on Instagram (@sehr.bd)</span>
              </a>
            </div>

            {/* Secondary category confirmation */}
            <p className="text-xs text-stone-500 pt-1">
              Category: <span className="text-stone-700 font-medium">{product.categoryLabel}</span>
            </p>

            {/* Two Perk Boxes (Exact Guzel Style from Screenshot 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              <div className="p-4 rounded-lg border border-stone-200 bg-[#faf7f2]/60 text-center space-y-2">
                <Truck size={22} className="mx-auto text-[#5a483c]" />
                <p className="text-[11px] text-stone-700 leading-snug">
                  Estimate delivery time for Eid ul Fitr. All over Bangladesh.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-stone-200 bg-[#faf7f2]/60 text-center space-y-2">
                <RotateCcw size={22} className="mx-auto text-[#5a483c]" />
                <p className="text-[11px] text-stone-700 leading-snug">
                  Complimentary alteration & bespoke sizing assistance upon request.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Fabric & Care Breakdown */}
        <div className="mt-16 pt-10 border-t border-stone-200 max-w-4xl">
          <h3 className="text-xl font-serif font-medium text-stone-900 mb-4">
            Garment Specification & Fabric Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-stone-600 leading-relaxed">
            <div className="space-y-2 bg-[#faf7f2] p-5 rounded-lg border border-stone-200">
              <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
                Artisanal Construction
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                {product.fabricDetails.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 bg-[#faf7f2] p-5 rounded-lg border border-stone-200">
              <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
                Care Instructions
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                {product.careInstructions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Section (Guzel Screenshot 4 Style) */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-stone-200 text-center">
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-8">
              Related Products
            </h2>
            <div className="max-w-md mx-auto">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectProduct(rel)}
                  className="group cursor-pointer text-center space-y-3"
                >
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#faf7f2] border border-stone-200 shadow-sm hover:shadow-lg transition">
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-serif text-stone-900 group-hover:text-[#5a483c] transition">
                    {rel.name}
                  </h3>
                  <p className="text-sm font-serif font-bold text-stone-900">
                    ৳ {rel.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Zoom Modal */}
      {zoomModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setZoomModalOpen(false)}
        >
          <img
            src={product.images[activeImageIndex]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};
