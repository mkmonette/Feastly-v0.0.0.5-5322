import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';

const About = () => {
  const { tokens, sectionsConfig } = useModernMinimal();

  const section = sectionsConfig.find(s => s.id === 'about');
  const content = section?.content || {};

  return (
    <section
      style={{
        padding: `${tokens.spacing['3xl']} ${tokens.spacing.xl}`,
        background: tokens.colors.surface
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing['2xl'], alignItems: 'center' }}>
        <div>
          <div
            style={{
              fontSize: tokens.typography.fontSize.sm,
              fontWeight: tokens.typography.fontWeight.semibold,
              color: tokens.colors.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: tokens.spacing.md
            }}
          >
            About Us
          </div>
          <h2
            style={{
              fontSize: tokens.typography.fontSize['2xl'],
              fontWeight: tokens.typography.fontWeight.bold,
              color: tokens.colors.text.primary,
              marginBottom: tokens.spacing.lg,
              lineHeight: tokens.typography.lineHeight.tight
            }}
          >
            {content.titlePre} <span style={{ color: tokens.colors.accent }}>{content.titleHighlight}</span>
          </h2>
          <p
            style={{
              fontSize: tokens.typography.fontSize.base,
              color: tokens.colors.text.secondary,
              lineHeight: tokens.typography.lineHeight.relaxed,
              marginBottom: tokens.spacing.xl
            }}
          >
            {content.description}
          </p>
          {content.buttonText && (
            <button
              style={{
                background: tokens.colors.accent,
                color: tokens.colors.background,
                padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`,
                borderRadius: tokens.borderRadius.md,
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
              boxShadow: tokens.shadows.lg
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
                background: tokens.colors.accent,
                color: tokens.colors.background,
                padding: tokens.spacing.xl,
                borderRadius: tokens.borderRadius.lg,
                boxShadow: tokens.shadows.lg,
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: tokens.typography.fontSize['3xl'], fontWeight: tokens.typography.fontWeight.bold, lineHeight: 1 }}>
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
