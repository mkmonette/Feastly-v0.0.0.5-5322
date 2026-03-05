import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from './contextBridge';

const Testimonials = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'testimonials');
  const content = section?.content || {};

  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const sectionHeadlineHighlightStyle = { color: colors.sectionHeadlineHighlight || colors.sectionHeadlineNormal };
  const accentStyle = { color: colors.accent };

  const defaultTestimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Food Enthusiast',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'The quality and taste are exceptional. Every dish is prepared with care and attention to detail.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Regular Customer',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'Outstanding service and delicious food. This has become my favorite spot for dining out.',
      rating: 5,
    },
    {
      name: 'Emma Williams',
      role: 'Food Blogger',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      text: 'A truly memorable dining experience. The ambiance and flavors are simply perfect.',
      rating: 5,
    },
  ];

  const testimonials = content.testimonials && content.testimonials.length > 0 ? content.testimonials : defaultTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className={`${layout.sectionPadding} bg-white ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <div className="mb-4">
            <span
              className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wider} ${typography.transform.uppercase} ${typography.fontSecondary}`}
              style={accentStyle}
            >
              {content.subtitle || 'Testimonials'}
            </span>
          </div>
          <h2 className={`${typography.scale.h2} ${typography.weights.bold} ${typography.lineHeights.tight} ${typography.fontPrimary}`}>
            {content.titleHighlight ? (
              <>
                <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
                <span style={sectionHeadlineHighlightStyle}>{content.titleHighlight}</span>
              </>
            ) : (
              <span style={sectionHeadlineNormalStyle}>{content.titlePre || 'What Our Customers Say'}</span>
            )}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`bg-white border p-8 transition-all duration-300 ${
                    index === currentIndex ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                  }`}
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <SafeIcon key={i} icon={FiIcons.FiStar} className="text-lg fill-current" style={accentStyle} />
                    ))}
                  </div>

                  <p className={`${typography.scale.body} ${typography.lineHeights.relaxed} mb-6 ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
                        {testimonial.name}
                      </h4>
                      <p className={`${typography.scale.xs} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 flex items-center justify-center border transition-all hover:scale-110"
                style={{ borderColor: colors.border, color: colors.textPrimary }}
              >
                <SafeIcon icon={FiIcons.FiChevronLeft} className="text-xl" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 flex items-center justify-center border transition-all hover:scale-110"
                style={{ borderColor: colors.border, color: colors.textPrimary }}
              >
                <SafeIcon icon={FiIcons.FiChevronRight} className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
