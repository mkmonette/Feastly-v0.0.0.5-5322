import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from '../StorefrontContext';

const Hero = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const section = sectionsConfig.find(s => s.id === 'hero');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const primaryTextStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const secondaryStyle = colors.secondary.startsWith('#') ? { color: colors.secondary } : {};

  return (
    <section className={`relative min-h-[80vh] flex items-center overflow-hidden bg-${colors.textPrimary} ${layout.sectionPaddingLarge} ${layout.horizontalPadding}`}>
      <img 
        src={businessData.bannerUrl || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"} 
        alt="Hero" 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
      
      <div className={`relative z-10 w-full ${layout.containerWidth} mx-auto`}>
        <div className="max-w-2xl flex flex-col items-start text-left">
          {content.badgeText && (
            <span 
              className={`inline-block py-1 px-3 bg-${colors.primary} text-${colors.textInverse} ${typography.scale.xs_alt} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} mb-6 rounded ${typography.fontPrimary}`}
              style={primaryStyle}
            >
              {content.badgeText}
            </span>
          )}
          <h1 className={`${typography.scale.h1} ${typography.weights.black} text-${colors.textInverse} ${typography.lineHeights.tight} ${typography.transform.uppercase} ${typography.tracking.tighter} mb-6 ${typography.fontPrimary}`}>
            {content.titlePre || businessData.name} <br /> 
            <span style={primaryTextStyle} className={!colors.primary.startsWith('#') ? `text-${colors.primary.replace('600', '500')}` : ''}>
              {content.titleHighlight || businessData.tagline}
            </span>
          </h1>
          <p className={`${typography.scale.bodyLarge} text-${colors.textInverseMuted} mb-10 ${typography.weights.medium} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`}>
            {content.subtitle || businessData.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              className={`px-10 py-5 bg-${colors.primary} text-${colors.textInverse} ${typography.scale.h4} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} hover:bg-${colors.primaryHover} transition-all transform hover:scale-105 ${layout.borderRadiusBase} shadow-xl ${layout.shadowPrimary} ${typography.fontPrimary}`}
              style={primaryStyle}
            >
              {content.buttonText || 'Order Now'}
            </button>
            <button 
              className={`px-10 py-5 bg-${colors.textInverse} text-${colors.secondary} ${typography.scale.h4} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} hover:bg-gray-100 transition-all transform hover:scale-105 ${layout.borderRadiusBase} ${typography.fontPrimary}`}
              style={secondaryStyle}
            >
              View Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;