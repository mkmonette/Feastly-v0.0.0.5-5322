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
  const showButton2 = section?.fields?.showButton2 !== false;

  const heroPreTextStyle = { color: colors.heroPreText };

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="max-w-3xl">
          {showSubtitle && (
            <div className="mb-6">
              <span
                className={`inline-block px-4 py-2 rounded-full ${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.fontSecondary}`}
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
            className={`${typography.scale.h1} ${typography.weights.extrabold} ${typography.lineHeights.tight} mb-6 ${typography.fontPrimary}`}
          />

          {heroContent.description && (
            <p className={`${typography.scale.bodyLarge} ${typography.lineHeights.relaxed} mb-8 max-w-2xl ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
              {heroContent.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            {showButton1 && (
              <button
                className={`px-8 py-4 rounded-lg ${typography.scale.body} ${typography.weights.semibold} transition-all hover:opacity-90 ${typography.fontSecondary}`}
                style={{ backgroundColor: colors.accent, color: colors.textInverse }}
              >
                {heroContent.button1Text || 'Order Now'}
              </button>
            )}
            {showButton2 && (
              <button
                className={`px-8 py-4 rounded-lg border-2 ${typography.scale.body} ${typography.weights.semibold} transition-all ${typography.fontSecondary}`}
                style={{ borderColor: colors.border, color: colors.textPrimary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.surface;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {heroContent.button2Text || 'View Menu'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
