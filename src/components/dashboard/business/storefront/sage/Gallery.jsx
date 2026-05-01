import React from 'react';
import { useSage } from './SageContext';

const GALLERY_IMAGES = [
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
  'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg',
  'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg',
  'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'
];

const Gallery = () => {
  const { tokens, sectionsConfig } = useSage();
  const section = sectionsConfig.find(s => s.id === 'gallery');
  if (!section) return null;
  const { label, title } = section.content || {};

  return (
    <section style={{ backgroundColor: tokens.colors.background }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          {label && (
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: tokens.colors.sectionLabel }}>
              {label}
            </p>
          )}
          <h2 className="text-3xl font-black" style={{ color: tokens.colors.textPrimary }}>{title}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GALLERY_IMAGES.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-xl">
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full object-cover transition-transform duration-500 hover:scale-105"
                style={{ height: 200 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
