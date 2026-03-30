import React from 'react';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from './contextBridge';
import Headline from '../Headline';

const About = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const section = sectionsConfig.find(s => s.id === 'about');
  const content = section?.content || {};

  const imagePosition = content.imagePosition || 'left';

  const ImageSection = (
    <div className="relative">
      <div className={`${layout.borderRadiusLarge} overflow-hidden`} style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <img
          src={content.image || businessData.bannerUrl || "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"}
          alt="About"
          className="w-full h-[500px] object-cover"
        />
      </div>
      {content.experienceYears && (
        <div
          className={`absolute -bottom-6 -right-6 p-8 ${layout.borderRadiusLarge}`}
          style={{ backgroundColor: colors.accent, color: colors.textInverse, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
        >
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
          className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.transform.uppercase} ${typography.tracking.wide} ${typography.fontPrimary}`}
          style={{ color: colors.accent }}
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

      <p className={`${typography.scale.bodyLarge} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
        {content.description || businessData.description}
      </p>

      {content.buttonText && (
        <button
          className={`mt-4 px-8 py-4 ${typography.scale.body} ${typography.weights.semibold} hover:opacity-90 transition-all ${layout.borderRadiusBase} ${typography.fontPrimary}`}
          style={{ backgroundColor: colors.accent, color: colors.textInverse }}
        >
          {content.buttonText}
        </button>
      )}
    </div>
  );

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
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
