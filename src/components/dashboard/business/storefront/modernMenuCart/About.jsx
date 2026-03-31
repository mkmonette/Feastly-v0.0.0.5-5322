import React from 'react';
import { useModernMenuCart } from './ModernMenuCartContext';

export default function About() {
  const { tokens, sectionsConfig } = useModernMenuCart();
  const section = sectionsConfig.find(s => s.id === 'about');

  if (!section?.visibility?.enabled) return null;

  const content = section.content || {};

  return (
    <section style={{
      padding: tokens.spacing.sectionPadding,
      backgroundColor: tokens.colors.surface
    }}>
      <div style={{
        maxWidth: tokens.layout.maxWidth,
        margin: '0 auto',
        padding: `0 ${tokens.spacing.lg}`,
        display: 'grid',
        gridTemplateColumns: content.imagePosition === 'right' ? '1fr 1fr' : '1fr 1fr',
        gap: tokens.spacing['2xl'],
        alignItems: 'center'
      }}>
        <div style={{ order: content.imagePosition === 'right' ? 2 : 1 }}>
          <img
            src={content.image || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"}
            alt="About"
            style={{
              width: '100%',
              borderRadius: tokens.borderRadius.card,
              boxShadow: tokens.shadows.lg
            }}
          />
        </div>

        <div style={{ order: content.imagePosition === 'right' ? 1 : 2 }}>
          <h2 style={{
            fontSize: tokens.typography.fontSize.sectionTitle,
            fontWeight: tokens.typography.fontWeight.bold,
            color: tokens.colors.text,
            marginBottom: tokens.spacing.md
          }}>
            <span style={{ color: tokens.colors.sectionHeadlineNormal }}>
              {content.titlePre}{' '}
            </span>
            <span style={{ color: tokens.colors.sectionHeadlineHighlight }}>
              {content.titleHighlight}
            </span>
          </h2>
          <p style={{
            fontSize: tokens.typography.fontSize.base,
            color: tokens.colors.textLight,
            lineHeight: tokens.typography.lineHeight.relaxed,
            marginBottom: tokens.spacing.lg
          }}>
            {content.description}
          </p>
          {content.buttonText && (
            <button style={{
              ...tokens.components.button.primary,
              padding: '0.75rem 1.5rem',
              border: 'none',
              cursor: 'pointer'
            }}>
              {content.buttonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
