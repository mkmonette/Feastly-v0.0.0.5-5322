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

  const primaryTextStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const imagePosition = content.imagePosition || 'right';

  const ImageSection = (
    <div className="relative">
      <div className="aspect-square overflow-hidden">
        <img
          src={content.image || businessData.bannerUrl || "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"}
          alt="About"
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${colors.primary} flex items-center justify-center`} style={primaryBgStyle}>
        <SafeIcon icon={FiIcons.FiAward} className={`text-6xl text-black`} />
      </div>
    </div>
  );

  const TextSection = (
    <div className="space-y-8 text-left flex flex-col justify-center">
      <div>
        <div className={`inline-block mb-6 px-4 py-2 bg-${colors.primaryLight} border-l-4 border-${colors.primary}`} style={colors.primary.startsWith('#') ? { borderLeftColor: colors.primary } : {}}>
          <span
            className={`${typography.scale.bodySmall} ${typography.weights.bold} text-${colors.primary} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.fontPrimary}`}
            style={primaryTextStyle}
          >
            About Us
          </span>
        </div>
        <h2 className={`${typography.scale.h2} ${typography.weights.black} text-${colors.textPrimary} ${typography.transform.uppercase} ${typography.lineHeights.tight} ${typography.fontPrimary}`}>
          {content.titlePre}{' '}
          <span
            className={!colors.primary.startsWith('#') ? `text-${colors.primary}` : ''}
            style={primaryTextStyle}
          >
            {content.titleHighlight}
          </span>
        </h2>
      </div>

      <div className={`w-24 h-1 bg-${colors.primary}`} style={primaryBgStyle} />

      <p className={`${typography.scale.bodyLarge_alt} text-${colors.textMuted} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`}>
        {content.description || businessData.description}
      </p>

      {content.buttonText && (
        <div>
          <button
            className={`group relative px-10 py-5 border-4 border-${colors.textPrimary} text-${colors.textPrimary} ${typography.scale.body} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.wide} overflow-hidden transition-all hover:text-white ${typography.fontPrimary}`}
          >
            <span className="relative z-10">{content.buttonText}</span>
            <div className={`absolute inset-0 bg-${colors.textPrimary} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300`} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section className={`${layout.sectionPaddingLarge} bg-${colors.background} ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth} grid md:grid-cols-2 ${layout.gridGapLarge} items-center`}>
        {imagePosition === 'left' ? (
          <>
            {ImageSection}
            {TextSection}
          </>
        ) : (
          <>
            {TextSection}
            {ImageSection}
          </>
        )}
      </div>
    </section>
  );
};

export default About;
