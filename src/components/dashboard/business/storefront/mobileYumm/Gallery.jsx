import React from 'react';
import { useMobileYumm } from './MobileYummContext';

const Gallery = () => {
  const { tokens, sectionsConfig } = useMobileYumm();
  const section = sectionsConfig.find(s => s.id === 'gallery');

  if (!section?.content) return null;

  const { title, images } = section.content;
  const imgs = (images || []).slice(0, 4);

  return (
    <section className="px-4 pt-5 pb-4">
      <h2 className="text-base font-black mb-3" style={{ color: tokens.colors.primaryText }}>{title}</h2>

      <div className="grid grid-cols-2 gap-2" style={{ gridTemplateRows: 'auto auto' }}>
        {imgs[0] && (
          <div className="row-span-2 rounded-xl overflow-hidden" style={{ height: 180 }}>
            <img src={imgs[0]} alt="Gallery 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        )}
        {imgs.slice(1).map((img, i) => (
          <div key={i} className="rounded-xl overflow-hidden" style={{ height: 86 }}>
            <img src={img} alt={`Gallery ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
