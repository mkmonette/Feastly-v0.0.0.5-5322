import React from 'react';
import { useLuxuryClassic } from './LuxuryClassicContext';

const About = () => {
  const { tokens } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className={`aspect-[3/4]`} style={{
            backgroundColor: colors.surfaceAlt
          }} />

          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12" style={{ backgroundColor: colors.primary }} />
              <span className={`${typography.scale.xs} ${typography.weights.medium} ${typography.tracking.widest} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
                Our Story
              </span>
            </div>

            <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.lineHeights.tight} ${typography.fontPrimary}`} style={{ color: colors.textInverse }}>
              A Legacy of <span className={typography.weights.medium} style={{ color: colors.primary }}>Excellence</span>
            </h2>

            <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`} style={{ color: colors.textInverseMuted }}>
              For over three decades, we have been crafting unforgettable dining experiences with the finest ingredients and impeccable service.
            </p>

            <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`} style={{ color: colors.textInverseMuted }}>
              Our commitment to culinary artistry and attention to detail ensures every visit is a celebration of taste and sophistication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
