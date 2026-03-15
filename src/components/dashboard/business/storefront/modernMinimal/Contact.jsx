import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';

const Contact = () => {
  const { tokens, sectionsConfig } = useModernMinimal();

  const section = sectionsConfig.find(s => s.id === 'contact');
  const content = section?.content || {};

  return (
    <section
      style={{
        padding: `${tokens.spacing['3xl']} ${tokens.spacing.xl}`,
        background: tokens.colors.surface
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: tokens.spacing['2xl'] }}>
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
            {content.subtitle}
          </div>
          <h2
            style={{
              fontSize: tokens.typography.fontSize['2xl'],
              fontWeight: tokens.typography.fontWeight.bold,
              color: tokens.colors.text.primary,
              marginBottom: tokens.spacing.md,
              lineHeight: tokens.typography.lineHeight.tight
            }}
          >
            {content.titlePre} <span style={{ color: tokens.colors.accent }}>{content.titleHighlight}</span>
          </h2>
          <p
            style={{
              fontSize: tokens.typography.fontSize.base,
              color: tokens.colors.text.secondary,
              lineHeight: tokens.typography.lineHeight.relaxed
            }}
          >
            {content.description}
          </p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacing.lg }}>
            <input
              type="text"
              placeholder="Your Name"
              style={{
                padding: tokens.spacing.md,
                borderRadius: tokens.borderRadius.md,
                border: `1px solid ${tokens.colors.border}`,
                fontSize: tokens.typography.fontSize.base,
                background: tokens.colors.background,
                color: tokens.colors.text.primary
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={{
                padding: tokens.spacing.md,
                borderRadius: tokens.borderRadius.md,
                border: `1px solid ${tokens.colors.border}`,
                fontSize: tokens.typography.fontSize.base,
                background: tokens.colors.background,
                color: tokens.colors.text.primary
              }}
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            style={{
              padding: tokens.spacing.md,
              borderRadius: tokens.borderRadius.md,
              border: `1px solid ${tokens.colors.border}`,
              fontSize: tokens.typography.fontSize.base,
              background: tokens.colors.background,
              color: tokens.colors.text.primary
            }}
          />
          <textarea
            placeholder="Your Message"
            rows="6"
            style={{
              padding: tokens.spacing.md,
              borderRadius: tokens.borderRadius.md,
              border: `1px solid ${tokens.colors.border}`,
              fontSize: tokens.typography.fontSize.base,
              background: tokens.colors.background,
              color: tokens.colors.text.primary,
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
          <button
            type="submit"
            style={{
              background: tokens.colors.accent,
              color: tokens.colors.background,
              padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
              borderRadius: tokens.borderRadius.md,
              fontSize: tokens.typography.fontSize.base,
              fontWeight: tokens.typography.fontWeight.semibold,
              border: 'none',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
