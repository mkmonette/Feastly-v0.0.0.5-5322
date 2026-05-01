import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSage } from './SageContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useSage();
  const section = sectionsConfig.find(s => s.id === 'hero');
  if (!section) return null;
  const { preText, headline, subtitle, button1Text, button2Text, heroImage, rating, ratingCount } = section.content || {};

  return (
    <section
      className="w-full"
      style={{ backgroundColor: tokens.colors.background }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div>
          {preText && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 tracking-wider uppercase"
              style={{ backgroundColor: tokens.colors.badgeBg, color: tokens.colors.badgeText, border: `1px solid ${tokens.colors.badgeBorder}` }}
            >
              {preText}
            </div>
          )}

          <h1
            className="text-4xl md:text-5xl font-black leading-tight mb-4"
            style={{ color: tokens.colors.textPrimary }}
          >
            {headline}
          </h1>

          <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ color: tokens.colors.textMuted }}>
            {subtitle}
          </p>

          <div className="flex items-center gap-3">
            {button1Text && (
              <button
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-85 active:scale-95"
                style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.textInverse }}
              >
                {button1Text}
              </button>
            )}
            {button2Text && (
              <button
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-70"
                style={{ color: tokens.colors.textMuted, border: `1px solid ${tokens.colors.border}` }}
              >
                {button2Text}
              </button>
            )}
          </div>
        </div>

        {/* Right: hero image with floating rating badge */}
        <div className="relative">
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${tokens.colors.heroImageBorder}` }}
          >
            <img
              src={heroImage || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
              alt="Hero dish"
              className="w-full object-cover"
              style={{ height: 340 }}
            />
          </div>

          {/* Floating rating badge */}
          {rating && (
            <div
              className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ backgroundColor: tokens.colors.surface, border: `1px solid ${tokens.colors.border}` }}
            >
              <SafeIcon icon={FiIcons.FiStar} className="text-sm" style={{ color: tokens.colors.starColor }} />
              <span className="text-sm font-black" style={{ color: tokens.colors.textPrimary }}>{rating}</span>
              {ratingCount && (
                <span className="text-xs" style={{ color: tokens.colors.textMuted }}>{ratingCount}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
