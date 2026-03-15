import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

const Testimonials = () => {
  const { tokens, sectionsConfig } = useMobileCompactMenu();
  const section = sectionsConfig.find(s => s.id === 'testimonials');

  if (!section?.content) return null;

  const { title, titleHighlight, testimonials } = section.content;

  if (!testimonials || testimonials.length === 0) return null;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className="py-8 px-4">
      <div className="mb-6 text-center">
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className={`text-3xl ${tokens.typography.headingWeight} mb-2`}
        />
      </div>

      <style>{`
        .testimonials-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory testimonials-scroll"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-80 ${tokens.layout.borderRadius.card} p-6 ${tokens.effects.shadow.card} snap-center`}
            style={{
              backgroundColor: tokens.colors.cardBackground,
              border: `1px solid ${tokens.colors.border}`
            }}
          >
            <div className="flex gap-3 mb-3">
              {[...Array(5)].map((_, i) => (
                <SafeIcon
                  key={i}
                  icon={FiIcons.FiStar}
                  className="text-sm"
                  style={{ color: tokens.colors.accent, fill: tokens.colors.accent }}
                />
              ))}
            </div>

            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
              {testimonial.content}
            </p>

            <div className="flex items-center gap-3">
              {testimonial.image && (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p
                  className="text-sm font-black"
                  style={{ color: tokens.colors.primaryText }}
                >
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
