import React from 'react';
import { freshCartTokens as tokens } from '../freshCartTokens';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Alex Rivera',
    role: 'Food Enthusiast',
    comment: 'The quality and freshness of ingredients is unmatched. Every dish is a delightful experience!',
  },
  {
    id: 2,
    name: 'Jamie Chen',
    role: 'Regular Customer',
    comment: 'Absolutely love the convenience and the amazing flavors. This has become my go-to for meals.',
  },
  {
    id: 3,
    name: 'Morgan Taylor',
    role: 'Chef',
    comment: 'As a fellow chef, I truly appreciate the craftsmanship and attention to detail in every dish.',
  },
];

const Testimonials = () => {
  return (
    <section style={{
      padding: `${tokens.spacing.xxl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.primary,
    }}>
      <div>
        <h2 style={{
          fontFamily: tokens.fonts.heading,
          fontSize: '48px',
          fontWeight: '700',
          color: tokens.colors.text.primary,
          marginBottom: tokens.spacing.sm,
          letterSpacing: '-0.02em',
        }}>
          What People Say
        </h2>
        <p style={{
          fontFamily: tokens.fonts.body,
          fontSize: '16px',
          color: tokens.colors.text.secondary,
          marginBottom: tokens.spacing.xl,
        }}>
          Hear from our satisfied customers
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: tokens.spacing.lg,
        }}>
          {testimonials.map(testimonial => (
            <div key={testimonial.id} style={{
              backgroundColor: tokens.colors.background.secondary,
              borderRadius: tokens.borderRadius.xl,
              padding: tokens.spacing.lg,
            }}>
              <div style={{
                marginBottom: tokens.spacing.md,
              }}>
                <SafeIcon icon={FiIcons.FiStar} style={{ fontSize: '20px', color: tokens.colors.accent }} />
              </div>
              <p style={{
                fontFamily: tokens.fonts.body,
                fontSize: '16px',
                color: tokens.colors.text.primary,
                lineHeight: '1.6',
                marginBottom: tokens.spacing.md,
              }}>
                "{testimonial.comment}"
              </p>
              <div>
                <div style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: tokens.colors.text.primary,
                  marginBottom: '4px',
                }}>
                  {testimonial.name}
                </div>
                <div style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '14px',
                  color: tokens.colors.text.secondary,
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
};

export default Testimonials;
