import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, MessageCircle } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface HeaderProps {
  onSearchClick: () => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectProductByName?: (name: string) => void;
  isTransparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onNavigateSection,
  onSelectProductByName,
  isTransparent = true
}) => {
  const { openCart, totalItemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparentActive = isTransparent && !isScrolled;

  const navLinks = [
    { label: 'All Products', target: 'shop-catalog' },
    { label: "Echoes of Grace’26", target: 'shop-catalog' },
    { label: 'Azhar', isProduct: true, productName: 'Azhar' },
    { label: 'Yazeer', isProduct: true, productName: 'Yazeer' },
    { label: 'Campaign Lookbook', target: 'lookbook' },
    { label: 'Store Location', target: 'atelier-location' },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (link.isProduct && onSelectProductByName) {
      onSelectProductByName(link.productName!);
    } else if (link.target) {
      onNavigateSection(link.target);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          transparentActive
            ? 'bg-transparent text-white py-5'
            : 'bg-white/98 text-stone-900 py-3.5 shadow-sm border-b border-stone-200 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Trigger & Desktop Navigation (Guzel Style) */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden p-1.5 transition ${
                  transparentActive ? 'text-white hover:text-[#dfc29c]' : 'text-stone-800 hover:text-[#5a483c]'
                }`}
                aria-label="Open mobile menu"
              >
                <Menu size={22} />
              </button>

              <nav className="hidden lg:flex items-center space-x-7 text-[12px] tracking-[0.14em] uppercase font-medium">
                {navLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLinkClick(link)}
                    className={`transition-colors duration-200 relative group py-1 ${
                      transparentActive
                        ? 'text-white/90 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                        : 'text-stone-700 hover:text-[#5a483c]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                        transparentActive ? 'bg-white' : 'bg-[#5a483c]'
                      }`}
                    />
                  </button>
                ))}
              </nav>
            </div>

            {/* Center: Brand Name S E H R (Exact Guzel Style) */}
            <div className="flex-1 lg:flex-initial text-center lg:px-6">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSection('hero');
                }}
                className="inline-flex flex-col items-center group cursor-pointer"
              >
                <span
                  className={`font-serif font-bold text-2xl sm:text-3xl tracking-[0.35em] uppercase transition-colors ${
                    transparentActive
                      ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]'
                      : 'text-[#2c221e]'
                  }`}
                >
                  S E H R
                </span>
              </a>
            </div>

            {/* Right: Actions (Search, Wishlist, Bag) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search */}
              <button
                onClick={onSearchClick}
                className={`p-2 transition ${
                  transparentActive
                    ? 'text-white hover:text-[#dfc29c] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                    : 'text-stone-700 hover:text-[#5a483c]'
                }`}
                aria-label="Search"
                title="Search"
              >
                <Search size={19} />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => onNavigateSection('shop-catalog')}
                className={`relative p-2 transition ${
                  transparentActive
                    ? 'text-white hover:text-[#dfc29c] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                    : 'text-stone-700 hover:text-[#5a483c]'
                }`}
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart size={19} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#5a483c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={openCart}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded transition shadow-sm ${
                  transparentActive
                    ? 'bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/25'
                    : 'bg-[#2c221e] hover:bg-[#5a483c] text-white'
                }`}
                aria-label="Shopping bag"
              >
                <ShoppingBag size={17} className={transparentActive ? 'text-white' : 'text-[#dfc29c]'} />
                <span className="hidden sm:inline text-[11px] tracking-widest uppercase font-medium">Bag</span>
                {totalItemsCount > 0 && (
                  <span className="bg-[#dfc29c] text-[#2c221e] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-full max-w-xs bg-white h-full flex flex-col justify-between p-6 shadow-2xl z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-200">
                <span className="font-serif font-bold text-2xl tracking-[0.3em] text-[#2c221e] uppercase">
                  S E H R
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-900 transition"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <p className="text-[10px] uppercase tracking-widest text-[#5a483c] font-bold">
                  Collections
                </p>
                <div className="space-y-3">
                  {navLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLinkClick(link)}
                      className="block w-full text-left py-2 text-base font-serif tracking-wider text-stone-800 hover:text-[#5a483c] transition"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 space-y-4">
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#603500] hover:bg-[#4a2800] text-white rounded-lg text-xs font-semibold tracking-widest uppercase transition shadow"
              >
                <MessageCircle size={16} />
                <span>Order via WhatsApp</span>
              </a>

              <div className="flex items-center justify-center gap-4 text-stone-500 text-xs">
                <a
                  href="https://www.instagram.com/sehr.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-stone-900 transition"
                >
                  <InstagramIcon size={14} className="text-[#5a483c]" />
                  <span>@sehr.bd</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
