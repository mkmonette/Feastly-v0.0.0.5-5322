import React from 'react';
import { useModernBite } from './ModernBiteContext';

const Gallery = ({ section }) => {
  const { tokens } = useModernBite();
  const images = section?.content?.images || [];

  if (images.length < 6) return null;

  return (
    <div className="mt-20 space-y-8">
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: tokens.colors.primary }}>
          {section?.content?.badge}
        </h4>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">{section?.content?.title}</h2>
      </div>
      
      <div className="flex flex-col gap-4">
        {/* Top Row */}
        <div className="grid grid-cols-2 gap-4 h-[500px]">
          <div className="rounded-[32px] overflow-hidden shadow-sm">
            <img src={images[0]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery 1" />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="rounded-[32px] overflow-hidden shadow-sm">
              <img src={images[1]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery 2" />
            </div>
            <div className="rounded-[32px] overflow-hidden shadow-sm">
              <img src={images[2]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery 3" />
            </div>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-4 h-[240px]">
          {images.slice(3, 6).map((img, idx) => (
            <div key={idx} className="rounded-[32px] overflow-hidden shadow-sm">
              <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={`Gallery ${idx + 4}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;