import React from 'react';
import { useStorefrontTokens, useStorefront } from './contextBridge';
import Headline from '../Headline';

const CTABanner = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'cta');
  const content = section?.content || {};

  const showButton = section?.fields?.showButton !== false;

  return (
    <section className={`${layout.sectionPadding} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.accent }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center max-w-3xl mx-auto">
          <Headline
            normalText={content.titlePre || 'Ready to Order?'}
            highlightText={content.titleHighlight || 'Get Started Today'}
            tokens={{ colors: { ...colors, sectionHeadlineNormal: colors.textInverse, sectionHeadlineHighlight: colors.textInverse } }}
            className={`${typography.scale.h2} ${typography.weights.bold} ${typography.lineHeights.tight} mb-6 ${typography.fontPrimary}`}
          />

          {content.description && (
            <p className={`${typography.scale.bodyLarge} ${typography.lineHeights.relaxed} mb-8 ${typography.fontSecondary}`} style={{ color: colors.textInverseMuted }}>
              {content.description}
            </p>
          )}

          {showButton && (
            <button
              className={`px-8 py-4 rounded-lg ${typography.scale.body} ${typography.weights.semibold} transition-all hover:opacity-90 ${typography.fontSecondary}`}
              style={{ backgroundColor: colors.background, color: colors.accent }}
            >
              {content.buttonText || 'Order Now'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
