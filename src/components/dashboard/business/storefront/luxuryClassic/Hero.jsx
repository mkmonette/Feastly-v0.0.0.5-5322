import React from 'react';
import { useLuxuryClassic } from './LuxuryClassicContext';

const Hero = () => {
  const { tokens } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth} text-center space-y-8`}>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-20" style={{ backgroundColor: colors.primary }} />
          <span className={`${typography.scale.xs} ${typography.weights.medium} ${typography.tracking.widest} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
            Exquisite Cuisine
          </span>
          <div className="h-px w-20" style={{ backgroundColor: colors.primary }} />
        </div>

        <h1 className={`${typography.scale.h1} ${typography.weights.light} ${typography.lineHeights.tight} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
          An Unforgettable
          <br />
          <span className={typography.weights.medium} style={{ color: colors.primary }}>
            Dining Experience
          </span>
        </h1>

        <p className={`${typography.scale.bodyLarge} ${typography.weights.regular} ${typography.lineHeights.relaxed} ${typography.fontSecondary} max-w-2xl mx-auto`} style={{ color: colors.textMuted }}>
          Savor the finest flavors crafted with precision and passion. Every dish tells a story of excellence.
        </p>

        <div className="flex items-center justify-center gap-6 pt-4">
          <button className={`px-10 py-4 ${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary} transition-all hover:opacity-90`} style={{
            backgroundColor: colors.primary,
            color: colors.textInverse
          }}>
            View Menu
          </button>
          <button className={`px-10 py-4 ${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary} border transition-all`} style={{
            borderColor: colors.border,
            color: colors.textPrimary
          }}>
            Reserve Table
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
