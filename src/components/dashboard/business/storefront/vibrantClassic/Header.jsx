import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useVibrantClassic } from './VibrantClassicContext';

const Header = () => {
  const { tokens, toggleCart, cartCount } = useVibrantClassic();
  const { typography, colors, layout } = tokens;

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${layout.shadow}`} style={{
      backgroundColor: `${colors.background}F5`,
      borderColor: colors.border
    }}>
      <div className={`${layout.container} ${layout.containerWidth} ${layout.horizontalPadding} py-5 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 flex items-center justify-center ${layout.borderRadiusIcon}`} style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: colors.textInverse
          }}>
            <SafeIcon icon={FiIcons.FiZap} className="text-2xl" />
          </div>
          <span className={`${typography.scale.h4} ${typography.weights.extrabold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            VIBRANT EATS
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
            <button
              key={item}
              className={`${typography.scale.bodySmall} ${typography.weights.bold} ${typography.fontSecondary} transition-colors`}
              style={{ color: colors.textMuted }}
            >
              {item}
            </button>
          ))}
        </nav>

        <button onClick={toggleCart} className={`relative ${layout.borderRadiusBase} px-4 py-2`} style={{
          backgroundColor: colors.primaryLight,
          color: colors.primary
        }}>
          <SafeIcon icon={FiIcons.FiShoppingCart} className="text-xl" />
          {cartCount > 0 && (
            <span className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center ${typography.scale.xs} ${typography.weights.black} rounded-full`} style={{
              backgroundColor: colors.accent,
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
