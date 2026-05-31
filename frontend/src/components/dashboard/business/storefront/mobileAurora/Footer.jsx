import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileAurora } from './MobileAuroraContext';

const Footer = () => {
  const { tokens, sectionsConfig } = useMobileAurora();
  const headerSection = sectionsConfig.find((s) => s.id === 'header');
  const brand = headerSection?.content?.brand || 'Aurora';

  return (
    <footer
      className="relative mt-8 mx-3 mb-3 rounded-[28px] overflow-hidden"
      style={{
        background: tokens.colors.text,
        boxShadow: tokens.effects.shadow.floating,
      }}
      data-testid="aurora-footer"
    >
      <div
        className="absolute -top-16 -right-12 w-44 h-44 rounded-full opacity-20 blur-2xl"
        style={{ background: tokens.colors.auroraGradient }}
      />
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: tokens.colors.auroraGradient }}
          >
            <SafeIcon icon={FiIcons.FiSun} className="text-base text-white" />
          </div>
          <div className="text-white font-black text-base tracking-tight" style={{ fontFamily: tokens.typography.fontHeading }}>
            {brand}
          </div>
        </div>

        <p className="text-[12px] font-medium text-white/70 leading-relaxed max-w-[280px]">
          Fresh meals, bright vibes. Delivering happiness one bite at a time.
        </p>

        <div className="mt-5 flex items-center gap-2">
          {[FiIcons.FiInstagram, FiIcons.FiTwitter, FiIcons.FiFacebook, FiIcons.FiYoutube].map((Ic, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <SafeIcon icon={Ic} className="text-sm" />
            </button>
          ))}
        </div>

        <div
          className="mt-5 pt-4 text-[11px] font-medium flex items-center justify-between text-white/55"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span>© {new Date().getFullYear()} {brand}</span>
          <span>Made with ♥</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
