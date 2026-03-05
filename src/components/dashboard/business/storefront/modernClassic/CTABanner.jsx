import React from 'react';
import { useStorefrontTokens, useStorefront } from './contextBridge';
import Headline from '../Headline';

const CTABanner = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'cta');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};

  return (
    <section className={`${layout.sectionPaddingLarge} bg-${colors.surface} ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div
          className={`relative overflow-hidden bg-${colors.primary} ${layout.borderRadiusLarge} p-12 md:p-16 text-center`}
          style={primaryBgStyle}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10">
            <Headline
              normalText={content.titlePre || 'Ready to Get Started?'}
              highlightText={content.titleHighlight}
              tokens={{ colors }}
              normalColor={colors.textInverse}
              highlightColor={colors.textInverse}
              className={`${typography.scale.h2} ${typography.weights.black} mb-6 ${typography.fontPrimary}`}
            />

            {content.subtitle && (
              <p className={`${typography.scale.bodyLarge_alt} text-${colors.textInverseMuted} mb-8 max-w-2xl mx-auto ${typography.fontSecondary}`}>
                {content.subtitle}
              </p>
            )}

            <button
              className={`px-10 py-5 bg-${colors.background} text-${colors.primary} ${typography.scale.body} ${typography.weights.bold} hover:bg-gray-50 transition-all ${layout.borderRadiusBase} ${layout.shadowLarge} ${typography.fontPrimary}`}
              style={colors.primary.startsWith('#') ? { color: colors.primary } : {}}
            >
              {content.buttonText || 'Get Started'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
