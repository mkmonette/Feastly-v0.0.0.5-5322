import React from 'react';
import { minimalRecipeTokens as tokens } from '../minimalRecipeTokens';

const FeaturedProducts = () => {
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
            Chef's Specials
          </h2>
          <p style={{
            fontFamily: tokens.fonts.body,
            fontSize: '16px',
            color: tokens.colors.text.secondary,
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Handpicked favorites from our master chef
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: tokens.spacing.lg,
        }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              backgroundColor: tokens.colors.background.primary,
              borderRadius: tokens.borderRadius.lg,
              overflow: 'hidden',
              boxShadow: tokens.shadows.sm,
            }}>
              <div style={{
                height: '240px',
                backgroundColor: tokens.colors.background.tertiary,
              }} />
              <div style={{
                padding: tokens.spacing.md,
              }}>
                <h3 style={{
                  fontFamily: tokens.fonts.heading,
                  fontSize: '24px',
                  fontWeight: '700',
                  color: tokens.colors.text.primary,
                  marginBottom: tokens.spacing.xs,
                }}>
                  Featured Dish {i}
                </h3>
                <p style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '14px',
                  color: tokens.colors.text.secondary,
                  lineHeight: '1.5',
                }}>
                  A delightful combination of fresh ingredients and expert preparation.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
