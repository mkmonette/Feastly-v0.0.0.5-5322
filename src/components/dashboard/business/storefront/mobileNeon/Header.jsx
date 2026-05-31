import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileNeon } from './MobileNeonContext';

const Header = () => {
  const { tokens, cartItemCount, setIsCartOpen } = useMobileNeon();

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: tokens.colors.secondary, borderBottom: `1px solid ${tokens.colors.border}` }}>
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
            style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.secondary }}
          >
            N
          </div>
          <span className="text-base font-black tracking-wide" style={{ color: tokens.colors.primaryText }}>
            NEON
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button className="p-2 rounded-full transition-all" style={{ color: tokens.colors.muted }}>
            <SafeIcon icon={FiIcons.FiSearch} className="text-base" />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            <SafeIcon icon={FiIcons.FiShoppingBag} className="text-base" style={{ color: tokens.colors.secondary }} />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center"
                style={{ backgroundColor: tokens.colors.secondary, color: tokens.colors.primary }}
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
