import React from 'react';
import { useModernGradient } from './ModernGradientContext';

const Contact = () => {
  const { tokens, sectionsConfig } = useModernGradient();

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
              background: `linear-gradient(135deg, ${tokens.colors.gradients.primary.from}, ${tokens.colors.gradients.primary.to})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: tokens.spacing.md
            }}
          >
            {content.subtitle}
          </div>
          <h2
            style={{
              fontSize: tokens.typography.fontSize['3xl'],
              fontWeight: tokens.typography.fontWeight.bold,
              color: tokens.colors.text.primary,
              marginBottom: tokens.spacing.md,
              lineHeight: tokens.typography.lineHeight.tight
            }}
          >
            {content.titlePre} <span style={{ background: `linear-gradient(135deg, ${tokens.colors.gradients.primary.from}, ${tokens.colors.gradients.primary.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{content.titleHighlight}</span>
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
                borderRadius: tokens.borderRadius.lg,
                border: `2px solid transparent`,
                fontSize: tokens.typography.fontSize.base,
                background: tokens.colors.background,
                color: tokens.colors.text.primary,
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = tokens.colors.gradients.primary.from}
              onBlur={(e) => e.target.style.borderColor = 'transparent'}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={{
                padding: tokens.spacing.md,
                borderRadius: tokens.borderRadius.lg,
                border: `2px solid transparent`,
                fontSize: tokens.typography.fontSize.base,
                background: tokens.colors.background,
                color: tokens.colors.text.primary,
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = tokens.colors.gradients.primary.from}
              onBlur={(e) => e.target.style.borderColor = 'transparent'}
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            style={{
              padding: tokens.spacing.md,
              borderRadius: tokens.borderRadius.lg,
              border: `2px solid transparent`,
              fontSize: tokens.typography.fontSize.base,
              background: tokens.colors.background,
              color: tokens.colors.text.primary,
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = tokens.colors.gradients.primary.from}
            onBlur={(e) => e.target.style.borderColor = 'transparent'}
          />
          <textarea
            placeholder="Your Message"
            rows="6"
            style={{
              padding: tokens.spacing.md,
              borderRadius: tokens.borderRadius.lg,
              border: `2px solid transparent`,
              fontSize: tokens.typography.fontSize.base,
              background: tokens.colors.background,
              color: tokens.colors.text.primary,
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = tokens.colors.gradients.primary.from}
            onBlur={(e) => e.target.style.borderColor = 'transparent'}
          />
          <button
            type="submit"
            style={{
              background: `linear-gradient(135deg, ${tokens.colors.gradients.primary.from}, ${tokens.colors.gradients.primary.to})`,
              color: tokens.colors.text.inverse,
              padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
              borderRadius: tokens.borderRadius.full,
              fontSize: tokens.typography.fontSize.base,
              fontWeight: tokens.typography.fontWeight.bold,
              border: 'none',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: tokens.shadows.lg
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = tokens.shadows.xl;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = tokens.shadows.lg;
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
