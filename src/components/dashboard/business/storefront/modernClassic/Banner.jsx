import React from 'react';
import { useStorefrontTokens, useStorefront } from './contextBridge';

const Banner = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'banner');
  const content = section?.content || {};

  const primaryTextStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const bannerBg = content.useGradient
    ? `bg-gradient-to-r from-${colors.primary} to-${colors.secondary}`
    : `bg-${colors.surface}`;

  return (
    <section className={`${layout.sectionPaddingMedium} ${bannerBg} ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth} text-center`}>
        <div className={`${typography.scale.h3} ${typography.weights.bold} ${content.useGradient ? `text-${colors.textInverse}` : `text-${colors.textPrimary}`} ${typography.fontPrimary}`}>
          {content.textPre || 'Fresh Ingredients • Seasonal Menu • '}
          <span
            className={content.useGradient ? `text-${colors.textInverse}` : (!colors.primary.startsWith('#') ? `text-${colors.primary}` : '')}
            style={content.useGradient ? {} : primaryTextStyle}
          >
            {content.textHighlight || 'Order Now'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
