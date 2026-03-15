import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

const Header = () => {
  const { tokens, setIsCartOpen, cartItemCount } = useMobileCompactMenu();

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.border
      }}
    >
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            <SafeIcon icon={FiIcons.FiPackage} className="text-white text-base" />
          </div>
          <div>
            <h1
              className="text-base font-extrabold leading-none"
              style={{ color: tokens.colors.primaryText }}
            >
              QuickBite
            </h1>
            <p className="text-[10px] text-gray-500 mt-0.5">Express Delivery</p>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2.5 rounded-lg transition-all hover:bg-gray-50 active:scale-95"
        >
          <SafeIcon icon={FiIcons.FiShoppingBag} className="text-xl" style={{ color: tokens.colors.primaryText }} />
          {cartItemCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[9px] font-extrabold"
              style={{
                backgroundColor: tokens.colors.primary,
                color: tokens.colors.cartButtonText
              }}
            >
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
