import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useLumen } from './LumenContext';

const Footer = () => {
  const { tokens, sectionsConfig } = useLumen();
  const section = sectionsConfig.find((s) => s.id === 'footer');
  const {
    businessName = 'LUMEN',
    address = '',
    phone = '',
    hours = '',
  } = section?.content || {};

  return (
    <footer
      className="relative mt-10"
      style={{
        backgroundColor: tokens.colors.panelInk,
        color: tokens.colors.textOnDark,
      }}
      data-testid="lumen-footer"
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.accent} 100%)` }}
            >
              <SafeIcon icon={FiIcons.FiSun} className="text-lg text-white" />
            </div>
            <div className="text-[24px] font-black tracking-tight" style={{ fontFamily: tokens.typography.fontHeading }}>
              {businessName}
            </div>
          </div>
          <p className="text-[13px] font-medium leading-relaxed text-white/70 max-w-[420px]">
            A modern kitchen serving honest, made-to-order food. Bright by design, kind by default.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[FiIcons.FiInstagram, FiIcons.FiTwitter, FiIcons.FiFacebook, FiIcons.FiYoutube].map((Ic, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                }}
              >
                <SafeIcon icon={Ic} className="text-sm" />
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="md:col-span-4">
          <div className="text-[10px] font-black uppercase tracking-[0.28em] text-white/55 mb-3">
            Visit
          </div>
          <div className="space-y-2.5 text-[13px] font-bold">
            {address && (
              <div className="flex items-start gap-2">
                <SafeIcon icon={FiIcons.FiMapPin} className="text-base mt-0.5" style={{ color: tokens.colors.primary }} />
                <span className="text-white/90">{address}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-start gap-2">
                <SafeIcon icon={FiIcons.FiPhone} className="text-base mt-0.5" style={{ color: tokens.colors.primary }} />
                <span className="text-white/90">{phone}</span>
              </div>
            )}
            {hours && (
              <div className="flex items-start gap-2">
                <SafeIcon icon={FiIcons.FiClock} className="text-base mt-0.5" style={{ color: tokens.colors.primary }} />
                <span className="text-white/90">{hours}</span>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3">
          <div className="text-[10px] font-black uppercase tracking-[0.28em] text-white/55 mb-3">
            Stay in the loop
          </div>
          <p className="text-[12px] font-medium mb-3 text-white/65">
            New dishes and small kitchen stories, monthly.
          </p>
          <div
            className="flex items-center gap-2 p-1 rounded-full"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <input
              placeholder="you@email.com"
              className="flex-1 bg-transparent px-3 py-1.5 outline-none text-[12px] font-medium text-white placeholder-white/40"
              data-testid="lumen-newsletter-email"
            />
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: tokens.colors.primary }}
              data-testid="lumen-newsletter-submit"
            >
              <SafeIcon icon={FiIcons.FiArrowRight} className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="max-w-[1400px] mx-auto px-5 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-medium text-white/45"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <span>© {new Date().getFullYear()} {businessName} · Modern kitchen</span>
        <span>Bright by design.</span>
      </div>
    </footer>
  );
};

export default Footer;
