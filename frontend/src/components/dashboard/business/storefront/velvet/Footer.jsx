import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useVelvet } from './VelvetContext';

const Footer = () => {
  const { tokens, sectionsConfig } = useVelvet();
  const section = sectionsConfig.find((s) => s.id === 'footer');
  const { brandLine = '', address = '', phone = '', hours = '', sign = '' } = section?.content || {};

  return (
    <footer
      className="relative z-10 mt-12"
      style={{
        borderTop: `1px solid ${tokens.colors.border}`,
      }}
      data-testid="velvet-footer"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand block */}
        <div>
          <div
            className="text-[14px] font-bold uppercase tracking-[0.32em] mb-3"
            style={{ color: tokens.colors.primary, fontFamily: tokens.typography.fontMono }}
          >
            About
          </div>
          <p
            className="text-[18px] italic leading-snug"
            style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontDisplay, fontWeight: 500 }}
          >
            {brandLine}
          </p>
          <p
            className="mt-3 text-[13px] italic leading-relaxed"
            style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.fontDisplay }}
          >
            A short, considered menu, written and re-written each morning.
          </p>
        </div>

        {/* Visit */}
        <div>
          <div
            className="text-[14px] font-bold uppercase tracking-[0.32em] mb-3"
            style={{ color: tokens.colors.primary, fontFamily: tokens.typography.fontMono }}
          >
            Visit
          </div>
          <div className="space-y-2.5 text-[13px]" style={{ fontFamily: tokens.typography.fontDisplay }}>
            {address && (
              <div className="flex items-start gap-2 italic" style={{ color: tokens.colors.text }}>
                <SafeIcon icon={FiIcons.FiMapPin} className="text-base mt-0.5" style={{ color: tokens.colors.primary }} />
                <span>{address}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-start gap-2 italic" style={{ color: tokens.colors.text }}>
                <SafeIcon icon={FiIcons.FiPhone} className="text-base mt-0.5" style={{ color: tokens.colors.primary }} />
                <span>{phone}</span>
              </div>
            )}
            {hours && (
              <div className="flex items-start gap-2 italic" style={{ color: tokens.colors.text }}>
                <SafeIcon icon={FiIcons.FiClock} className="text-base mt-0.5" style={{ color: tokens.colors.primary }} />
                <span>{hours}</span>
              </div>
            )}
          </div>
        </div>

        {/* Reserve */}
        <div>
          <div
            className="text-[14px] font-bold uppercase tracking-[0.32em] mb-3"
            style={{ color: tokens.colors.primary, fontFamily: tokens.typography.fontMono }}
          >
            Reserve
          </div>
          <p
            className="text-[13px] italic leading-relaxed mb-4"
            style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.fontDisplay }}
          >
            Tables are limited. We strongly recommend booking ahead.
          </p>
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.28em] transition-all hover:scale-[1.02]"
            style={{
              backgroundColor: tokens.colors.primary,
              color: tokens.colors.textOnGold,
              fontFamily: tokens.typography.fontMono,
              boxShadow: tokens.effects.shadow.gold,
            }}
          >
            <SafeIcon icon={FiIcons.FiCalendar} className="text-sm" />
            Book a table
          </button>
        </div>
      </div>

      <div
        className="max-w-[1280px] mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2"
        style={{ borderTop: `1px solid ${tokens.colors.border}` }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.32em]"
          style={{ color: tokens.colors.textSubtle, fontFamily: tokens.typography.fontMono }}
        >
          © {new Date().getFullYear()} {brandLine}
        </span>
        <span
          className="text-[11px] italic"
          style={{ color: tokens.colors.textSubtle, fontFamily: tokens.typography.fontDisplay }}
        >
          {sign}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
