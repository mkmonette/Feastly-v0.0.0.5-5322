import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from './contextBridge';
import Headline from '../Headline';

const About = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const section = sectionsConfig.find(s => s.id === 'about');
  const content = section?.content || {};

  const primaryTextStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const imagePosition = content.imagePosition || 'left';

  const ImageSection = (
    <div className="relative">
      <div className={`${layout.borderRadiusLarge} overflow-hidden ${layout.shadowLarge}`}>
        <img
          src={content.image || businessData.bannerUrl || "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"}
          alt="About"
          className="w-full h-[500px] object-cover"
        />
      </div>
      {content.experienceYears && (
        <div className={`absolute -bottom-6 -right-6 bg-${colors.primary} text-${colors.textInverse} p-8 ${layout.borderRadiusLarge} ${layout.shadowLarge}`} style={colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {}}>
          <div className={`${typography.scale.h1} ${typography.weights.black} ${typography.lineHeights.none} ${typography.fontPrimary}`}>
            {content.experienceYears}
          </div>
          <div className={`${typography.scale.bodySmall} ${typography.weights.medium} mt-2 ${typography.fontSecondary}`}>
            {content.experienceText || 'Years'}
          </div>
        </div>
      )}
    </div>
  );

  const TextSection = (
    <div className="space-y-6 text-left">
      <div>
        <span
          className={`${typography.scale.bodySmall} ${typography.weights.semibold} text-${colors.primary} ${typography.transform.uppercase} ${typography.tracking.wide} ${typography.fontPrimary}`}
          style={primaryTextStyle}
        >
          About Us
        </span>
        <Headline
          normalText={content.titlePre || 'About Us'}
          highlightText={content.titleHighlight}
          tokens={{ colors }}
          className={`${typography.scale.h2} ${typography.weights.black} mt-4 ${typography.fontPrimary}`}
        />
      </div>

      <p className={`${typography.scale.bodyLarge_alt} text-${colors.textMuted} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`}>
        {content.description || businessData.description}
      </p>

      {content.buttonText && (
        <button
          className={`mt-4 px-8 py-4 bg-${colors.secondary} text-${colors.textInverse} ${typography.scale.body} ${typography.weights.semibold} hover:bg-${colors.secondaryHover} transition-all ${layout.borderRadiusBase} ${typography.fontPrimary}`}
          style={colors.secondary.startsWith('#') ? { backgroundColor: colors.secondary } : {}}
        >
          {content.buttonText}
        </button>
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
