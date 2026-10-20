import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, Ruler, ShoppingBag, MessageCircle, Heart, Truck, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenSizeGuide
}) => {
  if (!isOpen || !product) return null;

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '40');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const isFavorited = isInWishlist(product.id);
  const formattedPrice = `৳ ${product.price.toLocaleString()}`;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
      onClose();
    }, 600);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello SEHR Atelier,\nI would like to order "${product.name} | Echoes of Grace" in Size ${selectedSize} (Quantity: ${quantity}) - ${formattedPrice}.\nPlease confirm order processing.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden max-h-[92vh] flex flex-col md:flex-row border border-stone-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-black transition shadow-sm backdrop-blur-md"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Left: Gallery Column */}
        <div className="w-full md:w-1/2 bg-[#faf7f2] p-4 sm:p-6 flex flex-col justify-between overflow-y-auto">
          {/* Main Selected Image */}
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-inner border border-stone-200">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-[#5a483c] text-white rounded-[4px] shadow">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-16 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition ${
                    selectedImage === img
                      ? 'border-[#5a483c] ring-2 ring-[#c38361]/50'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Order Configuration */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          <div className="space-y-4">
            {/* Category & Wishlist */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#5a483c] font-semibold">
                {product.tagline}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 rounded-full transition ${
                  isFavorited
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-stone-400 hover:text-stone-700 bg-stone-50'
                }`}
                title="Wishlist"
              >
                <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900">
                {product.name}
              </h2>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-serif font-bold text-[#2c221e]">
                  {formattedPrice}
                </span>
                <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Ready for Dispatch
                </span>
              </div>
            </div>

            {/* Bullets Highlight */}
            <div className="bg-[#faf7f2] p-3 rounded-lg border border-stone-200 text-xs text-stone-700 space-y-1">
              <p className="font-semibold text-stone-900">• Premium Bamboo Cotton Blend</p>
              <p>• Artisanal Embroidered Body</p>
              <p>• Distinctive Handcrafted Clustered Buttons</p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              {product.description}
            </p>

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
                    className={`py-2 rounded-lg text-xs font-mono font-bold transition border ${
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

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase font-medium tracking-wider text-stone-800">
                Quantity:
              </span>
              <div className="inline-flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-stone-600 hover:bg-stone-100 transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-mono font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-stone-600 hover:bg-stone-100 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons: WhatsApp (Guzel Style) + Bag */}
            <div className="space-y-2.5 pt-2">
              <a
                href={`https://wa.me/8801700000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-lg bg-[#603500] hover:bg-[#4a2800] text-white text-xs uppercase tracking-[0.18em] font-semibold transition duration-300 flex items-center justify-center gap-2 shadow-md border border-[#482700]"
              >
                <MessageCircle size={16} />
                <span>Order via WhatsApp (1-Click)</span>
              </a>

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-lg border border-[#2c221e] bg-[#2c221e] hover:bg-black text-white text-xs uppercase tracking-[0.18em] font-medium transition duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag size={16} className="text-[#dfc29c]" />
                <span>{addedToast ? 'Added to Bag ✓' : `Add Size ${selectedSize} to Bag`}</span>
              </button>
            </div>

            {/* Tabs for Fabric Details / Care / Shipping */}
            <div className="pt-3 border-t border-stone-200">
              <div className="flex border-b border-stone-200 text-xs">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 px-3 font-medium tracking-wider uppercase border-b-2 transition ${
                    activeTab === 'details'
                      ? 'border-[#5a483c] text-[#5a483c]'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Fabric & Craft
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 px-3 font-medium tracking-wider uppercase border-b-2 transition ${
                    activeTab === 'care'
                      ? 'border-[#5a483c] text-[#5a483c]'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Garment Care
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 px-3 font-medium tracking-wider uppercase border-b-2 transition ${
                    activeTab === 'shipping'
                      ? 'border-[#5a483c] text-[#5a483c]'
                      : 'border-transparent text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Delivery
                </button>
              </div>

              <div className="py-3 text-xs text-stone-600 leading-relaxed font-light">
                {activeTab === 'details' && (
                  <ul className="space-y-1 list-disc list-inside">
                    {product.fabricDetails.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'care' && (
                  <ul className="space-y-1 list-disc list-inside">
                    {product.careInstructions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-1.5">
                    <p className="flex items-center gap-1.5 text-stone-800 font-medium">
                      <Truck size={13} className="text-[#5a483c]" />
                      <span>Dhaka Metro: 24 - 48 Hours Express</span>
                    </p>
                    <p>Nationwide Bangladesh: 2 - 3 Business Days via Express Courier.</p>
                    <p>International Express (DHL/FedEx): 5 - 7 Days to UK, USA, UAE, Canada.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
