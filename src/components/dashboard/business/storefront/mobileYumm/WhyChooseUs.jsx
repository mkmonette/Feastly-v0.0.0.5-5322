import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileYumm } from './MobileYummContext';

const ICON_MAP = {
  fast: FiIcons.FiZap,
  safe: FiIcons.FiShield,
  free: FiIcons.FiTruck,
  fresh: FiIcons.FiSun
};

const WhyChooseUs = () => {
  const { tokens, sectionsConfig } = useMobileYumm();
  const section = sectionsConfig.find(s => s.id === 'why');

  if (!section?.content) return null;

  const { title, features } = section.content;

  return (
    <section className="px-4 pt-5 pb-2">
      <h2 className="text-base font-black mb-4" style={{ color: tokens.colors.primaryText }}>
        {title}
      </h2>
      <div className="grid grid-cols-4 gap-2">
        {features.map((feature, i) => {
          const Icon = ICON_MAP[feature.icon] || FiIcons.FiStar;
          return (
            <div key={i} className="flex flex-col items-center text-center bg-white rounded-2xl p-3 shadow-sm">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mb-1.5"
                style={{ backgroundColor: `${tokens.colors.primary}18` }}
              >
                <SafeIcon icon={Icon} className="text-base" style={{ color: tokens.colors.primary }} />
              </div>
              <span className="text-xs font-black leading-none mb-0.5" style={{ color: tokens.colors.primaryText }}>
                {feature.label}
              </span>
              <span className="text-[9px] text-gray-500 leading-tight">{feature.desc}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
