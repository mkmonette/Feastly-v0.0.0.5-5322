import React from 'react';
import Headline from '../Headline';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

const Gallery = () => {
  const { tokens, sectionsConfig } = useMobileCompactMenu();
  const section = sectionsConfig.find(s => s.id === 'gallery');

  if (!section?.content) return null;

  const { title, titleHighlight, images } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className="py-6 px-4" style={{ backgroundColor: tokens.colors.background }}>
      <div className="mb-5 text-center">
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className={`text-2xl ${tokens.typography.headingWeight}`}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {images?.map((image, idx) => (
          <div key={idx} className="aspect-square rounded-md overflow-hidden">
            <img
              src={image}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
