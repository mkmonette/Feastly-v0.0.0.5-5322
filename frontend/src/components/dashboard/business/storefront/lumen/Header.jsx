import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useLumen } from './LumenContext';
import { formatCurrency } from '@/common/currency';

const Header = () => {
  const { tokens, cartItemCount, cartTotal, setIsCartOpen } = useLumen();

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        backgroundColor: 'rgba(250,250,247,0.82)',
        backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}
      data-testid="lumen-header"
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.accent} 100%)`,
            }}
          >
            <SafeIcon icon={FiIcons.FiSun} className="text-lg text-white" />
          </div>
          <div className="leading-none">
            <div
              className="text-[22px] font-black tracking-tight"
              style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
            >
              Lumen
            </div>
            <div
              className="text-[10px] font-bold uppercase tracking-[0.24em] mt-1"
              style={{ color: tokens.colors.textMuted }}
            >
              Modern kitchen
            </div>
          </div>
        </div>

        {/* Nav (desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-bold uppercase tracking-wider">
          {['Menu', 'Popular', 'About', 'Locations'].map((item) => (
            <button
              key={item}
              className="transition-colors hover:scale-105"
              style={{ color: tokens.colors.textMuted }}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-105"
            style={{
              backgroundColor: tokens.colors.surface,
              color: tokens.colors.text,
              border: `1px solid ${tokens.colors.border}`,
            }}
            data-testid="lumen-header-search-btn"
          >
            <SafeIcon icon={FiIcons.FiSearch} className="text-base" />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full transition-all hover:scale-[1.02] active:scale-95"
            style={{
              backgroundColor: tokens.colors.text,
              color: tokens.colors.textOnDark,
              boxShadow: tokens.effects.shadow.card,
            }}
            data-testid="lumen-header-cart-btn"
          >
            <div
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-black"
              style={{ backgroundColor: tokens.colors.primary }}
            >
              {cartItemCount}
            </div>
            <span className="text-[12px] font-black uppercase tracking-widest">Cart</span>
            <span className="text-[12px] opacity-60">·</span>
            <span
              className="text-[13px] font-black"
              style={{ fontFamily: tokens.typography.fontHeading }}
            >
              {formatCurrency(cartTotal)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
