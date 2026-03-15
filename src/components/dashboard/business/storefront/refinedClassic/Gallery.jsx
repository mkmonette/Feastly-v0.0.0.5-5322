import React from 'react';
import { useRefinedClassic } from './RefinedClassicContext';

const Gallery = () => {
  const { tokens } = useRefinedClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <h2 className={`${typography.scale.h2} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Gallery
          </h2>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 ${layout.gridGapSmall}`}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`aspect-square ${layout.borderRadiusSmall}`} style={{
              backgroundColor: colors.surfaceAlt
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
