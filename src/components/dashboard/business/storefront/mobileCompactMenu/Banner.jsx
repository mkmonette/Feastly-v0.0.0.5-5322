import React from 'react';
import Headline from '../Headline';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

const Banner = () => {
  const { tokens, sectionsConfig } = useMobileCompactMenu();
  const section = sectionsConfig.find(s => s.id === 'banner');

  if (!section?.content) return null;

  const { title, titleHighlight, description, buttonText } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className="py-8 px-4">
      <div
        className={`${tokens.layout.borderRadius.card} p-8 text-center ${tokens.effects.shadow.card}`}
        style={{
          backgroundColor: `${tokens.colors.primary}15`,
          border: `2px solid ${tokens.colors.primary}`
        }}
      >
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className={`text-2xl ${tokens.typography.headingWeight} mb-3`}
        />
        {description && (
          <p className="text-sm font-medium text-gray-700 mb-4 max-w-md mx-auto">
            {description}
          </p>
        )}
        {buttonText && (
          <button
            className={`px-8 py-4 ${tokens.layout.borderRadius.button} font-black text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
            style={{
              backgroundColor: tokens.colors.primary,
              color: tokens.colors.cartButtonText
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
};

export default Banner;
