import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileYumm } from './MobileYummContext';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <SafeIcon
        key={i}
        icon={FiIcons.FiStar}
        className="text-xs"
        style={{ color: i <= rating ? '#FFD23F' : '#E5E7EB' }}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const { tokens, sectionsConfig } = useMobileYumm();
  const section = sectionsConfig.find(s => s.id === 'testimonials');

  if (!section?.content) return null;

  const { title, testimonials } = section.content;

  return (
    <section className="px-4 pt-5 pb-4">
      <h2 className="text-base font-black mb-3" style={{ color: tokens.colors.primaryText }}>{title}</h2>

      <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-56 bg-white rounded-2xl p-3 shadow-sm"
            style={{ border: `1px solid ${tokens.colors.border}` }}
          >
            <StarRating rating={t.rating} />
            <p className="text-[11px] text-gray-600 mt-2 mb-3 line-clamp-4 leading-relaxed">
              "{t.content}"
            </p>
            <div className="flex items-center gap-2">
              <img
                src={t.image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'}
                alt={t.name}
                className="w-7 h-7 rounded-full object-cover flex-shrink-0"
              />
              <span className="text-xs font-black" style={{ color: tokens.colors.primaryText }}>
                {t.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
