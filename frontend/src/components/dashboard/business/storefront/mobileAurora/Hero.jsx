import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileAurora } from './MobileAuroraContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useMobileAurora();
  const section = sectionsConfig.find((s) => s.id === 'hero');
  if (!section?.content) return null;

  const { eyebrow, headline, subtitle, cta, stats } = section.content;

  return (
    <section className="relative px-4 pt-5 pb-2" data-testid="aurora-hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[32px]"
        style={{
          background: tokens.colors.heroGradient,
          boxShadow: tokens.effects.shadow.floating,
          minHeight: '360px',
        }}
      >
        {/* Layered translucent shapes for depth */}
        <div
          className="absolute -bottom-16 -right-12 w-56 h-56 rounded-full opacity-50 blur-2xl"
          style={{ background: 'radial-gradient(circle, #fff, transparent 70%)' }}
        />
        <div
          className="absolute -top-12 -left-8 w-40 h-40 rounded-full opacity-40 blur-2xl"
          style={{ background: 'radial-gradient(circle, #fff, transparent 70%)' }}
        />

        <div className="relative z-10 px-6 pt-6 pb-7 flex flex-col h-full">
          {eyebrow && (
            <div
              className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur"
              style={{ backgroundColor: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.8)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.colors.primary }} />
              <span className="text-[11px] font-bold" style={{ color: tokens.colors.text }}>
                {eyebrow}
              </span>
            </div>
          )}

          <h1
            className="mt-5 text-[34px] leading-[1.05] font-black tracking-tight whitespace-pre-line"
            style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
          >
            {headline}
          </h1>

          {subtitle && (
            <p className="mt-3 text-[14px] font-medium max-w-[280px]" style={{ color: '#3A2A4A' }}>
              {subtitle}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-black text-white transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: tokens.colors.text, boxShadow: tokens.effects.shadow.soft }}
              data-testid="aurora-hero-cta"
            >
              {cta}
              <SafeIcon icon={FiIcons.FiArrowRight} className="text-base" />
            </button>
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.8)',
                color: tokens.colors.text,
              }}
              data-testid="aurora-hero-play"
            >
              <SafeIcon icon={FiIcons.FiPlay} className="text-base" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Floating stats card overlapping hero bottom */}
      {stats && stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="relative -mt-7 mx-3 rounded-[24px] p-3.5 grid grid-cols-3 gap-1 z-20"
          style={{
            backgroundColor: 'rgba(255,255,255,0.85)',
            border: `1px solid ${tokens.colors.border}`,
            backdropFilter: 'blur(20px)',
            boxShadow: tokens.effects.shadow.card,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center text-center"
              style={{
                borderRight: i < stats.length - 1 ? `1px solid ${tokens.colors.border}` : 'none',
              }}
            >
              <div
                className="text-base font-black leading-none"
                style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
              >
                {s.value}
              </div>
              <div
                className="text-[10px] font-semibold mt-1 uppercase tracking-wider"
                style={{ color: tokens.colors.textMuted }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
