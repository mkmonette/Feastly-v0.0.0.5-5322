import React from 'react';
import { freshCartTokens as tokens } from '../freshCartTokens';

const Hero = () => {
  return (
    <section style={{
      padding: `${tokens.spacing.xxl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.dark,
      color: tokens.colors.text.white,
    }}>
      <div style={{
        maxWidth: '600px',
      }}>
        <h1 style={{
          fontFamily: tokens.fonts.heading,
          fontSize: '64px',
          fontWeight: '700',
          lineHeight: '1.1',
          marginBottom: tokens.spacing.md,
          letterSpacing: '-0.02em',
        }}>
          Fresh Flavors,<br />Delivered Daily
        </h1>
        <p style={{
          fontFamily: tokens.fonts.body,
          fontSize: '18px',
          lineHeight: '1.6',
          marginBottom: tokens.spacing.lg,
          opacity: 0.9,
        }}>
          Discover our carefully curated menu of artisan dishes, crafted with
          the finest locally-sourced ingredients.
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
          transition: 'all 0.2s',
        }}>
          View Menu
        </button>
      </div>
    </section>
  );
};

export default Hero;
