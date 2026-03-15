import React from 'react';
import { useRefinedClassic } from './RefinedClassicContext';

const About = () => {
  const { tokens } = useRefinedClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`aspect-[4/3] ${layout.borderRadiusMedium}`} style={{
            backgroundColor: colors.surfaceAlt
          }} />

          <div className="space-y-6">
            <span className={`${typography.scale.xs} ${typography.weights.semibold} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
              Our Philosophy
            </span>

            <h2 className={`${typography.scale.h2} ${typography.weights.bold} ${typography.lineHeights.tight} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              Commitment to <span style={{ color: colors.primary }}>Excellence</span>
            </h2>

            <p className={`${typography.scale.body} ${typography.weights.normal} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
              We believe in delivering exceptional dining experiences through meticulous attention to detail, premium ingredients, and professional service.
            </p>

            <p className={`${typography.scale.body} ${typography.weights.normal} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
              Our commitment to quality and consistency has made us a trusted choice for discerning diners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
