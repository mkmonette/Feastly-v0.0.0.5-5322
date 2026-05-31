import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useBento } from './BentoContext';
import { formatCurrency } from '@/common/currency';

const Header = () => {
  const { tokens, sectionsConfig, cartItemCount, cartSubtotal, setIsCartOpen } = useBento();
  const section = sectionsConfig.find((s) => s.id === 'header');
  const { brand = 'Bento', tagline = '' } = section?.content || {};

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl"
      style={{
        backgroundColor: 'rgba(247,244,238,0.78)',
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}
      data-testid="bento-header"
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-3.5 flex items-center justify-between gap-4">
        {/* Brand mark — 2x2 mini-bento */}
        <div className="flex items-center gap-3">
          <div
            className="grid grid-cols-2 grid-rows-2 gap-0.5 w-10 h-10 rounded-[10px] overflow-hidden p-1"
            style={{ backgroundColor: tokens.colors.secondary }}
          >
            <div className="rounded-[3px]" style={{ backgroundColor: tokens.colors.primary }} />
            <div className="rounded-[3px]" style={{ backgroundColor: tokens.colors.butter }} />
            <div className="rounded-[3px]" style={{ backgroundColor: tokens.colors.mint }} />
            <div className="rounded-[3px]" style={{ backgroundColor: tokens.colors.lavender }} />
          </div>
          <div className="leading-tight">
            <div
              className="text-[20px] font-black tracking-tight"
              style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
            >
              {brand}
            </div>
            {tagline && (
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] mt-0.5" style={{ color: tokens.colors.textMuted }}>
                {tagline}
              </div>
            )}
          </div>
        </div>

        {/* Center nav (decorative) */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-bold uppercase tracking-wider">
          {['Menu', 'Bundles', 'About', 'Locations'].map((item) => (
            <button
              key={item}
              className="transition-colors hover:opacity-100"
              style={{ color: tokens.colors.textMuted }}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Cart pill */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="inline-flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full transition-all hover:scale-[1.02] active:scale-95"
          style={{
            backgroundColor: tokens.colors.surfaceInk,
            color: tokens.colors.textOnDark,
            boxShadow: tokens.effects.shadow.tile,
          }}
          data-testid="bento-header-cart-btn"
        >
          <div
            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-black"
            style={{
              backgroundColor: tokens.colors.primary,
            }}
          >
            {cartItemCount}
          </div>
          <span className="text-[12px] font-black uppercase tracking-widest">
            Cart
          </span>
          <span className="text-[12px] font-black opacity-60">·</span>
          <span
            className="text-[13px] font-black"
            style={{ fontFamily: tokens.typography.fontHeading }}
          >
            {formatCurrency(cartSubtotal)}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
