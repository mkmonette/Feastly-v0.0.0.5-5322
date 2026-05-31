import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileAurora } from './MobileAuroraContext';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80';

const CartPill = () => {
  const { tokens, cartItems, cartItemCount, cartTotal, setIsCartOpen } = useMobileAurora();

  return (
    <AnimatePresence>
      {cartItemCount > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 320 }}
          className="absolute left-3 right-3 bottom-3 z-30"
          data-testid="aurora-cart-pill"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center gap-3 p-2 pr-5 rounded-full text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: tokens.colors.text,
              boxShadow: tokens.effects.shadow.floating,
            }}
          >
            <div className="flex -space-x-2">
              {cartItems.slice(0, 3).map((item) => (
                <img
                  key={item.id}
                  src={item.imageUrl || item.image || FALLBACK_IMAGE}
                  alt={item.name}
                  className="w-9 h-9 rounded-full object-cover"
                  style={{ border: `2px solid ${tokens.colors.text}` }}
                />
              ))}
              {cartItems.length > 3 && (
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                  style={{ background: tokens.colors.auroraGradient, border: `2px solid ${tokens.colors.text}` }}
                >
                  +{cartItems.length - 3}
                </div>
              )}
            </div>
            <div className="flex-1 text-left leading-tight">
              <div className="text-[11px] font-semibold opacity-70">
                {cartItemCount} item{cartItemCount > 1 ? 's' : ''}
              </div>
              <div className="text-[14px] font-black" style={{ fontFamily: tokens.typography.fontHeading }}>
                View cart · {formatCurrency(cartTotal)}
              </div>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: tokens.colors.auroraGradient }}
            >
              <SafeIcon icon={FiIcons.FiArrowRight} className="text-base" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartPill;
