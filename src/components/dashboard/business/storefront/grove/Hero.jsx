import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useGrove } from './GroveContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useGrove();
  const section = sectionsConfig.find(s => s.id === 'hero');
  if (!section?.content) return null;
  const { preText, headline, subtitle, backgroundImage, stats } = section.content;

  return (
    <div className="relative overflow-hidden" style={{ minHeight: 360 }}>
      {/* Full-bleed background image with dark green overlay */}
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: tokens.colors.heroOverlay }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* "Fresh menu daily" pill badge */}
        {preText && (
          <div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: tokens.colors.badgeBg, border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <SafeIcon icon={FiIcons.FiZap} className="text-xs" style={{ color: '#FFFFFF' }} />
            <span className="text-xs font-medium" style={{ color: tokens.colors.badgeText }}>
              {preText}
            </span>
          </div>
        )}

        <h1 className="text-5xl font-black mb-4 leading-tight max-w-lg" style={{ color: tokens.colors.heroPrimaryText }}>
          {headline}
        </h1>

        {subtitle && (
          <p className="text-sm leading-relaxed mb-10 max-w-md whitespace-pre-line" style={{ color: tokens.colors.heroMutedText }}>
            {subtitle}
          </p>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-8">
          {(stats || []).map((stat, i) => (
            <div key={i} className="flex items-baseline gap-1.5">
              {stat.star && (
                <SafeIcon icon={FiIcons.FiStar} className="text-sm mb-0.5" style={{ color: tokens.colors.starColor }} />
              )}
              <span className="text-lg font-black" style={{ color: tokens.colors.heroStatValue }}>{stat.value}</span>
              <span className="text-xs ml-0.5" style={{ color: tokens.colors.heroStatLabel }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
