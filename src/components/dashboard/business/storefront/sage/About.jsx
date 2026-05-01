import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSage } from './SageContext';

const About = () => {
  const { tokens, sectionsConfig } = useSage();
  const section = sectionsConfig.find(s => s.id === 'about');
  if (!section) return null;
  const { label, title, description, linkText, image } = section.content || {};

  return (
    <section style={{ backgroundColor: tokens.colors.surface }}>
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: image */}
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${tokens.colors.border}` }}>
          <img
            src={image || 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg'}
            alt="Our Story"
            className="w-full object-cover"
            style={{ height: 320 }}
          />
        </div>

        {/* Right: text */}
        <div>
          {label && (
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: tokens.colors.sectionLabel }}>
              {label}
            </p>
          )}
          <h2 className="text-3xl font-black mb-4" style={{ color: tokens.colors.textPrimary }}>{title}</h2>
          {description && description.split('\n\n').map((para, i) => (
            <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: tokens.colors.textMuted }}>
              {para}
            </p>
          ))}
          {linkText && (
            <button
              className="inline-flex items-center gap-1.5 text-sm font-semibold mt-2 transition-all hover:opacity-70"
              style={{ color: tokens.colors.primary }}
            >
              {linkText}
              <SafeIcon icon={FiIcons.FiArrowRight} className="text-xs" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
