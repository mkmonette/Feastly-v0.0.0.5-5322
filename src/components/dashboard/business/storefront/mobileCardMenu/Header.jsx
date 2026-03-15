import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileCardMenu } from './MobileCardMenuContext';

const Header = () => {
  const { tokens, setIsCartOpen, cartItemCount } = useMobileCardMenu();

  return (
    <header
      className="sticky top-0 z-50 border-b transition-all"
      style={{
        backgroundColor: tokens.colors.background,
        borderColor: tokens.colors.border
      }}
    >
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            <SafeIcon icon={FiIcons.FiShoppingBag} className="text-white text-lg" />
          </div>
          <div>
            <h1
              className="text-lg font-bold leading-none"
              style={{ color: tokens.colors.primaryText }}
            >
              FoodHub
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Fast Delivery</p>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-3 rounded-xl transition-all hover:bg-gray-100 active:scale-95"
        >
          <SafeIcon icon={FiIcons.FiShoppingCart} className="text-xl" style={{ color: tokens.colors.primaryText }} />
          {cartItemCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
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
