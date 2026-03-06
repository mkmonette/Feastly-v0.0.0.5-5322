import React from 'react';
import { useWarmCulinary } from './WarmCulinaryContext';
import { useStorefront } from './contextBridge';

const Hero = () => {
  const { tokens } = useWarmCulinary();
  const { heroHeadline, heroSubtext } = useStorefront();

  return (
    <section className={`${tokens.layout.sectionPaddingLarge}`} style={{ backgroundColor: tokens.colors.background }}>
      <div className={`${tokens.layout.container} ${tokens.layout.containerWidth} ${tokens.layout.horizontalPadding}`}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className={`inline-block px-4 py-2 rounded-full ${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall} ${tokens.typography.weights.semibold} ${tokens.typography.transform.uppercase} ${tokens.typography.tracking.wider}`}
              style={{ backgroundColor: tokens.colors.surfaceAlt, color: tokens.colors.primary }}
            >
              Fresh & Delicious
            </div>

            <h1 className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.h1} ${tokens.typography.weights.bold} ${tokens.typography.lineHeights.tight}`}
              style={{ color: tokens.colors.textPrimary }}
            >
              {heroHeadline || 'Handcrafted Meals Made with Love'}
            </h1>

            <p className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.bodyLarge} ${tokens.typography.lineHeights.relaxed}`}
              style={{ color: tokens.colors.textSecondary }}
            >
              {heroSubtext || 'Experience authentic flavors prepared fresh daily with the finest ingredients. Every dish tells a story of tradition and passion.'}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                className={`px-8 py-4 rounded-2xl ${tokens.typography.fontSecondary} ${tokens.typography.scale.body} ${tokens.typography.weights.semibold} transition-all duration-300 shadow-lg hover:shadow-xl`}
                style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.textInverse }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tokens.colors.primaryHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = tokens.colors.primary}
              >
                View Menu
              </button>
              <button
                className={`px-8 py-4 rounded-2xl ${tokens.typography.fontSecondary} ${tokens.typography.scale.body} ${tokens.typography.weights.semibold} transition-all duration-300 border-2`}
                style={{
                  borderColor: tokens.colors.border,
                  color: tokens.colors.textPrimary,
                  backgroundColor: tokens.colors.surface
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = tokens.colors.surfaceAlt;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = tokens.colors.surface;
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: tokens.colors.surfaceAlt }}
            >
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full blur-3xl opacity-30"
              style={{ backgroundColor: tokens.colors.accent }}
            />
            <div
              className="absolute -top-6 -right-6 w-40 h-40 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: tokens.colors.primary }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
