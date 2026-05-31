import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSaffron } from './SaffronContext';

const ICON_MAP = {
  leaf: FiIcons.FiActivity,
  flame: FiIcons.FiZap,
  box: FiIcons.FiBox,
  heart: FiIcons.FiHeart,
};

const CommitmentBand = () => {
  const { tokens, sectionsConfig } = useSaffron();
  const section = sectionsConfig.find((s) => s.id === 'commitment');
  if (!section?.content) return null;
  const { title, items = [] } = section.content;
  if (items.length === 0) return null;

  return (
    <section className="relative py-12" data-testid="saffron-commitment">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div
          className="relative rounded-[32px] overflow-hidden p-6 lg:p-10"
          style={{
            backgroundColor: tokens.colors.panelInk,
            color: tokens.colors.textOnAccent,
          }}
        >
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-25 blur-3xl"
            style={{ background: tokens.colors.primary }}
          />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <h2
              className="text-[26px] lg:text-[34px] font-black tracking-[-0.02em] leading-tight max-w-[420px]"
              style={{ fontFamily: tokens.typography.fontHeading }}
            >
              {title}
            </h2>
            <div
              className="text-[11px] font-bold uppercase tracking-[0.32em] opacity-60"
            >
              Since 2022 · Always honest food
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {items.map((it, i) => {
              const Icon = ICON_MAP[it.icon] || FiIcons.FiCheckCircle;
              return (
                <div
                  key={i}
                  className="rounded-[20px] p-4 lg:p-5"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: tokens.colors.primary,
                      color: tokens.colors.textOnPrimary,
                    }}
                  >
                    <SafeIcon icon={Icon} className="text-base" />
                  </div>
                  <h3
                    className="text-[15px] font-black tracking-tight"
                    style={{ fontFamily: tokens.typography.fontHeading }}
                  >
                    {it.title}
                  </h3>
                  <p className="text-[12px] font-medium mt-1.5 leading-relaxed opacity-75">
                    {it.copy}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommitmentBand;
