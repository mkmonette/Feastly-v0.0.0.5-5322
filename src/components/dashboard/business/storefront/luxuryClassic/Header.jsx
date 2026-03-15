import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useLuxuryClassic } from './LuxuryClassicContext';

const Header = () => {
  const { tokens, toggleCart, cartCount } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{
      backgroundColor: `${colors.background}CC`,
      borderColor: colors.border
    }}>
      <div className={`${layout.container} ${layout.containerWidth} ${layout.horizontalPadding} py-6 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center border" style={{
            borderColor: colors.primary,
            color: colors.primary
          }}>
            <SafeIcon icon={FiIcons.FiStar} className="text-2xl" />
          </div>
          <span className={`${typography.scale.h4} ${typography.weights.medium} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Luxury Dining
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
            <button
              key={item}
              className={`${typography.scale.bodySmall} ${typography.weights.regular} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary} transition-colors`}
              style={{ color: colors.textMuted }}
            >
              {item}
            </button>
          ))}
        </nav>

        <button onClick={toggleCart} className="relative" style={{ color: colors.textPrimary }}>
          <SafeIcon icon={FiIcons.FiShoppingBag} className="text-2xl" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-bold" style={{
              backgroundColor: colors.primary,
              color: colors.textInverse
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
