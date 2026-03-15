import React from 'react';
import { useModernGradient } from './ModernGradientContext';

const CTABanner = () => {
  const { tokens, sectionsConfig } = useModernGradient();

  const section = sectionsConfig.find(s => s.id === 'cta');
  const content = section?.content || {};

  return (
    <section
      style={{
        padding: `${tokens.spacing['3xl']} ${tokens.spacing.xl}`,
        background: `linear-gradient(135deg, ${tokens.colors.gradients.primary.from} 0%, ${tokens.colors.gradients.primary.to} 100%)`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        <h2
          style={{
            fontSize: tokens.typography.fontSize['3xl'],
            fontWeight: tokens.typography.fontWeight.bold,
            color: tokens.colors.text.inverse,
            marginBottom: tokens.spacing.md,
            lineHeight: tokens.typography.lineHeight.tight
          }}
        >
          {content.titlePre} <span style={{ opacity: 0.9 }}>{content.titleHighlight}</span>
        </h2>
        <p
          style={{
            fontSize: tokens.typography.fontSize.lg,
            color: tokens.colors.text.inverse,
            opacity: 0.9,
            marginBottom: tokens.spacing.xl,
            lineHeight: tokens.typography.lineHeight.relaxed
          }}
        >
          {content.subtitle}
        </p>
        <button
          style={{
            background: tokens.colors.surface,
            color: tokens.colors.gradients.primary.from,
            padding: `${tokens.spacing.md} ${tokens.spacing['2xl']}`,
            borderRadius: tokens.borderRadius.full,
            fontSize: tokens.typography.fontSize.base,
            fontWeight: tokens.typography.fontWeight.bold,
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: tokens.shadows.xl
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = tokens.shadows.xl;
          }}
        >
          {content.buttonText}
        </button>
      </div>
    </section>
  );
};

export default CTABanner;
