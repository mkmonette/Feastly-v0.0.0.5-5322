import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useCitrus } from './CitrusContext';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80';

const OrderSidebar = () => {
  const {
    tokens,
    sectionsConfig,
    cartItems,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    cartItemCount,
    updateCartQuantity,
    removeFromCart,
    fulfillment,
    setFulfillment,
  } = useCitrus();

  const section = sectionsConfig.find((s) => s.id === 'sidebar');
  const {
    title = 'Your order',
    pickupLabel = 'Pickup',
    deliveryLabel = 'Delivery',
    emptyMessage = 'Your order is empty.',
    checkoutLabel = 'Checkout',
    promoNote = '',
  } = section?.content || {};

  return (
    <aside
      className="sticky top-[88px] rounded-[28px] overflow-hidden flex flex-col"
      style={{
        backgroundColor: tokens.colors.surface,
        border: tokens.effects.border,
        boxShadow: tokens.effects.shadow.card,
        maxHeight: 'calc(100vh - 120px)',
      }}
      data-testid="citrus-sidebar"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: tokens.effects.border }}
      >
        <div className="flex items-center gap-2">
          <SafeIcon icon={FiIcons.FiShoppingBag} className="text-base" style={{ color: tokens.colors.primary }} />
          <h3
            className="text-[18px] font-black tracking-tight"
            style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
          >
            {title}
          </h3>
        </div>
        <span
          className="inline-flex items-center justify-center min-w-[26px] h-[26px] px-2 rounded-full text-[11px] font-black"
          style={{
            backgroundColor: tokens.colors.text,
            color: '#fff',
          }}
        >
          {cartItemCount}
        </span>
      </div>

      {/* Fulfillment toggle */}
      <div className="px-5 pt-4">
        <div
          className="grid grid-cols-2 p-1 rounded-full"
          style={{
            backgroundColor: tokens.colors.surfaceMuted,
            border: tokens.effects.border,
          }}
        >
          {[
            { key: 'pickup', label: pickupLabel, icon: FiIcons.FiMapPin },
            { key: 'delivery', label: deliveryLabel, icon: FiIcons.FiTruck },
          ].map((opt) => {
            const active = fulfillment === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setFulfillment(opt.key)}
                className="inline-flex items-center justify-center gap-1.5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all"
                style={
                  active
                    ? {
                        backgroundColor: tokens.colors.text,
                        color: '#fff',
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: tokens.colors.text,
                      }
                }
                data-testid={`citrus-fulfillment-${opt.key}`}
              >
                <SafeIcon icon={opt.icon} className="text-xs" />
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <div
              className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3"
              style={{
                backgroundColor: tokens.colors.surfaceMuted,
                border: tokens.effects.border,
              }}
            >
              <SafeIcon icon={FiIcons.FiShoppingBag} className="text-xl" style={{ color: tokens.colors.text }} />
            </div>
            <p className="text-[13px] font-bold" style={{ color: tokens.colors.text }}>
              {emptyMessage}
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
                  className="flex items-center gap-3 p-2 rounded-[18px]"
                  style={{
                    backgroundColor: tokens.colors.paper,
                    border: tokens.effects.borderSoft,
                  }}
                >
                  <img
                    src={img}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    style={{ border: tokens.effects.borderSoft }}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[12.5px] font-black truncate"
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
                      border: tokens.effects.borderSoft,
                    }}
                  >
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      style={{ color: tokens.colors.text }}
                      data-testid={`citrus-cart-dec-${item.id}`}
                    >
                      <SafeIcon icon={item.quantity === 1 ? FiIcons.FiTrash2 : FiIcons.FiMinus} className="text-[10px]" />
                    </button>
                    <span className="text-[11px] font-black w-3 text-center" style={{ color: tokens.colors.text }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
                      style={{ backgroundColor: tokens.colors.primary }}
                      data-testid={`citrus-cart-inc-${item.id}`}
                    >
                      <SafeIcon icon={FiIcons.FiPlus} className="text-[10px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {cartItems.length > 0 && promoNote && (
          <div
            className="mt-4 px-3.5 py-2.5 rounded-[14px] flex items-start gap-2"
            style={{
              backgroundColor: tokens.colors.sunSoft,
              border: tokens.effects.borderSoft,
            }}
          >
            <SafeIcon icon={FiIcons.FiTag} className="text-sm mt-0.5" style={{ color: tokens.colors.text }} />
            <span className="text-[11px] font-bold leading-tight" style={{ color: tokens.colors.text }}>
              {promoNote}
            </span>
          </div>
        )}
      </div>

      {/* Totals + Checkout */}
      <div
        className="px-5 py-4"
        style={{ borderTop: tokens.effects.border }}
      >
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center justify-between text-[12px] font-bold" style={{ color: tokens.colors.textMuted }}>
            <span>Subtotal</span>
            <span>{formatCurrency(cartSubtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-[12px] font-bold" style={{ color: tokens.colors.textMuted }}>
            <span>{fulfillment === 'delivery' ? 'Delivery' : 'Pickup'}</span>
            <span>{deliveryFee > 0 ? formatCurrency(deliveryFee) : 'Free'}</span>
          </div>
          <div
            className="flex items-center justify-between pt-2 mt-2"
            style={{ borderTop: tokens.effects.borderSoft }}
          >
            <span className="text-[12px] font-black uppercase tracking-widest" style={{ color: tokens.colors.text }}>
              Total
            </span>
            <span
              className="text-[22px] font-black"
              style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
            >
              {formatCurrency(cartTotal)}
            </span>
          </div>
        </div>

        <button
          disabled={cartItems.length === 0}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-[12px] font-black uppercase tracking-widest text-white transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: tokens.colors.primary,
            border: tokens.effects.border,
            boxShadow: tokens.effects.shadow.lift,
          }}
          data-testid="citrus-checkout-btn"
        >
          {checkoutLabel}
          <SafeIcon icon={FiIcons.FiArrowRight} className="text-base" />
        </button>
      </div>
    </aside>
  );
};

export default OrderSidebar;
