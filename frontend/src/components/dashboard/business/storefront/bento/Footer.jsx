import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useBento } from './BentoContext';

const Footer = () => {
  const { tokens, sectionsConfig } = useBento();
  const headerSection = sectionsConfig.find((s) => s.id === 'header');
  const footerSection = sectionsConfig.find((s) => s.id === 'footer');
  const brand = headerSection?.content?.brand || 'Bento';
  const { address = '', phone = '', hours = '' } = footerSection?.content || {};

  return (
    <footer
      className="mt-6"
      style={{
        backgroundColor: tokens.colors.surfaceInk,
        color: '#fff',
      }}
      data-testid="bento-footer"
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="grid grid-cols-2 grid-rows-2 gap-0.5 w-10 h-10 rounded-[10px] overflow-hidden p-1"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="rounded-[3px]" style={{ backgroundColor: tokens.colors.primary }} />
              <div className="rounded-[3px]" style={{ backgroundColor: tokens.colors.butter }} />
              <div className="rounded-[3px]" style={{ backgroundColor: tokens.colors.mint }} />
              <div className="rounded-[3px]" style={{ backgroundColor: tokens.colors.lavender }} />
            </div>
            <div className="text-[22px] font-black tracking-tight" style={{ fontFamily: tokens.typography.fontHeading }}>
              {brand}
            </div>
          </div>
          <p className="text-[13px] font-medium text-white/65 leading-relaxed max-w-[420px]">
            Small plates, modular menus, big flavor. Order online for pickup or delivery — built around how you actually eat.
          </p>
        </div>

        {/* Contact tile */}
        <div className="md:col-span-4">
          <div
            className="rounded-[20px] p-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/55 mb-3">
              Visit / Call
            </div>
            <div className="space-y-2 text-[13px] font-bold">
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
        </div>

        {/* Socials */}
        <div className="md:col-span-3">
          <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white/55 mb-3">
            Follow
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { Icon: FiIcons.FiInstagram, label: 'IG' },
              { Icon: FiIcons.FiTwitter, label: 'X' },
              { Icon: FiIcons.FiFacebook, label: 'FB' },
              { Icon: FiIcons.FiYoutube, label: 'YT' },
            ].map(({ Icon, label }, i) => (
              <button
                key={i}
                className="flex items-center justify-center gap-2 py-2 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:scale-[1.03]"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff' }}
              >
                <SafeIcon icon={Icon} className="text-sm" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="max-w-[1400px] mx-auto px-5 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-medium text-white/45"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <span>© {new Date().getFullYear()} {brand} · Modular kitchen</span>
        <span>Designed in tiles. Cooked with love.</span>
      </div>
    </footer>
  );
};

export default Footer;
