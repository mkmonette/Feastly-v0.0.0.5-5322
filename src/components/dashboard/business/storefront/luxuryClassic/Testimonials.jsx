import React from 'react';
import { useLuxuryClassic } from './LuxuryClassicContext';

const Testimonials = () => {
  const { tokens } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  const testimonials = [
    { name: 'Victoria Sterling', text: 'An exceptional dining experience. The attention to detail is impeccable.' },
    { name: 'James Wellington', text: 'Unparalleled cuisine and service. A truly luxurious evening.' },
    { name: 'Catherine Hayes', text: 'The finest restaurant in the city. Every dish is a masterpiece.' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-20">
          <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.fontPrimary}`} style={{ color: colors.textInverse }}>
            Guest Reviews
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 ${layout.gridGapMedium}`}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`p-10 border`} style={{
              backgroundColor: colors.surfaceAlt,
              borderColor: colors.border,
              borderWidth: '1px'
            }}>
              <p className={`${typography.scale.body} ${typography.weights.light} ${typography.lineHeights.relaxed} ${typography.fontSecondary} mb-8`} style={{ color: colors.textInverseMuted }}>
                "{testimonial.text}"
              </p>
              <p className={`${typography.scale.bodySmall} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
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
