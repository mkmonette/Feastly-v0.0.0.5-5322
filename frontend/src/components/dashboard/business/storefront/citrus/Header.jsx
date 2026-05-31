import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useCitrus } from './CitrusContext';

const Header = () => {
  const { tokens, sectionsConfig, cartItemCount, setIsCartOpen } = useCitrus();
  const section = sectionsConfig.find((s) => s.id === 'header');
  const { brand = 'Citrus', tagline = '', address = '', phone = '' } = section?.content || {};

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        backgroundColor: tokens.colors.background,
        borderBottom: tokens.effects.border,
      }}
      data-testid="citrus-header"
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: tokens.colors.primary,
              border: tokens.effects.border,
            }}
          >
            <SafeIcon icon={FiIcons.FiSun} className="text-lg text-white" />
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

        {/* Center info */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <SafeIcon icon={FiIcons.FiMapPin} className="text-sm" style={{ color: tokens.colors.primary }} />
            <span className="text-[12px] font-bold" style={{ color: tokens.colors.text }}>
              {address}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <SafeIcon icon={FiIcons.FiPhone} className="text-sm" style={{ color: tokens.colors.primary }} />
            <span className="text-[12px] font-bold" style={{ color: tokens.colors.text }}>
              {phone}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: tokens.colors.surface,
              color: tokens.colors.text,
              border: tokens.effects.border,
            }}
            data-testid="citrus-header-track-btn"
          >
            <SafeIcon icon={FiIcons.FiNavigation} className="text-sm" />
            Track order
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-black uppercase tracking-wider text-white transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: tokens.colors.text,
              border: tokens.effects.border,
            }}
            data-testid="citrus-header-cart-btn"
          >
            <SafeIcon icon={FiIcons.FiShoppingBag} className="text-sm" />
            Cart
            {cartItemCount > 0 && (
              <span
                className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black"
                style={{ backgroundColor: tokens.colors.primary, color: '#fff' }}
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
