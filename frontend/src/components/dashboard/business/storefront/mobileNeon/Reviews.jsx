import React from 'react';
import { useMobileNeon } from './MobileNeonContext';

const StarRating = ({ rating, max = 5, color }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} className="text-xs" style={{ color: i < rating ? '#FFD23F' : '#3A3F47' }}>★</span>
    ))}
  </div>
);

const Reviews = () => {
  const { tokens, sectionsConfig } = useMobileNeon();
  const section = sectionsConfig.find(s => s.id === 'reviews');

  if (!section?.content) return null;

  const { title, testimonials } = section.content;

  return (
    <section className="px-4 pt-5 pb-4">
      <h2 className="text-base font-black mb-3" style={{ color: tokens.colors.primaryText }}>{title}</h2>
      <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-56 rounded-2xl p-4"
            style={{ backgroundColor: tokens.colors.cardBackground, border: `1px solid ${tokens.colors.border}` }}
          >
            <StarRating rating={t.rating} />
            <p className="text-xs mt-2 mb-3 line-clamp-4 leading-relaxed" style={{ color: tokens.colors.muted }}>
              "{t.content}"
            </p>
            <div className="flex items-center gap-2">
              <img
                src={t.image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'}
                alt={t.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-black" style={{ color: tokens.colors.primaryText }}>{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
