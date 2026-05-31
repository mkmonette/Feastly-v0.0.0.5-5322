import React from 'react';
import { useMobileNeon } from './MobileNeonContext';

const CTABanner = () => {
  const { tokens, sectionsConfig } = useMobileNeon();
  const section = sectionsConfig.find(s => s.id === 'cta');

  if (!section?.content) return null;

  const { emoji, title, subtitle, buttonText } = section.content;

  return (
    <section className="px-4 pt-4 pb-4">
      <div
        className="rounded-2xl px-5 py-6 text-center"
        style={{ backgroundColor: tokens.colors.cardBackground, border: `1px solid ${tokens.colors.border}` }}
      >
        {emoji && (
          <div className="text-3xl mb-2">{emoji}</div>
        )}
        <h3 className="text-lg font-black mb-1" style={{ color: tokens.colors.primaryText }}>{title}</h3>
        {subtitle && (
          <p className="text-xs mb-4" style={{ color: tokens.colors.muted }}>{subtitle}</p>
        )}
        {buttonText && (
          <button
            className="w-full py-3 rounded-full font-black text-sm transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.secondary }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
};

export default CTABanner;
