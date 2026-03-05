import React from 'react';
import { useStorefrontTokens, useStorefront } from './contextBridge';
import Headline from '../Headline';

const CTABanner = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'cta');
  const content = section?.content || {};

  const accentBgStyle = { backgroundColor: colors.accent };
  const textStyle = { color: colors.textInverse };
  const textMutedStyle = { color: colors.textInverseMuted || 'rgba(255, 255, 255, 0.9)' };
  const buttonBgStyle = { backgroundColor: colors.background };
  const buttonTextStyle = { color: colors.accent };

  return (
    <section className={`${layout.sectionPadding} ${layout.horizontalPadding}`} style={accentBgStyle}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center max-w-3xl mx-auto">
          {content.subtitle && (
            <div className="mb-4">
              <span
                className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wider} ${typography.transform.uppercase} ${typography.fontSecondary}`}
                style={textStyle}
              >
                {content.subtitle}
              </span>
            </div>
          )}
          <Headline
            normalText={content.titlePre || content.title || 'Ready to Experience Exceptional Dining?'}
            highlightText={content.titleHighlight}
            tokens={{ colors }}
            normalColor={colors.textInverse}
            highlightColor={colors.textInverse}
            className={`${typography.scale.h2} ${typography.weights.bold} ${typography.lineHeights.tight} mb-6 ${typography.fontPrimary}`}
          />
          <p className={`${typography.scale.bodyLarge} ${typography.lineHeights.relaxed} mb-8 ${typography.fontSecondary}`} style={textMutedStyle}>
            {content.description || 'Join us today and discover why our customers keep coming back for more.'}
          </p>
          <button
            className={`px-10 py-4 ${typography.scale.body} ${typography.weights.semibold} transition-all hover:scale-105 ${typography.fontSecondary}`}
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
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
