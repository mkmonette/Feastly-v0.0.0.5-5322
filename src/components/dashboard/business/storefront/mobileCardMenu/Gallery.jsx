import React from 'react';
import Headline from '../Headline';
import { useMobileCardMenu } from './MobileCardMenuContext';

const Gallery = () => {
  const { tokens, sectionsConfig } = useMobileCardMenu();
  const section = sectionsConfig.find(s => s.id === 'gallery');

  if (!section?.content) return null;

  const { title, titleHighlight, images } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section
      className={tokens.layout.spacing.section}
      style={{ backgroundColor: tokens.colors.cardBackground }}
    >
      <div className="px-4">
        <div className="mb-6 text-center">
          <Headline
            normalText={normalText}
            highlightText={highlightText}
            tokens={tokens}
            className={`text-2xl ${tokens.typography.headingWeight} mb-2`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {images && images.map((image, index) => (
            <div
              key={index}
              className={`${tokens.layout.borderRadius.card} overflow-hidden aspect-square ${tokens.effects.shadow.card}`}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
