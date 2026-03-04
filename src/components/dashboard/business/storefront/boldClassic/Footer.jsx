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
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};

  return (
    <footer className={`bg-black text-white ${layout.sectionPaddingLarge} ${layout.horizontalPadding} border-t-8 border-${colors.primary}`} style={colors.primary.startsWith('#') ? { borderTopColor: colors.primary } : {}}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              {businessData.logoUrl ? (
                <img src={businessData.logoUrl} alt={businessData.name} className="h-16 w-16 object-cover" />
              ) : (
                <div className={`h-16 w-16 bg-${colors.primary} flex items-center justify-center`} style={primaryBgStyle}>
                  <span className={`text-black ${typography.weights.black} ${typography.scale.h3} ${typography.fontPrimary}`}>
                    {businessData.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className={`${typography.scale.h4} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.fontPrimary}`}>
                {businessData.name}
              </span>
            </div>
            <p className={`${typography.scale.body} text-${colors.textInverseMuted} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`}>
              {content.footerDescription || businessData.description}
            </p>
            <div className="flex gap-4">
              {[FiIcons.FiFacebook, FiIcons.FiInstagram, FiIcons.FiTwitter, FiIcons.FiLinkedin].map((Icon, index) => (
                <button
                  key={index}
                  className={`w-12 h-12 border-2 border-white/20 flex items-center justify-center hover:border-${colors.primary} hover:bg-${colors.primary} transition-all group`}
                >
                  <SafeIcon icon={Icon} className={`text-xl group-hover:text-black`} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className={`${typography.scale.h4} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} border-b-2 border-${colors.primary} pb-4 ${typography.fontPrimary}`} style={colors.primary.startsWith('#') ? { borderBottomColor: colors.primary } : {}}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['About', 'Menu', 'Gallery', 'Contact', 'Careers'].map((item) => (
                <li key={item}>
                  <button className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} hover:text-${colors.primary} transition-colors flex items-center gap-2 group ${typography.fontSecondary}`}>
                    <div className={`w-2 h-2 bg-${colors.primary} opacity-0 group-hover:opacity-100 transition-opacity`} style={primaryBgStyle} />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className={`${typography.scale.h4} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} border-b-2 border-${colors.primary} pb-4 ${typography.fontPrimary}`} style={colors.primary.startsWith('#') ? { borderBottomColor: colors.primary } : {}}>
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <SafeIcon icon={FiIcons.FiMapPin} className={`text-${colors.primary} mt-1`} style={primaryStyle} />
                <span className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} ${typography.fontSecondary}`}>
                  {businessData.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiIcons.FiPhone} className={`text-${colors.primary}`} style={primaryStyle} />
                <span className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} ${typography.fontSecondary}`}>
                  {businessData.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiIcons.FiMail} className={`text-${colors.primary}`} style={primaryStyle} />
                <span className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} ${typography.fontSecondary}`}>
                  {businessData.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4`}>
          <p className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} ${typography.fontSecondary}`}>
            {content.copyrightText || `© ${new Date().getFullYear()} ${businessData.name}. All rights reserved.`}
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <button
                key={item}
                className={`${typography.scale.xs} text-${colors.textInverseMuted} hover:text-${colors.primary} transition-colors ${typography.fontSecondary}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
