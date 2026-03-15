import React from 'react';
import { useModernGradient } from './ModernGradientContext';

const Testimonials = () => {
  const { tokens, sectionsConfig } = useModernGradient();

  const section = sectionsConfig.find(s => s.id === 'testimonials');
  const content = section?.content || {};

  const testimonials = [
    {
      text: "The vibrant presentation and bold flavors make every meal an adventure. Absolutely love the experience!",
      author: "Sarah Johnson",
      role: "Food Enthusiast"
    },
    {
      text: "A feast for the eyes and the palate. The gradient design perfectly matches the colorful dishes.",
      author: "Michael Chen",
      role: "Regular Customer"
    },
    {
      text: "Outstanding quality and the most visually stunning ordering experience I've ever had!",
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
              lineHeight: tokens.typography.lineHeight.tight
            }}
          >
            {content.titlePre} <span style={{ background: `linear-gradient(135deg, ${tokens.colors.gradients.primary.from}, ${tokens.colors.gradients.primary.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{content.titleHighlight}</span>
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
                boxShadow: tokens.shadows.lg,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${tokens.colors.gradients.primary.from}, ${tokens.colors.gradients.primary.to})` }} />
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
                    fontWeight: tokens.typography.fontWeight.bold,
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
