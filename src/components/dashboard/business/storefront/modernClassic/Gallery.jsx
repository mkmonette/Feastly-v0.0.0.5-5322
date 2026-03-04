import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from './contextBridge';

const Gallery = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'gallery');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const sectionHeadlineHighlightStyle = { color: colors.sectionHeadlineHighlight };

  const defaultImages = [
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const images = content.images || defaultImages;

  return (
    <section className={`${layout.sectionPaddingLarge} bg-${colors.surface} ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-12">
          <span
            className={`${typography.scale.bodySmall} ${typography.weights.semibold} text-${colors.primary} ${typography.transform.uppercase} ${typography.tracking.wide} ${typography.fontPrimary}`}
            style={primaryStyle}
          >
            Gallery
          </span>
          <h2 className={`${typography.scale.h2} ${typography.weights.black} mt-2 ${typography.fontPrimary}`}>
            <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
            <span style={sectionHeadlineHighlightStyle}>{content.titleHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden ${layout.borderRadiusLarge} ${index === 0 ? 'col-span-2 row-span-2' : ''} ${index === 3 ? 'col-span-2' : ''}`}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className={`w-full ${index === 0 ? 'h-[500px]' : 'h-64'} object-cover group-hover:scale-110 transition-transform duration-500`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <SafeIcon icon={FiIcons.FiMaximize2} className={`text-3xl text-${colors.textInverse}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
