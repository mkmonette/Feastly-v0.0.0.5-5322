import React from 'react';
import { useStorefrontTokens, useStorefront } from '../StorefrontContext';

const CTABanner = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'cta');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const secondaryStyle = colors.secondary.startsWith('#') ? { backgroundColor: colors.secondary } : {};

  return (
    <section className={`${layout.sectionPaddingSmall} px-6`}>
      <div 
        className={`bg-${colors.secondary} ${layout.borderRadiusLarge} py-20 px-12 text-center relative overflow-hidden`}
        style={secondaryStyle}
      >
        <div className={`absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent`} />
        <div className="relative z-10">
          <h2 className={`${typography.scale.h2_alt} ${typography.weights.black} text-${colors.textInverse} ${typography.transform.uppercase} ${typography.tracking.tighter} mb-8 max-w-2xl mx-auto ${typography.fontPrimary}`}>
            {content.titlePre} <br /> 
            <span style={{ color: colors.primary.startsWith('#') ? colors.primary : undefined }} className={!colors.primary.startsWith('#') ? `text-${colors.primary}` : ''}>
              {content.titleHighlight}
            </span>
          </h2>
          <button 
            className={`px-12 py-5 bg-${colors.primary} text-${colors.textInverse} ${typography.scale.h4} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} hover:bg-${colors.primaryHover} transition-all ${layout.borderRadiusIcon} shadow-xl ${layout.shadowPrimary} ${typography.fontPrimary}`}
            style={primaryStyle}
          >
            {content.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;