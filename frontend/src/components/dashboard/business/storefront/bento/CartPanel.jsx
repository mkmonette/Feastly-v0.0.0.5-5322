import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useBento } from './BentoContext';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80';

const CartPanel = () => {
  const {
    tokens,
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartSubtotal,
    cartItemCount,
    updateCartQuantity,
    removeFromCart,
  } = useBento();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[100]"
            style={{
              backgroundColor: 'rgba(15,23,42,0.4)',
              backdropFilter: 'blur(6px)',
            }}
            data-testid="bento-cart-overlay"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full sm:w-[420px] flex flex-col"
            style={{
              backgroundColor: tokens.colors.surface,
              borderLeft: `1px solid ${tokens.colors.border}`,
            }}
            data-testid="bento-cart-panel"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: `1px solid ${tokens.colors.border}` }}
            >
              <div>
                <div
                  className="text-[10px] font-black uppercase tracking-[0.28em]"
                  style={{ color: tokens.colors.textMuted }}
                >
                  Your bento box
                </div>
                <div
                  className="text-[22px] font-black leading-tight tracking-tight mt-0.5"
                  style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                >
                  {cartItemCount} item{cartItemCount === 1 ? '' : 's'}
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: tokens.colors.surfaceMuted,
                  color: tokens.colors.text,
                }}
                data-testid="bento-cart-close"
              >
                <SafeIcon icon={FiIcons.FiX} className="text-base" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <div
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: tokens.colors.surfaceMuted,
                      color: tokens.colors.text,
                    }}
                  >
                    <SafeIcon icon={FiIcons.FiBox} className="text-2xl" />
                  </div>
                  <p
                    className="text-[14px] font-black tracking-tight"
                    style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                  >
                    Your bento is empty
                  </p>
                  <p className="text-[12px] font-medium mt-1" style={{ color: tokens.colors.textMuted }}>
                    Tap any tile to fill it up.
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
                        className="flex items-center gap-3 p-3 rounded-2xl"
                        style={{
                          backgroundColor: tokens.colors.background,
                          border: `1px solid ${tokens.colors.border}`,
                        }}
                      >
                        <img
                          src={img}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-[13px] font-black truncate"
                            style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                          >
                            {item.name}
                          </div>
                          <div
                            className="text-[12px] font-black mt-0.5"
                            style={{ color: tokens.colors.primary }}
                          >
                            {formatCurrency(price * item.quantity)}
                          </div>
                        </div>
                        <div
                          className="inline-flex items-center gap-1.5 px-1 py-1 rounded-full"
                          style={{
                            backgroundColor: tokens.colors.surface,
                            border: `1px solid ${tokens.colors.border}`,
                          }}
                        >
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ color: tokens.colors.text }}
                            data-testid={`bento-cart-dec-${item.id}`}
                          >
                            <SafeIcon icon={item.quantity === 1 ? FiIcons.FiTrash2 : FiIcons.FiMinus} className="text-[10px]" />
                          </button>
                          <span className="text-[11px] font-black w-3 text-center" style={{ color: tokens.colors.text }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: tokens.colors.surfaceInk }}
                            data-testid={`bento-cart-inc-${item.id}`}
                          >
                            <SafeIcon icon={FiIcons.FiPlus} className="text-[10px]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="px-5 py-4"
              style={{ borderTop: `1px solid ${tokens.colors.border}` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[11px] font-black uppercase tracking-[0.24em]"
                  style={{ color: tokens.colors.textMuted }}
                >
                  Subtotal
                </span>
                <span
                  className="text-[24px] font-black"
                  style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                >
                  {formatCurrency(cartSubtotal)}
                </span>
              </div>
              <button
                disabled={cartItems.length === 0}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-[12px] font-black uppercase tracking-widest text-white transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: tokens.colors.primary,
                  boxShadow: tokens.effects.shadow.brand,
                }}
                data-testid="bento-cart-checkout"
              >
                Checkout
                <SafeIcon icon={FiIcons.FiArrowRight} className="text-base" />
              </button>
              <p className="text-[10px] font-bold uppercase tracking-widest text-center mt-3" style={{ color: tokens.colors.textMuted }}>
                Free pickup · Delivery from ₱49
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;
