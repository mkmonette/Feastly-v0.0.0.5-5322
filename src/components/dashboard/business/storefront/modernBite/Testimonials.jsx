import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernBite } from './ModernBiteContext';

const Testimonials = () => {
  const { tokens, sectionsConfig } = useModernBite();
  const testimonialSection = sectionsConfig.find(s => s.id === 'testimonials');

  if (!testimonialSection?.visibility.enabled) return null;

  const { badge, title, testimonials } = testimonialSection.content;

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tokens.colors.surfaceAlt }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-sm font-bold tracking-widest uppercase mb-4 block"
            style={{
              fontFamily: tokens.typography.fontFamily.primary,
              color: tokens.colors.primary
            }}
          >
            {badge}
          </span>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{
              fontFamily: tokens.typography.fontFamily.primary,
              color: tokens.colors.text.primary
            }}
          >
            {title}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials?.map((testimonial, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: tokens.colors.surface,
                borderRadius: tokens.typography.radii.card
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <SafeIcon key={j} icon={FiIcons.FiStar} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p
                className="mb-6 leading-relaxed"
                style={{
                  fontFamily: tokens.typography.fontFamily.secondary,
                  color: tokens.colors.text.secondary
                }}
              >
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4
                    className="font-bold"
                    style={{
                      fontFamily: tokens.typography.fontFamily.primary,
                      color: tokens.colors.text.primary
                    }}
                  >
                    {testimonial.name}
                  </h4>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: tokens.typography.fontFamily.secondary,
                      color: tokens.colors.text.secondary
                    }}
                  >
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