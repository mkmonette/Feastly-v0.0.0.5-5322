import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

const Footer = () => {
  const { tokens } = useMobileCompactMenu();

  return (
    <footer
      className="py-6 border-t"
      style={{
        backgroundColor: tokens.colors.secondary,
        borderColor: tokens.colors.border
      }}
    >
      <div className="px-4">
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: tokens.colors.primary }}
            >
              <SafeIcon icon={FiIcons.FiPackage} className="text-white text-base" />
            </div>
            <h3 className="text-lg font-extrabold text-white">QuickBite</h3>
          </div>
          <p className="text-[10px] text-white/70">
            Fast food delivery to your door
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-5">
          <a
            href="#"
            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <SafeIcon icon={FiIcons.FiFacebook} style={{ fontSize: '14px' }} />
          </a>
          <a
            href="#"
            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <SafeIcon icon={FiIcons.FiInstagram} style={{ fontSize: '14px' }} />
          </a>
          <a
            href="#"
            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <SafeIcon icon={FiIcons.FiTwitter} style={{ fontSize: '14px' }} />
          </a>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-white/50">
            © 2024 QuickBite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
