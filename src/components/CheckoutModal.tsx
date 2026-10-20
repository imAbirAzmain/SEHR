import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Banknote, Smartphone, Copy, Check, Phone } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, subtotal, discountAmount, shippingFee, total, tailoringNote, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    district: 'Dhaka',
    address: '',
    cityArea: '',
    paymentMethod: 'cod', // 'cod' | 'bkash' | 'nagad' | 'card'
    deliveryLocation: 'inside-dhaka' // 'inside-dhaka' | 'outside-dhaka' | 'international'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  if (!isOpen) return null;

  const formattedCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0
    }).format(amount).replace('BDT', '৳');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `SEHR-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedOrderId(generatedId);
      setOrderConfirmed(true);
      clearCart();
    }, 800);
  };

  const generateReceiptText = () => {
    return `SEHR Atelier Order Receipt\nOrder ID: ${confirmedOrderId}\nCustomer: ${formData.fullName}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.cityArea}, ${formData.district}\nPayment: ${formData.paymentMethod.toUpperCase()}\nTotal Paid/Due: ${formattedCurrency(total)}\nThank you for choosing SEHR.`;
  };

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(generateReceiptText());
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => !orderConfirmed && onClose()}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-brand-border bg-brand-cream flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-brand-dark">
              {orderConfirmed ? 'Order Confirmed' : 'Checkout & Bespoke Dispatch'}
            </h2>
            <p className="text-xs text-stone-500 font-light mt-0.5">
              SEHR Dhaka Atelier • Concierge Delivery
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-500 hover:text-brand-dark hover:bg-stone-200 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {orderConfirmed ? (
            /* Order Success State */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={36} />
              </div>

              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-brand-gold bg-brand-dark px-3 py-1 rounded">
                  Order ID: {confirmedOrderId}
                </span>
                <h3 className="text-2xl font-serif font-semibold text-brand-dark mt-3">
                  Thank You, {formData.fullName || 'Esteemed Patron'}
                </h3>
                <p className="text-xs text-stone-600 mt-2 max-w-md mx-auto font-light leading-relaxed">
                  Your bespoke ensemble from the <strong>Eid ul Fitr 2026</strong> collection is being prepared at our Dhaka atelier. Our concierge team will reach out to you at <strong>{formData.phone}</strong> prior to dispatch.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="bg-brand-cream p-4 rounded-xl border border-brand-border text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between font-bold text-brand-dark pb-2 border-b border-brand-border">
                  <span>Order Total:</span>
                  <span>{formattedCurrency(total)}</span>
                </div>
                <div className="text-stone-600 space-y-1">
                  <p><strong>Delivery Location:</strong> {formData.address}, {formData.cityArea}, {formData.district}</p>
                  <p><strong>Payment Choice:</strong> {formData.paymentMethod.toUpperCase()}</p>
                  {tailoringNote && (
                    <p><strong>Fitting Instructions:</strong> {tailoringNote}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <a
                  href="https://ig.me/m/sehr.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 bg-[#2c221e] hover:bg-black text-white rounded-lg text-xs font-medium uppercase tracking-wider transition flex items-center justify-center gap-2 shadow"
                >
                  <InstagramIcon size={16} />
                  <span>Order Support on Instagram</span>
                </a>

                <button
                  onClick={handleCopyReceipt}
                  className="w-full sm:w-auto px-5 py-3 bg-brand-sand hover:bg-stone-200 text-brand-dark rounded-lg text-xs font-medium uppercase tracking-wider transition flex items-center justify-center gap-2 border border-brand-border"
                >
                  {copiedReceipt ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                  <span>{copiedReceipt ? 'Receipt Copied' : 'Copy Receipt'}</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="text-xs text-stone-500 hover:text-brand-dark underline font-medium pt-2"
              >
                Return to Storefront
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Customer Contact */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-muted">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full text-xs p-2.5 rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Mobile Number (BD) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+880 17XX XXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full text-xs p-2.5 rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="tanvir@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2.5 rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-3 pt-3 border-t border-brand-border/60">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-muted">
                  2. Shipping Destination
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Division / District *
                    </label>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full text-xs p-2.5 rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-gold"
                    >
                      <option value="Dhaka">Dhaka Metro</option>
                      <option value="Chattogram">Chattogram</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barishal">Barishal</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                      <option value="International">International (Global Express)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Area / Thana *
                    </label>
                    <input
                      type="text"
                      name="cityArea"
                      required
                      placeholder="e.g. Gulshan, Dhanmondi, Uttara, Banani"
                      value={formData.cityArea}
                      onChange={handleInputChange}
                      className="w-full text-xs p-2.5 rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Complete Street Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    placeholder="House number, Road number, Apartment/Floor..."
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2.5 rounded-lg border border-brand-border bg-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 pt-3 border-t border-brand-border/60">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-muted">
                  3. Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition text-xs ${
                      formData.paymentMethod === 'cod'
                        ? 'border-brand-dark bg-brand-cream/80 font-semibold'
                        : 'border-brand-border hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-brand-dark"
                    />
                    <Banknote size={16} className="text-emerald-700" />
                    <span>Cash on Delivery</span>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition text-xs ${
                      formData.paymentMethod === 'bkash'
                        ? 'border-brand-dark bg-brand-cream/80 font-semibold'
                        : 'border-brand-border hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bkash"
                      checked={formData.paymentMethod === 'bkash'}
                      onChange={handleInputChange}
                      className="text-brand-dark"
                    />
                    <Smartphone size={16} className="text-pink-600" />
                    <span>bKash / Nagad</span>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition text-xs ${
                      formData.paymentMethod === 'card'
                        ? 'border-brand-dark bg-brand-cream/80 font-semibold'
                        : 'border-brand-border hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="text-brand-dark"
                    />
                    <CreditCard size={16} className="text-indigo-600" />
                    <span>Card / Online</span>
                  </label>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="p-4 bg-brand-cream rounded-xl border border-brand-border space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Items ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                  <span>{formattedCurrency(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-{formattedCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : formattedCurrency(shippingFee)}</span>
                </div>
                <div className="flex justify-between font-serif text-base font-bold text-brand-dark pt-2 border-t border-brand-border">
                  <span>Grand Total</span>
                  <span>{formattedCurrency(total)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 bg-brand-dark hover:bg-brand-espresso text-white rounded-lg text-xs uppercase tracking-[0.2em] font-medium transition duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                <ShieldCheck size={16} className="text-brand-gold" />
                <span>{isSubmitting ? 'Securing Order...' : `Confirm Order (${formattedCurrency(total)})`}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
