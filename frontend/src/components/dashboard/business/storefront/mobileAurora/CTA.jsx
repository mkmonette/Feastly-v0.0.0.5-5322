import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileAurora } from './MobileAuroraContext';

const CTA = () => {
  const { tokens, sectionsConfig } = useMobileAurora();
  const section = sectionsConfig.find((s) => s.id === 'cta');
  if (!section?.content) return null;

  const { title, subtitle, buttonText } = section.content;

  return (
    <section className="relative px-4 pt-6 pb-2" data-testid="aurora-cta">
      <div
        className="relative overflow-hidden rounded-[28px] p-5"
        style={{
          background: tokens.colors.auroraGradient,
          boxShadow: tokens.effects.shadow.floating,
        }}
      >
        <div
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-40 blur-2xl"
          style={{ background: 'radial-gradient(circle, #fff, transparent 70%)' }}
        />
        <div
          className="absolute -left-6 -bottom-10 w-32 h-32 rounded-full opacity-30 blur-2xl"
          style={{ background: 'radial-gradient(circle, #fff, transparent 70%)' }}
        />

        <div className="relative z-10 flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}
          >
            <SafeIcon icon={FiIcons.FiGift} className="text-xl text-white" />
          </div>
          <div className="flex-1">
            <h3
              className="text-[17px] font-black leading-tight text-white"
              style={{ fontFamily: tokens.typography.fontHeading }}
            >
              {title}
            </h3>
            <p className="text-[12px] font-medium mt-1" style={{ color: 'rgba(255,255,255,0.92)' }}>
              {subtitle}
            </p>
            <button
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-black transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#fff', color: tokens.colors.text }}
              data-testid="aurora-cta-button"
            >
              {buttonText}
              <SafeIcon icon={FiIcons.FiArrowRight} className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
