import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from './contextBridge';

const Contact = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const section = sectionsConfig.find(s => s.id === 'contact');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const sectionHeadlineHighlightStyle = { color: colors.sectionHeadlineHighlight };

  return (
    <section className={`${layout.sectionPaddingLarge} bg-${colors.background} ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-12">
          <span
            className={`${typography.scale.bodySmall} ${typography.weights.semibold} text-${colors.primary} ${typography.transform.uppercase} ${typography.tracking.wide} ${typography.fontPrimary}`}
            style={primaryStyle}
          >
            {content.subtitle || 'Contact Us'}
          </span>
          <h2 className={`${typography.scale.h2} ${typography.weights.black} mt-2 ${typography.fontPrimary}`}>
            <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
            <span style={sectionHeadlineHighlightStyle}>{content.titleHighlight}</span>
          </h2>
          {content.description && (
            <p className={`${typography.scale.bodyLarge_alt} text-${colors.textMuted} mt-4 max-w-2xl mx-auto ${typography.fontSecondary}`}>
              {content.description}
            </p>
          )}
        </div>

        <div className={`grid md:grid-cols-2 ${layout.gridGapLarge}`}>
          <div className={`bg-${colors.surface} p-8 ${layout.borderRadiusLarge} border border-${colors.border}`}>
            <h3 className={`${typography.scale.h4} ${typography.weights.bold} text-${colors.textPrimary} mb-6 ${typography.fontPrimary}`}>
              Send us a message
            </h3>

            <form className="space-y-4">
              <div>
                <label className={`block ${typography.scale.bodySmall} ${typography.weights.medium} text-${colors.textPrimary} mb-2 ${typography.fontSecondary}`}>
                  Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border border-${colors.border} ${layout.borderRadiusBase} focus:outline-none focus:border-${colors.primary} transition-colors ${typography.fontSecondary}`}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className={`block ${typography.scale.bodySmall} ${typography.weights.medium} text-${colors.textPrimary} mb-2 ${typography.fontSecondary}`}>
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 border border-${colors.border} ${layout.borderRadiusBase} focus:outline-none focus:border-${colors.primary} transition-colors ${typography.fontSecondary}`}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className={`block ${typography.scale.bodySmall} ${typography.weights.medium} text-${colors.textPrimary} mb-2 ${typography.fontSecondary}`}>
                  Message
                </label>
                <textarea
                  rows="4"
                  className={`w-full px-4 py-3 border border-${colors.border} ${layout.borderRadiusBase} focus:outline-none focus:border-${colors.primary} transition-colors resize-none ${typography.fontSecondary}`}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className={`w-full py-4 bg-${colors.primary} text-${colors.textInverse} ${typography.scale.body} ${typography.weights.semibold} hover:bg-${colors.primaryHover} transition-all ${layout.borderRadiusBase} ${typography.fontPrimary}`}
                style={primaryBgStyle}
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className={`bg-${colors.surface} p-6 ${layout.borderRadiusLarge} border border-${colors.border}`}>
              <div className={`w-12 h-12 bg-${colors.primary} ${layout.borderRadiusBase} flex items-center justify-center mb-4`} style={primaryBgStyle}>
                <SafeIcon icon={FiIcons.FiMapPin} className={`text-xl text-${colors.textInverse}`} />
              </div>
              <h4 className={`${typography.scale.bodySmall} ${typography.weights.bold} text-${colors.textPrimary} mb-2 ${typography.fontPrimary}`}>
                Address
              </h4>
              <p className={`${typography.scale.bodySmall} text-${colors.textMuted} ${typography.fontSecondary}`}>
                {businessData.address}
              </p>
            </div>

            <div className={`bg-${colors.surface} p-6 ${layout.borderRadiusLarge} border border-${colors.border}`}>
              <div className={`w-12 h-12 bg-${colors.primary} ${layout.borderRadiusBase} flex items-center justify-center mb-4`} style={primaryBgStyle}>
                <SafeIcon icon={FiIcons.FiPhone} className={`text-xl text-${colors.textInverse}`} />
              </div>
              <h4 className={`${typography.scale.bodySmall} ${typography.weights.bold} text-${colors.textPrimary} mb-2 ${typography.fontPrimary}`}>
                Phone
              </h4>
              <p className={`${typography.scale.bodySmall} text-${colors.textMuted} ${typography.fontSecondary}`}>
                {businessData.phone}
              </p>
            </div>

            <div className={`bg-${colors.surface} p-6 ${layout.borderRadiusLarge} border border-${colors.border}`}>
              <div className={`w-12 h-12 bg-${colors.primary} ${layout.borderRadiusBase} flex items-center justify-center mb-4`} style={primaryBgStyle}>
                <SafeIcon icon={FiIcons.FiMail} className={`text-xl text-${colors.textInverse}`} />
              </div>
              <h4 className={`${typography.scale.bodySmall} ${typography.weights.bold} text-${colors.textPrimary} mb-2 ${typography.fontPrimary}`}>
                Email
              </h4>
              <p className={`${typography.scale.bodySmall} text-${colors.textMuted} ${typography.fontSecondary}`}>
                {businessData.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
