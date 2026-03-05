import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileExpress } from './MobileExpressContext';

const Header = () => {
  const { tokens, cartItemCount, setIsCartOpen } = useMobileExpress();

  return (
    <header
      className="sticky top-0 z-50 bg-white shadow-sm"
      style={{ borderBottom: `1px solid ${tokens.colors.border}` }}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            F
          </div>
          <div>
            <h1
              className={`text-lg ${tokens.typography.headingWeight} leading-none`}
              style={{ color: tokens.colors.primaryText }}
            >
              FoodApp
            </h1>
            <p className="text-xs text-gray-500 font-medium">Fast Delivery</p>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-3 rounded-xl transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: `${tokens.colors.primary}15` }}
        >
          <SafeIcon
            icon={FiIcons.FiShoppingCart}
            className="text-xl"
            style={{ color: tokens.colors.primary }}
          />
          {cartItemCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-black flex items-center justify-center"
              style={{ backgroundColor: tokens.colors.accent }}
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
