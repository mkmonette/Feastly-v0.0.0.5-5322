import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileYumm } from './MobileYummContext';

const Header = () => {
  const { tokens, cartItemCount, setIsCartOpen } = useMobileYumm();

  return (
    <header className="sticky top-0 z-50 bg-white" style={{ borderBottom: '1px solid #f0f0f0' }}>
      <div className="flex items-center justify-between px-3 py-2.5">
        {/* Logo left-aligned */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            Y
          </div>
          <span className="text-base font-black tracking-wide" style={{ color: tokens.colors.primaryText }}>
            YUMM
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-all">
            <SafeIcon icon={FiIcons.FiSearch} className="text-base" style={{ color: tokens.colors.primaryText }} />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            <SafeIcon icon={FiIcons.FiShoppingCart} className="text-base text-white" />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-[10px] font-black flex items-center justify-center"
                style={{ color: tokens.colors.primary }}
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
