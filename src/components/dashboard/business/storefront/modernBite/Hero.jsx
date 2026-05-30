import React from 'react';
import { useModernBite } from './ModernBiteContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useModernBite();
  const heroSection = sectionsConfig.find(s => s.id === 'hero');

  if (!heroSection?.visibility.enabled) return null;

  const { title, subtitle, image, stats } = heroSection.content;

  return (
    <section className="relative h-[500px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <h2
            className="text-6xl md:text-7xl font-black mb-4 text-white"
            style={{ fontFamily: tokens.typography.fontFamily.primary }}
          >
            {title}
          </h2>
          <p
            className="text-xl md:text-2xl text-white/90 mb-8"
            style={{ fontFamily: tokens.typography.fontFamily.secondary }}
          >
            {subtitle}
          </p>

          {/* Stats */}
          <div className="flex gap-8 flex-wrap">
            {stats?.map((stat, i) => (
              <div key={i}>
                <div
                  className="text-3xl font-black text-white"
                  style={{ fontFamily: tokens.typography.fontFamily.primary }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm text-white/80"
                  style={{ fontFamily: tokens.typography.fontFamily.secondary }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;