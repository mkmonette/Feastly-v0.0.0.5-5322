import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useRefinedClassic } from './RefinedClassicContext';

const Header = () => {
  const { tokens, toggleCart, cartCount } = useRefinedClassic();
  const { typography, colors, layout } = tokens;

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${layout.shadow}`} style={{
      backgroundColor: `${colors.background}F5`,
      borderColor: colors.border
    }}>
      <div className={`${layout.container} ${layout.containerWidth} ${layout.horizontalPadding} py-5 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 flex items-center justify-center ${layout.borderRadiusIcon}`} style={{
            backgroundColor: colors.primary,
            color: colors.textInverse
          }}>
            <SafeIcon icon={FiIcons.FiBriefcase} className="text-xl" />
          </div>
          <span className={`${typography.scale.h4} ${typography.weights.semibold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Refined Dining
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
            <button
              key={item}
              className={`${typography.scale.bodySmall} ${typography.weights.medium} ${typography.fontSecondary} transition-colors`}
              style={{ color: colors.textMuted }}
            >
              {item}
            </button>
          ))}
        </nav>

        <button onClick={toggleCart} className={`relative ${layout.borderRadiusBase} px-4 py-2`} style={{
          backgroundColor: colors.surface,
          color: colors.textPrimary
        }}>
          <SafeIcon icon={FiIcons.FiShoppingBag} className="text-xl" />
          {cartCount > 0 && (
            <span className={`absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center ${typography.scale.xs} ${typography.weights.semibold} ${layout.borderRadiusBase}`} style={{
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
