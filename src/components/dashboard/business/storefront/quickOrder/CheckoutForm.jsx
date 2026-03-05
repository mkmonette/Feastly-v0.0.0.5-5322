import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useQuickOrder } from './QuickOrderContext';
import { formatCurrency } from '@/common/currency';

const CheckoutForm = ({ isOpen, onClose }) => {
  const { tokens, cartItems, cartTotal, checkoutData, setCheckoutData, clearCart } = useQuickOrder();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', { checkoutData, cartItems, cartTotal });
    alert('Order placed successfully!');
    clearCart();
    setCheckoutData({ name: '', phone: '', address: '', notes: '' });
    onClose();
  };

  const handleChange = (field, value) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[110]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-[111] bg-white rounded-2xl overflow-hidden"
            style={{ maxHeight: '90vh' }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: tokens.colors.border }}>
                <h2
                  className={`text-xl ${tokens.typography.headingWeight}`}
                  style={{ color: tokens.colors.primaryText }}
                >
                  Checkout
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <SafeIcon icon={FiIcons.FiX} className="text-xl" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-semibold">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between font-bold" style={{ borderColor: tokens.colors.border }}>
                      <span>Total</span>
                      <span style={{ color: tokens.colors.primary }}>{formatCurrency(cartTotal)}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2"
                      style={{
                        borderColor: tokens.colors.border,
                        focusRingColor: tokens.colors.primary
                      }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={checkoutData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2"
                      style={{
                        borderColor: tokens.colors.border,
                        focusRingColor: tokens.colors.primary
                      }}
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={checkoutData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                      style={{
                        borderColor: tokens.colors.border,
                        focusRingColor: tokens.colors.primary
                      }}
                      rows="3"
                      placeholder="123 Main St, City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      value={checkoutData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 resize-none"
                      style={{
                        borderColor: tokens.colors.border,
                        focusRingColor: tokens.colors.primary
                      }}
                      rows="2"
                      placeholder="Any special instructions..."
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full ${tokens.layout.borderRadius.button} py-3 text-base font-bold transition-all hover:opacity-90 active:scale-95 ${tokens.effects.shadow.button}`}
                    style={{
                      backgroundColor: tokens.colors.buttonPrimary,
                      color: tokens.colors.buttonText
                    }}
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutForm;
