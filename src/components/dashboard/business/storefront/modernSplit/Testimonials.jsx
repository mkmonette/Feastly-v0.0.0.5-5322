import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from './contextBridge';
import Headline from '../Headline';

const Testimonials = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'testimonials');
  const content = section?.content || {};

  const accentStyle = { color: colors.accent };

  const defaultTestimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      text: 'The food is always fresh and delicious. Fast delivery and great customer service!',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Michael Chen',
      role: 'Food Enthusiast',
      text: 'Best food ordering experience. The quality is consistently excellent.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Satisfied Customer',
      text: 'Amazing flavors and perfect portions. Highly recommend to everyone!',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  const testimonials = content.testimonials || defaultTestimonials;

  return (
    <section className={`${layout.sectionPadding} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="mb-12">
          <div className="mb-4">
            <span
              className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.transform.uppercase} ${typography.tracking.wider} ${typography.fontSecondary}`}
              style={accentStyle}
            >
              {content.subtitle || 'Testimonials'}
            </span>
          </div>
          <Headline
            normalText={content.titlePre || 'What Our'}
            highlightText={content.titleHighlight || 'Customers Say'}
            tokens={{ colors }}
            className={`${typography.scale.h2} ${typography.weights.bold} ${typography.lineHeights.tight} ${typography.fontPrimary}`}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-xl shadow-md"
              style={{ backgroundColor: colors.background }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon key={i} icon={FiIcons.FiStar} className="text-lg" style={{ color: colors.accent, fill: colors.accent }} />
                ))}
              </div>

              <p className={`${typography.scale.body} ${typography.lineHeights.relaxed} mb-6 ${typography.fontSecondary}`} style={{ color: colors.textSecondary }}>
                {testimonial.text}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden" style={{ backgroundColor: colors.surfaceAlt }}>
                  {testimonial.avatar ? (
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <SafeIcon icon={FiIcons.FiUser} className="text-xl" style={{ color: colors.textMuted }} />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className={`${typography.scale.body} ${typography.weights.semibold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
                    {testimonial.name}
                  </h4>
                  <p className={`${typography.scale.bodySmall} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
