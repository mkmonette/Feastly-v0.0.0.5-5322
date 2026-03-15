import React from 'react';
import Headline from '../Headline';
import { useMobileCardMenu } from './MobileCardMenuContext';

const CTABanner = () => {
  const { tokens, sectionsConfig } = useMobileCardMenu();
  const section = sectionsConfig.find(s => s.id === 'cta');

  if (!section?.content) return null;

  const { title, titleHighlight, subtitle, buttonText } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section
      className="px-4 py-8"
      style={{ backgroundColor: tokens.colors.background }}
    >
      <div
        className={`${tokens.layout.borderRadius.card} p-8 text-center ${tokens.effects.shadow.card}`}
        style={{
          backgroundColor: tokens.colors.accent,
          border: `1px solid ${tokens.colors.accent}`
        }}
      >
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className="text-2xl font-bold mb-3"
          normalColor="white"
          highlightColor="white"
        />
        {subtitle && (
          <p className="text-sm text-white/90 mb-6">
            {subtitle}
          </p>
        )}
        {buttonText && (
          <button
            className={`${tokens.layout.spacing.button} ${tokens.layout.borderRadius.button} font-semibold text-sm transition-all hover:scale-105 active:scale-95 ${tokens.effects.shadow.button}`}
            style={{
              backgroundColor: 'white',
              color: tokens.colors.accent
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
