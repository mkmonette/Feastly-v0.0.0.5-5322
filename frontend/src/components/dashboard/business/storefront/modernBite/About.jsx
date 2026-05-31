import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernBite } from './ModernBiteContext';

const iconMap = {
  FiStar: FiIcons.FiStar,
  FiClock: FiIcons.FiClock,
  FiAward: FiIcons.FiAward,
  FiSun: FiIcons.FiSun
};

const About = () => {
  const { tokens, sectionsConfig } = useModernBite();
  const aboutSection = sectionsConfig.find(s => s.id === 'about');

  if (!aboutSection?.visibility.enabled) return null;

  const { badge, title, description, features } = aboutSection.content;

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tokens.colors.surface }}
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
            className="text-4xl md:text-5xl font-black mb-6"
            style={{
              fontFamily: tokens.typography.fontFamily.primary,
              color: tokens.colors.text.primary
            }}
          >
            {title}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{
              fontFamily: tokens.typography.fontFamily.secondary,
              color: tokens.colors.text.secondary
            }}
          >
            {description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {features?.map((feature, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl text-center transition-all hover:shadow-lg"
              style={{
                backgroundColor: tokens.colors.surfaceAlt,
                borderRadius: tokens.typography.radii.card
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: tokens.colors.primary }}
              >
                <SafeIcon
                  icon={iconMap[feature.icon]}
                  className="text-2xl text-white"
                />
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{
                  fontFamily: tokens.typography.fontFamily.primary,
                  color: tokens.colors.text.primary
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm"
                style={{
                  fontFamily: tokens.typography.fontFamily.secondary,
                  color: tokens.colors.text.secondary
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;