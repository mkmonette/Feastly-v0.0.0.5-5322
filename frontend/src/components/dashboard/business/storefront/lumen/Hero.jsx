import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useLumen } from './LumenContext';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80';

const Hero = () => {
  const { tokens, sectionsConfig } = useLumen();
  const section = sectionsConfig.find((s) => s.id === 'hero');
  if (!section?.content) return null;
  const { preText, headline, subtitle, stats = [] } = section.content;

  return (
    <section className="relative" data-testid="lumen-hero">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-10 lg:pt-14 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Left – text */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {preText && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                style={{ backgroundColor: tokens.colors.primarySoft }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: tokens.colors.primary }}
                />
                <span
                  className="text-[11px] font-black uppercase tracking-widest"
                  style={{ color: tokens.colors.primary }}
                >
                  {preText}
                </span>
              </div>
            )}

            <h1
              className="text-[44px] sm:text-[60px] lg:text-[80px] leading-[0.96] font-black tracking-[-0.035em]"
              style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
            >
              {headline.split(',').map((part, i, arr) => (
                <span key={i} className="block">
                  {i === arr.length - 1 ? (
                    <span style={{ color: tokens.colors.primary }}>{part.trim()}</span>
                  ) : (
                    <>{part}{','}</>
                  )}
                </span>
              ))}
            </h1>

            {subtitle && (
              <p
                className="mt-5 text-[15px] lg:text-[16.5px] font-medium leading-relaxed max-w-[500px]"
                style={{ color: tokens.colors.textMuted }}
              >
                {subtitle}
              </p>
            )}

            {/* CTAs */}
            <div className="mt-7 flex items-center gap-3 flex-wrap">
              <button
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-95"
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: tokens.colors.textOnPrimary,
                  boxShadow: tokens.effects.shadow.brand,
                }}
                data-testid="lumen-hero-cta"
              >
                Order now
                <SafeIcon icon={FiIcons.FiArrowRight} className="text-base" />
              </button>
              <button
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: tokens.colors.surface,
                  color: tokens.colors.text,
                  border: `1px solid ${tokens.colors.border}`,
                }}
                data-testid="lumen-hero-secondary"
              >
                <SafeIcon icon={FiIcons.FiPlay} className="text-sm" />
                Watch the kitchen
              </button>
            </div>

            {/* Stats */}
            {stats.length > 0 && (
              <div className="mt-9 grid grid-cols-3 gap-3 lg:gap-6 max-w-[460px]">
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-[24px] lg:text-[30px] font-black leading-none"
                        style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                      >
                        {s.value}
                      </span>
                      {s.star && (
                        <SafeIcon icon={FiIcons.FiStar} className="text-base" style={{ color: tokens.colors.star }} />
                      )}
                    </div>
                    <div
                      className="text-[11px] font-bold uppercase tracking-wider mt-1.5"
                      style={{ color: tokens.colors.text }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right – photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="relative rounded-[32px] overflow-hidden aspect-[5/6]"
              style={{ boxShadow: tokens.effects.shadow.hover }}
            >
              <img
                src={HERO_IMAGE}
                alt="Lumen kitchen"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(21,21,42,0.5) 100%)' }}
              />

              {/* Top rating chip */}
              <div
                className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur"
                style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: tokens.colors.text }}
              >
                <SafeIcon icon={FiIcons.FiStar} className="text-sm" style={{ color: tokens.colors.star }} />
                <span className="text-[11px] font-black">4.9</span>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: tokens.colors.textMuted }}>
                  · 12k reviews
                </span>
              </div>

              {/* Bottom chips */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur"
                  style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: tokens.colors.text }}
                >
                  <SafeIcon icon={FiIcons.FiClock} className="text-sm" style={{ color: tokens.colors.sage }} />
                  <span className="text-[11px] font-black">Delivers in 30 min</span>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: tokens.colors.sage, color: '#fff' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#fff' }} />
                  <span className="text-[11px] font-black uppercase tracking-widest">Open</span>
                </div>
              </div>
            </div>

            {/* Floating coral disc */}
            <div
              className="hidden md:flex absolute -top-3 -right-3 w-20 h-20 rounded-full items-center justify-center text-center"
              style={{
                backgroundColor: tokens.colors.accent,
                boxShadow: tokens.effects.shadow.accent,
                color: '#fff',
                fontFamily: tokens.typography.fontHeading,
              }}
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest leading-none">First</div>
                <div className="text-[15px] font-black leading-none mt-1">−20%</div>
                <div className="text-[9px] font-bold uppercase tracking-wider mt-1 opacity-80">order</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
