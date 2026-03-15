import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileCompactMenu } from './MobileCompactMenuContext';
import { formatCurrency } from '@/common/currency';

const CartDrawer = () => {
  const { tokens, isCartOpen, setIsCartOpen, cartItems, cartTotal, updateCartQuantity, removeFromCart } = useMobileCompactMenu();

  return (
    <>
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
              className="fixed bottom-0 left-0 right-0 z-[101] md:hidden rounded-t-2xl overflow-hidden"
              style={{ backgroundColor: tokens.colors.background }}
            >
              <div className="max-h-[85vh] flex flex-col">
                <div
                  className="flex items-center justify-between p-4 border-b"
                  style={{ borderColor: tokens.colors.border }}
                >
                  <h2
                    className="text-lg font-extrabold"
                    style={{ color: tokens.colors.primaryText }}
                  >
                    Cart ({cartItems.length})
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <SafeIcon icon={FiIcons.FiX} className="text-xl" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                      <SafeIcon icon={FiIcons.FiShoppingBag} className="text-6xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium text-sm">Cart is empty</p>
                      <p className="text-xs text-gray-400 mt-1">Add items to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cartItems.map(item => (
                        <div
                          key={item.id}
                          className="rounded-lg p-3 transition-all"
                          style={{
                            backgroundColor: tokens.colors.cardBackground,
                            border: `1px solid ${tokens.colors.border}`
                          }}
                        >
                          <div className="flex gap-3 mb-2">
                            <img
                              src={item.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                              alt={item.name}
                              className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3
                                className="text-xs font-extrabold mb-0.5 line-clamp-2"
                                style={{ color: tokens.colors.primaryText }}
                              >
                                {item.name}
                              </h3>
                              <p
                                className="text-base font-extrabold"
                                style={{ color: tokens.colors.primary }}
                              >
                                {formatCurrency(item.price)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all h-fit"
                            >
                              <SafeIcon icon={FiIcons.FiTrash2} style={{ fontSize: '14px' }} />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold bg-gray-100 hover:bg-gray-200 transition-all"
                            >
                              <SafeIcon icon={FiIcons.FiMinus} style={{ fontSize: '12px' }} />
                            </button>
                            <span className="flex-1 text-center font-extrabold">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-white transition-all"
                              style={{ backgroundColor: tokens.colors.primary }}
                            >
                              <SafeIcon icon={FiIcons.FiPlus} style={{ fontSize: '12px' }} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div
                    className="p-4 border-t"
                    style={{ borderColor: tokens.colors.border }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-bold text-gray-700">Total</span>
                      <span
                        className="text-2xl font-extrabold"
                        style={{ color: tokens.colors.primary }}
                      >
                        {formatCurrency(cartTotal)}
                      </span>
                    </div>
                    <button
                      className="w-full py-3 rounded-lg font-extrabold text-sm transition-all hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: tokens.colors.primary,
                        color: tokens.colors.cartButtonText
                      }}
                    >
                      Checkout Now
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div
        className="hidden md:block fixed top-0 right-0 bottom-0 w-96 z-50 overflow-y-auto border-l"
        style={{
          backgroundColor: tokens.colors.background,
          borderColor: tokens.colors.border
        }}
      >
        <div className="h-full flex flex-col">
          <div
            className="flex items-center justify-between p-5 border-b sticky top-0 z-10"
            style={{
              backgroundColor: tokens.colors.background,
              borderColor: tokens.colors.border
            }}
          >
            <h2
              className="text-lg font-extrabold"
              style={{ color: tokens.colors.primaryText }}
            >
              Cart ({cartItems.length})
            </h2>
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: tokens.colors.primary }}
            >
              <SafeIcon icon={FiIcons.FiShoppingBag} className="text-white text-sm" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <SafeIcon icon={FiIcons.FiShoppingBag} className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">Cart is empty</p>
                <p className="text-xs text-gray-400 mt-2">Add items to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    className="rounded-lg p-3 transition-all"
                    style={{
                      backgroundColor: tokens.colors.cardBackground,
                      border: `1px solid ${tokens.colors.border}`
                    }}
                  >
                    <div className="flex gap-3 mb-3">
                      <img
                        src={item.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                        alt={item.name}
                        className="w-18 h-18 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-sm font-extrabold mb-1"
                          style={{ color: tokens.colors.primaryText }}
                        >
                          {item.name}
                        </h3>
                        <p
                          className="text-lg font-extrabold"
                          style={{ color: tokens.colors.primary }}
                        >
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-all h-fit"
                      >
                        <SafeIcon icon={FiIcons.FiTrash2} style={{ fontSize: '14px' }} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold bg-gray-100 hover:bg-gray-200 transition-all"
                      >
                        <SafeIcon icon={FiIcons.FiMinus} style={{ fontSize: '14px' }} />
                      </button>
                      <span className="flex-1 text-center font-extrabold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-white transition-all"
                        style={{ backgroundColor: tokens.colors.primary }}
                      >
                        <SafeIcon icon={FiIcons.FiPlus} style={{ fontSize: '14px' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div
              className="p-5 border-t sticky bottom-0"
              style={{
                backgroundColor: tokens.colors.background,
                borderColor: tokens.colors.border
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-700">Total</span>
                <span
                  className="text-3xl font-extrabold"
                  style={{ color: tokens.colors.primary }}
                >
                  {formatCurrency(cartTotal)}
                </span>
              </div>
              <button
                className="w-full py-4 rounded-lg font-extrabold text-base transition-all hover:scale-105 active:scale-95 shadow-sm"
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: tokens.colors.cartButtonText
                }}
              >
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
