import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useQuickOrder } from './QuickOrderContext';
import { formatCurrency } from '@/common/currency';
import CheckoutForm from './CheckoutForm';

const CartPanel = () => {
  const { tokens, cartItems, cartTotal, updateCartQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useQuickOrder();
  const [showCheckout, setShowCheckout] = useState(false);

  const CartContent = () => (
    <>
      <div className="flex items-center justify-between mb-4 pb-4 border-b" style={{ borderColor: tokens.colors.border }}>
        <h2
          className={`text-lg ${tokens.typography.headingWeight}`}
          style={{ color: tokens.colors.primaryText }}
        >
          Your Order ({cartItems.length})
        </h2>
        <button
          onClick={() => setIsCartOpen(false)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          <SafeIcon icon={FiIcons.FiX} className="text-xl" />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <SafeIcon icon={FiIcons.FiShoppingCart} className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-medium">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            {cartItems.map(item => (
              <div
                key={item.id}
                className={`${tokens.layout.borderRadius.card} p-3 border`}
                style={{
                  backgroundColor: tokens.colors.cardBackground,
                  borderColor: tokens.colors.border
                }}
              >
                <div className="flex gap-3 mb-3">
                  <img
                    src={item.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-sm font-semibold mb-1 line-clamp-1"
                      style={{ color: tokens.colors.primaryText }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-base font-bold"
                      style={{ color: tokens.colors.primary }}
                    >
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-all h-fit"
                  >
                    <SafeIcon icon={FiIcons.FiTrash2} className="text-sm" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded flex items-center justify-center font-bold bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    <SafeIcon icon={FiIcons.FiMinus} className="text-sm" />
                  </button>
                  <span className="flex-1 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded flex items-center justify-center font-bold text-white transition-all"
                    style={{ backgroundColor: tokens.colors.primary }}
                  >
                    <SafeIcon icon={FiIcons.FiPlus} className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4" style={{ borderColor: tokens.colors.border }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-semibold text-gray-700">Total</span>
              <span
                className="text-2xl font-bold"
                style={{ color: tokens.colors.primary }}
              >
                {formatCurrency(cartTotal)}
              </span>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className={`w-full ${tokens.layout.borderRadius.button} py-3 text-sm font-bold transition-all hover:opacity-90 active:scale-95 ${tokens.effects.shadow.button}`}
              style={{
                backgroundColor: tokens.colors.buttonPrimary,
                color: tokens.colors.buttonText
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="hidden md:block sticky top-[169px] h-[calc(100vh-185px)]">
        <div
          className={`h-full ${tokens.layout.borderRadius.card} p-4 flex flex-col ${tokens.effects.shadow.panel}`}
          style={{
            backgroundColor: tokens.colors.cartBg,
            border: `1px solid ${tokens.colors.border}`
          }}
        >
          <CartContent />
        </div>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-[100]"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl"
              style={{ maxHeight: '85vh' }}
            >
              <div className="flex flex-col h-full p-4">
                <CartContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutForm isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
    </>
  );
};

export default CartPanel;
