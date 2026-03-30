import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from './contextBridge';

const Header = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const headerSection = sectionsConfig.find(s => s.id === 'header');

  return (
    <header className={`sticky top-0 z-30 border-b ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background, borderColor: colors.border }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2.5">
            {businessData.logoUrl ? (
              <img src={businessData.logoUrl} alt={businessData.name} className="h-9 w-9 object-cover rounded-lg" />
            ) : (
              <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                <span className={`${typography.scale.bodySmall} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.textInverse }}>
                  {(headerSection?.content?.logoText || businessData.name || 'M').charAt(0)}
                </span>
              </div>
            )}
            <span className={`${typography.scale.h5} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              {businessData.name}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {['Menu', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                className={`${typography.scale.bodySmall} ${typography.weights.medium} transition-colors ${typography.fontSecondary}`}
                style={{ color: colors.textSecondary }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
              >
                {item}
              </button>
            ))}
          </nav>

          <button className="md:hidden">
            <SafeIcon icon={FiIcons.FiMenu} className="text-xl" style={{ color: colors.textPrimary }} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
