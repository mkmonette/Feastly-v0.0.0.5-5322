import React from 'react';
import { useModernMenuCart } from './ModernMenuCartContext';

export default function Contact() {
  const { tokens, sectionsConfig, businessData } = useModernMenuCart();
  const section = sectionsConfig.find(s => s.id === 'contact');

  if (!section?.visibility?.enabled) return null;

  const content = section.content || {};

  return (
    <section style={{
      padding: tokens.spacing.sectionPadding,
      backgroundColor: tokens.colors.background
    }}>
      <div style={{
        maxWidth: tokens.layout.maxWidth,
        margin: '0 auto',
        padding: `0 ${tokens.spacing.lg}`
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: tokens.spacing.xl
        }}>
          <h2 style={{
            fontSize: tokens.typography.fontSize.sectionTitle,
            fontWeight: tokens.typography.fontWeight.bold,
            color: tokens.colors.text,
            margin: 0,
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
            color: tokens.colors.textLight
          }}>
            {content.description}
          </p>
        </div>

        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: tokens.colors.surface,
          padding: tokens.spacing.xl,
          borderRadius: tokens.borderRadius.card,
          boxShadow: tokens.shadows.lg
        }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
            <input
              type="text"
              placeholder="Your Name"
              style={{
                ...tokens.components.input,
                padding: '0.875rem 1rem',
                border: `2px solid ${tokens.colors.border}`,
                outline: 'none'
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={{
                ...tokens.components.input,
                padding: '0.875rem 1rem',
                border: `2px solid ${tokens.colors.border}`,
                outline: 'none'
              }}
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              style={{
                ...tokens.components.input,
                padding: '0.875rem 1rem',
                border: `2px solid ${tokens.colors.border}`,
                outline: 'none',
                fontFamily: tokens.typography.fontFamily.primary,
                resize: 'vertical'
              }}
            />
            <button
              type="submit"
              style={{
                ...tokens.components.button.primary,
                padding: '0.875rem 1.5rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = tokens.components.button.primary.hoverBackground;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = tokens.components.button.primary.background;
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
