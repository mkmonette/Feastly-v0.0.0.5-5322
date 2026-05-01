import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useHearth } from './HearthContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useHearth();
  const section = sectionsConfig.find(s => s.id === 'hero');
  if (!section?.content) return null;
  const { preText, headline, subtitle, stats } = section.content;

  return (
    /* Pure dark background — no background image */
    <div className="w-full" style={{ backgroundColor: tokens.colors.background, minHeight: 300 }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* "Made from scratch" pill badge */}
        {preText && (
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: tokens.colors.badgeBg,
              border: `1px solid ${tokens.colors.badgeBorder}`
            }}
          >
            <SafeIcon icon={FiIcons.FiTool} className="text-xs" style={{ color: tokens.colors.primary }} />
            <span className="text-xs font-medium" style={{ color: tokens.colors.badgeText }}>{preText}</span>
          </div>
        )}

        <h1
          className="font-black leading-tight mb-4 max-w-xl"
          style={{ color: tokens.colors.primaryText, fontSize: '3rem' }}
        >
          {headline}
        </h1>

        {subtitle && (
          <p className="text-sm leading-relaxed mb-10 max-w-sm" style={{ color: tokens.colors.mutedText }}>
            {subtitle}
          </p>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-6">
          {(stats || []).map((stat, i) => (
            <div key={i} className="flex items-center gap-1.5">
              {stat.star && (
                <SafeIcon icon={FiIcons.FiStar} className="text-sm" style={{ color: tokens.colors.starColor }} />
              )}
              <span className="text-base font-black" style={{ color: tokens.colors.primaryText }}>{stat.value}</span>
              <span className="text-xs" style={{ color: tokens.colors.mutedText }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
