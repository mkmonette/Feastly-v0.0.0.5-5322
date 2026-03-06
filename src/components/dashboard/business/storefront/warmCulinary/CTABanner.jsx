import React from 'react';
import { useWarmCulinary } from './WarmCulinaryContext';

const CTABanner = () => {
  const { tokens } = useWarmCulinary();

  return (
    <section className={`${tokens.layout.sectionPadding}`} style={{ backgroundColor: tokens.colors.surface }}>
      <div className={`${tokens.layout.container} ${tokens.layout.containerWidth} ${tokens.layout.horizontalPadding}`}>
        <div
          className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
          style={{ backgroundColor: tokens.colors.primary }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: tokens.colors.accent }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: tokens.colors.accent }}
          />

          <div className="relative z-10">
            <h2
              className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.h2} ${tokens.typography.weights.bold} mb-4`}
              style={{ color: tokens.colors.textInverse }}
            >
              Ready to Experience Culinary Excellence?
            </h2>
            <p
              className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.bodyLarge} mb-8 max-w-2xl mx-auto`}
              style={{ color: tokens.colors.textInverseMuted }}
            >
              Join us for an unforgettable dining experience. Order now and taste the difference that passion makes.
            </p>
            <button
              className={`px-8 py-4 rounded-2xl ${tokens.typography.fontSecondary} ${tokens.typography.scale.body} ${tokens.typography.weights.semibold} transition-all duration-300 shadow-xl hover:shadow-2xl`}
              style={{
                backgroundColor: tokens.colors.surface,
                color: tokens.colors.primary
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
