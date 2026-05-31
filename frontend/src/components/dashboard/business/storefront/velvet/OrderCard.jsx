import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useVelvet } from './VelvetContext';
import { formatCurrency } from '@/common/currency';

const OrderCard = () => {
  const {
    tokens,
    sectionsConfig,
    cartItems,
    cartSubtotal,
    serviceCharge,
    cartTotal,
    cartItemCount,
    updateCartQuantity,
    removeFromCart,
    diningMode,
    setDiningMode,
  } = useVelvet();

  const section = sectionsConfig.find((s) => s.id === 'sidebar');
  const {
    title = 'Your order',
    emptyMessage = '',
    diningLabel = 'Dining',
    takeawayLabel = 'Takeaway',
    reserveCta = 'Reserve a table',
    checkoutCta = 'Place order',
    footnote = '',
  } = section?.content || {};

  return (
    <aside
      className="sticky top-[88px] rounded-[18px] overflow-hidden flex flex-col"
      style={{
        backgroundColor: tokens.colors.surface,
        border: `1px solid ${tokens.colors.border}`,
        boxShadow: tokens.effects.shadow.card,
        maxHeight: 'calc(100vh - 120px)',
      }}
      data-testid="velvet-sidebar"
    >
      {/* Top */}
      <div
        className="px-5 py-5"
        style={{ borderBottom: `1px solid ${tokens.colors.border}` }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-[22px] tracking-tight"
            style={{
              color: tokens.colors.text,
              fontFamily: tokens.typography.fontDisplay,
              fontWeight: 500,
            }}
          >
            {title}
          </h3>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.32em]"
            style={{ color: tokens.colors.primary, fontFamily: tokens.typography.fontMono }}
          >
            {cartItemCount} {cartItemCount === 1 ? 'dish' : 'dishes'}
          </span>
        </div>

        {/* Dining mode toggle */}
        <div
          className="grid grid-cols-2 p-1 rounded-full"
          style={{
            backgroundColor: tokens.colors.panelInk,
            border: `1px solid ${tokens.colors.border}`,
          }}
        >
          {[
            { key: 'dining', label: diningLabel, icon: FiIcons.FiCoffee },
            { key: 'takeaway', label: takeawayLabel, icon: FiIcons.FiPackage },
          ].map((opt) => {
            const active = diningMode === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setDiningMode(opt.key)}
                className="inline-flex items-center justify-center gap-1.5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.24em] transition-all"
                style={
                  active
                    ? {
                        backgroundColor: tokens.colors.primary,
                        color: tokens.colors.textOnGold,
                        fontFamily: tokens.typography.fontMono,
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: tokens.colors.textMuted,
                        fontFamily: tokens.typography.fontMono,
                      }
                }
                data-testid={`velvet-mode-${opt.key}`}
              >
                <SafeIcon icon={opt.icon} className="text-xs" />
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <SafeIcon
              icon={FiIcons.FiBookOpen}
              className="text-3xl mx-auto mb-3"
              style={{ color: tokens.colors.primary, opacity: 0.7 }}
            />
            <p
              className="text-[13px] italic leading-relaxed"
              style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.fontDisplay }}
            >
              {emptyMessage}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const price = item.salePrice || item.price;
              return (
                <div
                  key={item.id}
                  className="flex items-baseline gap-3 pb-3"
                  style={{ borderBottom: `1px dashed ${tokens.colors.border}` }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-[15px] leading-tight"
                        style={{
                          color: tokens.colors.text,
                          fontFamily: tokens.typography.fontDisplay,
                          fontWeight: 500,
                        }}
                      >
                        {item.name}
                      </span>
                      <span
                        className="text-[10px] italic"
                        style={{
                          color: tokens.colors.textSubtle,
                          fontFamily: tokens.typography.fontDisplay,
                        }}
                      >
                        × {item.quantity}
                      </span>
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-5 h-5 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{
                          border: `1px solid ${tokens.colors.border}`,
                          color: tokens.colors.textMuted,
                        }}
                        data-testid={`velvet-cart-dec-${item.id}`}
                      >
                        <SafeIcon icon={item.quantity === 1 ? FiIcons.FiX : FiIcons.FiMinus} className="text-[9px]" />
                      </button>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 rounded-full flex items-center justify-center transition-all hover:scale-110"
                        style={{
                          backgroundColor: tokens.colors.primary,
                          color: tokens.colors.textOnGold,
                        }}
                        data-testid={`velvet-cart-inc-${item.id}`}
                      >
                        <SafeIcon icon={FiIcons.FiPlus} className="text-[9px]" />
                      </button>
                    </div>
                  </div>
                  <div
                    className="text-[15px] flex-shrink-0"
                    style={{
                      color: tokens.colors.primary,
                      fontFamily: tokens.typography.fontDisplay,
                      fontWeight: 500,
                    }}
                  >
                    {formatCurrency(price * item.quantity)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Totals */}
      <div
        className="px-5 py-5"
        style={{ borderTop: `1px solid ${tokens.colors.border}` }}
      >
        {cartItems.length > 0 && (
          <div className="space-y-1.5 mb-4">
            <div
              className="flex items-baseline justify-between text-[12px]"
              style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.fontDisplay }}
            >
              <span className="italic">Subtotal</span>
              <span>{formatCurrency(cartSubtotal)}</span>
            </div>
            <div
              className="flex items-baseline justify-between text-[12px]"
              style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.fontDisplay }}
            >
              <span className="italic">Service charge (10%)</span>
              <span>{formatCurrency(serviceCharge)}</span>
            </div>
            <div
              className="flex items-baseline justify-between pt-3 mt-3"
              style={{ borderTop: `1px solid ${tokens.colors.border}` }}
            >
              <span
                className="text-[11px] font-bold uppercase tracking-[0.32em]"
                style={{ color: tokens.colors.primary, fontFamily: tokens.typography.fontMono }}
              >
                Total
              </span>
              <span
                className="text-[26px]"
                style={{
                  color: tokens.colors.text,
                  fontFamily: tokens.typography.fontDisplay,
                  fontWeight: 500,
                }}
              >
                {formatCurrency(cartTotal)}
              </span>
            </div>
          </div>
        )}

        <button
          disabled={cartItems.length === 0}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-[0.32em] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: tokens.colors.primary,
            color: tokens.colors.textOnGold,
            fontFamily: tokens.typography.fontMono,
            boxShadow: cartItems.length > 0 ? tokens.effects.shadow.gold : 'none',
          }}
          data-testid="velvet-checkout-btn"
        >
          {checkoutCta}
          <SafeIcon icon={FiIcons.FiArrowRight} className="text-base" />
        </button>

        <button
          className="w-full mt-3 inline-flex items-center justify-center gap-2 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.32em] transition-all hover:scale-[1.01]"
          style={{
            border: `1px solid ${tokens.colors.border}`,
            color: tokens.colors.text,
            fontFamily: tokens.typography.fontMono,
          }}
          data-testid="velvet-reserve-btn"
        >
          <SafeIcon icon={FiIcons.FiCalendar} className="text-sm" />
          {reserveCta}
        </button>

        {footnote && (
          <p
            className="mt-4 text-[10.5px] italic leading-snug text-center"
            style={{ color: tokens.colors.textSubtle, fontFamily: tokens.typography.fontDisplay }}
          >
            {footnote}
          </p>
        )}
      </div>
    </aside>
  );
};

export default OrderCard;
