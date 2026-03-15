import React from 'react';
import Headline from '../Headline';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useMobileCompactMenu();
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
          filter: 'brightness(0.35)'
        }}
      />

      <div className="relative px-4 py-12 text-center">
        {preText && (
          <p
            className="text-xs font-bold uppercase tracking-wider mb-2"
            style={{ color: tokens.colors.heroPreText }}
          >
            {preText}
          </p>
        )}

        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className="text-3xl font-extrabold mb-2"
          normalColor={tokens.colors.heroHeadline}
          highlightColor={tokens.colors.heroHeadlineHighlight}
        />

        {subtitle && (
          <p className="text-xs text-white/85 mb-5 max-w-xs mx-auto">
            {subtitle}
          </p>
        )}

        <div className="flex gap-2 justify-center">
          {ctaPrimary && (
            <button
              className={`${tokens.layout.spacing.button} ${tokens.layout.borderRadius.button} font-bold text-xs transition-all hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
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
              className={`${tokens.layout.spacing.button} ${tokens.layout.borderRadius.button} font-bold text-xs border-2 transition-all hover:scale-105 active:scale-95`}
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
