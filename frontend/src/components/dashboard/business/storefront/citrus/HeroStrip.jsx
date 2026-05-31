import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useCitrus } from './CitrusContext';

const HeroStrip = () => {
  const { tokens, sectionsConfig } = useCitrus();
  const section = sectionsConfig.find((s) => s.id === 'hero');
  if (!section?.content) return null;
  const { eyebrow, headline, subtitle, facts = [] } = section.content;

  return (
    <section className="relative" data-testid="citrus-hero">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-10 lg:pt-14 pb-8 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-end">
          {/* Left – heading block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                style={{
                  backgroundColor: tokens.colors.surface,
                  border: tokens.effects.border,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: tokens.colors.primary }}
                />
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: tokens.colors.text }}>
                  {eyebrow}
                </span>
              </div>
            )}
            <h1
              className="text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.92] font-black tracking-[-0.04em] whitespace-pre-line"
              style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
            >
              {headline}
            </h1>
            {subtitle && (
              <p
                className="mt-6 text-[15px] lg:text-[16px] font-medium max-w-[480px] leading-relaxed"
                style={{ color: tokens.colors.textMuted }}
              >
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Right – facts panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="rounded-[28px] overflow-hidden"
              style={{
                backgroundColor: tokens.colors.text,
                border: tokens.effects.border,
                boxShadow: tokens.effects.shadow.card,
              }}
            >
              <div className="p-6 lg:p-7">
                <div
                  className="text-[10px] font-black uppercase tracking-[0.3em] mb-4"
                  style={{ color: tokens.colors.sun }}
                >
                  Today at the kitchen
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {facts.map((f, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-[32px] lg:text-[40px] font-black leading-none text-white"
                          style={{ fontFamily: tokens.typography.fontHeading }}
                        >
                          {f.value}
                        </span>
                        <span
                          className="text-[12px] font-bold"
                          style={{ color: tokens.colors.sun }}
                        >
                          {f.unit}
                        </span>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest mt-1 text-white/60">
                        {f.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="px-6 lg:px-7 py-3 flex items-center justify-between"
                style={{
                  backgroundColor: tokens.colors.primary,
                  borderTop: tokens.effects.border,
                }}
              >
                <div className="flex items-center gap-2 text-white">
                  <SafeIcon icon={FiIcons.FiZap} className="text-base" />
                  <span className="text-[12px] font-black uppercase tracking-widest">
                    Now serving
                  </span>
                </div>
                <SafeIcon icon={FiIcons.FiArrowRight} className="text-lg text-white" />
              </div>
            </div>
            {/* Decorative dot */}
            <div
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full hidden lg:flex items-center justify-center"
              style={{
                backgroundColor: tokens.colors.sun,
                border: tokens.effects.border,
              }}
            >
              <SafeIcon icon={FiIcons.FiStar} className="text-base" style={{ color: tokens.colors.text }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroStrip;
