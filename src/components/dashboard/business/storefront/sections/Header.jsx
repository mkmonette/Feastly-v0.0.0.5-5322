import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from '../StorefrontContext';

const Header = ({ useContext }) => {
  const contextHook = useContext || useStorefront;
  const { tokens, businessData, sectionsConfig } = contextHook();
  const { typography, colors, layout } = tokens;
  
  const section = sectionsConfig.find(s => s.id === 'header');
  const content = section?.content || { logoText: 'FEASTLY' };

  const primaryStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const secondaryStyle = colors.secondary.startsWith('#') ? { backgroundColor: colors.secondary } : {};

  return (
    <header className={`bg-${colors.background} border-b border-${colors.border} py-4 ${layout.horizontalPadding} flex items-center justify-between sticky top-0 z-50 ${typography.fontSecondary}`}>
      <div className="flex items-center gap-3">
        {businessData.logoUrl ? (
          <img src={businessData.logoUrl} alt={businessData.name} className="w-10 h-10 rounded-lg object-cover shadow-sm" />
        ) : (
          <div 
            className={`w-10 h-10 bg-${colors.secondary} rounded-lg flex items-center justify-center transition-colors`}
            style={secondaryStyle}
          >
            <SafeIcon icon={FiIcons.FiZap} className={`text-${colors.textInverse} text-xl`} />
          </div>
        )}
        <span className={`${typography.scale.h3} ${typography.weights.black} ${typography.tracking.tighter} ${typography.transform.uppercase} ${typography.fontPrimary} text-left`}>
          {content.logoText || businessData.name || 'Feastly'}
        </span>
      </div>
      
      <nav className={`hidden md:flex items-center gap-8 ${typography.scale.h4} ${typography.weights.bold} ${typography.transform.uppercase} ${typography.tracking.widest} text-${colors.textMuted} ${typography.fontPrimary}`}>
        <a href="#" className={`hover:text-${colors.secondary} transition-colors`}>Home</a>
        <a href="#" className={`hover:text-${colors.secondary} transition-colors`}>Menu</a>
        <a href="#" className={`hover:text-${colors.secondary} transition-colors`}>About</a>
        <a href="#" className={`hover:text-${colors.secondary} transition-colors`}>Contact</a>
      </nav>

      <div className="flex items-center gap-4">
        <button className={`p-2 hover:bg-${colors.borderLight} rounded-full transition-colors`}>
          <SafeIcon icon={FiIcons.FiSearch} className={`text-xl text-${colors.textMuted}`} />
        </button>
        <button className={`p-2 hover:bg-${colors.borderLight} rounded-full transition-colors relative`}>
          <SafeIcon icon={FiIcons.FiShoppingBag} className={`text-xl text-${colors.textMuted}`} />
          <span 
            className={`absolute top-1 right-1 w-4 h-4 bg-${colors.primary} text-${colors.textInverse} text-[10px] flex items-center justify-center rounded-full ${typography.weights.bold}`}
            style={primaryStyle}
          >0</span>
        </button>
        <button className={`md:hidden p-2 hover:bg-${colors.borderLight} rounded-full transition-colors`}>
          <SafeIcon icon={FiIcons.FiMenu} className={`text-xl text-${colors.textMuted}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;