import React from 'react';
import { useVibrantClassic } from './VibrantClassicContext';

const Testimonials = () => {
  const { tokens } = useVibrantClassic();
  const { typography, colors, layout } = tokens;

  const testimonials = [
    { name: 'Emma Wilson', text: 'The food is so fresh and colorful! Love the energy here!' },
    { name: 'Alex Turner', text: 'Best smoothies in town! Always makes my day better.' },
    { name: 'Maya Patel', text: 'Healthy, delicious, and super fun. What more could you want?' },
  ];

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center mb-16">
          <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.fontPrimary}`} style={{ color: colors.textPrimary }}>
            What People Say
          </h2>
        </div>

        <div className={`grid md:grid-cols-3 ${layout.gridGapMedium}`}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`${layout.borderRadiusLarge} p-8`} style={{
              backgroundColor: colors.surface
            }}>
              <p className={`${typography.scale.body} ${typography.weights.medium} ${typography.lineHeights.relaxed} ${typography.fontSecondary} mb-6`} style={{ color: colors.textMuted }}>
                "{testimonial.text}"
              </p>
              <p className={`${typography.scale.bodySmall} ${typography.weights.bold} ${typography.fontSecondary}`} style={{ color: colors.primary }}>
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
