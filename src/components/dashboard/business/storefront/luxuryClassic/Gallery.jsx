import React from 'react';
import { useLuxuryClassic } from './LuxuryClassicContext';

const Gallery = () => {
  const { tokens } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="aspect-square bg-gradient-to-br" style={{
              backgroundImage: `linear-gradient(135deg, ${colors.surface}, ${colors.surfaceAlt})`
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
