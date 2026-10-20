import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CollectionFilter } from './components/CollectionFilter';
import { ProductCard } from './components/ProductCard';
import { ProductPage } from './components/ProductPage';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { BrandStory } from './components/BrandStory';
import { EditorialLookbook } from './components/EditorialLookbook';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CategoryFilter, SortOption } from './types';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { MessageCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  // Navigation View: 'home' | 'product'
  const [currentView, setCurrentView] = useState<'home' | 'product'>('home');
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[0]);

  // Filters state
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter products for homepage showcase
  const displayedProducts = PRODUCTS.filter(p => {
    if (activeCategory === 'azhar') return p.id === 'sehr-azhar';
    if (activeCategory === 'yazeer') return p.id === 'sehr-yazeer';
    if (selectedSize) return p.sizes.includes(selectedSize);
    return true;
  });

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenProductPage = (product: Product) => {
    setActiveProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductByName = (name: string) => {
    const found = PRODUCTS.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (found) {
      handleOpenProductPage(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1c1917] antialiased">
      {/* 1. Header (Transparent on Home, Solid on Product Page) */}
      <Header
        onSearchClick={() => setIsSearchOpen(true)}
        onNavigateSection={handleNavigateSection}
        onSelectProductByName={handleSelectProductByName}
        isTransparent={currentView === 'home'}
      />

      <main className="flex-1">
        {currentView === 'home' ? (
          <>
            {/* 2. Hero Section with 1st pic.png and SEHR typography */}
            <HeroSection
              onExploreClick={() => handleNavigateSection('shop-catalog')}
              onLookbookClick={() => handleNavigateSection('lookbook')}
            />

            {/* 3. Main Shop Showcase: Azhar & Yazeer (Guzel Screenshot 2 Style) */}
            <section id="shop-catalog" className="py-16 sm:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#5a483c] font-semibold">
                    Eid ul Fitr 2026 Collection
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-stone-900">
                    Echoes of Grace
                  </h2>
                </div>

                {/* 2-Column Product Showcase (Guzel Edge-to-Edge Style) */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenProductPage={handleOpenProductPage}
                      onQuickView={(p) => setQuickViewProduct(p)}
                      onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Campaign Lookbook (Editorial Photography) */}
            <EditorialLookbook
              onSelectCollection={() => handleNavigateSection('shop-catalog')}
            />

            {/* 5. Brand Story, Craftsmanship & Atelier Location */}
            <BrandStory />
          </>
        ) : (
          /* Product Detail View (Exact Guzel Screenshot 3 & 4 Layout) */
          <div className="pt-16 sm:pt-20">
            <ProductPage
              product={activeProduct}
              onNavigateHome={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectProduct={(p) => handleOpenProductPage(p)}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            />
          </div>
        )}
      </main>

      {/* 8. Comprehensive Footer */}
      <div id="footer-location">
        <Footer
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onNavigateSection={handleNavigateSection}
        />
      </div>

      {/* Floating WhatsApp Quick Order Button */}
      <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 left-6 z-30">
        <a
          href="https://wa.me/8801700000000?text=Hello%20SEHR,%20I%20would%20like%20to%20place%20an%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#603500] hover:bg-[#4a2800] text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-xs font-semibold tracking-wider uppercase group border border-[#482700]"
          title="Order via WhatsApp"
        >
          <MessageCircle size={18} className="text-white group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">WhatsApp Order</span>
        </a>
      </aside>

      {/* Modals & Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <CartDrawer
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => handleOpenProductPage(p)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <WishlistProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </WishlistProvider>
  );
};

export default App;
