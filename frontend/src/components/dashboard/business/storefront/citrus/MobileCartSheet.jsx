import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useCitrus } from './CitrusContext';
import OrderSidebar from './OrderSidebar';

const MobileCartSheet = () => {
  const { tokens, isCartOpen, setIsCartOpen, cartItemCount, cartTotal } = useCitrus();

  return (
    <>
      {/* Always-visible bottom action bar on mobile */}
      <div
        className="lg:hidden sticky bottom-0 z-30 px-4 pt-3 pb-4"
        style={{
          backgroundColor: tokens.colors.background,
          borderTop: tokens.effects.border,
        }}
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full inline-flex items-center justify-between gap-3 px-4 py-3.5 rounded-full text-white transition-all hover:scale-[1.01] active:scale-95"
          style={{
            backgroundColor: tokens.colors.text,
            border: tokens.effects.border,
            boxShadow: tokens.effects.shadow.lift,
          }}
          data-testid="citrus-mobile-cart-bar"
        >
          <div className="flex items-center gap-2.5">
            <div
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-black"
              style={{
                backgroundColor: tokens.colors.primary,
              }}
            >
              {cartItemCount}
            </div>
            <span className="text-[12px] font-black uppercase tracking-widest">
              {cartItemCount === 0 ? 'View order' : 'View your order'}
            </span>
          </div>
          <span
            className="text-[14px] font-black"
            style={{ fontFamily: tokens.typography.fontHeading }}
          >
            {cartTotal > 0 ? new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(cartTotal) : 'Pickup ready'}
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
                backgroundColor: 'rgba(26,26,26,0.45)',
                backdropFilter: 'blur(6px)',
              }}
              data-testid="citrus-mobile-overlay"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-[101] rounded-t-[32px] overflow-hidden"
              style={{
                backgroundColor: tokens.colors.surface,
                maxHeight: '85vh',
              }}
              data-testid="citrus-mobile-sheet"
            >
              <div className="px-5 pt-3 pb-1 flex items-center justify-between">
                <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: tokens.colors.border }} />
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: tokens.colors.surfaceMuted,
                    border: tokens.effects.borderSoft,
                    color: tokens.colors.text,
                  }}
                  data-testid="citrus-mobile-close"
                >
                  <SafeIcon icon={FiIcons.FiX} className="text-base" />
                </button>
              </div>
              <div style={{ maxHeight: '78vh', overflow: 'auto' }} className="p-4 pt-2">
                <OrderSidebar />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileCartSheet;
