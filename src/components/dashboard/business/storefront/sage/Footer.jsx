import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSage } from './SageContext';

const Footer = () => {
  const { tokens, sectionsConfig } = useSage();
  const section = sectionsConfig.find(s => s.id === 'footer');
  if (!section) return null;
  const { logoText = 'SAGE', description, quickLinks = [], hours } = section.content || {};

  return (
    <footer style={{ backgroundColor: tokens.colors.surfaceAlt, borderTop: `1px solid ${tokens.colors.border}` }}>
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Col 1: logo + desc + social */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
              style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.textInverse }}
            >
              {logoText.charAt(0)}
            </div>
            <span className="text-base font-bold tracking-widest" style={{ color: tokens.colors.textPrimary }}>
              {logoText}
            </span>
          </div>
          <p className="text-xs leading-relaxed mb-5" style={{ color: tokens.colors.textMuted }}>{description}</p>
          <div className="flex items-center gap-3">
            {[FiIcons.FiInstagram, FiFacebook, FiIcons.FiTwitter].map((Icon, i) => (
              <button
                key={i}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-70"
                style={{ backgroundColor: tokens.colors.surface }}
              >
                <SafeIcon icon={Icon} className="text-sm" style={{ color: tokens.colors.textMuted }} />
              </button>
            ))}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-sm font-bold mb-4" style={{ color: tokens.colors.textPrimary }}>Quick Links</h4>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map(link => (
              <li key={link}>
                <a href="#" className="text-xs transition-colors hover:opacity-80" style={{ color: tokens.colors.textMuted }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Opening Hours */}
        {hours && (
          <div>
            <h4 className="text-sm font-bold mb-4" style={{ color: tokens.colors.textPrimary }}>Opening Hours</h4>
            <ul className="flex flex-col gap-2">
              {[
                { day: 'Monday - Friday', time: hours.weekday },
                { day: 'Friday', time: hours.friday },
                { day: 'Saturday', time: hours.saturday },
                { day: 'Sunday', time: hours.sunday }
              ].map(({ day, time }) => (
                <li key={day} className="flex items-center justify-between gap-4">
                  <span className="text-xs" style={{ color: tokens.colors.textMuted }}>{day}</span>
                  <span className="text-xs font-medium" style={{ color: tokens.colors.textPrimary }}>{time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div
        className="max-w-6xl mx-auto px-6 py-4"
        style={{ borderTop: `1px solid ${tokens.colors.border}` }}
      >
        <p className="text-[10px] text-center" style={{ color: tokens.colors.textSubtle }}>
          © 2026 {logoText}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// FiFacebook isn't in fi, use a fallback
const FiFacebook = FiIcons.FiLink;

export default Footer;
