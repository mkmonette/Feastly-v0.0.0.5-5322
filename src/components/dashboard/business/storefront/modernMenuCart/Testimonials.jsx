import React from 'react';
import { useModernMenuCart } from './ModernMenuCartContext';
import { FiStar } from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

export default function Testimonials() {
  const { tokens, sectionsConfig } = useModernMenuCart();
  const section = sectionsConfig.find(s => s.id === 'testimonials');

  if (!section?.visibility?.enabled) return null;

  const content = section.content || {};

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Food Blogger',
      review: 'Absolutely amazing food! The quality and taste exceeded all my expectations. Highly recommend!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Regular Customer',
      review: 'Best dining experience in the city. Fresh ingredients and excellent service every time.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Chef',
      review: 'As a chef myself, I appreciate the attention to detail and flavor combinations. Outstanding!',
      rating: 5
    }
  ];

  return (
    <section style={{
      padding: tokens.spacing.sectionPadding,
      backgroundColor: tokens.colors.surface
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
            margin: 0
          }}>
            <span style={{ color: tokens.colors.sectionHeadlineNormal }}>
              {content.titlePre}{' '}
            </span>
            <span style={{ color: tokens.colors.sectionHeadlineHighlight }}>
              {content.titleHighlight}
            </span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: tokens.spacing.lg
        }}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                ...tokens.components.card,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = tokens.components.card.hoverShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = tokens.components.card.shadow;
              }}
            >
              <div style={{
                display: 'flex',
                gap: '0.25rem',
                marginBottom: tokens.spacing.md,
                color: tokens.colors.primary
              }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <SafeIcon key={i} icon={FiStar} style={{ fill: tokens.colors.primary }} />
                ))}
              </div>

              <p style={{
                fontSize: tokens.typography.fontSize.base,
                color: tokens.colors.text,
                lineHeight: tokens.typography.lineHeight.relaxed,
                marginBottom: tokens.spacing.md
              }}>
                "{testimonial.review}"
              </p>

              <div>
                <div style={{
                  fontSize: tokens.typography.fontSize.base,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  color: tokens.colors.text
                }}>
                  {testimonial.name}
                </div>
                <div style={{
                  fontSize: tokens.typography.fontSize.sm,
                  color: tokens.colors.textLight
                }}>
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
