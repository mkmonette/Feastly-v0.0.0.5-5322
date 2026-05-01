import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileYumm } from './MobileYummContext';

const Footer = () => {
  const { tokens } = useMobileYumm();

  return (
    <footer className="py-8 px-4" style={{ backgroundColor: tokens.colors.secondary }}>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            Y
          </div>
          <span className="text-white font-black text-lg">YUMM</span>
        </div>

        <div className="flex justify-center gap-3 mb-5">
          {[FiIcons.FiInstagram, FiIcons.FiFacebook, FiIcons.FiTwitter].map((Icon, i) => (
            <button
              key={i}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <SafeIcon icon={Icon} className="text-sm" />
            </button>
          ))}
        </div>

        <div className="h-px bg-white/10 mb-4" />
        <p className="text-xs text-gray-500">&copy; 2026 YUMM. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
