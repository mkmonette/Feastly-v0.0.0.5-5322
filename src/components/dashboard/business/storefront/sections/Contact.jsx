import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from '../StorefrontContext';

const Contact = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const section = sectionsConfig.find(s => s.id === 'contact');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary + '20' } : {};
  const secondaryBgStyle = colors.secondary.startsWith('#') ? { backgroundColor: colors.secondary } : {};

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding} bg-${colors.background} ${typography.fontSecondary}`}>
      <div className={`${layout.container} ${layout.containerWidth} grid md:grid-cols-2 ${layout.gridGapLarge}`}>
        <div className="text-left">
          <span 
            className={`text-${colors.primary} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4} mb-4 block ${typography.fontPrimary}`}
            style={primaryStyle}
          >
            {content.subtitle}
          </span>
          <h2 className={`${typography.scale.h2} ${typography.weights.black} text-${colors.textPrimary} ${typography.transform.uppercase} ${typography.tracking.tighter} mb-4 ${typography.fontPrimary}`}>
            {content.titlePre} <span style={primaryStyle}>{content.titleHighlight}</span>
          </h2>
          <p className={`text-${colors.textMuted} ${typography.scale.body} mb-8`}>
            {content.description}
          </p>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div 
                className={`w-12 h-12 bg-${colors.primaryLight} ${layout.borderRadiusIcon} flex items-center justify-center shrink-0`}
                style={primaryBgStyle}
              >
                <SafeIcon icon={FiIcons.FiMapPin} className={`text-2xl text-${colors.primary}`} style={primaryStyle} />
              </div>
              <div className="text-left">
                <h4 className={`${typography.weights.bold} text-${colors.textPrimary} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4_xs} mb-1 ${typography.fontPrimary}`}>Our Location</h4>
                <p className={`text-${colors.textMuted}`}>{businessData.address || '123 Culinary Ave, Foodie District, NY 10012'}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div 
                className={`w-12 h-12 bg-${colors.primaryLight} ${layout.borderRadiusIcon} flex items-center justify-center shrink-0`}
                style={primaryBgStyle}
              >
                <SafeIcon icon={FiIcons.FiPhone} className={`text-2xl text-${colors.primary}`} style={primaryStyle} />
              </div>
              <div className="text-left">
                <h4 className={`${typography.weights.bold} text-${colors.textPrimary} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4_xs} mb-1 ${typography.fontPrimary}`}>Phone Number</h4>
                <p className={`text-${colors.textMuted}`}>{businessData.phone || '+1 (555) 123-4567'}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div 
                className={`w-12 h-12 bg-${colors.primaryLight} ${layout.borderRadiusIcon} flex items-center justify-center shrink-0`}
                style={primaryBgStyle}
              >
                <SafeIcon icon={FiIcons.FiMail} className={`text-2xl text-${colors.primary}`} style={primaryStyle} />
              </div>
              <div className="text-left">
                <h4 className={`${typography.weights.bold} text-${colors.textPrimary} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4_xs} mb-1 ${typography.fontPrimary}`}>Email Address</h4>
                <p className={`text-${colors.textMuted}`}>{businessData.email || 'contact@feastly.com'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`bg-${colors.surface} p-10 ${layout.borderRadiusLarge} border border-${colors.border}`}>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className={`bg-${colors.background} border-transparent focus:border-${colors.primary} focus:ring-0 p-4 ${layout.borderRadiusBase} ${typography.scale.h4} ${typography.weights.bold} w-full shadow-sm ${typography.fontSecondary}`} />
              <input type="email" placeholder="Email" className={`bg-${colors.background} border-transparent focus:border-${colors.primary} focus:ring-0 p-4 ${layout.borderRadiusBase} ${typography.scale.h4} ${typography.weights.bold} w-full shadow-sm ${typography.fontSecondary}`} />
            </div>
            <textarea placeholder="Message" rows="4" className={`bg-${colors.background} border-transparent focus:border-${colors.primary} focus:ring-0 p-4 ${layout.borderRadiusBase} ${typography.scale.h4} ${typography.weights.bold} w-full shadow-sm ${typography.fontSecondary}`}></textarea>
            <button 
              className={`w-full py-5 bg-${colors.secondary} text-${colors.textInverse} ${typography.scale.h4} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} hover:bg-${colors.secondaryHover} transition-all ${layout.borderRadiusBase} ${typography.fontPrimary}`}
              style={secondaryBgStyle}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;