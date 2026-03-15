import React from 'react';
import { useLuxuryClassic } from './LuxuryClassicContext';

const Gallery = () => {
  const { tokens } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-20">
          <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Gallery
          </h2>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 ${layout.gridGapSmall}`}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`aspect-square`} style={{
              backgroundColor: colors.surfaceAlt
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
