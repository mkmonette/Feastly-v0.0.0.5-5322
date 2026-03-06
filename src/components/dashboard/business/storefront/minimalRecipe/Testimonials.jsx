import React from 'react';
import { minimalRecipeTokens as tokens } from '../minimalRecipeTokens';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Blogger',
    comment: 'The attention to detail and quality of ingredients is exceptional. Every visit is a delightful experience.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Regular Customer',
    comment: 'Best food in town! The atmosphere is cozy and the staff is incredibly friendly.',
  },
  {
    id: 3,
    name: 'Emma Davis',
    role: 'Chef',
    comment: 'As a fellow chef, I can truly appreciate the craftsmanship and passion in every dish.',
  },
];

const Testimonials = () => {
  return (
    <section style={{
      padding: `${tokens.spacing.xxl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.secondary,
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: tokens.spacing.xl,
        }}>
          <h2 style={{
            fontFamily: tokens.fonts.heading,
            fontSize: '48px',
            fontWeight: '700',
            color: tokens.colors.text.primary,
            marginBottom: tokens.spacing.sm,
            letterSpacing: '-0.02em',
          }}>
            What Our Guests Say
          </h2>
          <p style={{
            fontFamily: tokens.fonts.body,
            fontSize: '16px',
            color: tokens.colors.text.secondary,
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Hear from our satisfied customers
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: tokens.spacing.lg,
        }}>
          {testimonials.map(testimonial => (
            <div key={testimonial.id} style={{
              backgroundColor: tokens.colors.background.primary,
              borderRadius: tokens.borderRadius.lg,
              padding: tokens.spacing.lg,
              boxShadow: tokens.shadows.sm,
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
