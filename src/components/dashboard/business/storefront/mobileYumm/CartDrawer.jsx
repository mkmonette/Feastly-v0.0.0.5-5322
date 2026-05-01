import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileYumm } from './MobileYummContext';
import { formatCurrency } from '@/common/currency';

const CartDrawer = () => {
  const { tokens, isCartOpen, setIsCartOpen, cartItems, cartTotal, updateCartQuantity, removeFromCart } = useMobileYumm();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[100]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl"
            style={{ maxHeight: '80vh' }}
          >
            <div className="flex flex-col" style={{ maxHeight: '80vh' }}>
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: tokens.colors.border }}>
                <h2 className="text-lg font-black" style={{ color: tokens.colors.primaryText }}>
                  Your Cart ({cartItems.length})
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-all">
                  <SafeIcon icon={FiIcons.FiX} className="text-lg" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-3">
                {cartItems.length === 0 ? (
                  <div className="text-center py-10">
                    <SafeIcon icon={FiIcons.FiShoppingCart} className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium text-sm">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-3 bg-gray-50 rounded-2xl p-3">
                        <img
                          src={item.image || 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-black truncate" style={{ color: tokens.colors.primaryText }}>
                            {item.name}
                          </h3>
                          <p className="text-sm font-black" style={{ color: tokens.colors.primary }}>
                            {formatCurrency(item.price)}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-white border flex items-center justify-center transition-all"
                              style={{ borderColor: tokens.colors.border }}
                            >
                              <SafeIcon icon={FiIcons.FiMinus} className="text-[10px]" />
                            </button>
                            <span className="text-sm font-black w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white transition-all"
                              style={{ backgroundColor: tokens.colors.primary }}
                            >
                              <SafeIcon icon={FiIcons.FiPlus} className="text-[10px]" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-all self-start"
                        >
                          <SafeIcon icon={FiIcons.FiTrash2} className="text-sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="px-5 py-4 border-t" style={{ borderColor: tokens.colors.border }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-gray-600">Total</span>
                    <span className="text-xl font-black" style={{ color: tokens.colors.primary }}>
                      {formatCurrency(cartTotal)}
                    </span>
                  </div>
                  <button
                    className="w-full py-3.5 rounded-full font-black text-sm text-white transition-all hover:scale-105 active:scale-95 shadow-md"
                    style={{ backgroundColor: tokens.colors.primary }}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
