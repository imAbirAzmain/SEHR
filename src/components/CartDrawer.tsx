import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Tag, Truck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    freeShippingThreshold,
    tailoringNote,
    setTailoringNote,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  const formattedCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0
    }).format(amount).replace('BDT', '৳');
  };

  // Build WhatsApp Bag summary
  const generateWhatsAppOrderText = () => {
    let text = `Hello SEHR Atelier,\nI would like to place an order for the following items:\n\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. ${item.product.name}\n   Size: ${item.size} | Qty: ${item.quantity} | Price: ${formattedCurrency(item.product.price * item.quantity)}\n`;
    });
    text += `\nSubtotal: ${formattedCurrency(subtotal)}`;
    if (discountAmount > 0) {
      text += `\nDiscount: -${formattedCurrency(discountAmount)} (${couponCode})`;
    }
    text += `\nShipping: ${shippingFee === 0 ? 'Complimentary' : formattedCurrency(shippingFee)}`;
    text += `\nTotal: ${formattedCurrency(total)}`;
    if (tailoringNote.trim()) {
      text += `\n\nTailoring / Fitting Notes:\n${tailoringNote.trim()}`;
    }
    text += `\n\nPlease confirm availability and payment details. Thank you!`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Window */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="p-5 border-b border-brand-border bg-brand-cream flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-brand-dark" />
            <h2 className="text-lg font-serif font-semibold text-brand-dark">
              Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full text-stone-500 hover:text-brand-dark hover:bg-stone-200 transition"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-brand-sand/60 px-5 py-3 border-b border-brand-border text-xs">
          <div className="flex items-center justify-between font-medium text-stone-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-brand-gold" />
              {subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-700 font-semibold">
                  Complimentary Express Shipping Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-brand-dark">{formattedCurrency(remainingForFreeShipping)}</strong> for Complimentary Express Delivery
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] text-stone-500">{progressPercent}%</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-gold h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-sand flex items-center justify-center text-stone-400">
                <ShoppingBag size={32} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-brand-dark">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs font-light">
                  Explore our debut Eid ul Fitr 2026 presentation and discover timeless silhouettes.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 bg-brand-dark text-white rounded text-xs uppercase tracking-widest hover:bg-brand-espresso transition"
              >
                Browse Creations
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 p-3 bg-brand-cream/40 rounded-xl border border-brand-border/60 hover:border-brand-border transition"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0] || '/images/burgundy_panjabi.png'}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-top rounded-lg bg-stone-100 flex-shrink-0"
                  />

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs sm:text-sm font-serif font-medium text-brand-dark line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-stone-400 hover:text-rose-600 transition p-1"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-mono px-2 py-0.5 bg-brand-sand rounded text-brand-dark font-semibold">
                          Size: {item.size}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {formattedCurrency(item.product.price)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Total for Item */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-border/40">
                      <div className="inline-flex items-center border border-brand-border rounded bg-white text-xs">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.quantity - 1)
                          }
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-mono font-bold text-brand-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-serif font-bold text-brand-charcoal">
                        {formattedCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bespoke Tailoring & Fitting Notes */}
              <div className="pt-2">
                <label className="block text-xs font-medium uppercase tracking-wider text-stone-700 mb-1">
                  Tailoring & Alteration Instructions (Optional)
                </label>
                <textarea
                  value={tailoringNote}
                  onChange={(e) => setTailoringNote(e.target.value)}
                  placeholder="Specify custom length, chest adjustments, or delivery notes..."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-gold transition"
                />
              </div>

              {/* Promo Code Accordion */}
              <div className="pt-1">
                {couponCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag size={13} />
                      <span>Coupon <strong>{couponCode}</strong> applied (-{couponDiscount}%)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:underline font-bold text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. EID2026)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-brand-border focus:outline-none focus:border-brand-gold uppercase tracking-wider font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-brand-dark text-white rounded-lg text-xs uppercase tracking-wider font-medium hover:bg-brand-espresso transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && !couponCode && (
                  <p className="text-[11px] text-rose-600 mt-1">{couponFeedback.message}</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer / Checkout Actions */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-brand-border bg-brand-cream/90 space-y-3.5">
            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-serif font-medium text-brand-dark">
                  {formattedCurrency(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promotional Discount</span>
                  <span>-{formattedCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping (Express Delivery)</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-medium">Complimentary</span>
                  ) : (
                    formattedCurrency(shippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm sm:text-base font-serif font-bold text-brand-dark pt-2 border-t border-brand-border">
                <span>Total Amount</span>
                <span>{formattedCurrency(total)}</span>
              </div>
            </div>

            {/* Buttons: Checkout & WhatsApp */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  closeCart();
                  onCheckout();
                }}
                className="w-full py-3.5 bg-brand-dark hover:bg-brand-espresso text-white rounded-lg text-xs uppercase tracking-[0.2em] font-medium transition duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={15} className="text-brand-gold" />
              </button>

              <a
                href={`https://wa.me/8801700000000?text=${generateWhatsAppOrderText()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-brand-amber hover:bg-amber-900 text-white rounded-lg text-xs uppercase tracking-[0.15em] font-medium transition duration-300 flex items-center justify-center gap-2 shadow-sm border border-amber-800"
              >
                <MessageCircle size={15} />
                <span>Order Bag via WhatsApp</span>
              </a>
            </div>

            <p className="text-[10px] text-center text-stone-500 uppercase tracking-widest font-sans">
              Encrypted Checkout • Cash on Delivery / bKash / Cards
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
