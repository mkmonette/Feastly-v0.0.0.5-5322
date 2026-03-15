import React from 'react';
import { useMobileVisualMenu } from './MobileVisualMenuContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useMobileVisualMenu();
  const section = sectionsConfig.find(s => s.id === 'hero');

  if (!section?.content) return null;

  const { preText, headline, headlineHighlight, subtitle, ctaPrimary, ctaSecondary, backgroundImage } = section.content;

  const renderHeadline = () => {
    if (!headlineHighlight || !headline.includes(headlineHighlight)) {
      return (
        <span style={{ color: tokens.colors.heroHeadline }}>
          {headline}
        </span>
      );
    }

    const parts = headline.split(headlineHighlight);
    return (
      <>
        <span style={{ color: tokens.colors.heroHeadline }}>{parts[0]}</span>
        <span style={{ color: tokens.colors.heroHeadlineHighlight }}>{headlineHighlight}</span>
        <span style={{ color: tokens.colors.heroHeadline }}>{parts[1]}</span>
      </>
    );
  };

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: tokens.colors.secondary }}>
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        </>
      )}
      <div className="relative px-5 py-16 text-center">
        {preText && (
          <p
            className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90"
            style={{ color: tokens.colors.heroPreText }}
          >
            {preText}
          </p>
        )}

        <h1 className={`text-4xl ${tokens.typography.headingWeight} leading-tight mb-3`}>
          {renderHeadline()}
        </h1>

        {subtitle && (
          <p
            className="text-base font-normal mb-6 max-w-xs mx-auto opacity-95"
            style={{ color: tokens.colors.heroPreText }}
          >
            {subtitle}
          </p>
        )}

        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          {ctaPrimary && (
            <button
              className={`px-7 py-3.5 ${tokens.layout.borderRadius.button} ${tokens.typography.headingWeight} text-sm transition-transform hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
              style={{
                backgroundColor: tokens.colors.primary,
                color: tokens.colors.cartButtonText
              }}
            >
              {ctaPrimary}
            </button>
          )}
          {ctaSecondary && (
            <button
              className={`px-7 py-3.5 ${tokens.layout.borderRadius.button} font-semibold text-sm transition-transform hover:scale-105 active:scale-95 bg-white/90`}
              style={{ color: tokens.colors.primary }}
            >
              {ctaSecondary}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
