import React from 'react';
import { useSage } from './SageContext';

const SlidingBanner = () => {
  const { tokens, sectionsConfig } = useSage();
  const section = sectionsConfig.find(s => s.id === 'banner');
  if (!section) return null;
  const items = section.content?.items || ['FRESH INGREDIENTS', 'SEASONAL MENU', 'FARM TO TABLE', 'CRAFTED DAILY', 'PREMIUM QUALITY', 'LOCAL PRODUCE'];

  /* Duplicate items so the marquee loops seamlessly */
  const ticker = [...items, ...items, ...items];

  return (
    <div
      className="w-full overflow-hidden py-3.5"
      style={{ backgroundColor: tokens.colors.primary }}
    >
      <style>{`
        @keyframes sage-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .sage-marquee-track {
          display: flex;
          width: max-content;
          animation: sage-marquee 22s linear infinite;
        }
        .sage-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="sage-marquee-track">
        {ticker.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-6 text-xs font-bold tracking-widest uppercase whitespace-nowrap"
            style={{ color: tokens.colors.textInverse }}
          >
            {item}
            <span className="opacity-50 text-base">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SlidingBanner;
