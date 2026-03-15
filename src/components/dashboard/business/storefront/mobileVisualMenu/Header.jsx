import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileVisualMenu } from './MobileVisualMenuContext';

const Header = () => {
  const { tokens, cartItemCount, setIsCartOpen } = useMobileVisualMenu();

  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: tokens.colors.cardBackground, borderBottom: `1px solid ${tokens.colors.border}` }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            FM
          </div>
          <div>
            <h1
              className={`text-base ${tokens.typography.headingWeight} leading-tight`}
              style={{ color: tokens.colors.primaryText }}
            >
              Fresh Meals
            </h1>
            <p className="text-xs font-normal" style={{ color: tokens.colors.sectionNormalText }}>
              Order Online
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className={`relative p-2.5 ${tokens.layout.borderRadius.button} transition-transform hover:scale-105 active:scale-95`}
          style={{ backgroundColor: `${tokens.colors.primary}10` }}
        >
          <SafeIcon
            icon={FiIcons.FiShoppingBag}
            className="text-xl"
            style={{ color: tokens.colors.primary }}
          />
          {cartItemCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center"
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
