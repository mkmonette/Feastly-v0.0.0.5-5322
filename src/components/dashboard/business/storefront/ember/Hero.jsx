import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useEmber } from './EmberContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useEmber();
  const section = sectionsConfig.find(s => s.id === 'hero');
  if (!section?.content) return null;
  const { preText, headline, subtitle, backgroundImage, stats } = section.content;

  return (
    <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
      {backgroundImage && (
        <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0" style={{ backgroundColor: tokens.colors.heroOverlay }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* "Open late night" pill */}
        {preText && (
          <div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: tokens.colors.badgeBg,
              border: `1px solid ${tokens.colors.badgeBorder}`
            }}
          >
            <SafeIcon icon={FiIcons.FiSun} className="text-xs" style={{ color: tokens.colors.primary }} />
            <span className="text-xs font-medium" style={{ color: tokens.colors.badgeText }}>{preText}</span>
          </div>
        )}

        <h1
          className="font-black leading-tight mb-3 max-w-xl"
          style={{ color: tokens.colors.primaryText, fontSize: '3rem' }}
        >
          {headline}
        </h1>

        {subtitle && (
          <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {subtitle}
          </p>
        )}

        {/* Stats with pipe separators */}
        <div className="flex items-center gap-0 flex-wrap">
          {(stats || []).map((stat, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-1.5">
                {stat.star && (
                  <SafeIcon icon={FiIcons.FiStar} className="text-sm" style={{ color: tokens.colors.starColor }} />
                )}
                <span className="text-base font-black" style={{ color: tokens.colors.primaryText }}>{stat.value}</span>
                <span className="text-xs ml-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{stat.label}</span>
              </div>
              {i < (stats.length - 1) && (
                <span className="mx-4 text-sm" style={{ color: tokens.colors.statSeparator }}>|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
