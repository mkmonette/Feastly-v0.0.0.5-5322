import React from 'react';
import { freshCartTokens as tokens } from '../freshCartTokens';

const Gallery = () => {
  return (
    <section style={{
      padding: `${tokens.spacing.xxl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.secondary,
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
          Gallery
        </h2>
        <p style={{
          fontFamily: tokens.fonts.body,
          fontSize: '16px',
          color: tokens.colors.text.secondary,
          marginBottom: tokens.spacing.xl,
        }}>
          A glimpse into our kitchen
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: tokens.spacing.md,
        }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={{
              height: '260px',
              backgroundColor: tokens.colors.background.tertiary,
              borderRadius: tokens.borderRadius.lg,
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
