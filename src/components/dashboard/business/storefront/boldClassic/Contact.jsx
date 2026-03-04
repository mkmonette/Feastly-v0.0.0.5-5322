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
        <div className="grid md:grid-cols-2 gap-0">
          <div className={`bg-${colors.surface} text-white p-16 flex flex-col justify-center`}>
            <div className="space-y-8">
              <div>
                <div className={`w-20 h-1 bg-${colors.primary} mb-8`} style={primaryBgStyle} />
                <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.transform.uppercase} ${typography.lineHeights.tight} ${typography.fontPrimary}`}>
                  {content.titlePre}{' '}
                  <span
                    className={!colors.primary.startsWith('#') ? `text-${colors.primary}` : ''}
                    style={primaryStyle}
                  >
                    {content.titleHighlight}
                  </span>
                </h2>
              </div>

              {content.description && (
                <p className={`${typography.scale.bodyLarge_alt} text-${colors.textInverseMuted} ${typography.fontSecondary}`}>
                  {content.description}
                </p>
              )}

              <div className="space-y-6 pt-8">
                {[
                  { icon: FiIcons.FiMapPin, label: 'Address', value: businessData.address },
                  { icon: FiIcons.FiPhone, label: 'Phone', value: businessData.phone },
                  { icon: FiIcons.FiMail, label: 'Email', value: businessData.email }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-${colors.primary} flex items-center justify-center flex-shrink-0`} style={primaryBgStyle}>
                      <SafeIcon icon={item.icon} className="text-xl text-black" />
                    </div>
                    <div className="text-left">
                      <div className={`${typography.scale.xs} ${typography.weights.bold} ${typography.transform.uppercase} text-${colors.textInverseMuted} mb-1 ${typography.fontPrimary}`}>
                        {item.label}
                      </div>
                      <div className={`${typography.scale.bodySmall} ${typography.fontSecondary}`}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-16 border-8 border-slate-900">
            <form className="space-y-6">
              <div>
                <label className={`block ${typography.scale.bodySmall} ${typography.weights.bold} text-${colors.textPrimary} mb-3 ${typography.transform.uppercase} ${typography.fontPrimary}`}>
                  Name
                </label>
                <input
                  type="text"
                  className={`w-full px-6 py-4 border-2 border-${colors.border} focus:outline-none focus:border-${colors.primary} transition-colors ${typography.fontSecondary}`}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className={`block ${typography.scale.bodySmall} ${typography.weights.bold} text-${colors.textPrimary} mb-3 ${typography.transform.uppercase} ${typography.fontPrimary}`}>
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full px-6 py-4 border-2 border-${colors.border} focus:outline-none focus:border-${colors.primary} transition-colors ${typography.fontSecondary}`}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className={`block ${typography.scale.bodySmall} ${typography.weights.bold} text-${colors.textPrimary} mb-3 ${typography.transform.uppercase} ${typography.fontPrimary}`}>
                  Message
                </label>
                <textarea
                  rows="6"
                  className={`w-full px-6 py-4 border-2 border-${colors.border} focus:outline-none focus:border-${colors.primary} transition-colors resize-none ${typography.fontSecondary}`}
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className={`w-full py-5 bg-${colors.primary} text-black ${typography.scale.body} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.wide} hover:bg-${colors.secondary} transition-all ${typography.fontPrimary}`}
                style={primaryBgStyle}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
