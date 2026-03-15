import React from 'react';
import { useVibrantClassic } from './VibrantClassicContext';

const About = () => {
  const { tokens } = useVibrantClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`aspect-square ${layout.borderRadiusLarge}`} style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
          }} />

          <div className="space-y-6">
            <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.lineHeights.tight} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              We Make Food <span style={{ color: colors.primary }}>Fun</span>
            </h2>

            <p className={`${typography.scale.body} ${typography.weights.medium} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
              At Vibrant Eats, we believe food should be an adventure! Our colorful dishes are made with fresh, high-quality ingredients that taste as amazing as they look.
            </p>

            <p className={`${typography.scale.body} ${typography.weights.medium} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
              Every meal is crafted to bring a smile to your face and energy to your day!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
