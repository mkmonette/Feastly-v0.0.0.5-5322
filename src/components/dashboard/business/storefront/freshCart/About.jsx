import React from 'react';
import { freshCartTokens as tokens } from '../freshCartTokens';

const About = () => {
  return (
    <section style={{
      padding: `${tokens.spacing.xxl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.primary,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: tokens.spacing.xl,
        alignItems: 'center',
      }}>
        <div>
          <h2 style={{
            fontFamily: tokens.fonts.heading,
            fontSize: '48px',
            fontWeight: '700',
            color: tokens.colors.text.primary,
            marginBottom: tokens.spacing.md,
            letterSpacing: '-0.02em',
          }}>
            Our Story
          </h2>
          <p style={{
            fontFamily: tokens.fonts.body,
            fontSize: '16px',
            color: tokens.colors.text.secondary,
            lineHeight: '1.7',
            marginBottom: tokens.spacing.md,
          }}>
            For over a decade, we've been dedicated to bringing you the freshest,
            most flavorful dishes made from locally-sourced ingredients.
          </p>
          <p style={{
            fontFamily: tokens.fonts.body,
            fontSize: '16px',
            color: tokens.colors.text.secondary,
            lineHeight: '1.7',
          }}>
            Every recipe is crafted with care, combining traditional techniques
            with innovative flavors to create unforgettable dining experiences.
          </p>
        </div>
        <div style={{
          height: '400px',
          backgroundColor: tokens.colors.background.secondary,
          borderRadius: tokens.borderRadius.xl,
        }} />
      </div>
    </section>
  );
};

export default About;
