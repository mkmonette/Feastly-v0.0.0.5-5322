import React from 'react';
import { useMobileNeon } from './MobileNeonContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const Hero = () => {
  const { tokens, sectionsConfig } = useMobileNeon();
  const section = sectionsConfig.find(s => s.id === 'hero');

  if (!section?.content) return null;

  const { preText, headline, subtitle, stats } = section.content;

  return (
    <div className="mx-3 mt-3 rounded-2xl overflow-hidden" style={{ backgroundColor: tokens.colors.cardBackground, border: `1px solid ${tokens.colors.border}` }}>
      <div className="px-5 py-5">
        {preText && (
          <div className="inline-flex items-center gap-1.5 mb-3">
            <SafeIcon icon={FiIcons.FiZap} className="text-xs" style={{ color: tokens.colors.primary }} />
            <span className="text-xs font-bold" style={{ color: tokens.colors.primary }}>{preText}</span>
          </div>
        )}

        <h1 className="text-2xl font-black leading-tight mb-1" style={{ color: tokens.colors.heroHeadline }}>
          {headline}
        </h1>

        {subtitle && (
          <p className="text-sm mb-4" style={{ color: tokens.colors.muted }}>{subtitle}</p>
        )}

        {stats && stats.length > 0 && (
          <div className="flex gap-6 mt-3">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-lg font-black leading-none" style={{ color: tokens.colors.primaryText }}>{stat.value}</div>
                <div className="text-[10px] font-medium mt-0.5" style={{ color: tokens.colors.muted }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
