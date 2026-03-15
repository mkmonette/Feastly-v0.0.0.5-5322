import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileCardMenu } from './MobileCardMenuContext';

const Footer = () => {
  const { tokens } = useMobileCardMenu();

  return (
    <footer
      className="py-8 border-t"
      style={{
        backgroundColor: tokens.colors.secondary,
        borderColor: tokens.colors.border
      }}
    >
      <div className="px-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: tokens.colors.primary }}
            >
              <SafeIcon icon={FiIcons.FiShoppingBag} className="text-white text-lg" />
            </div>
            <h3 className="text-xl font-bold text-white">FoodHub</h3>
          </div>
          <p className="text-sm text-white/70">
            Fresh food delivered to your door
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <a
            href="#"
            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <SafeIcon icon={FiIcons.FiFacebook} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <SafeIcon icon={FiIcons.FiInstagram} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <SafeIcon icon={FiIcons.FiTwitter} />
          </a>
        </div>

        <div className="text-center">
          <p className="text-xs text-white/50">
            © 2024 FoodHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
