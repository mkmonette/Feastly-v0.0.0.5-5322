import React from 'react';
import { useModernGradient } from './ModernGradientContext';

const Hero = () => {
  const { tokens } = useModernGradient();

  return (
    <section
      style={{
        background: tokens.components.hero.background,
        minHeight: tokens.components.hero.minHeight,
        padding: tokens.components.hero.padding,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}
      />
      <div style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
        <h2
          style={{
            fontSize: tokens.typography.fontSize['3xl'],
            fontWeight: tokens.typography.fontWeight.extrabold,
            color: '#FFFFFF',
            fontFamily: tokens.typography.fontFamily.primary,
            marginBottom: tokens.spacing.md,
            lineHeight: tokens.typography.lineHeight.tight
          }}
        >
          Vibrant Flavors, Bold Experiences
        </h2>
        <p
          style={{
            fontSize: tokens.typography.fontSize.base,
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: tokens.typography.fontFamily.primary,
            marginBottom: tokens.spacing.xl,
            lineHeight: tokens.typography.lineHeight.relaxed
          }}
        >
          Experience culinary artistry with our handcrafted dishes, each bursting with color and flavor.
        </p>
        <button
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            color: '#FFFFFF',
            padding: tokens.components.button.primary.padding,
            borderRadius: tokens.components.button.primary.borderRadius,
            fontSize: tokens.components.button.primary.fontSize,
            fontWeight: tokens.components.button.primary.fontWeight,
            fontFamily: tokens.typography.fontFamily.primary,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.35)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.25)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Explore Menu
        </button>
      </div>
    </section>
  );
};

export default Hero;
