import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileCompactMenu } from './MobileCompactMenuContext';
import { formatCurrency } from '@/common/currency';

const CartDrawer = () => {
  const { tokens, isCartOpen, setIsCartOpen, cartItems, cartTotal, updateCartQuantity, removeFromCart } = useMobileCompactMenu();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[100] md:hidden"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] md:hidden"
            style={{ backgroundColor: tokens.colors.background }}
          >
            <div className="max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: tokens.colors.border }}>
                <h2
                  className="text-xl font-black"
                  style={{ color: tokens.colors.primaryText }}
                >
                  Your Cart ({cartItems.length})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <SafeIcon icon={FiIcons.FiX} className="text-2xl" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiIcons.FiShoppingCart} className="text-5xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map(item => (
                      <div
                        key={item.id}
                        className={`${tokens.layout.borderRadius.card} p-4`}
                        style={{
                          backgroundColor: tokens.colors.cardBackground,
                          border: `1px solid ${tokens.colors.border}`
                        }}
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3
                              className="text-sm font-black truncate"
                              style={{ color: tokens.colors.primaryText }}
                            >
                              {item.name}
                            </h3>
                            <p
                              className="text-base font-black"
                              style={{ color: tokens.colors.primary }}
                            >
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-all"
                          >
                            <SafeIcon icon={FiIcons.FiTrash2} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-black bg-gray-100 hover:bg-gray-200 transition-all"
                          >
                            <SafeIcon icon={FiIcons.FiMinus} />
                          </button>
                          <span className="flex-1 text-center font-black">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white transition-all"
                            style={{ backgroundColor: tokens.colors.primary }}
                          >
                            <SafeIcon icon={FiIcons.FiPlus} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-4 border-t" style={{ borderColor: tokens.colors.border }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-700">Total</span>
                    <span
                      className="text-2xl font-black"
                      style={{ color: tokens.colors.primary }}
                    >
                      {formatCurrency(cartTotal)}
                    </span>
                  </div>
                  <button
                    className={`w-full py-4 ${tokens.layout.borderRadius.button} font-black text-base transition-all hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
                    style={{
                      backgroundColor: tokens.colors.primary,
                      color: tokens.colors.cartButtonText
                    }}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          <div
            className="hidden md:block fixed top-0 right-0 bottom-0 w-96 z-[101] overflow-y-auto"
            style={{ backgroundColor: tokens.colors.background }}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: tokens.colors.border }}>
                <h2
                  className="text-xl font-black"
                  style={{ color: tokens.colors.primaryText }}
                >
                  Your Cart ({cartItems.length})
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                >
                  <SafeIcon icon={FiIcons.FiX} className="text-2xl" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <SafeIcon icon={FiIcons.FiShoppingCart} className="text-5xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div
                        key={item.id}
                        className={`${tokens.layout.borderRadius.card} p-4`}
                        style={{
                          backgroundColor: tokens.colors.cardBackground,
                          border: `1px solid ${tokens.colors.border}`
                        }}
                      >
                        <div className="flex gap-3 mb-3">
                          <img
                            src={item.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3
                              className="text-sm font-black mb-1"
                              style={{ color: tokens.colors.primaryText }}
                            >
                              {item.name}
                            </h3>
                            <p
                              className="text-lg font-black"
                              style={{ color: tokens.colors.primary }}
                            >
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-all h-fit"
                          >
                            <SafeIcon icon={FiIcons.FiTrash2} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 rounded-lg flex items-center justify-center font-black bg-gray-100 hover:bg-gray-200 transition-all"
                          >
                            <SafeIcon icon={FiIcons.FiMinus} />
                          </button>
                          <span className="flex-1 text-center font-black text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-white transition-all"
                            style={{ backgroundColor: tokens.colors.primary }}
                          >
                            <SafeIcon icon={FiIcons.FiPlus} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t" style={{ borderColor: tokens.colors.border }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-gray-700">Total</span>
                    <span
                      className="text-3xl font-black"
                      style={{ color: tokens.colors.primary }}
                    >
                      {formatCurrency(cartTotal)}
                    </span>
                  </div>
                  <button
                    className={`w-full py-4 ${tokens.layout.borderRadius.button} font-black text-base transition-all hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
                    style={{
                      backgroundColor: tokens.colors.primary,
                      color: tokens.colors.cartButtonText
                    }}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
