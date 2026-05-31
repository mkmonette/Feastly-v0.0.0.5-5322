import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSaffron } from './SaffronContext';

const Footer = () => {
  const { tokens, sectionsConfig } = useSaffron();
  const headerSection = sectionsConfig.find((s) => s.id === 'header');
  const footerSection = sectionsConfig.find((s) => s.id === 'footer');
  const brand = headerSection?.content?.brand || 'Saffron';
  const { address = '', phone = '', hours = '' } = footerSection?.content || {};

  return (
    <footer
      className="relative"
      style={{
        backgroundColor: tokens.colors.surface,
        borderTop: `1px solid ${tokens.colors.border}`,
      }}
      data-testid="saffron-footer"
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.sun} 100%)` }}
            >
              <SafeIcon icon={FiIcons.FiAperture} className="text-lg" style={{ color: tokens.colors.accent }} />
            </div>
            <div className="text-[22px] font-black tracking-tight" style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}>
              {brand}
            </div>
          </div>
          <p className="text-[13px] font-medium leading-relaxed max-w-[400px]" style={{ color: tokens.colors.textMuted }}>
            A modern neighbourhood kitchen — honest ingredients, made-to-order food, delivered warm in under 30 minutes.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {[FiIcons.FiInstagram, FiIcons.FiTwitter, FiIcons.FiFacebook, FiIcons.FiYoutube].map((Ic, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: tokens.colors.surfaceMuted,
                  color: tokens.colors.text,
                }}
              >
                <SafeIcon icon={Ic} className="text-sm" />
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="md:col-span-4">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] mb-3" style={{ color: tokens.colors.textSubtle }}>
            Visit
          </div>
          <div className="space-y-2 text-[13px] font-bold" style={{ color: tokens.colors.text }}>
            {address && (
              <div className="flex items-start gap-2">
                <SafeIcon icon={FiIcons.FiMapPin} className="text-base mt-0.5" style={{ color: tokens.colors.primary }} />
                <span>{address}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-start gap-2">
                <SafeIcon icon={FiIcons.FiPhone} className="text-base mt-0.5" style={{ color: tokens.colors.primary }} />
                <span>{phone}</span>
              </div>
            )}
            {hours && (
              <div className="flex items-start gap-2">
                <SafeIcon icon={FiIcons.FiClock} className="text-base mt-0.5" style={{ color: tokens.colors.primary }} />
                <span>{hours}</span>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-3">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] mb-3" style={{ color: tokens.colors.textSubtle }}>
            Stay warm
          </div>
          <p className="text-[12px] font-medium mb-3" style={{ color: tokens.colors.textMuted }}>
            New menus, offers, and where we'll pop up next.
          </p>
          <div
            className="flex items-center gap-2 p-1 rounded-full"
            style={{ backgroundColor: tokens.colors.surfaceMuted, border: `1px solid ${tokens.colors.border}` }}
          >
            <input
              placeholder="you@email.com"
              className="flex-1 bg-transparent px-3 py-1.5 outline-none text-[12px] font-medium"
              style={{ color: tokens.colors.text }}
              data-testid="saffron-newsletter-email"
            />
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-[12px]"
              style={{
                backgroundColor: tokens.colors.primary,
                color: tokens.colors.textOnPrimary,
              }}
              data-testid="saffron-newsletter-submit"
            >
              <SafeIcon icon={FiIcons.FiArrowRight} className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="max-w-[1400px] mx-auto px-5 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-medium"
        style={{ borderTop: `1px solid ${tokens.colors.border}`, color: tokens.colors.textSubtle }}
      >
        <span>© {new Date().getFullYear()} {brand} · Modern kitchen</span>
        <span>Hand-prepped, hot, and honest.</span>
      </div>
    </footer>
  );
};

export default Footer;
