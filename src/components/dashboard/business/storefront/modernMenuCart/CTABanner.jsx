import React from 'react';
import { useModernMenuCart } from './ModernMenuCartContext';

export default function CTABanner() {
  const { tokens, sectionsConfig } = useModernMenuCart();
  const section = sectionsConfig.find(s => s.id === 'cta');

  if (!section?.visibility?.enabled) return null;

  const content = section.content || {};

  return (
    <section style={{
      padding: tokens.spacing.sectionPadding,
      background: tokens.colors.heroBackground,
      color: '#fff'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: `0 ${tokens.spacing.lg}`,
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: tokens.typography.fontSize['4xl'],
          fontWeight: tokens.typography.fontWeight.bold,
          marginBottom: tokens.spacing.md
        }}>
          <span>{content.titlePre} </span>
          <span style={{ color: tokens.colors.primary }}>{content.titleHighlight}</span>
        </h2>

        <p style={{
          fontSize: tokens.typography.fontSize.lg,
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: tokens.spacing.xl,
          lineHeight: tokens.typography.lineHeight.relaxed
        }}>
          {content.subtitle}
        </p>

        <button style={{
          ...tokens.components.button.secondary,
          padding: '1rem 2.5rem',
          border: 'none',
          cursor: 'pointer',
          fontSize: tokens.typography.fontSize.base,
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = tokens.components.button.secondary.hoverBackground;
        }}
        onMouseLeave={(e) => {
          e.target.style.background = tokens.components.button.secondary.background;
        }}
        >
          {content.buttonText}
        </button>
      </div>
    </section>
  );
}
