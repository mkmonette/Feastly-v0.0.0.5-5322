import React from 'react';
import { useWarmCulinary } from './WarmCulinaryContext';
import { FiStar } from 'react-icons/fi';

const Testimonials = () => {
  const { tokens } = useWarmCulinary();

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Food Enthusiast',
      content: 'Absolutely incredible! The flavors are authentic and every dish is prepared with such care. This has become my go-to spot.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Regular Customer',
      content: 'The quality is consistently outstanding. Fresh ingredients, beautiful presentation, and flavors that transport you.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emma Davis',
      role: 'Home Cook',
      content: 'I love how they balance tradition with creativity. Every meal is an experience worth savoring.',
      rating: 5,
    },
  ];

  return (
    <section className={`${tokens.layout.sectionPadding}`} style={{ backgroundColor: tokens.colors.background }}>
      <div className={`${tokens.layout.container} ${tokens.layout.containerWidth} ${tokens.layout.horizontalPadding}`}>
        <div className="text-center mb-12">
          <div
            className={`inline-block px-4 py-2 rounded-full ${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall} ${tokens.typography.weights.semibold} ${tokens.typography.transform.uppercase} ${tokens.typography.tracking.wider} mb-4`}
            style={{ backgroundColor: tokens.colors.surfaceAlt, color: tokens.colors.primary }}
          >
            Testimonials
          </div>
          <h2
            className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.h2} ${tokens.typography.weights.bold}`}
            style={{ color: tokens.colors.textPrimary }}
          >
            What Our Guests Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl"
              style={{
                backgroundColor: tokens.colors.cardBackground,
                boxShadow: `0 4px 20px ${tokens.colors.cardShadow}`
              }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="w-5 h-5 fill-current"
                    style={{ color: tokens.colors.accent }}
                  />
                ))}
              </div>
              <p
                className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.body} ${tokens.typography.lineHeights.relaxed} mb-6`}
                style={{ color: tokens.colors.textSecondary }}
              >
                "{testimonial.content}"
              </p>
              <div>
                <p
                  className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.body} ${tokens.typography.weights.bold}`}
                  style={{ color: tokens.colors.textPrimary }}
                >
                  {testimonial.name}
                </p>
                <p
                  className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall}`}
                  style={{ color: tokens.colors.textMuted }}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
