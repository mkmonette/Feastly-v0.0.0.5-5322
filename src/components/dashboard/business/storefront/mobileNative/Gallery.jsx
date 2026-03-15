import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const Gallery = () => {
  const { tokens, sectionsConfig } = useMobileNative();
  const section = sectionsConfig?.find(s => s.id === 'gallery');
  const content = section?.content || {};

  const {
    title = 'Gallery',
    titleHighlight = 'Gallery',
    images = [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg'
    ]
  } = content;

  const parts = title.split(titleHighlight);

  return (
    <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 ${tokens.layout.spacing.section}`}>
      <h2
        className={`text-[22px] ${tokens.typography.headingWeight} mb-3`}
        style={{ color: tokens.colors.primaryText }}
      >
        {parts[0]}
        {titleHighlight && (
          <span style={{ color: tokens.colors.primary }}>
            {titleHighlight}
          </span>
        )}
        {parts[1]}
      </h2>

      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-2 pb-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${tokens.layout.borderRadius.card} overflow-hidden flex-shrink-0 w-[200px] h-[150px] bg-gray-100`}
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
    </div>
  );
};

export default Gallery;
