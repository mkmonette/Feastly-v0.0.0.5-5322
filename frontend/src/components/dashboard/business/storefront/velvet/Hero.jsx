import React from 'react';
import { motion } from 'framer-motion';
import { useVelvet } from './VelvetContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useVelvet();
  const section = sectionsConfig.find((s) => s.id === 'hero');
  if (!section?.content) return null;
  const { date, eyebrow, headline, subhead, quote, quoteAttr } = section.content;

  return (
    <section className="relative z-10" data-testid="velvet-hero">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-14 lg:pt-20 pb-10">
        {/* Date stamp */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="h-px flex-shrink-0 w-12"
            style={{ backgroundColor: tokens.colors.primary }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.4em]"
            style={{ color: tokens.colors.primary, fontFamily: tokens.typography.fontMono }}
          >
            {date}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end">
          {/* Left column — heading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow && (
              <div
                className="text-[11px] italic mb-4"
                style={{ color: tokens.colors.rosy, fontFamily: tokens.typography.fontDisplay }}
              >
                {eyebrow}
              </div>
            )}
            <h1
              className="text-[52px] sm:text-[72px] lg:text-[96px] leading-[0.92] tracking-tight"
              style={{
                color: tokens.colors.text,
                fontFamily: tokens.typography.fontDisplay,
                fontWeight: 500,
                letterSpacing: '-0.02em',
              }}
            >
              {headline.split(' ').map((word, i) => (
                <span key={i}>
                  {i === headline.split(' ').length - 1 ? (
                    <em style={{ color: tokens.colors.primary, fontStyle: 'italic', fontWeight: 500 }}>
                      {word}
                    </em>
                  ) : (
                    word
                  )}
                  {i < headline.split(' ').length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>
            {subhead && (
              <p
                className="mt-6 text-[15px] lg:text-[17px] max-w-[520px] leading-relaxed italic"
                style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.fontDisplay }}
              >
                {subhead}
              </p>
            )}
          </motion.div>

          {/* Right column — quote card */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[18px] p-6 lg:p-7"
            style={{
              backgroundColor: tokens.colors.surface,
              border: `1px solid ${tokens.colors.border}`,
              boxShadow: tokens.effects.shadow.card,
            }}
          >
            <span
              className="absolute -top-3 left-6 px-2 text-[10px] font-bold uppercase tracking-[0.32em]"
              style={{
                backgroundColor: tokens.colors.background,
                color: tokens.colors.primary,
                fontFamily: tokens.typography.fontMono,
              }}
            >
              From the kitchen
            </span>
            <blockquote
              className="text-[20px] lg:text-[22px] leading-snug italic"
              style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontDisplay, fontWeight: 500 }}
            >
              {quote}
            </blockquote>
            {quoteAttr && (
              <figcaption
                className="mt-4 text-[11px] font-bold uppercase tracking-[0.28em]"
                style={{ color: tokens.colors.primary, fontFamily: tokens.typography.fontMono }}
              >
                {quoteAttr}
              </figcaption>
            )}
          </motion.figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
