import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const Hero = () => {
  const { tokens, sectionsConfig } = useMobileNative();
  const section = sectionsConfig?.find(s => s.id === 'hero');
  const content = section?.content || {};

  const {
    preText = 'Fast & Fresh',
    headline = 'Order Your Favorites',
    headlineHighlight = 'Favorites',
    subtitle = 'Delicious meals delivered to your door',
    ctaPrimary = 'Browse Menu',
    backgroundImage = 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'
  } = content;

  const parts = headline.split(headlineHighlight);

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

      <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 py-12 relative z-10`}>
        <div className="text-center">
          {preText && (
            <p className="text-[13px] font-medium text-white/80 mb-2 uppercase tracking-wide">
              {preText}
            </p>
          )}

          <h1 className={`text-[32px] ${tokens.typography.headingWeight} leading-tight mb-3 text-white`}>
            {parts[0]}
            {headlineHighlight && (
              <span style={{ color: tokens.colors.primary }}>
                {headlineHighlight}
              </span>
            )}
            {parts[1]}
          </h1>

          {subtitle && (
            <p className="text-[15px] text-white/90 mb-6">
              {subtitle}
            </p>
          )}

          {ctaPrimary && (
            <button
              className={`px-6 py-3 ${tokens.layout.borderRadius.button} text-[15px] font-semibold text-white active:scale-95 transition-transform inline-flex items-center gap-2`}
              style={{
                backgroundColor: tokens.colors.primary,
                boxShadow: tokens.effects.shadow.button
              }}
            >
              {ctaPrimary}
              <SafeIcon icon={FiIcons.FiArrowRight} className="text-[16px]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
