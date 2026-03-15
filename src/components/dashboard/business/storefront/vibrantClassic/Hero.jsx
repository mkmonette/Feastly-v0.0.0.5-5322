import React from 'react';
import { useVibrantClassic } from './VibrantClassicContext';

const Hero = () => {
  const { tokens } = useVibrantClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{
      background: `linear-gradient(135deg, ${colors.primaryLight}, ${colors.surface})`
    }}>
      <div className={`${layout.container} ${layout.containerWidth} text-center space-y-8`}>
        <div className={`inline-block px-6 py-2 ${layout.borderRadiusMedium}`} style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          color: colors.textInverse
        }}>
          <span className={`${typography.scale.xs} ${typography.weights.bold} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary}`}>
            Fresh & Delicious
          </span>
        </div>

        <h1 className={`${typography.scale.h1} ${typography.weights.black} ${typography.lineHeights.none} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
          Food That Makes
          <br />
          You <span style={{ color: colors.primary }}>Smile</span>
        </h1>

        <p className={`${typography.scale.bodyLarge} ${typography.weights.medium} ${typography.lineHeights.relaxed} ${typography.fontSecondary} max-w-2xl mx-auto`} style={{ color: colors.textMuted }}>
          Bringing joy to every bite with our colorful, flavorful, and absolutely delicious menu!
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button className={`px-8 py-4 ${layout.borderRadiusBase} ${typography.scale.body} ${typography.weights.bold} ${typography.fontSecondary} transition-all hover:scale-105 ${layout.shadowPrimary}`} style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: colors.textInverse
          }}>
            Order Now
          </button>
          <button className={`px-8 py-4 ${layout.borderRadiusBase} ${typography.scale.body} ${typography.weights.bold} ${typography.fontSecondary} border-2 transition-all hover:scale-105`} style={{
            borderColor: colors.primary,
            color: colors.primary
          }}>
            See Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
