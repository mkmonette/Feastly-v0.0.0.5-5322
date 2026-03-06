import React, { useState } from 'react';
import { useWarmCulinary } from './WarmCulinaryContext';
import { useStorefront } from './contextBridge';
import { FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const { tokens, cartItemCount } = useWarmCulinary();
  const { businessName } = useStorefront();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = ['Menu', 'About', 'Gallery', 'Contact'];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b" style={{ borderColor: tokens.colors.border }}>
      <div className={`${tokens.layout.container} ${tokens.layout.containerWidth} ${tokens.layout.horizontalPadding}`}>
        <div className="flex items-center justify-between h-20">
          <div className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.h4} ${tokens.typography.weights.bold}`} style={{ color: tokens.colors.textPrimary }}>
            {businessName || 'Culinary Delights'}
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.body} ${tokens.typography.weights.medium} transition-colors`}
                style={{ color: tokens.colors.textSecondary }}
                onMouseEnter={(e) => e.target.style.color = tokens.colors.primary}
                onMouseLeave={(e) => e.target.style.color = tokens.colors.textSecondary}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              className="relative p-3 rounded-full transition-all duration-300"
              style={{ backgroundColor: tokens.colors.surfaceAlt }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tokens.colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = tokens.colors.surfaceAlt}
            >
              <FiShoppingBag className="w-5 h-5" style={{ color: tokens.colors.textPrimary }} />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.textInverse }}
                >
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-3"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: tokens.colors.textPrimary }}
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t" style={{ borderColor: tokens.colors.border, backgroundColor: tokens.colors.surface }}>
          <nav className={`${tokens.layout.horizontalPadding} py-6 space-y-4`}>
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block ${tokens.typography.fontSecondary} ${tokens.typography.scale.bodyLarge} ${tokens.typography.weights.medium}`}
                style={{ color: tokens.colors.textSecondary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
