import React from 'react';
import { useStorefrontTokens, useStorefront } from './contextBridge';

const CTABanner = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'cta');
  const content = section?.content || {};

  const accentBgStyle = { backgroundColor: colors.accent };
  const whiteStyle = { color: 'white' };

  return (
    <section className={`${layout.sectionPadding} ${layout.horizontalPadding}`} style={accentBgStyle}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center max-w-3xl mx-auto">
          {content.subtitle && (
            <div className="mb-4">
              <span
                className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wider} ${typography.transform.uppercase} ${typography.fontSecondary}`}
                style={whiteStyle}
              >
                {content.subtitle}
              </span>
            </div>
          )}
          <h2 className={`${typography.scale.h2} ${typography.weights.bold} ${typography.lineHeights.tight} mb-6 ${typography.fontPrimary}`}>
            {content.titleHighlight ? (
              <>
                <span style={whiteStyle}>{content.titlePre}</span>{' '}
                <span style={whiteStyle}>{content.titleHighlight}</span>
              </>
            ) : (
              <span style={whiteStyle}>{content.title || content.titlePre || 'Ready to Experience Exceptional Dining?'}</span>
            )}
          </h2>
          <p className={`${typography.scale.bodyLarge} ${typography.lineHeights.relaxed} mb-8 ${typography.fontSecondary}`} style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            {content.description || 'Join us today and discover why our customers keep coming back for more.'}
          </p>
          <button
            className={`px-10 py-4 bg-white ${typography.scale.body} ${typography.weights.semibold} transition-all hover:scale-105 ${typography.fontSecondary}`}
            style={{ color: colors.accent }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.textPrimary;
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
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
