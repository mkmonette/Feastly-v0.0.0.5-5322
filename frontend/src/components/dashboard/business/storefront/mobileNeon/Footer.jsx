import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileNeon } from './MobileNeonContext';

const Footer = () => {
  const { tokens } = useMobileNeon();

  return (
    <footer className="py-8 px-4" style={{ backgroundColor: tokens.colors.cardBackground, borderTop: `1px solid ${tokens.colors.border}` }}>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm"
            style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.secondary }}
          >
            N
          </div>
          <span className="font-black text-lg tracking-wide" style={{ color: tokens.colors.primaryText }}>NEON</span>
        </div>

        <div className="flex justify-center gap-3 mb-5">
          {[FiIcons.FiInstagram, FiIcons.FiFacebook, FiIcons.FiTwitter].map((Icon, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ backgroundColor: `${tokens.colors.primary}18`, color: tokens.colors.primary }}
            >
              <SafeIcon icon={Icon} className="text-sm" />
            </button>
          ))}
        </div>

        <div className="h-px mb-4" style={{ backgroundColor: tokens.colors.border }} />
        <p className="text-xs" style={{ color: tokens.colors.muted }}>
          &copy; 2026 NEON. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
