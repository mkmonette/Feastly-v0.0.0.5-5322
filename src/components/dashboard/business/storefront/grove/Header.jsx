import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useGrove } from './GroveContext';

const Header = () => {
  const { tokens, cartItemCount, setIsCartOpen } = useGrove();

  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: tokens.colors.background, borderBottom: `1px solid ${tokens.colors.footerBorder}` }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo: green square badge + GROVE wordmark */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
            style={{ backgroundColor: tokens.colors.primary, color: '#FFFFFF' }}
          >
            G
          </div>
          <span className="text-base font-bold tracking-wide" style={{ color: tokens.colors.navText }}>
            GROVE
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Menu', 'Popular', 'About'].map(link => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium hover:opacity-60 transition-opacity"
              style={{ color: tokens.colors.navText }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-1.5">
          <button className="p-2 rounded-full hover:bg-black/5 transition-all">
            <SafeIcon icon={FiIcons.FiSearch} className="text-base" style={{ color: tokens.colors.navText }} />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full transition-all"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            <SafeIcon icon={FiIcons.FiShoppingBag} className="text-base" style={{ color: '#FFFFFF' }} />
            {cartItemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center"
                style={{ backgroundColor: '#E05A2B', color: '#FFF' }}
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
