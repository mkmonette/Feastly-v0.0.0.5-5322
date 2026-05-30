import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens } from './contextBridge';
import { useModernSplitCart } from './ModernSplitContext';
import { formatCurrency } from '@/common/currency';

const CartPanel = () => {
  const { typography, colors } = useStorefrontTokens();
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartCount, isCartOpen, setIsCartOpen } = useModernSplitCart();

  const total = getCartTotal();
  const itemCount = getCartCount();

  return (
    <>
      <div className="hidden lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen border-l" style={{ borderColor: colors.cartBorder, backgroundColor: colors.cartBackground }}>
        <div className="h-20 px-4 border-b flex-shrink-0 flex items-center justify-between" style={{ borderColor: colors.cartBorder }}>
          <h2 className={`${typography.scale.body} ${typography.weights.semibold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Your Cart
          </h2>
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
            <span className={`${typography.scale.xs} ${typography.weights.bold}`} style={{ color: colors.textInverse }}>
              {itemCount}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <SafeIcon icon={FiIcons.FiShoppingCart} className="text-4xl mx-auto mb-3" style={{ color: colors.textMuted }} />
              <p className={`${typography.scale.bodySmall} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
                Your cart is empty
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface }}>
                  <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden" style={{ backgroundColor: colors.surfaceAlt }}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <SafeIcon icon={FiIcons.FiImage} className="text-xl" style={{ color: colors.textMuted }} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.fontPrimary} line-clamp-1`} style={{ color: colors.textPrimary }}>
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex-shrink-0 ml-2"
                        aria-label="Remove item"
                      >
                        <SafeIcon icon={FiIcons.FiX} className="text-base" style={{ color: colors.textMuted }} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-md border" style={{ borderColor: colors.border }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center hover:opacity-70"
                        >
                          <SafeIcon icon={FiIcons.FiMinus} className="text-xs" style={{ color: colors.textSecondary }} />
                        </button>
                        <span className={`${typography.scale.xs} ${typography.weights.medium} ${typography.fontPrimary} w-5 text-center`} style={{ color: colors.textPrimary }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center hover:opacity-70"
                        >
                          <SafeIcon icon={FiIcons.FiPlus} className="text-xs" style={{ color: colors.textSecondary }} />
                        </button>
                      </div>
                      <span className={`${typography.scale.bodySmall} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.accent }}>
                        {formatCurrency((item.salePrice || item.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-shrink-0 p-4 border-t space-y-2" style={{ borderColor: colors.border, backgroundColor: colors.cartBackground }}>
          <div className="flex items-center justify-between">
            <span className={`${typography.scale.bodySmall} ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
              Subtotal
            </span>
            <span className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              {formatCurrency(total)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`${typography.scale.bodySmall} ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
              Tax
            </span>
            <span className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              {formatCurrency(total * 0.1)}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: colors.border }}>
            <span className={`${typography.scale.body} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              Total
            </span>
            <span className={`${typography.scale.body} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.accent }}>
              {formatCurrency(total * 1.1)}
            </span>
          </div>

          <button
            className={`w-full py-3 rounded-lg ${typography.scale.bodySmall} ${typography.weights.semibold} transition-all ${typography.fontSecondary} ${cart.length === 0 ? 'cursor-not-allowed opacity-40' : 'hover:opacity-90'}`}
            style={cart.length > 0 ? { backgroundColor: colors.accent, color: colors.textInverse } : { backgroundColor: colors.border, color: colors.textMuted }}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${isCartOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="rounded-t-2xl shadow-2xl border-t max-h-[80vh] overflow-y-auto" style={{ backgroundColor: colors.cartBackground, borderColor: colors.cartBorder }}>
          <div className="sticky top-0 z-10 p-4 border-b flex items-center justify-between" style={{ backgroundColor: colors.cartBackground, borderColor: colors.cartBorder }}>
            <h2 className={`${typography.scale.h5} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              Your Cart ({itemCount})
            </h2>
            <button onClick={() => setIsCartOpen(false)}>
              <SafeIcon icon={FiIcons.FiX} className="text-2xl" style={{ color: colors.textPrimary }} />
            </button>
          </div>

          <div className="p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className={`${typography.scale.body} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 rounded-lg" style={{ backgroundColor: colors.surface }}>
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden" style={{ backgroundColor: colors.surfaceAlt }}>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <SafeIcon icon={FiIcons.FiImage} className="text-xl" style={{ color: colors.textMuted }} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.fontPrimary} line-clamp-1`} style={{ color: colors.textPrimary }}>
                          {item.name}
                        </h3>
                        <button onClick={() => removeFromCart(item.id)} className="flex-shrink-0 ml-2">
                          <SafeIcon icon={FiIcons.FiX} className="text-lg" style={{ color: colors.textMuted }} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-lg border" style={{ borderColor: colors.border }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center">
                            <SafeIcon icon={FiIcons.FiMinus} className="text-sm" style={{ color: colors.textSecondary }} />
                          </button>
                          <span className={`${typography.scale.bodySmall} ${typography.weights.medium} ${typography.fontPrimary} w-6 text-center`} style={{ color: colors.textPrimary }}>
                            {item.quantity}
                          </span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center">
                            <SafeIcon icon={FiIcons.FiPlus} className="text-sm" style={{ color: colors.textSecondary }} />
                          </button>
                        </div>
                        <span className={`${typography.scale.bodySmall} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.accent }}>
                          {formatCurrency((item.salePrice || item.price) * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t space-y-3" style={{ borderColor: colors.border }}>
                  <div className="flex items-center justify-between">
                    <span className={`${typography.scale.body} ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
                      Total
                    </span>
                    <span className={`${typography.scale.h5} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.accent }}>
                      {formatCurrency(total * 1.1)}
                    </span>
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg ${typography.scale.body} ${typography.weights.semibold} ${typography.fontSecondary}`}
                    style={{ backgroundColor: colors.accent, color: colors.textInverse }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {cart.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-40"
          style={{ backgroundColor: colors.accent }}
        >
          <SafeIcon icon={FiIcons.FiShoppingCart} className="text-2xl" style={{ color: colors.textInverse }} />
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
            <span className={`${typography.scale.xs} ${typography.weights.bold}`} style={{ color: colors.textInverse }}>
              {itemCount}
            </span>
          </div>
        </button>
      )}
    </>
  );
};

export default CartPanel;