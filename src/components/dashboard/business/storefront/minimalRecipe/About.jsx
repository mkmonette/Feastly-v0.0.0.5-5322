import React from 'react';
import { minimalRecipeTokens as tokens } from '../minimalRecipeTokens';

const About = () => {
  return (
    <section id="about" style={{
      padding: `${tokens.spacing.xxl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.tertiary,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
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
            Founded in 2010, Delicio has been serving the community with passion and dedication.
            Our commitment to quality ingredients and authentic recipes has made us a beloved
            destination for food lovers.
          </p>
          <p style={{
            fontFamily: tokens.fonts.body,
            fontSize: '16px',
            color: tokens.colors.text.secondary,
            lineHeight: '1.7',
          }}>
            Every dish is prepared with care, combining traditional techniques with modern creativity
            to deliver an unforgettable dining experience.
          </p>
        </div>
        <div style={{
          height: '400px',
          backgroundColor: tokens.colors.background.secondary,
          borderRadius: tokens.borderRadius.lg,
        }} />
      </div>
    </section>
  );
};

export default About;
