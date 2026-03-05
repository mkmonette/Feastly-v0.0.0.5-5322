import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useQuickOrder } from './QuickOrderContext';

const Header = () => {
  const { tokens, cartItemCount, setIsCartOpen } = useQuickOrder();

  return (
    <header
      className="sticky top-0 z-50 bg-white border-b"
      style={{ borderColor: tokens.colors.border }}
    >
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            Q
          </div>
          <div>
            <h1
              className={`text-lg ${tokens.typography.headingWeight} leading-none`}
              style={{ color: tokens.colors.primaryText }}
            >
              QuickOrder
            </h1>
            <p className="text-xs text-gray-500 font-medium">Fast Ordering</p>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2.5 rounded-lg hover:bg-gray-100 transition-all"
        >
          <SafeIcon
            icon={FiIcons.FiShoppingCart}
            className="text-xl"
            style={{ color: tokens.colors.primary }}
          />
          {cartItemCount > 0 && (
            <span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
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
