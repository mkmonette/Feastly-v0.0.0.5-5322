import React from 'react';
import Headline from '../Headline';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

const CTABanner = () => {
  const { tokens, sectionsConfig } = useMobileCompactMenu();
  const section = sectionsConfig.find(s => s.id === 'cta');

  if (!section?.content) return null;

  const { title, titleHighlight, subtitle, buttonText } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section
      className="py-12 px-4"
      style={{ backgroundColor: tokens.colors.primary }}
    >
      <div className="text-center max-w-2xl mx-auto">
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          normalColor={tokens.colors.cartButtonText}
          highlightColor={tokens.colors.accent}
          className={`text-3xl ${tokens.typography.headingWeight} mb-3`}
        />
        {subtitle && (
          <p
            className="text-base font-medium mb-6"
            style={{ color: `${tokens.colors.cartButtonText}dd` }}
          >
            {subtitle}
          </p>
        )}
        {buttonText && (
          <button
            className={`px-8 py-4 ${tokens.layout.borderRadius.button} font-black text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
            style={{
              backgroundColor: tokens.colors.cartButtonText,
              color: tokens.colors.primary
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
};

export default CTABanner;
