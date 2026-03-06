import React from 'react';
import { minimalRecipeTokens as tokens } from '../minimalRecipeTokens';

const Hero = () => {
  return (
    <section style={{
      padding: `${tokens.spacing.xxl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.secondary,
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontFamily: tokens.fonts.heading,
          fontSize: '72px',
          fontWeight: '700',
          color: tokens.colors.text.primary,
          lineHeight: '1.1',
          marginBottom: tokens.spacing.md,
          letterSpacing: '-0.02em',
        }}>
          Crafted with Love,<br />Served with Care
        </h1>
        <p style={{
          fontFamily: tokens.fonts.body,
          fontSize: '18px',
          color: tokens.colors.text.secondary,
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6',
          marginBottom: tokens.spacing.lg,
        }}>
          Experience the finest culinary delights made from locally sourced ingredients,
          prepared fresh daily by our master chefs.
        </p>
        <button style={{
          fontFamily: tokens.fonts.body,
          fontSize: '16px',
          fontWeight: '600',
          color: tokens.colors.text.primary,
          backgroundColor: tokens.colors.accent,
          padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
          borderRadius: tokens.borderRadius.full,
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}>
          Explore Menu
        </button>
      </div>
    </section>
  );
};

export default Hero;
