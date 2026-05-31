import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useCitrus } from './CitrusContext';

const Footer = () => {
  const { tokens, sectionsConfig } = useCitrus();
  const headerSection = sectionsConfig.find((s) => s.id === 'header');
  const brand = headerSection?.content?.brand || 'Citrus';
  const address = headerSection?.content?.address || '';
  const phone = headerSection?.content?.phone || '';

  return (
    <footer
      className="mt-4"
      style={{
        backgroundColor: tokens.colors.text,
        color: '#fff',
        borderTop: tokens.effects.border,
      }}
      data-testid="citrus-footer"
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: tokens.colors.primary, border: '1.5px solid #fff' }}
            >
              <SafeIcon icon={FiIcons.FiSun} className="text-lg text-white" />
            </div>
            <div
              className="text-[22px] font-black"
              style={{ fontFamily: tokens.typography.fontHeading }}
            >
              {brand}
            </div>
          </div>
          <p className="text-[12px] font-medium text-white/65 leading-relaxed max-w-[280px]">
            A small, citrus-bright kitchen serving honest, made-to-order food. Pickup, delivery, or eat-in.
          </p>
        </div>

        <div>
          <div
            className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45 mb-3"
          >
            Visit us
          </div>
          {address && (
            <div className="flex items-start gap-2 text-[13px] font-bold text-white/85 mb-2">
              <SafeIcon icon={FiIcons.FiMapPin} className="text-base mt-0.5" style={{ color: tokens.colors.sun }} />
              <span>{address}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-start gap-2 text-[13px] font-bold text-white/85">
              <SafeIcon icon={FiIcons.FiPhone} className="text-base mt-0.5" style={{ color: tokens.colors.sun }} />
              <span>{phone}</span>
            </div>
          )}
        </div>

        <div>
          <div
            className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45 mb-3"
          >
            Follow
          </div>
          <div className="flex items-center gap-2">
            {[FiIcons.FiInstagram, FiIcons.FiTwitter, FiIcons.FiFacebook].map((Ic, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  color: '#fff',
                }}
              >
                <SafeIcon icon={Ic} className="text-base" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className="border-t border-white/10 px-5 lg:px-10 py-4 max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-medium text-white/45"
      >
        <span>© {new Date().getFullYear()} {brand} · All rights reserved</span>
        <span>Made with citrus and care.</span>
      </div>
    </footer>
  );
};

export default Footer;
