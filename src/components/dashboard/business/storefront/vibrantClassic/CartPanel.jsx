import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { formatCurrency } from '@/common/currency';
import { useVibrantClassic } from './VibrantClassicContext';

const CartPanel = () => {
  const { tokens, cart, cartTotal, isCartOpen, closeCart, updateQuantity, removeFromCart } = useVibrantClassic();
  const { typography, colors, layout } = tokens;

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={closeCart} />
      <div className={`fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col ${layout.shadow}`} style={{ backgroundColor: colors.background }}>
        <div className="flex items-center justify-between p-6 border-b-2" style={{ borderColor: colors.border }}>
          <h3 className={`${typography.scale.h3} ${typography.weights.black} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Your Cart
          </h3>
          <button onClick={closeCart} className={`w-10 h-10 flex items-center justify-center ${layout.borderRadiusBase}`} style={{
            backgroundColor: colors.surface,
            color: colors.textPrimary
          }}>
            <SafeIcon icon={FiIcons.FiX} className="text-2xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <p className={`${typography.scale.body} ${typography.weights.medium} ${typography.fontSecondary} text-center py-12`} style={{ color: colors.textMuted }}>
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={`flex gap-4 p-4 ${layout.borderRadiusMedium}`} style={{
                backgroundColor: colors.surface
              }}>
                <div className={`w-20 h-20 flex-shrink-0 ${layout.borderRadiusSmall}`} style={{
                  background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.surfaceAlt})`
                }} />

                <div className="flex-1 min-w-0">
                  <h4 className={`${typography.scale.body} ${typography.weights.bold} ${typography.fontSecondary} mb-1`} style={{ color: colors.textPrimary }}>
                    {item.name}
                  </h4>
                  <p className={`${typography.scale.bodySmall} ${typography.weights.bold} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                    {formatCurrency(item.price)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={`w-8 h-8 flex items-center justify-center ${layout.borderRadiusBase}`}
                      style={{ backgroundColor: colors.surfaceAlt, color: colors.textPrimary }}
                    >
                      -
                    </button>
                    <span className={`${typography.scale.body} ${typography.weights.bold} ${typography.fontSecondary} w-8 text-center`} style={{ color: colors.textPrimary }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={`w-8 h-8 flex items-center justify-center ${layout.borderRadiusBase}`}
                      style={{ backgroundColor: colors.surfaceAlt, color: colors.textPrimary }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto"
                      style={{ color: colors.textSubtle }}
                    >
                      <SafeIcon icon={FiIcons.FiTrash2} className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t-2 p-6 space-y-4" style={{ borderColor: colors.border }}>
            <div className="flex items-center justify-between">
              <span className={`${typography.scale.h4} ${typography.weights.bold} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                Total
              </span>
              <span className={`${typography.scale.h3} ${typography.weights.black} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                {formatCurrency(cartTotal)}
              </span>
            </div>
            <button className={`w-full py-4 ${layout.borderRadiusBase} ${typography.scale.body} ${typography.weights.bold} ${typography.fontSecondary}`} style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
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
