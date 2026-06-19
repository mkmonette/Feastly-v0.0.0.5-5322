import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileNeon } from './MobileNeonContext';

const TICKER_ICONS = [FiIcons.FiTruck, FiIcons.FiZap, FiIcons.FiShoppingBag];
const SEPARATOR = '✦';

const Ticker = () => {
  const { tokens, sectionsConfig } = useMobileNeon();
  const section = sectionsConfig.find(s => s.id === 'ticker');

  if (!section?.content) return null;

  const { items } = section.content;
  const repeated = [...items, ...items, ...items];

  return (
    <div className="mx-3 my-3 rounded-xl overflow-hidden" style={{ backgroundColor: tokens.colors.primary }}>
      <style>{`
        @keyframes neon-ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .neon-ticker-track {
          display: flex;
          width: max-content;
          animation: neon-ticker-scroll 10s linear infinite;
        }
        .neon-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="overflow-hidden py-2.5">
        <div className="neon-ticker-track">
          {repeated.map((item, i) => {
            const Icon = TICKER_ICONS[i % items.length % TICKER_ICONS.length];
            return (
              <div key={i} className="flex items-center gap-2 px-5 whitespace-nowrap">
                <SafeIcon icon={Icon} className="text-xs flex-shrink-0" style={{ color: tokens.colors.secondary }} />
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: tokens.colors.secondary }}>
                  {item}
                </span>
                <span className="text-xs mx-1" style={{ color: `${tokens.colors.secondary}60` }}>{SEPARATOR}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ticker;
