import React from 'react';
import { useWarmCulinary } from './WarmCulinaryContext';

const Gallery = () => {
  const { tokens } = useWarmCulinary();

  const images = [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg',
    'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg',
    'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
    'https://images.pexels.com/photos/1410236/pexels-photo-1410236.jpeg',
  ];

  return (
    <section id="gallery" className={`${tokens.layout.sectionPadding}`} style={{ backgroundColor: tokens.colors.surface }}>
      <div className={`${tokens.layout.container} ${tokens.layout.containerWidth} ${tokens.layout.horizontalPadding}`}>
        <div className="text-center mb-12">
          <div
            className={`inline-block px-4 py-2 rounded-full ${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall} ${tokens.typography.weights.semibold} ${tokens.typography.transform.uppercase} ${tokens.typography.tracking.wider} mb-4`}
            style={{ backgroundColor: tokens.colors.surfaceAlt, color: tokens.colors.primary }}
          >
            Gallery
          </div>
          <h2
            className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.h2} ${tokens.typography.weights.bold}`}
            style={{ color: tokens.colors.textPrimary }}
          >
            A Visual Journey
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: tokens.colors.surfaceAlt,
                boxShadow: `0 4px 20px ${tokens.colors.cardShadow}`
              }}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
