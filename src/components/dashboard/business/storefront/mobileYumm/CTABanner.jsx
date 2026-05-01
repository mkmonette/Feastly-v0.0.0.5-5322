import React from 'react';
import { useMobileYumm } from './MobileYummContext';

const CTABanner = () => {
  const { tokens, sectionsConfig } = useMobileYumm();
  const section = sectionsConfig.find(s => s.id === 'cta');

  if (!section?.content) return null;

  const { title, subtitle, buttonText } = section.content;

  return (
    <section className="mx-3 mb-4 rounded-2xl px-5 py-8 text-center" style={{ backgroundColor: tokens.colors.primary }}>
      <div className="text-3xl mb-2">🎉</div>
      <h2 className="text-xl font-black text-white mb-1">{title}</h2>
      {subtitle && (
        <p className="text-white/80 text-xs font-medium mb-5">{subtitle}</p>
      )}
      {buttonText && (
        <button
          className="px-8 py-2.5 rounded-full font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-md"
          style={{ backgroundColor: '#FFFFFF', color: tokens.colors.primary }}
        >
          {buttonText}
        </button>
      )}
    </section>
  );
};

export default CTABanner;
