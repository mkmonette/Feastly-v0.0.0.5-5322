import React from 'react';
import { useLuxuryClassic } from './LuxuryClassicContext';

const About = () => {
  const { tokens } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/3] bg-gradient-to-br" style={{
            backgroundImage: `linear-gradient(135deg, ${colors.surfaceAlt}, ${colors.background})`
          }} />

          <div className="space-y-6">
            <span className={`${typography.scale.xs} ${typography.weights.medium} ${typography.tracking.widest} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
              Our Story
            </span>

            <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.lineHeights.tight} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
              Where Tradition Meets <span style={{ color: colors.primary }}>Innovation</span>
            </h2>

            <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
              For over two decades, we have been crafting extraordinary dining experiences that celebrate the art of fine cuisine. Our commitment to excellence is reflected in every dish we serve.
            </p>

            <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
              Using only the finest ingredients sourced from around the world, our master chefs create culinary masterpieces that delight the senses and create lasting memories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
