import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from '../StorefrontContext';

const Footer = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const section = sectionsConfig.find(s => s.id === 'footer');
  const content = section?.content || {};

  const secondaryBgStyle = colors.secondary.startsWith('#') ? { backgroundColor: colors.secondary } : {};

  return (
    <footer className={`bg-${colors.background} border-t border-${colors.border} py-20 ${layout.horizontalPadding} ${typography.fontSecondary}`}>
      <div className={`${layout.container} ${layout.containerWidth} grid md:grid-cols-4 ${layout.gridGapMedium} mb-20`}>
        <div className="col-span-2 text-left">
          <div className="flex items-center gap-3 mb-8">
            {businessData.logoUrl ? (
              <img src={businessData.logoUrl} alt={businessData.name} className="w-10 h-10 rounded-lg object-cover" />
            ) : (
              <div 
                className={`w-10 h-10 bg-${colors.secondary} rounded-lg flex items-center justify-center`}
                style={secondaryBgStyle}
              >
                <SafeIcon icon={FiIcons.FiZap} className={`text-${colors.textInverse} text-xl`} />
              </div>
            )}
            <span className={`${typography.scale.h3} ${typography.weights.black} ${typography.tracking.tighter} ${typography.transform.uppercase} ${typography.fontPrimary}`}>
              {businessData.name || 'Feastly'}
            </span>
          </div>
          <p className={`text-${colors.textMuted} max-w-md ${typography.weights.medium} ${typography.scale.bodyLarge_alt} ${typography.lineHeights.relaxed} mb-8 text-left`}>
            {content.footerDescription || businessData.description}
          </p>
          <div className="flex gap-4">
            {[FiIcons.FiInstagram, FiIcons.FiTwitter, FiIcons.FiFacebook].map((Icon, i) => (
              <a key={i} href="#" className={`w-10 h-10 bg-${colors.surface} rounded-full flex items-center justify-center hover:bg-${colors.primary} hover:text-${colors.textInverse} transition-all`}>
                <SafeIcon icon={Icon} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="text-left">
          <h4 className={`${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4_xs} mb-8 ${typography.fontPrimary}`}>Quick Links</h4>
          <ul className={`space-y-4 text-${colors.textMuted} ${typography.weights.bold} ${typography.scale.h4}`}>
            <li><a href="#" className={`hover:text-${colors.secondary}`}>Our Menu</a></li>
            <li><a href="#" className={`hover:text-${colors.secondary}`}>Flash Sales</a></li>
            <li><a href="#" className={`hover:text-${colors.secondary}`}>About Us</a></li>
            <li><a href="#" className={`hover:text-${colors.secondary}`}>Contact</a></li>
          </ul>
        </div>
        
        <div className="text-left">
          <h4 className={`${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4_xs} mb-8 ${typography.fontPrimary}`}>Opening Hours</h4>
          <ul className={`space-y-4 text-${colors.textMuted} ${typography.weights.bold} ${typography.scale.h4}`}>
            {businessData.operatingHours ? Object.entries(businessData.operatingHours).map(([day, hours]) => (
              <li key={day} className="capitalize">
                {day}: {hours.isOpen ? `${hours.open} - ${hours.close}` : 'Closed'}
              </li>
            )) : (
              <>
                <li>Mon - Fri: 11am - 10pm</li>
                <li>Sat: 10am - 11pm</li>
                <li>Sun: 10am - 9pm</li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      <div className={`${layout.container} ${layout.containerWidth} pt-10 border-t border-${colors.borderLight} flex flex-col md:flex-row justify-between gap-6`}>
        <p className={`text-${colors.textSubtle} ${typography.scale.h4_xs} ${typography.weights.bold} ${typography.transform.uppercase} ${typography.tracking.widest}`}>
          {content.copyrightText || `© 2024 ${businessData.name}. All Rights Reserved.`}
        </p>
        <div className={`flex gap-8 text-${colors.textSubtle} ${typography.scale.h4_xs} ${typography.weights.bold} ${typography.transform.uppercase} ${typography.tracking.widest}`}>
          <a href="#" className={`hover:text-${colors.secondary}`}>Privacy Policy</a>
          <a href="#" className={`hover:text-${colors.secondary}`}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;