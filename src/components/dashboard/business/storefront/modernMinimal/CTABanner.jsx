import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';

const CTABanner = () => {
  const { tokens, sectionsConfig } = useModernMinimal();

  const section = sectionsConfig.find(s => s.id === 'cta');
  const content = section?.content || {};

  return (
    <section
      style={{
        padding: `${tokens.spacing['3xl']} ${tokens.spacing.xl}`,
        background: tokens.colors.accent,
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: tokens.typography.fontSize['2xl'],
            fontWeight: tokens.typography.fontWeight.bold,
            color: tokens.colors.background,
            marginBottom: tokens.spacing.md,
            lineHeight: tokens.typography.lineHeight.tight
          }}
        >
          {content.titlePre} <span style={{ opacity: 0.9 }}>{content.titleHighlight}</span>
        </h2>
        <p
          style={{
            fontSize: tokens.typography.fontSize.base,
            color: tokens.colors.background,
            opacity: 0.9,
            marginBottom: tokens.spacing.xl,
            lineHeight: tokens.typography.lineHeight.relaxed
          }}
        >
          {content.subtitle}
        </p>
        <button
          style={{
            background: tokens.colors.background,
            color: tokens.colors.accent,
            padding: `${tokens.spacing.md} ${tokens.spacing['2xl']}`,
            borderRadius: tokens.borderRadius.md,
            fontSize: tokens.typography.fontSize.base,
            fontWeight: tokens.typography.fontWeight.semibold,
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          {content.buttonText}
        </button>
      </div>
    </section>
  );
};

export default CTABanner;
