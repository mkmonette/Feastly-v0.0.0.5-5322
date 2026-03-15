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
    <section className="px-4 py-4" style={{ backgroundColor: tokens.colors.background }}>
      <div
        className="rounded-lg p-6 text-center"
        style={{
          backgroundColor: tokens.colors.primary,
          border: `1px solid ${tokens.colors.primary}`
        }}
      >
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className="text-xl font-extrabold mb-2"
          normalColor="white"
          highlightColor="white"
        />
        {subtitle && (
          <p className="text-xs text-white/90 mb-4">{subtitle}</p>
        )}
        {buttonText && (
          <button
            className="px-6 py-2.5 rounded-lg font-bold text-xs transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'white',
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
