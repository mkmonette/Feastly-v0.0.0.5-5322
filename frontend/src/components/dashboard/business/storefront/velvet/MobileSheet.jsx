import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useVelvet } from './VelvetContext';
import OrderCard from './OrderCard';
import { formatCurrency } from '@/common/currency';

const MobileSheet = () => {
  const { tokens, isCartOpen, setIsCartOpen, cartItemCount, cartTotal } = useVelvet();

  return (
    <>
      {/* Sticky mobile cart bar */}
      <div
        className="lg:hidden sticky bottom-0 z-30 px-5 pt-3 pb-4"
        style={{
          backgroundColor: 'rgba(31,19,32,0.92)',
          borderTop: `1px solid ${tokens.colors.border}`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full inline-flex items-center justify-between gap-3 px-4 py-3.5 rounded-full transition-all hover:scale-[1.01] active:scale-95"
          style={{
            backgroundColor: tokens.colors.primary,
            color: tokens.colors.textOnGold,
            boxShadow: tokens.effects.shadow.gold,
          }}
          data-testid="velvet-mobile-cart-bar"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-black"
              style={{ backgroundColor: tokens.colors.background, color: tokens.colors.primary }}
            >
              {cartItemCount}
            </div>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.28em]"
              style={{ fontFamily: tokens.typography.fontMono }}
            >
              {cartItemCount === 0 ? 'Begin your order' : 'Review your order'}
            </span>
          </div>
          <span
            className="text-[16px]"
            style={{ fontFamily: tokens.typography.fontDisplay, fontWeight: 500 }}
          >
            {cartTotal > 0 ? formatCurrency(cartTotal) : '—'}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[100]"
              style={{
                backgroundColor: 'rgba(15,8,16,0.65)',
                backdropFilter: 'blur(8px)',
              }}
              data-testid="velvet-mobile-overlay"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-[101] rounded-t-[24px] overflow-hidden"
              style={{
                backgroundColor: tokens.colors.background,
                maxHeight: '88vh',
                borderTop: `1px solid ${tokens.colors.borderStrong}`,
              }}
              data-testid="velvet-mobile-sheet"
            >
              <div className="px-5 pt-3 pb-1 flex items-center justify-between">
                <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: tokens.colors.border }} />
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    border: `1px solid ${tokens.colors.border}`,
                    color: tokens.colors.text,
                  }}
                  data-testid="velvet-mobile-close"
                >
                  <SafeIcon icon={FiIcons.FiX} className="text-base" />
                </button>
              </div>
              <div style={{ maxHeight: '80vh', overflow: 'auto' }} className="p-4 pt-2">
                <OrderCard />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileSheet;
