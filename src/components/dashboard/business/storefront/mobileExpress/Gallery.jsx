import React from 'react';
import Headline from '../Headline';
import { useMobileExpress } from './MobileExpressContext';

const Gallery = () => {
  const { tokens, sectionsConfig } = useMobileExpress();
  const section = sectionsConfig.find(s => s.id === 'gallery');

  if (!section?.content) return null;

  const { title, titleHighlight, images } = section.content;

  if (!images || images.length === 0) return null;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="mb-6 text-center">
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className={`text-3xl ${tokens.typography.headingWeight} mb-2`}
        />
      </div>

      <style>{`
        .gallery-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory gallery-scroll"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-72 h-72 ${tokens.layout.borderRadius.card} overflow-hidden ${tokens.effects.shadow.card} snap-center`}
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
