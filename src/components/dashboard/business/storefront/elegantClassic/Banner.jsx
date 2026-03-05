import React from 'react';
import { useStorefrontTokens, useStorefront } from './contextBridge';

const Banner = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'banner');
  const content = section?.content || {};

  const accentBgStyle = { backgroundColor: colors.accent };
  const textStyle = { color: colors.textInverse };
  const textMutedStyle = { color: colors.textInverseMuted || 'rgba(255, 255, 255, 0.9)' };
  const buttonBgStyle = { backgroundColor: colors.background };
  const buttonTextStyle = { color: colors.accent };

  return (
    <section className={`${layout.sectionPaddingSmall} ${layout.horizontalPadding}`} style={accentBgStyle}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-left flex-1">
            <h3 className={`${typography.scale.h4} ${typography.weights.bold} ${typography.lineHeights.tight} mb-3 ${typography.fontPrimary}`} style={textStyle}>
              {content.title || 'Special Offer'}
            </h3>
            <p className={`${typography.scale.body} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`} style={textMutedStyle}>
              {content.description || 'Limited time offer on selected items. Order now and enjoy exclusive discounts!'}
            </p>
          </div>
          {content.showButton !== false && (
            <button
              className={`px-8 py-3 ${typography.scale.body} ${typography.weights.semibold} transition-all hover:scale-105 flex-shrink-0 ${typography.fontSecondary}`}
              style={{ ...buttonBgStyle, ...buttonTextStyle }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.textPrimary;
                e.currentTarget.style.color = colors.textInverse;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.background;
                e.currentTarget.style.color = colors.accent;
              }}
            >
              {content.buttonText || 'Order Now'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
