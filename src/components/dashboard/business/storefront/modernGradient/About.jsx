import React from 'react';
import { useModernGradient } from './ModernGradientContext';

const About = () => {
  const { tokens, sectionsConfig } = useModernGradient();

  const section = sectionsConfig.find(s => s.id === 'about');
  const content = section?.content || {};

  return (
    <section
      style={{
        padding: `${tokens.spacing['3xl']} ${tokens.spacing.xl}`,
        background: `linear-gradient(135deg, ${tokens.colors.gradients.primary.from} 0%, ${tokens.colors.gradients.primary.to} 100%)`
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing['2xl'], alignItems: 'center' }}>
        <div>
          <div
            style={{
              fontSize: tokens.typography.fontSize.sm,
              fontWeight: tokens.typography.fontWeight.semibold,
              color: tokens.colors.text.inverse,
              opacity: 0.9,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: tokens.spacing.md
            }}
          >
            About Us
          </div>
          <h2
            style={{
              fontSize: tokens.typography.fontSize['3xl'],
              fontWeight: tokens.typography.fontWeight.bold,
              color: tokens.colors.text.inverse,
              marginBottom: tokens.spacing.lg,
              lineHeight: tokens.typography.lineHeight.tight
            }}
          >
            {content.titlePre} <span style={{ opacity: 0.8 }}>{content.titleHighlight}</span>
          </h2>
          <p
            style={{
              fontSize: tokens.typography.fontSize.base,
              color: tokens.colors.text.inverse,
              opacity: 0.9,
              lineHeight: tokens.typography.lineHeight.relaxed,
              marginBottom: tokens.spacing.xl
            }}
          >
            {content.description}
          </p>
          {content.buttonText && (
            <button
              style={{
                background: tokens.colors.surface,
                color: tokens.colors.gradients.primary.from,
                padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
                borderRadius: tokens.borderRadius.full,
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.semibold,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {content.buttonText}
            </button>
          )}
        </div>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              borderRadius: tokens.borderRadius.lg,
              overflow: 'hidden',
              boxShadow: tokens.shadows.xl
            }}
          >
            <img
              src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="About"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>
          {content.experienceYears && (
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                background: tokens.colors.surface,
                color: tokens.colors.text.primary,
                padding: tokens.spacing.xl,
                borderRadius: tokens.borderRadius.lg,
                boxShadow: tokens.shadows.xl,
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: tokens.typography.fontSize['3xl'], fontWeight: tokens.typography.fontWeight.bold, lineHeight: 1, background: `linear-gradient(135deg, ${tokens.colors.gradients.primary.from}, ${tokens.colors.gradients.primary.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {content.experienceYears}
              </div>
              <div style={{ fontSize: tokens.typography.fontSize.sm, fontWeight: tokens.typography.fontWeight.semibold, marginTop: tokens.spacing.xs }}>
                {content.experienceText}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
