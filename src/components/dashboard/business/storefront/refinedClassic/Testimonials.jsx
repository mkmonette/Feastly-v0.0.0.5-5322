import React from 'react';
import { useRefinedClassic } from './RefinedClassicContext';

const Testimonials = () => {
  const { tokens } = useRefinedClassic();
  const { typography, colors, layout } = tokens;

  const testimonials = [
    { name: 'David Morrison', text: 'Exceptional quality and service. Consistently excellent.' },
    { name: 'Lisa Chen', text: 'Professional atmosphere with outstanding cuisine.' },
    { name: 'Robert Taylor', text: 'The perfect choice for business dining and special occasions.' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <h2 className={`${typography.scale.h2} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            Client Testimonials
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 ${layout.gridGapMedium}`}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`${layout.borderRadiusMedium} p-8 border`} style={{
              backgroundColor: colors.surface,
              borderColor: colors.border
            }}>
              <p className={`${typography.scale.body} ${typography.weights.normal} ${typography.lineHeights.relaxed} ${typography.fontSecondary} mb-6`} style={{ color: colors.textMuted }}>
                "{testimonial.text}"
              </p>
              <p className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
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
