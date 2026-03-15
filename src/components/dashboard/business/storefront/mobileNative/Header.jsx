import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const Header = ({ onCartClick }) => {
  const { tokens, cart } = useMobileNative();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b"
      style={{ borderColor: tokens.colors.border }}
    >
      <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 h-11 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            M
          </div>
          <span
            className={`text-[15px] ${tokens.typography.headingWeight}`}
            style={{ color: tokens.colors.primaryText }}
          >
            Menu
          </span>
        </div>

        <button
          onClick={onCartClick}
          className="relative p-1.5 rounded-lg active:scale-95 transition-transform"
          style={{ color: tokens.colors.primary }}
        >
          <SafeIcon icon={FiIcons.FiShoppingBag} className="text-[22px]" />
          {cartCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-semibold flex items-center justify-center text-white"
              style={{ backgroundColor: tokens.colors.systemRed }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
