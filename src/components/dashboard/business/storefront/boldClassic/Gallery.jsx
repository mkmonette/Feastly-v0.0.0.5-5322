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
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const highlightColor = colors.sectionHeadlineHighlight || colors.sectionHeadlineNormal;
  const sectionHeadlineHighlightStyle = { color: highlightColor };

  const defaultImages = [
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const images = content.images && content.images.length > 0 ? content.images : defaultImages;

  return (
    <section className={`${layout.sectionPaddingLarge} bg-${colors.surface} text-white ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="text-left">
            <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.transform.uppercase} ${typography.fontPrimary}`}>
              <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
              <span style={sectionHeadlineHighlightStyle}>
                {content.titleHighlight}
              </span>
            </h2>
          </div>
          <div className={`w-48 h-1 bg-${colors.primary} hidden md:block`} style={primaryBgStyle} />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden ${
                index === 0 ? 'col-span-2 row-span-2' :
                index === 3 ? 'col-span-2' :
                'col-span-1'
              }`}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className={`w-full ${index === 0 ? 'h-full' : 'h-64'} object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500`}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <div className={`w-16 h-16 border-4 border-${colors.primary} flex items-center justify-center`} style={colors.primary.startsWith('#') ? { borderColor: colors.primary } : {}}>
                  <SafeIcon icon={FiIcons.FiPlus} className="text-3xl text-white" />
                </div>
              </div>
              <div className={`absolute bottom-4 left-4 bg-${colors.primary} px-4 py-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0`} style={primaryBgStyle}>
                <span className={`${typography.scale.xs} ${typography.weights.black} text-black ${typography.transform.uppercase} ${typography.fontPrimary}`}>
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
