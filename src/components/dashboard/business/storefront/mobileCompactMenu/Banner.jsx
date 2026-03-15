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
    <section className="px-4 py-4" style={{ backgroundColor: tokens.colors.background }}>
      <div
        className="rounded-lg p-5 text-center"
        style={{
          backgroundColor: tokens.colors.accent,
          border: `1px solid ${tokens.colors.accent}`
        }}
      >
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className="text-xl font-extrabold mb-2"
          normalColor={tokens.colors.secondary}
          highlightColor={tokens.colors.secondary}
        />
        {description && (
          <p className="text-xs text-gray-700 mb-4">{description}</p>
        )}
        {buttonText && (
          <button
            className="px-5 py-2.5 rounded-lg font-bold text-xs transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: tokens.colors.secondary,
              color: 'white'
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
