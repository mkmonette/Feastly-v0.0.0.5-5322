import React from 'react';
import Headline from '../Headline';
import { useMobileCardMenu } from './MobileCardMenuContext';

const Banner = () => {
  const { tokens, sectionsConfig } = useMobileCardMenu();
  const section = sectionsConfig.find(s => s.id === 'banner');

  if (!section?.content) return null;

  const { title, titleHighlight, description, buttonText } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className="px-4 py-8">
      <div
        className={`${tokens.layout.borderRadius.card} p-8 text-center relative overflow-hidden`}
        style={{ backgroundColor: tokens.colors.primary }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative z-10">
          <Headline
            normalText={normalText}
            highlightText={highlightText}
            tokens={tokens}
            className="text-2xl font-bold mb-3"
            normalColor="white"
            highlightColor={tokens.colors.heroHeadlineHighlight}
          />
          {description && (
            <p className="text-sm text-white/90 mb-6 max-w-xs mx-auto">
              {description}
            </p>
          )}
          {buttonText && (
            <button
              className={`${tokens.layout.spacing.button} ${tokens.layout.borderRadius.button} font-semibold text-sm transition-all hover:scale-105 active:scale-95`}
              style={{
                backgroundColor: 'white',
                color: tokens.colors.primary
              }}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
