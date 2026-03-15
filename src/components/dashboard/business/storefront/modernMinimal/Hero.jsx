import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';

const Hero = () => {
  const { tokens } = useModernMinimal();

  return (
    <section
      style={{
        background: tokens.components.hero.background,
        minHeight: tokens.components.hero.minHeight,
        padding: tokens.components.hero.padding,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{ maxWidth: '600px' }}>
        <h2
          style={{
            fontSize: tokens.typography.fontSize['3xl'],
            fontWeight: tokens.typography.fontWeight.bold,
            color: tokens.colors.text.primary,
            fontFamily: tokens.typography.fontFamily.primary,
            marginBottom: tokens.spacing.md,
            lineHeight: tokens.typography.lineHeight.tight
          }}
        >
          Fresh Food, Simply Ordered
        </h2>
        <p
          style={{
            fontSize: tokens.typography.fontSize.base,
            color: tokens.colors.text.secondary,
            fontFamily: tokens.typography.fontFamily.primary,
            marginBottom: tokens.spacing.xl,
            lineHeight: tokens.typography.lineHeight.relaxed
          }}
        >
          Discover our curated selection of artisanal dishes, crafted with the finest ingredients and delivered to your door.
        </p>
        <button
          style={{
            background: tokens.components.button.primary.background,
            color: tokens.components.button.primary.color,
            padding: tokens.components.button.primary.padding,
            borderRadius: tokens.components.button.primary.borderRadius,
            fontSize: tokens.components.button.primary.fontSize,
            fontWeight: tokens.components.button.primary.fontWeight,
            fontFamily: tokens.typography.fontFamily.primary,
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s, opacity 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '0.9';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Browse Menu
        </button>
      </div>
    </section>
  );
};

export default Hero;
