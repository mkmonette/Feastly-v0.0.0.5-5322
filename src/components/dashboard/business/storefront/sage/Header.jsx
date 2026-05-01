import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSage } from './SageContext';

const Header = () => {
  const { tokens, sectionsConfig } = useSage();
  const section = sectionsConfig.find(s => s.id === 'header');
  const logoText = section?.content?.logoText || 'SAGE';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: tokens.colors.navbarBg,
        borderBottom: `1px solid ${scrolled ? tokens.colors.border : 'transparent'}`,
        backdropFilter: 'blur(12px)'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
            style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.textInverse }}
          >
            {logoText.charAt(0)}
          </div>
          <span className="text-base font-bold tracking-widest" style={{ color: tokens.colors.textPrimary }}>
            {logoText}
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map(link => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: tokens.colors.textMuted }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right icon */}
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-85"
          style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.textInverse }}
        >
          <SafeIcon icon={FiIcons.FiShoppingBag} className="text-sm" />
        </button>
      </div>
    </header>
  );
};

export default Header;
