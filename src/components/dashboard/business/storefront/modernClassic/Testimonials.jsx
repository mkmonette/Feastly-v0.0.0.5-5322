import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from './contextBridge';

const Testimonials = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'testimonials');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const highlightColor = colors.sectionHeadlineHighlight || colors.sectionHeadlineNormal;
  const sectionHeadlineHighlightStyle = { color: highlightColor };

  const defaultTestimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Food Blogger',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: 'An absolutely incredible dining experience. The attention to detail and quality of ingredients is unmatched.'
    },
    {
      name: 'Michael Chen',
      role: 'Regular Customer',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: 'Best food in the city! The service is impeccable and the atmosphere is perfect for any occasion.'
    },
    {
      name: 'Emma Williams',
      role: 'Chef',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
      quote: 'As a chef myself, I appreciate the craft and passion that goes into every dish. Truly exceptional.'
    }
  ];

  const testimonials = content.testimonials && content.testimonials.length > 0
    ? content.testimonials.map(t => ({
        name: t.name || '',
        role: t.role || '',
        image: t.image || '',
        quote: t.content || t.quote || ''
      }))
    : defaultTestimonials;

  return (
    <section className={`${layout.sectionPaddingLarge} bg-${colors.background} ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-12">
          <span
            className={`${typography.scale.bodySmall} ${typography.weights.semibold} text-${colors.primary} ${typography.transform.uppercase} ${typography.tracking.wide} ${typography.fontPrimary}`}
            style={primaryStyle}
          >
            {content.subtitle || 'Testimonials'}
          </span>
          <h2 className={`${typography.scale.h2} ${typography.weights.black} mt-2 ${typography.fontPrimary}`}>
            {content.titleHighlight ? (
              <>
                <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
                <span style={sectionHeadlineHighlightStyle}>{content.titleHighlight}</span>
              </>
            ) : (
              <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>
            )}
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 ${layout.gridGapMedium}`}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-${colors.surface} p-8 ${layout.borderRadiusLarge} border border-${colors.border} hover:${layout.shadowLarge} transition-all duration-300`}
            >
              <div className={`w-12 h-12 bg-${colors.primary} ${layout.borderRadiusBase} flex items-center justify-center mb-6`} style={primaryBgStyle}>
                <SafeIcon icon={FiIcons.FiMessageCircle} className={`text-2xl text-${colors.textInverse}`} />
              </div>

              <p className={`${typography.scale.body} text-${colors.textPrimary} ${typography.lineHeights.relaxed} mb-6 ${typography.fontSecondary}`}>
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className={`w-12 h-12 ${layout.borderRadiusBase} object-cover`}
                />
                <div className="text-left">
                  <div className={`${typography.scale.bodySmall} ${typography.weights.bold} text-${colors.textPrimary} ${typography.fontPrimary}`}>
                    {testimonial.name}
                  </div>
                  <div className={`${typography.scale.xs} text-${colors.textMuted} ${typography.fontSecondary}`}>
                    {testimonial.role}
                  </div>
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
