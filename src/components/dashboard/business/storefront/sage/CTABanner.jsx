import React from 'react';
import { useSage } from './SageContext';

const CTABanner = () => {
  const { tokens, sectionsConfig } = useSage();
  const section = sectionsConfig.find(s => s.id === 'cta');
  if (!section) return null;
  const { title, subtitle, buttonText } = section.content || {};

  return (
    <section style={{ backgroundColor: tokens.colors.background }} className="px-6 py-16">
      <div
        className="max-w-6xl mx-auto rounded-3xl px-10 py-14 text-center"
        style={{ backgroundColor: tokens.colors.primary }}
      >
        <h2 className="text-3xl font-black mb-3" style={{ color: tokens.colors.textInverse }}>
          {title}
        </h2>
        <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: 'rgba(20,29,43,0.75)' }}>
          {subtitle}
        </p>
        {buttonText && (
          <button
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-85 active:scale-95"
            style={{ backgroundColor: tokens.colors.textInverse, color: tokens.colors.primary }}
          >
            {buttonText}
            <span className="text-base">→</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default CTABanner;
