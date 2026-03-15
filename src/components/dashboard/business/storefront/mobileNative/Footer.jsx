import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const Footer = () => {
  const { tokens } = useMobileNative();

  const socialLinks = [
    { icon: FiIcons.FiFacebook, label: 'Facebook' },
    { icon: FiIcons.FiInstagram, label: 'Instagram' },
    { icon: FiIcons.FiTwitter, label: 'Twitter' }
  ];

  const quickLinks = [
    'About Us',
    'Menu',
    'Contact',
    'Privacy Policy'
  ];

  return (
    <footer
      className="border-t mt-8"
      style={{
        backgroundColor: tokens.colors.cardBackground,
        borderColor: tokens.colors.border
      }}
    >
      <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 py-6`}>
        <div className="text-center mb-4">
          <div
            className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-lg font-semibold"
            style={{ backgroundColor: tokens.colors.primary }}
          >
            M
          </div>
          <p
            className="text-[13px]"
            style={{ color: tokens.colors.sectionNormalText }}
          >
            Your favorite food, delivered fresh
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-4">
          {socialLinks.map((social, index) => (
            <button
              key={index}
              className={`w-9 h-9 ${tokens.layout.borderRadius.button} flex items-center justify-center active:scale-95 transition-transform`}
              style={{
                backgroundColor: `${tokens.colors.primary}15`,
                color: tokens.colors.primary
              }}
              aria-label={social.label}
            >
              <SafeIcon icon={social.icon} className="text-[16px]" />
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              className="text-[13px] active:scale-95 transition-transform"
              style={{ color: tokens.colors.sectionNormalText }}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="text-center pt-4 border-t" style={{ borderColor: tokens.colors.border }}>
          <p
            className="text-[12px]"
            style={{ color: tokens.colors.sectionNormalText }}
          >
            © 2024 Menu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
