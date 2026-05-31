import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileAurora } from './MobileAuroraContext';

const Header = () => {
  const { tokens, sectionsConfig, cartItemCount, setIsCartOpen } = useMobileAurora();
  const section = sectionsConfig.find((s) => s.id === 'header');
  const brand = section?.content?.brand || 'Aurora';

  return (
    <header
      className="sticky top-0 z-40 px-4 pt-4 pb-3 backdrop-blur-xl"
      style={{
        backgroundColor: 'rgba(250, 247, 255, 0.7)',
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}
      data-testid="aurora-header"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
            style={{
              background: tokens.colors.auroraGradient,
              boxShadow: tokens.effects.shadow.floating,
            }}
          >
            <SafeIcon icon={FiIcons.FiSun} className="text-lg text-white" />
          </div>
          <div className="leading-tight">
            <div
              className="text-base font-black tracking-tight"
              style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
            >
              {brand}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: tokens.colors.textMuted }}>
              Eat bright
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: tokens.colors.surface,
              border: `1px solid ${tokens.colors.border}`,
              color: tokens.colors.text,
            }}
            data-testid="aurora-header-search-btn"
          >
            <SafeIcon icon={FiIcons.FiSearch} className="text-base" />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            style={{
              background: tokens.colors.auroraGradient,
              boxShadow: tokens.effects.shadow.card,
            }}
            data-testid="aurora-header-cart-btn"
          >
            <SafeIcon icon={FiIcons.FiShoppingBag} className="text-base text-white" />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center text-white"
                style={{ backgroundColor: tokens.colors.text }}
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
