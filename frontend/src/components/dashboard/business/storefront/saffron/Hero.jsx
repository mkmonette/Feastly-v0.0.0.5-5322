import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSaffron } from './SaffronContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useSaffron();
  const section = sectionsConfig.find((s) => s.id === 'hero');
  if (!section?.content) return null;
  const { eyebrow, headline, subtitle, cta, heroImage, facts = [] } = section.content;

  return (
    <section className="relative" data-testid="saffron-hero">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-8 lg:pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left – text */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                style={{
                  backgroundColor: tokens.colors.sageSoft,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: tokens.colors.sage }}
                />
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: tokens.colors.accent }}>
                  {eyebrow}
                </span>
              </div>
            )}
            <h1
              className="text-[44px] sm:text-[60px] lg:text-[78px] leading-[0.96] font-black tracking-[-0.035em] whitespace-pre-line"
              style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
            >
              {headline.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span style={{ color: tokens.colors.primary }}>{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
            {subtitle && (
              <p
                className="mt-5 text-[15px] lg:text-[16.5px] font-medium leading-relaxed max-w-[460px]"
                style={{ color: tokens.colors.textMuted }}
              >
                {subtitle}
              </p>
            )}

            <div className="mt-7 flex items-center gap-3 flex-wrap">
              <button
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-95"
                style={{
                  backgroundColor: tokens.colors.primary,
                  color: tokens.colors.textOnPrimary,
                  boxShadow: tokens.effects.shadow.brand,
                }}
                data-testid="saffron-hero-cta"
              >
                {cta}
                <SafeIcon icon={FiIcons.FiArrowRight} className="text-base" />
              </button>
              <button
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: tokens.colors.surface,
                  color: tokens.colors.text,
                  border: `1px solid ${tokens.colors.border}`,
                }}
                data-testid="saffron-hero-secondary"
              >
                <SafeIcon icon={FiIcons.FiMapPin} className="text-sm" />
                Find a location
              </button>
            </div>

            {/* Stats inline */}
            {facts.length > 0 && (
              <div className="mt-8 grid grid-cols-3 gap-3 lg:gap-6 max-w-[440px]">
                {facts.map((f, i) => (
                  <div key={i}>
                    <div
                      className="text-[22px] lg:text-[26px] font-black leading-none"
                      style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                    >
                      {f.value}
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-wider mt-1.5" style={{ color: tokens.colors.text }}>
                      {f.label}
                    </div>
                    {f.sub && (
                      <div className="text-[10px] font-medium mt-0.5" style={{ color: tokens.colors.textSubtle }}>
                        {f.sub}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right – photo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="relative rounded-[32px] overflow-hidden aspect-[5/6]"
              style={{
                boxShadow: tokens.effects.shadow.hover,
              }}
            >
              <img
                src={heroImage}
                alt="Saffron kitchen"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(11,31,42,0.45) 100%)' }} />

              {/* Floating rating chip */}
              <div
                className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.88)',
                  color: tokens.colors.text,
                }}
              >
                <SafeIcon icon={FiIcons.FiStar} className="text-sm" style={{ color: tokens.colors.primary }} />
                <span className="text-[11px] font-black tracking-tight">4.9</span>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: tokens.colors.textMuted }}>
                  · 12k reviews
                </span>
              </div>

              {/* Bottom delivery chip */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur"
                  style={{ backgroundColor: 'rgba(255,255,255,0.88)', color: tokens.colors.text }}
                >
                  <SafeIcon icon={FiIcons.FiClock} className="text-sm" style={{ color: tokens.colors.sage }} />
                  <span className="text-[11px] font-black">Delivers in 25 min</span>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.textOnPrimary }}
                >
                  <span className="text-[11px] font-black uppercase tracking-widest">Open</span>
                </div>
              </div>
            </div>

            {/* Decorative chip top-right */}
            <div
              className="hidden md:flex absolute -top-4 -right-4 w-20 h-20 rounded-full items-center justify-center text-center"
              style={{
                backgroundColor: tokens.colors.sun,
                boxShadow: tokens.effects.shadow.card,
                color: tokens.colors.text,
                fontFamily: tokens.typography.fontHeading,
              }}
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest leading-none">Free</div>
                <div className="text-[13px] font-black leading-none mt-1">delivery</div>
                <div className="text-[9px] font-bold uppercase tracking-wider mt-1 opacity-70">{'over ₱500'}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
