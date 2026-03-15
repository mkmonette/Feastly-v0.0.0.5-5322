import React from 'react';
import Headline from '../Headline';
import { useMobileCardMenu } from './MobileCardMenuContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useMobileCardMenu();
  const section = sectionsConfig.find(s => s.id === 'hero');

  if (!section?.content) return null;

  const { preText, headline, headlineHighlight, subtitle, ctaPrimary, ctaSecondary, backgroundImage } = section.content;

  const [normalText, highlightText] = headline && headlineHighlight && headline.includes(headlineHighlight)
    ? headline.split(headlineHighlight)
    : [headline, headlineHighlight];

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'brightness(0.4)'
        }}
      />

      <div className="relative px-4 py-16 text-center">
        {preText && (
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: tokens.colors.heroPreText }}
          >
            {preText}
          </p>
        )}

        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className="text-4xl font-bold mb-3"
          normalColor={tokens.colors.heroHeadline}
          highlightColor={tokens.colors.heroHeadlineHighlight}
        />

        {subtitle && (
          <p className="text-sm text-white/90 mb-6 max-w-sm mx-auto">
            {subtitle}
          </p>
        )}

        <div className="flex gap-3 justify-center">
          {ctaPrimary && (
            <button
              className={`${tokens.layout.spacing.button} ${tokens.layout.borderRadius.button} font-semibold text-sm transition-all hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
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
              className={`${tokens.layout.spacing.button} ${tokens.layout.borderRadius.button} font-semibold text-sm border-2 transition-all hover:scale-105 active:scale-95`}
              style={{
                borderColor: 'white',
                color: 'white'
              }}
            >
              {ctaSecondary}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
