import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useHearth } from './HearthContext';
import { formatCurrency } from '@/common/currency';

const CartDrawer = () => {
  const { tokens, cartItems, cartTotal, updateCartQuantity, isCartOpen, setIsCartOpen } = useHearth();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100]"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-96 z-[101] flex flex-col"
            style={{ backgroundColor: tokens.colors.background, borderLeft: `1px solid ${tokens.colors.footerBorder}` }}
          >
            <div className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: `1px solid ${tokens.colors.footerBorder}` }}>
              <h2 className="text-base font-black" style={{ color: tokens.colors.primaryText }}>
                Your Order ({cartItems.length})
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-white/10 transition-all">
                <SafeIcon icon={FiIcons.FiX} className="text-lg" style={{ color: tokens.colors.primaryText }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <SafeIcon icon={FiIcons.FiShoppingBag} className="text-4xl" style={{ color: '#333' }} />
                  <p className="text-sm" style={{ color: tokens.colors.mutedText }}>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image || 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color: tokens.colors.primaryText }}>{item.name}</p>
                        <p className="text-sm font-black" style={{ color: tokens.colors.primary }}>{formatCurrency(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: '#222', color: tokens.colors.primaryText }}
                        >-</button>
                        <span className="text-sm font-black w-4 text-center" style={{ color: tokens.colors.primaryText }}>{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: tokens.colors.primary, color: '#111111' }}
                        >+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="px-6 py-5" style={{ borderTop: `1px solid ${tokens.colors.footerBorder}` }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm" style={{ color: tokens.colors.mutedText }}>Total</span>
                  <span className="text-xl font-black" style={{ color: tokens.colors.primaryText }}>{formatCurrency(cartTotal)}</span>
                </div>
                <button
                  className="w-full py-3.5 rounded-full text-sm font-semibold transition-all hover:opacity-85 active:scale-95"
                  style={{ backgroundColor: tokens.colors.primary, color: '#111111' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
