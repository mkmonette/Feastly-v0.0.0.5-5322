import React from 'react';
import { useStorefrontTokens, useStorefront } from '../StorefrontContext';

const Banner = ({ useContext }) => {
  const contextHook = useContext || useStorefront;
  const { tokens, businessData, sectionsConfig } = contextHook();
  const { typography, colors, layout } = tokens;

  const section = sectionsConfig.find(s => s.id === 'banner');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};

  return (
    <section 
      className={`${layout.sectionPaddingMedium} bg-${colors.primary} ${typography.fontPrimary}`}
      style={primaryStyle}
    >
      <div className={`${layout.container} ${layout.containerWidth} ${layout.horizontalPadding} overflow-hidden`}>
        <div className="flex flex-nowrap whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`flex items-center gap-12 px-6`}>
              <span className={`${typography.scale.h2_alt} ${typography.weights.black} text-white/20 ${typography.transform.uppercase} ${typography.tracking.tighter}`}>
                {content.textPre}
              </span>
              <span className={`${typography.scale.h2_alt} ${typography.weights.black} text-${colors.textInverse} ${typography.transform.uppercase} ${typography.tracking.tighter}`}>
                {content.textHighlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;