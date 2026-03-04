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

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};

  return (
    <footer className={`bg-${colors.secondary} text-${colors.textInverse} ${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={colors.secondary.startsWith('#') ? { backgroundColor: colors.secondary } : {}}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className={`grid md:grid-cols-4 ${layout.gridGapLarge} mb-12`}>
          <div className={`md:col-span-2 bg-${colors.textInverse}/5 p-8 ${layout.borderRadiusLarge}`}>
            <div className="flex items-center gap-3 mb-4">
              {businessData.logoUrl ? (
                <img src={businessData.logoUrl} alt={businessData.name} className={`h-10 w-10 object-cover ${layout.borderRadiusBase}`} />
              ) : (
                <div className={`h-10 w-10 bg-${colors.primary} ${layout.borderRadiusBase} flex items-center justify-center`} style={colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {}}>
                  <span className={`text-${colors.textInverse} ${typography.weights.black} text-lg`}>
                    {businessData.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className={`${typography.scale.h4} ${typography.weights.bold} ${typography.fontPrimary}`}>
                {businessData.name}
              </span>
            </div>
            <p className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`}>
              {content.footerDescription || businessData.description}
            </p>
          </div>

          <div className={`bg-${colors.textInverse}/5 p-8 ${layout.borderRadiusLarge}`}>
            <h4 className={`${typography.scale.bodySmall} ${typography.weights.bold} mb-4 ${typography.fontPrimary}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['About', 'Menu', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <button className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} hover:text-${colors.textInverse} transition-colors ${typography.fontSecondary}`}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={`bg-${colors.textInverse}/5 p-8 ${layout.borderRadiusLarge}`}>
            <h4 className={`${typography.scale.bodySmall} ${typography.weights.bold} mb-4 ${typography.fontPrimary}`}>
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <SafeIcon icon={FiIcons.FiMapPin} className={`text-${colors.textInverseMuted} mt-1`} />
                <span className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} ${typography.fontSecondary}`}>
                  {businessData.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiIcons.FiPhone} className={`text-${colors.textInverseMuted}`} />
                <span className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} ${typography.fontSecondary}`}>
                  {businessData.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiIcons.FiMail} className={`text-${colors.textInverseMuted}`} />
                <span className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} ${typography.fontSecondary}`}>
                  {businessData.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`pt-8 border-t border-${colors.textInverse}/10 flex flex-col md:flex-row justify-between items-center gap-4`}>
          <p className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} ${typography.fontSecondary}`}>
            {content.copyrightText || `© ${new Date().getFullYear()} ${businessData.name}. All rights reserved.`}
          </p>

          <div className="flex gap-4">
            {[FiIcons.FiFacebook, FiIcons.FiInstagram, FiIcons.FiTwitter].map((Icon, index) => (
              <button
                key={index}
                className={`w-10 h-10 border border-${colors.textInverse}/20 ${layout.borderRadiusBase} flex items-center justify-center hover:bg-${colors.textInverse}/10 transition-all`}
              >
                <SafeIcon icon={Icon} className={`text-${colors.textInverseMuted}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
