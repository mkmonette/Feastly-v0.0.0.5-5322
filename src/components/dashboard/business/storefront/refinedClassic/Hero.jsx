import React from 'react';
import { useRefinedClassic } from './RefinedClassicContext';

const Hero = () => {
  const { tokens } = useRefinedClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth} text-center space-y-8`}>
        <div className={`inline-flex items-center gap-2 px-4 py-2 ${layout.borderRadiusBase}`} style={{
          backgroundColor: colors.primaryLight,
          color: colors.primary
        }}>
          <span className={`${typography.scale.xs} ${typography.weights.semibold} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary}`}>
            Premium Quality
          </span>
        </div>

        <h1 className={`${typography.scale.h1} ${typography.weights.bold} ${typography.lineHeights.tight} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
          Professional Dining
          <br />
          <span style={{ color: colors.primary }}>Excellence</span>
        </h1>

        <p className={`${typography.scale.bodyLarge} ${typography.weights.normal} ${typography.lineHeights.relaxed} ${typography.fontSecondary} max-w-2xl mx-auto`} style={{ color: colors.textMuted }}>
          Experience refined flavors and impeccable service in a professional setting designed for discerning tastes.
        </p>

        <div className="flex items-center justify-center gap-4 pt-6">
          <button className={`px-8 py-4 ${layout.borderRadiusBase} ${typography.scale.body} ${typography.weights.semibold} ${typography.fontSecondary} transition-all ${layout.shadowPrimary}`} style={{
            backgroundColor: colors.primary,
            color: colors.textInverse
          }}>
            View Menu
          </button>
          <button className={`px-8 py-4 ${layout.borderRadiusBase} ${typography.scale.body} ${typography.weights.semibold} ${typography.fontSecondary} border transition-all`} style={{
            borderColor: colors.border,
            color: colors.textPrimary
          }}>
            Book Table
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
