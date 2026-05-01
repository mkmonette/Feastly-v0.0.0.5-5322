import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileYumm } from './MobileYummContext';

const TICKER_ICONS = [FiIcons.FiTruck, FiIcons.FiSun, FiIcons.FiClock];

const SEPARATOR = '•';

const Ticker = () => {
  const { tokens, sectionsConfig } = useMobileYumm();
  const section = sectionsConfig.find(s => s.id === 'ticker');

  if (!section?.content) return null;

  const { items } = section.content;

  // Duplicate the items so the scroll loops seamlessly
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="mx-3 my-3 rounded-xl overflow-hidden"
      style={{ backgroundColor: tokens.colors.primary }}
    >
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 12s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden py-2.5">
        <div className="ticker-track">
          {repeated.map((item, i) => {
            const Icon = TICKER_ICONS[i % items.length % TICKER_ICONS.length];
            return (
              <div key={i} className="flex items-center gap-2 px-5 whitespace-nowrap">
                <SafeIcon icon={Icon} className="text-xs text-white/90 flex-shrink-0" />
                <span className="text-white text-[11px] font-black uppercase tracking-widest">
                  {item}
                </span>
                <span className="text-white/40 text-xs mx-1">{SEPARATOR}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ticker;
