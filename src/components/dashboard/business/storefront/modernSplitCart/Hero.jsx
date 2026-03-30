import React from 'react';
import { useStorefrontTokens, useStorefront } from './contextBridge';
import Headline from '../Headline';

const Hero = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'hero');
  const heroContent = section?.content || {};

  const showSubtitle = section?.fields?.showSubtitle !== false;
  const showButton1 = section?.fields?.showButton1 !== false;

  return (
    <section className={`${layout.sectionPaddingSmall} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="max-w-2xl">
          {showSubtitle && (
            <div className="mb-3">
              <span
                className={`inline-block px-3 py-1.5 rounded-full ${typography.scale.xs} ${typography.weights.semibold} ${typography.fontSecondary} ${typography.transform.uppercase} ${typography.tracking.wider}`}
                style={{ backgroundColor: colors.accent, color: colors.textInverse }}
              >
                {heroContent.subtitle || 'Welcome'}
              </span>
            </div>
          )}

          <Headline
            normalText={heroContent.titlePre || 'Delicious Food'}
            highlightText={heroContent.titleHighlight || 'Delivered Fast'}
            tokens={{ colors }}
            className={`${typography.scale.h1} ${typography.weights.extrabold} ${typography.lineHeights.tight} mb-3 ${typography.fontPrimary}`}
          />

          {heroContent.description && (
            <p className={`${typography.scale.body} ${typography.lineHeights.relaxed} mb-4 max-w-xl ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
              {heroContent.description}
            </p>
          )}

          {showButton1 && (
            <button
              className={`px-6 py-2.5 rounded-lg ${typography.scale.bodySmall} ${typography.weights.semibold} transition-all hover:opacity-90 ${typography.fontSecondary}`}
              style={{ backgroundColor: colors.accent, color: colors.textInverse }}
            >
              {heroContent.button1Text || 'Order Now'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
