import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileExpress } from './MobileExpressContext';

const Footer = () => {
  const { tokens } = useMobileExpress();

  return (
    <footer
      className="py-8 px-4"
      style={{ backgroundColor: tokens.colors.secondary }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div
          className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center text-white font-black text-xl"
          style={{ backgroundColor: tokens.colors.primary }}
        >
          F
        </div>

        <h3 className="text-xl font-black text-white mb-2">FoodApp</h3>
        <p className="text-sm text-gray-400 mb-6">Fast & Fresh Food Delivery</p>

        <div className="flex justify-center gap-4 mb-6">
          {[FiIcons.FiFacebook, FiIcons.FiTwitter, FiIcons.FiInstagram].map((Icon, index) => (
            <button
              key={index}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <SafeIcon icon={Icon} />
            </button>
          ))}
        </div>

        <div className="h-px bg-white/10 mb-6" />

        <p className="text-xs text-gray-400">
          &copy; 2024 FoodApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
