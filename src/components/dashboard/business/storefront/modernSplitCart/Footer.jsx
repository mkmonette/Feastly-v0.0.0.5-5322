import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from './contextBridge';

const Footer = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const section = sectionsConfig.find(s => s.id === 'footer');
  const content = section?.content || {};

  const accentStyle = { color: colors.accent };

  const quickLinks = content.quickLinks || ['Home', 'Menu', 'About', 'Gallery', 'Contact'];

  const openingHours = content.openingHours || [
    { day: 'Monday - Friday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 11:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 9:00 PM' },
  ];

  const socialLinks = [
    { icon: FiIcons.FiFacebook, label: 'Facebook' },
    { icon: FiIcons.FiInstagram, label: 'Instagram' },
    { icon: FiIcons.FiTwitter, label: 'Twitter' },
  ];

  return (
    <footer className={`py-8 ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {businessData.logoUrl ? (
                <img src={businessData.logoUrl} alt={businessData.name} className="h-10 w-10 object-cover rounded-full" />
              ) : (
                <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                  <span className={`${typography.scale.body} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.textInverse }}>
                    {(businessData.name || 'M').charAt(0)}
                  </span>
                </div>
              )}
              <span className={`${typography.scale.body} ${typography.weights.semibold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
                {businessData.name}
              </span>
            </div>
            <p className={`${typography.scale.xs} ${typography.lineHeights.relaxed} mb-4 ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
              {content.description || businessData.description || 'Experience exceptional dining with fresh ingredients and outstanding service.'}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all hover:scale-110"
                  style={{ borderColor: colors.border }}
                  aria-label={social.label}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.accent;
                    e.currentTarget.querySelector('svg').style.color = colors.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.querySelector('svg').style.color = colors.textMuted;
                  }}
                >
                  <SafeIcon icon={social.icon} className="text-base" style={{ color: colors.textMuted }} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`${typography.scale.body} ${typography.weights.semibold} mb-4 ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    className={`${typography.scale.xs} ${typography.fontSecondary} transition-colors`}
                    style={{ color: colors.textSecondary }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.textSecondary}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`${typography.scale.body} ${typography.weights.semibold} mb-4 ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              Opening Hours
            </h3>
            <ul className="space-y-2">
              {openingHours.map((schedule, index) => (
                <li key={index} className="flex justify-between">
                  <span className={`${typography.scale.xs} ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
                    {schedule.day}
                  </span>
                  <span className={`${typography.scale.xs} ${typography.weights.semibold} ${typography.fontSecondary}`} style={accentStyle}>
                    {schedule.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t text-center" style={{ borderColor: colors.border }}>
          <p className={`${typography.scale.xs} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
            © {new Date().getFullYear()} {businessData.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
