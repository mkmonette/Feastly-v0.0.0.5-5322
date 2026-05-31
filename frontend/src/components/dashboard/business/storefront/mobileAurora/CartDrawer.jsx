import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileAurora } from './MobileAuroraContext';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80';

const CartDrawer = () => {
  const {
    tokens,
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
  } = useMobileAurora();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 z-[100]"
            style={{ backgroundColor: 'rgba(27,27,58,0.45)', backdropFilter: 'blur(6px)' }}
            data-testid="aurora-cart-overlay"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="absolute bottom-0 left-0 right-0 z-[101] rounded-t-[32px] overflow-hidden flex flex-col"
            style={{
              backgroundColor: tokens.colors.surface,
              maxHeight: '85%',
              boxShadow: tokens.effects.shadow.floating,
            }}
            data-testid="aurora-cart-drawer"
          >
            <div className="px-5 pt-3">
              <div className="w-12 h-1.5 rounded-full mx-auto mb-3" style={{ backgroundColor: tokens.colors.border }} />
            </div>

            <div className="flex items-center justify-between px-5 pb-3" style={{ borderBottom: `1px solid ${tokens.colors.border}` }}>
              <div>
                <h2
                  className="text-lg font-black tracking-tight"
                  style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                >
                  Your bag
                </h2>
                <p className="text-[11px] font-semibold" style={{ color: tokens.colors.textMuted }}>
                  {cartItems.length} item{cartItems.length === 1 ? '' : 's'}
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: tokens.colors.surfaceMuted, color: tokens.colors.text }}
                data-testid="aurora-cart-close"
              >
                <SafeIcon icon={FiIcons.FiX} className="text-base" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-3"
                    style={{ background: tokens.colors.primarySoft, color: tokens.colors.primary }}
                  >
                    <SafeIcon icon={FiIcons.FiShoppingBag} className="text-2xl" />
                  </div>
                  <p className="text-sm font-bold" style={{ color: tokens.colors.text }}>
                    Your bag is empty
                  </p>
                  <p className="text-[12px] font-medium mt-1" style={{ color: tokens.colors.textMuted }}>
                    Tap + on any dish to start an order.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => {
                    const price = item.salePrice || item.price;
                    const img = item.imageUrl || item.image || FALLBACK_IMAGE;
                    return (
                      <div
                        key={item.id}
                        className="flex gap-3 p-2.5 rounded-2xl"
                        style={{
                          backgroundColor: tokens.colors.surfaceMuted,
                        }}
                      >
                        <img
                          src={img}
                          alt={item.name}
                          className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-[13px] font-black truncate"
                            style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                          >
                            {item.name}
                          </h3>
                          <p
                            className="text-[13px] font-black mt-0.5"
                            style={{ color: tokens.colors.primary }}
                          >
                            {formatCurrency(price)}
                          </p>
                          <div
                            className="inline-flex items-center gap-2 mt-1.5 px-1.5 py-1 rounded-full"
                            style={{
                              backgroundColor: tokens.colors.surface,
                              border: `1px solid ${tokens.colors.border}`,
                            }}
                          >
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: tokens.colors.surfaceMuted, color: tokens.colors.text }}
                              data-testid={`aurora-cart-dec-${item.id}`}
                            >
                              <SafeIcon icon={FiIcons.FiMinus} className="text-[10px]" />
                            </button>
                            <span className="text-[12px] font-black w-5 text-center" style={{ color: tokens.colors.text }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                              style={{ background: tokens.colors.auroraGradient }}
                              data-testid={`aurora-cart-inc-${item.id}`}
                            >
                              <SafeIcon icon={FiIcons.FiPlus} className="text-[10px]" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="self-start p-1.5"
                          style={{ color: tokens.colors.danger }}
                          data-testid={`aurora-cart-remove-${item.id}`}
                        >
                          <SafeIcon icon={FiIcons.FiTrash2} className="text-sm" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="px-5 py-4" style={{ borderTop: `1px solid ${tokens.colors.border}` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color: tokens.colors.textMuted }}>
                    Subtotal
                  </span>
                  <span
                    className="text-xl font-black"
                    style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                  >
                    {formatCurrency(cartTotal)}
                  </span>
                </div>
                <button
                  className="w-full py-3.5 rounded-full font-black text-[13px] text-white inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
                  style={{
                    background: tokens.colors.auroraGradient,
                    boxShadow: tokens.effects.shadow.floating,
                  }}
                  data-testid="aurora-cart-checkout"
                >
                  Continue to checkout
                  <SafeIcon icon={FiIcons.FiArrowRight} className="text-base" />
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
