import React from 'react';
import { useVibrantClassic } from './VibrantClassicContext';

const Gallery = () => {
  const { tokens } = useVibrantClassic();
  const { typography, colors, layout } = tokens;

  const gradients = [
    `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
    `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
    `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
    `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Gallery
          </h2>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 ${layout.gridGapSmall}`}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`aspect-square ${layout.borderRadiusMedium}`} style={{
              background: gradients[i % gradients.length]
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
