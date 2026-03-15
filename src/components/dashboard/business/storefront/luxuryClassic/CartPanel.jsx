import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { formatCurrency } from '@/common/currency';
import { useLuxuryClassic } from './LuxuryClassicContext';

const CartPanel = () => {
  const { tokens, cart, cartTotal, isCartOpen, closeCart, updateQuantity, removeFromCart } = useLuxuryClassic();
  const { typography, colors } = tokens;

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={closeCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col" style={{ backgroundColor: colors.surface }}>
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: colors.border }}>
          <h3 className={`${typography.scale.h4} ${typography.weights.medium} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Your Order
          </h3>
          <button onClick={closeCart} style={{ color: colors.textMuted }}>
            <SafeIcon icon={FiIcons.FiX} className="text-2xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.fontSecondary} text-center py-12`} style={{ color: colors.textMuted }}>
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b" style={{ borderColor: colors.border }}>
                <div className="w-20 h-20 flex-shrink-0 bg-gradient-to-br" style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.surfaceAlt}, ${colors.background})`
                }} />

                <div className="flex-1 min-w-0">
                  <h4 className={`${typography.scale.bodySmall} ${typography.weights.medium} ${typography.fontSecondary} mb-1`} style={{ color: colors.textPrimary }}>
                    {item.name}
                  </h4>
                  <p className={`${typography.scale.bodySmall} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                    {formatCurrency(item.price)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center border"
                      style={{ borderColor: colors.border, color: colors.textPrimary }}
                    >
                      -
                    </button>
                    <span className={`${typography.scale.bodySmall} ${typography.fontSecondary} w-8 text-center`} style={{ color: colors.textPrimary }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center border"
                      style={{ borderColor: colors.border, color: colors.textPrimary }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto"
                      style={{ color: colors.textSubtle }}
                    >
                      <SafeIcon icon={FiIcons.FiTrash2} className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-6 space-y-4" style={{ borderColor: colors.border }}>
            <div className="flex items-center justify-between">
              <span className={`${typography.scale.body} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                Total
              </span>
              <span className={`${typography.scale.h4} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                {formatCurrency(cartTotal)}
              </span>
            </div>
            <button className={`w-full py-4 ${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{
              backgroundColor: colors.primary,
              color: colors.textInverse
            }}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPanel;
