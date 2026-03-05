import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from './contextBridge';
import Headline from '../Headline';

const Contact = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const section = sectionsConfig.find(s => s.id === 'contact');
  const content = section?.content || {};

  const accentStyle = { color: colors.accent };
  const accentBgStyle = { backgroundColor: colors.accent };

  const contactInfo = [
    { icon: FiIcons.FiMapPin, label: 'Address', value: businessData.address || '123 Main Street, City' },
    { icon: FiIcons.FiPhone, label: 'Phone', value: businessData.phone || '(555) 123-4567' },
    { icon: FiIcons.FiMail, label: 'Email', value: businessData.email || 'hello@restaurant.com' },
  ];

  return (
    <section className={`${layout.sectionPadding} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <div className="mb-4">
            <span
              className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wider} ${typography.transform.uppercase} ${typography.fontSecondary}`}
              style={accentStyle}
            >
              {content.subtitle || 'Get in Touch'}
            </span>
          </div>
          <Headline
            normalText={content.titlePre || 'Contact Us'}
            highlightText={content.titleHighlight}
            tokens={{ colors }}
            className={`${typography.scale.h2} ${typography.weights.bold} ${typography.lineHeights.tight} ${typography.fontPrimary}`}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className={`${typography.scale.h4} ${typography.weights.semibold} mb-6 ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              Contact Information
            </h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.surface }}>
                    <SafeIcon icon={item.icon} className="text-xl" style={accentStyle} />
                  </div>
                  <div>
                    <h4 className={`${typography.scale.bodySmall} ${typography.weights.semibold} mb-1 ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
                      {item.label}
                    </h4>
                    <p className={`${typography.scale.body} ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {content.description && (
              <p className={`${typography.scale.body} ${typography.lineHeights.relaxed} mt-8 ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
                {content.description}
              </p>
            )}
          </div>

          <div className="bg-white p-8">
            <h3 className={`${typography.scale.h4} ${typography.weights.semibold} mb-6 ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              Send us a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label className={`block ${typography.scale.bodySmall} ${typography.weights.medium} mb-2 ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                  Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border ${typography.scale.body} ${typography.fontSecondary}`}
                  style={{ borderColor: colors.border }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className={`block ${typography.scale.bodySmall} ${typography.weights.medium} mb-2 ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 border ${typography.scale.body} ${typography.fontSecondary}`}
                  style={{ borderColor: colors.border }}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className={`block ${typography.scale.bodySmall} ${typography.weights.medium} mb-2 ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                  Message
                </label>
                <textarea
                  rows="5"
                  className={`w-full px-4 py-3 border ${typography.scale.body} ${typography.fontSecondary}`}
                  style={{ borderColor: colors.border }}
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full py-4 ${typography.scale.body} ${typography.weights.semibold} transition-all hover:scale-105 ${typography.fontSecondary}`}
                style={{ backgroundColor: colors.accent, color: colors.textInverse }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.accentHover || colors.accent}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.accent}
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
