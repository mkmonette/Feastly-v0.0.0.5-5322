import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useVelvet } from './VelvetContext';

const Header = () => {
  const { tokens, sectionsConfig, cartItemCount, setIsCartOpen } = useVelvet();
  const section = sectionsConfig.find((s) => s.id === 'header');
  const { brand = 'Velvet', kitchenLabel = '', address = '', reserveLabel = 'Reserve' } = section?.content || {};

  return (
    <header
      className="relative z-20"
      style={{
        backgroundColor: 'rgba(31,19,32,0.85)',
        backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}
      data-testid="velvet-header"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              border: `1px solid ${tokens.colors.primary}`,
              color: tokens.colors.primary,
            }}
          >
            <span
              className="text-[16px] italic font-medium"
              style={{ fontFamily: tokens.typography.fontDisplay }}
            >
              V
            </span>
          </div>
          <div className="leading-none">
            <div
              className="text-[24px] font-medium tracking-tight"
              style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontDisplay, letterSpacing: '0.02em' }}
            >
              {brand}
            </div>
            <div
              className="text-[10px] font-bold uppercase tracking-[0.32em] mt-1"
              style={{ color: tokens.colors.primary, fontFamily: tokens.typography.fontMono }}
            >
              {kitchenLabel}
            </div>
          </div>
        </div>

        {/* Address (desktop only, centered) */}
        <div className="hidden lg:flex items-center gap-2">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{ color: tokens.colors.textSubtle }}
          >
            ·
          </span>
          <span
            className="text-[12px] italic"
            style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.fontDisplay }}
          >
            {address}
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{ color: tokens.colors.textSubtle }}
          >
            ·
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all hover:scale-[1.02] active:scale-95"
            style={{
              border: `1px solid ${tokens.colors.primary}`,
              color: tokens.colors.primary,
              fontFamily: tokens.typography.fontMono,
            }}
            data-testid="velvet-header-reserve-btn"
          >
            <SafeIcon icon={FiIcons.FiCalendar} className="text-sm" />
            {reserveLabel}
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="lg:hidden relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all hover:scale-[1.02] active:scale-95"
            style={{
              backgroundColor: tokens.colors.primary,
              color: tokens.colors.textOnGold,
              fontFamily: tokens.typography.fontMono,
            }}
            data-testid="velvet-header-cart-btn"
          >
            <SafeIcon icon={FiIcons.FiBookOpen} className="text-sm" />
            Order
            {cartItemCount > 0 && (
              <span
                className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black"
                style={{ backgroundColor: tokens.colors.background, color: tokens.colors.primary }}
              >
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
