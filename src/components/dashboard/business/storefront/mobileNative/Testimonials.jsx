import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const Testimonials = () => {
  const { tokens, sectionsConfig } = useMobileNative();
  const section = sectionsConfig?.find(s => s.id === 'testimonials');
  const content = section?.content || {};

  const {
    title = 'Reviews',
    titleHighlight = 'Reviews',
    testimonials = [
      {
        name: 'Sarah Johnson',
        role: 'Regular Customer',
        content: 'Best food delivery service! Always fresh and on time.',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
      }
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

      <div className="space-y-2.5">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`bg-white ${tokens.layout.borderRadius.card} p-3 border`}
            style={{
              borderColor: tokens.colors.border,
              boxShadow: tokens.effects.shadow.card
            }}
          >
            <div className="flex items-start gap-3 mb-2">
              <div className={`w-10 h-10 ${tokens.layout.borderRadius.image} overflow-hidden bg-gray-100 flex-shrink-0`}>
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <SafeIcon icon={FiIcons.FiUser} className="text-lg text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h4
                  className={`text-[14px] ${tokens.typography.headingWeight}`}
                  style={{ color: tokens.colors.primaryText }}
                >
                  {testimonial.name}
                </h4>
                {testimonial.role && (
                  <p
                    className="text-[12px]"
                    style={{ color: tokens.colors.sectionNormalText }}
                  >
                    {testimonial.role}
                  </p>
                )}
              </div>

              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon
                    key={i}
                    icon={FiIcons.FiStar}
                    className="text-[12px]"
                    style={{ color: tokens.colors.accent, fill: tokens.colors.accent }}
                  />
                ))}
              </div>
            </div>

            <p
              className="text-[14px]"
              style={{ color: tokens.colors.primaryText }}
            >
              {testimonial.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
