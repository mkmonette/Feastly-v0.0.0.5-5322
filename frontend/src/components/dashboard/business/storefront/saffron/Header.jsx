import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSaffron } from './SaffronContext';
import { formatCurrency } from '@/common/currency';

const Header = () => {
  const { tokens, sectionsConfig, cartItemCount, cartSubtotal, setIsCartOpen } = useSaffron();
  const section = sectionsConfig.find((s) => s.id === 'header');
  const { brand = 'Saffron', tagline = '' } = section?.content || {};

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        backgroundColor: 'rgba(250,248,244,0.85)',
        backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}
      data-testid="saffron-header"
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.sun} 100%)`,
            }}
          >
            <SafeIcon icon={FiIcons.FiAperture} className="text-lg" style={{ color: tokens.colors.accent }} />
          </div>
          <div className="leading-none">
            <div
              className="text-[22px] font-black tracking-tight"
              style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
            >
              {brand}
            </div>
            <div
              className="text-[10px] font-bold uppercase tracking-[0.22em] mt-1"
              style={{ color: tokens.colors.textMuted }}
            >
              {tagline}
            </div>
          </div>
        </div>

        {/* Nav (desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-bold uppercase tracking-wider">
          {['Menu', 'Popular', 'About', 'Locations'].map((item) => (
            <button
              key={item}
              className="transition-colors"
              style={{ color: tokens.colors.textMuted }}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-full transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: tokens.colors.surface,
              border: `1px solid ${tokens.colors.border}`,
              color: tokens.colors.text,
            }}
            data-testid="saffron-header-search-btn"
          >
            <SafeIcon icon={FiIcons.FiSearch} className="text-sm" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Search</span>
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full transition-all hover:scale-[1.02] active:scale-95"
            style={{
              backgroundColor: tokens.colors.accent,
              color: tokens.colors.textOnAccent,
            }}
            data-testid="saffron-header-cart-btn"
          >
            <div
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-black"
              style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.textOnPrimary }}
            >
              {cartItemCount}
            </div>
            <span className="text-[12px] font-black uppercase tracking-widest">
              Cart
            </span>
            <span
              className="text-[12px] font-black"
              style={{ fontFamily: tokens.typography.fontHeading }}
            >
              · {formatCurrency(cartSubtotal)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
