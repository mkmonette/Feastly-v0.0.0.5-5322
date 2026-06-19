import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernBite } from './ModernBiteContext';

const Header = () => {
  const { tokens, cart } = useModernBite();

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-sm bg-white/80 border-b"
      style={{ borderColor: tokens.colors.border }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className="text-2xl font-black tracking-wider"
              style={{
                fontFamily: tokens.typography.fontFamily.primary,
                color: tokens.colors.primary
              }}
            >
              BITE
            </h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div
              className="w-full px-4 py-2.5 rounded-full flex items-center gap-3 border"
              style={{
                backgroundColor: tokens.colors.surfaceAlt,
                borderColor: tokens.colors.border
              }}
            >
              <SafeIcon icon={FiIcons.FiSearch} style={{ color: tokens.colors.text.secondary }} />
              <input
                type="text"
                placeholder="Search dishes..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{
                  fontFamily: tokens.typography.fontFamily.secondary,
                  color: tokens.colors.text.primary
                }}
              />
            </div>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <SafeIcon icon={FiIcons.FiShoppingCart} className="text-xl" style={{ color: tokens.colors.text.primary }} />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ backgroundColor: tokens.colors.primary }}
                >
                  {cart.length}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <SafeIcon icon={FiIcons.FiUser} className="text-xl" style={{ color: tokens.colors.text.primary }} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;