import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from './contextBridge';

const About = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const section = sectionsConfig.find(s => s.id === 'about');
  const content = section?.content || {};

  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const sectionHeadlineHighlightStyle = { color: colors.sectionHeadlineHighlight || colors.sectionHeadlineNormal };
  const accentStyle = { color: colors.accent };

  const features = content.features || [
    { icon: FiIcons.FiAward, title: 'Premium Quality', description: 'Only the finest ingredients' },
    { icon: FiIcons.FiHeart, title: 'Made with Love', description: 'Crafted with passion' },
    { icon: FiIcons.FiClock, title: 'Always Fresh', description: 'Prepared daily' },
  ];

  return (
    <section className={`${layout.sectionPadding} bg-white ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={content.image || businessData.bannerUrl || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"}
                alt="About"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-8 -right-8 w-48 h-48 -z-10"
              style={{ backgroundColor: colors.surface }}
            />
          </div>

          <div>
            <div className="mb-6">
              <span
                className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wider} ${typography.transform.uppercase} ${typography.fontSecondary}`}
                style={accentStyle}
              >
                {content.subtitle || 'Our Story'}
              </span>
            </div>

            <h2 className={`${typography.scale.h2} ${typography.weights.bold} ${typography.lineHeights.tight} mb-6 ${typography.fontPrimary}`}>
              {content.titleHighlight ? (
                <>
                  <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
                  <span style={sectionHeadlineHighlightStyle}>{content.titleHighlight}</span>
                </>
              ) : (
                <span style={sectionHeadlineNormalStyle}>{content.titlePre || 'About Us'}</span>
              )}
            </h2>

            <div className={`${typography.scale.body} ${typography.lineHeights.relaxed} mb-8 space-y-4 ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
              <p>{content.description || businessData.description || 'We are dedicated to providing the finest dining experience with fresh ingredients and exceptional service.'}</p>
              {content.description2 && <p>{content.description2}</p>}
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4" style={{ backgroundColor: colors.surface }}>
                    <SafeIcon icon={feature.icon} className="text-2xl" style={accentStyle} />
                  </div>
                  <h3 className={`${typography.scale.bodySmall} ${typography.weights.semibold} mb-2 ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
                    {feature.title}
                  </h3>
                  <p className={`${typography.scale.xs} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
