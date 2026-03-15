import React from 'react';
import { useLuxuryClassic } from './LuxuryClassicContext';

const Testimonials = () => {
  const { tokens } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  const testimonials = [
    { name: 'James Anderson', text: 'An exceptional dining experience. The attention to detail is unmatched.' },
    { name: 'Sarah Mitchell', text: 'Every dish is a work of art. Truly remarkable cuisine.' },
    { name: 'Michael Chen', text: 'The finest restaurant in the city. Absolutely phenomenal.' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <span className={`${typography.scale.xs} ${typography.weights.medium} ${typography.tracking.widest} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
            Testimonials
          </span>
          <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.fontPrimary} mt-4`} style={{ color: colors.textPrimary }}>
            Guest Reviews
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 ${layout.gridGapMedium}`}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border p-8" style={{
              backgroundColor: colors.background,
              borderColor: colors.border
            }}>
              <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.lineHeights.relaxed} ${typography.fontSerif} mb-6`} style={{ color: colors.textMuted }}>
                "{testimonial.text}"
              </p>
              <p className={`${typography.scale.bodySmall} ${typography.weights.medium} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
