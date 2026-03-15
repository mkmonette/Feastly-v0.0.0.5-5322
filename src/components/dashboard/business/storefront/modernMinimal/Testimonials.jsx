import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';

const Testimonials = () => {
  const { tokens, sectionsConfig } = useModernMinimal();

  const section = sectionsConfig.find(s => s.id === 'testimonials');
  const content = section?.content || {};

  const testimonials = [
    {
      text: "The quality and simplicity of the ordering experience is unmatched. Every dish arrives fresh and beautifully presented.",
      author: "Sarah Johnson",
      role: "Food Enthusiast"
    },
    {
      text: "I love how easy it is to browse and order. The minimal design makes everything so clear and straightforward.",
      author: "Michael Chen",
      role: "Regular Customer"
    },
    {
      text: "Outstanding food quality and the most user-friendly ordering system I've used. Highly recommended!",
      author: "Emily Davis",
      role: "Home Chef"
    }
  ];

  return (
    <section
      style={{
        padding: `${tokens.spacing['3xl']} ${tokens.spacing.xl}`,
        background: tokens.colors.background
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              lineHeight: tokens.typography.lineHeight.tight
            }}
          >
            {content.titlePre} <span style={{ color: tokens.colors.accent }}>{content.titleHighlight}</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: tokens.spacing.xl }}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                background: tokens.colors.surface,
                padding: tokens.spacing.xl,
                borderRadius: tokens.borderRadius.lg,
                boxShadow: tokens.shadows.sm
              }}
            >
              <p
                style={{
                  fontSize: tokens.typography.fontSize.base,
                  color: tokens.colors.text.primary,
                  lineHeight: tokens.typography.lineHeight.relaxed,
                  marginBottom: tokens.spacing.lg,
                  fontStyle: 'italic'
                }}
              >
                "{testimonial.text}"
              </p>
              <div>
                <div
                  style={{
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    color: tokens.colors.text.primary
                  }}
                >
                  {testimonial.author}
                </div>
                <div
                  style={{
                    fontSize: tokens.typography.fontSize.xs,
                    color: tokens.colors.text.secondary,
                    marginTop: tokens.spacing.xs
                  }}
                >
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
