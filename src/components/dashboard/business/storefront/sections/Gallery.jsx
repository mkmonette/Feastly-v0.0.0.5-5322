import React from 'react';
import { useStorefrontTokens, useStorefront } from '../StorefrontContext';
import Headline from '../Headline';

const Gallery = () => {
  const { layout, colors, typography } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'gallery');
  const content = section?.content || {};

  const defaultImages = [
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
  ];

  const images = content.images && content.images.length > 0 ? content.images : defaultImages;

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding} bg-${colors.surface}`}>
      <div className={`${layout.container} ${layout.containerWidth} text-center mb-16`}>
        <Headline
          normalText={content.titlePre || 'Our Gallery'}
          highlightText={content.titleHighlight}
          tokens={{ colors }}
          className={`${typography.scale.h2} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.tighter} ${typography.fontPrimary}`}
        />
      </div>
      <div className={`${layout.container} ${layout.containerWidth} grid grid-cols-2 md:grid-cols-4 gap-4`}>
        {images.map((img, i) => (
          <div key={i} className={`${layout.borderRadiusSmall} overflow-hidden shadow-lg ${i % 2 === 1 ? 'mt-8' : ''}`}>
            <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 aspect-[3/4]" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;