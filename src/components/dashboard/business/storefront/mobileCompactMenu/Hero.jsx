import React from 'react';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useMobileCompactMenu();
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
    <div className="relative overflow-hidden bg-gray-900">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="relative px-4 py-12 text-center">
        {preText && (
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: tokens.colors.heroPreText }}
          >
            {preText}
          </p>
        )}

        <h1 className={`text-4xl md:text-5xl ${tokens.typography.headingWeight} leading-tight mb-4`}>
          {renderHeadline()}
        </h1>

        {subtitle && (
          <p
            className="text-base md:text-lg font-medium mb-6 max-w-md mx-auto"
            style={{ color: tokens.colors.heroPreText }}
          >
            {subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          {ctaPrimary && (
            <button
              className={`px-8 py-4 ${tokens.layout.borderRadius.button} ${tokens.typography.headingWeight} text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
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
              className={`px-8 py-4 ${tokens.layout.borderRadius.button} ${tokens.typography.headingWeight} text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 bg-white`}
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
