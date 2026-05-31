import React from 'react';
import { motion } from 'framer-motion';
import { useMosaic } from './MosaicContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useMosaic();
  const section = sectionsConfig.find((s) => s.id === 'hero');
  if (!section?.content) return null;
  const { eyebrow, title, subtitle } = section.content;

  return (
    <section className="relative" data-testid="mosaic-hero">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-10 lg:pt-14 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {eyebrow && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{
                backgroundColor: tokens.colors.surface,
                border: `1px solid ${tokens.colors.border}`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: tokens.colors.accent }}
              />
              <span
                className="text-[11px] font-black uppercase tracking-widest"
                style={{ color: tokens.colors.text }}
              >
                {eyebrow}
              </span>
            </div>
          )}
          <h1
            className="text-[44px] sm:text-[60px] lg:text-[80px] font-black tracking-[-0.035em] leading-[0.96] whitespace-pre-line"
            style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-5 text-[15px] lg:text-[16.5px] font-medium leading-relaxed max-w-[640px]"
              style={{ color: tokens.colors.textMuted }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
