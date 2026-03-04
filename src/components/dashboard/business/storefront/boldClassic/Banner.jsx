import React from 'react';
import { useStorefrontTokens, useStorefront } from './contextBridge';

const Banner = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'banner');
  const content = section?.content || {};

  const primaryTextStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const bannerBg = content.useGradient
    ? `bg-gradient-to-r from-${colors.primary} via-${colors.secondary} to-${colors.primary}`
    : `bg-${colors.textPrimary}`;

  return (
    <section className={`${layout.sectionPaddingSmall} ${bannerBg} ${layout.horizontalPadding} relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-full bg-white"
            style={{ left: `${i * 5}%` }}
          />
        ))}
      </div>

      <div className={`${layout.container} ${layout.containerWidth} text-center relative z-10`}>
        <div className={`${typography.scale.h3} ${typography.weights.black} text-${colors.textInverse} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.fontPrimary}`}>
          {content.textPre || 'Fresh Ingredients • Seasonal Menu • '}
          <span className={content.useGradient ? '' : `text-${colors.primary}`} style={content.useGradient ? {} : primaryTextStyle}>
            {content.textHighlight || 'Order Now'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
