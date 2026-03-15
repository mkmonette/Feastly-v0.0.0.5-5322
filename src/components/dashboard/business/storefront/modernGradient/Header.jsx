import React from 'react';
import { useModernGradient } from './ModernGradientContext';

const Header = () => {
  const { tokens } = useModernGradient();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: tokens.components.header.background,
        borderBottom: tokens.components.header.borderBottom,
        height: tokens.components.header.height,
        boxShadow: tokens.shadows.sm
      }}
    >
      <div
        style={{
          maxWidth: tokens.layout.maxWidth,
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${tokens.spacing.xl}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.lg }}>
          <h1
            style={{
              fontSize: tokens.typography.fontSize.xl,
              fontWeight: tokens.typography.fontWeight.extrabold,
              background: tokens.colors.gradients.primary.css,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: tokens.typography.fontFamily.primary,
              margin: 0
            }}
          >
            Gradient Kitchen
          </h1>
        </div>
        <nav style={{ display: 'flex', gap: tokens.spacing.lg }}>
          {['Menu', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.semibold,
                color: tokens.colors.text.secondary,
                textDecoration: 'none',
                fontFamily: tokens.typography.fontFamily.primary,
                transition: 'color 0.2s'
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
