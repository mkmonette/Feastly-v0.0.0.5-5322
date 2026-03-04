import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from './contextBridge';

const CTABanner = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'cta');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const secondaryBgStyle = colors.secondary.startsWith('#') ? { backgroundColor: colors.secondary } : {};

  return (
    <section className={`${layout.sectionPaddingLarge} bg-${colors.textPrimary} text-white ${layout.horizontalPadding} relative overflow-hidden`}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`absolute h-px bg-${colors.primary}`}
              style={{
                top: `${i * 10}%`,
                left: 0,
                right: 0,
                ...(colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {})
              }}
            />
          ))}
        </div>
      </div>

      <div className={`${layout.container} ${layout.containerWidth} relative z-10`}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="text-left space-y-8">
            <div>
              <div className={`w-24 h-2 bg-${colors.primary} mb-8`} style={primaryBgStyle} />
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

            {content.subtitle && (
              <p className={`${typography.scale.bodyLarge_alt} text-${colors.textInverseMuted} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`}>
                {content.subtitle}
              </p>
            )}

            <button
              className={`group relative px-12 py-6 bg-${colors.primary} text-black ${typography.scale.body} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.wide} overflow-hidden transition-all ${typography.fontPrimary}`}
              style={primaryBgStyle}
            >
              <span className="relative z-10 flex items-center gap-3">
                {content.buttonText || 'Get Started'}
                <SafeIcon icon={FiIcons.FiArrowRight} className="text-xl group-hover:translate-x-2 transition-transform" />
              </span>
              <div className={`absolute inset-0 bg-${colors.secondary} transform translate-x-full group-hover:translate-x-0 transition-transform duration-300`} style={secondaryBgStyle} />
            </button>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: FiIcons.FiClock, text: 'Fast Service' },
                { icon: FiIcons.FiAward, text: 'Top Quality' },
                { icon: FiIcons.FiHeart, text: 'Made Fresh' },
                { icon: FiIcons.FiStar, text: '5-Star Rated' }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`border-4 border-white/20 p-6 hover:border-${colors.primary} transition-all group text-center`}
                >
                  <SafeIcon
                    icon={item.icon}
                    className={`text-5xl text-${colors.primary} mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    style={primaryStyle}
                  />
                  <span className={`${typography.scale.bodySmall} ${typography.weights.bold} ${typography.transform.uppercase} ${typography.fontPrimary}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
