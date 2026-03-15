import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useLuxuryClassic } from './LuxuryClassicContext';

const Header = () => {
  const { tokens, toggleCart, cartCount } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b`} style={{
      backgroundColor: `${colors.background}F5`,
      borderColor: colors.border,
      borderWidth: '1px'
    }}>
      <div className={`${layout.container} ${layout.containerWidth} ${layout.horizontalPadding} py-6 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 flex items-center justify-center border`} style={{
            borderColor: colors.primary,
            color: colors.primary,
            borderWidth: '1px'
          }}>
            <SafeIcon icon={FiIcons.FiStar} className="text-2xl" />
          </div>
          <span className={`${typography.scale.h4} ${typography.weights.light} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            LUXURY
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-12">
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

        <button onClick={toggleCart} className={`relative px-5 py-3 border`} style={{
          borderColor: colors.border,
          color: colors.textPrimary,
          borderWidth: '1px'
        }}>
          <SafeIcon icon={FiIcons.FiShoppingBag} className="text-xl" />
          {cartCount > 0 && (
            <span className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center ${typography.scale.xs} ${typography.weights.semibold}`} style={{
              backgroundColor: colors.primary,
              color: colors.surface
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
