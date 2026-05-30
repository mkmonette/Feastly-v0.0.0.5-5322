import React from 'react';
import { useModernBite } from './ModernBiteContext';

const CTABanner = () => {
  const { tokens, sectionsConfig } = useModernBite();
  const ctaSection = sectionsConfig.find(s => s.id === 'cta');

  if (!ctaSection?.visibility.enabled) return null;

  const { badge, title, subtitle, buttonText } = ctaSection.content;

  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden">
        <div
          className="relative px-8 py-16 md:px-16 md:py-24 text-center"
          style={{
            background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.secondary} 100%)`
          }}
        >
          <span
            className="text-sm font-bold tracking-widest uppercase mb-4 block text-white/80"
            style={{ fontFamily: tokens.typography.fontFamily.primary }}
          >
            {badge}
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-4 text-white"
            style={{ fontFamily: tokens.typography.fontFamily.primary }}
          >
            {title}
          </h2>
          <p
            className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: tokens.typography.fontFamily.secondary }}
          >
            {subtitle}
          </p>
          <button
            className="px-8 py-3 font-black rounded-full transition-all hover:scale-105 active:scale-95"
            style={{
              fontFamily: tokens.typography.fontFamily.primary,
              backgroundColor: 'white',
              color: tokens.colors.primary
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;