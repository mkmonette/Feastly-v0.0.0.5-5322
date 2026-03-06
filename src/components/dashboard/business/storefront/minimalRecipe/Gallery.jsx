import React from 'react';
import { minimalRecipeTokens as tokens } from '../minimalRecipeTokens';

const Gallery = () => {
  return (
    <section style={{
      padding: `${tokens.spacing.xxl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.primary,
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
            Gallery
          </h2>
          <p style={{
            fontFamily: tokens.fonts.body,
            fontSize: '16px',
            color: tokens.colors.text.secondary,
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            A glimpse into our culinary world
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: tokens.spacing.md,
        }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{
              height: '280px',
              backgroundColor: tokens.colors.background.secondary,
              borderRadius: tokens.borderRadius.md,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
