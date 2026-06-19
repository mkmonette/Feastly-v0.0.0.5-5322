import React from 'react';
import { useMobileNeon } from './MobileNeonContext';

const Gallery = () => {
  const { tokens, sectionsConfig } = useMobileNeon();
  const section = sectionsConfig.find(s => s.id === 'gallery');

  if (!section?.content) return null;

  const { title, images } = section.content;
  const imgs = images?.slice(0, 6) || [];

  if (imgs.length === 0) return null;

  return (
    <section className="px-4 pt-5 pb-4">
      <h2 className="text-base font-black mb-3" style={{ color: tokens.colors.primaryText }}>{title}</h2>
      <div className="grid grid-cols-3 gap-1.5">
        {imgs.map((src, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{
              height: i === 0 ? '120px' : i === 1 ? '120px' : '80px',
              gridColumn: i === 0 ? 'span 2' : 'span 1',
              gridRow: i === 0 ? 'span 1' : undefined
            }}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
