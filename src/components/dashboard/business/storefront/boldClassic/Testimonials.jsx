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
    <section className={`${layout.sectionPaddingLarge} bg-${colors.background} ${layout.horizontalPadding} relative`}>
      <div className={`absolute top-0 left-0 w-1/3 h-full bg-${colors.primaryLight}`} />

      <div className={`${layout.container} ${layout.containerWidth} relative z-10`}>
        <div className="text-left mb-20">
          <div className={`inline-block mb-6 px-4 py-2 border-l-8 border-${colors.primary} bg-${colors.primaryLight}`} style={colors.primary.startsWith('#') ? { borderLeftColor: colors.primary } : {}}>
            <span
              className={`${typography.scale.bodySmall} ${typography.weights.bold} text-${colors.primary} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.fontPrimary}`}
              style={primaryStyle}
            >
              {content.subtitle || 'Testimonials'}
            </span>
          </div>
          <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.transform.uppercase} ${typography.fontPrimary}`}>
            <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
            <span style={sectionHeadlineHighlightStyle}>
              {content.titleHighlight}
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative border-4 border-${colors.border} p-8 bg-white hover:border-${colors.primary} transition-all duration-300 group`}
            >
              <div className={`absolute -top-4 -left-4 w-16 h-16 bg-${colors.primary} flex items-center justify-center`} style={primaryBgStyle}>
                <SafeIcon icon={FiIcons.FiMessageSquare} className="text-3xl text-black" />
              </div>

              <div className="mt-8 mb-6">
                <p className={`${typography.scale.body} text-${colors.textPrimary} ${typography.lineHeights.relaxed} ${typography.fontSecondary}`}>
                  "{testimonial.quote}"
                </p>
              </div>

              <div className={`w-16 h-1 bg-${colors.primary} mb-6`} style={primaryBgStyle} />

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 bg-${colors.secondary} border-4 border-white`} style={colors.secondary.startsWith('#') ? { backgroundColor: colors.secondary } : {}} />
                </div>
                <div className="text-left">
                  <div className={`${typography.scale.bodySmall} ${typography.weights.black} text-${colors.textPrimary} ${typography.transform.uppercase} ${typography.fontPrimary}`}>
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
