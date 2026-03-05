import React from 'react';
import { useQuickOrder } from './QuickOrderContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useQuickOrder();
  const section = sectionsConfig.find(s => s.id === 'hero');

  if (!section?.content) return null;

  const { preText, headline, headlineHighlight, description } = section.content;

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
    <div className="bg-gray-50 border-b" style={{ borderColor: tokens.colors.border }}>
      <div className="px-4 py-6">
        {preText && (
          <p
            className="text-sm font-semibold uppercase tracking-wide mb-2"
            style={{ color: tokens.colors.heroPreText }}
          >
            {preText}
          </p>
        )}

        <h1 className={`text-2xl ${tokens.typography.headingWeight} mb-2`}>
          {renderHeadline()}
        </h1>

        {description && (
          <p
            className="text-sm"
            style={{ color: tokens.colors.sectionNormalText }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Hero;
