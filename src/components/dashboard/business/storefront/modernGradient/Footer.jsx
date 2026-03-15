import React from 'react';
import { useModernGradient } from './ModernGradientContext';

const Footer = () => {
  const { tokens } = useModernGradient();

  return (
    <footer
      style={{
        background: tokens.colors.surface,
        borderTop: `1px solid ${tokens.colors.border}`,
        padding: `${tokens.spacing.xl} ${tokens.spacing.xl}`,
        marginTop: tokens.spacing['3xl']
      }}
    >
      <div style={{ maxWidth: tokens.layout.maxWidth, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: tokens.spacing.xl,
            marginBottom: tokens.spacing.xl
          }}
        >
          <div>
            <h4
              style={{
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.bold,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary,
                marginBottom: tokens.spacing.md
              }}
            >
              About Gradient Kitchen
            </h4>
            <p
              style={{
                fontSize: tokens.typography.fontSize.sm,
                color: tokens.colors.text.secondary,
                fontFamily: tokens.typography.fontFamily.primary,
                lineHeight: tokens.typography.lineHeight.relaxed,
                margin: 0
              }}
            >
              Bringing color and creativity to every plate. Experience the art of modern cuisine.
            </p>
          </div>
          <div>
            <h4
              style={{
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.bold,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary,
                marginBottom: tokens.spacing.md
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Order Online', 'Menu', 'About Us', 'Contact'].map((link) => (
                <li key={link} style={{ marginBottom: tokens.spacing.sm }}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    style={{
                      fontSize: tokens.typography.fontSize.sm,
                      color: tokens.colors.text.secondary,
                      textDecoration: 'none',
                      fontFamily: tokens.typography.fontFamily.primary,
                      transition: 'color 0.2s'
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4
              style={{
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.bold,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary,
                marginBottom: tokens.spacing.md
              }}
            >
              Get in Touch
            </h4>
            <p
              style={{
                fontSize: tokens.typography.fontSize.sm,
                color: tokens.colors.text.secondary,
                fontFamily: tokens.typography.fontFamily.primary,
                lineHeight: tokens.typography.lineHeight.relaxed,
                margin: 0
              }}
            >
              456 Colorful Avenue<br />
              San Francisco, CA 94102<br />
              (555) 987-6543
            </p>
          </div>
        </div>
        <div
          style={{
            paddingTop: tokens.spacing.md,
            borderTop: `1px solid ${tokens.colors.border}`,
            textAlign: 'center'
          }}
        >
          <p
            style={{
              fontSize: tokens.typography.fontSize.xs,
              color: tokens.colors.text.tertiary,
              fontFamily: tokens.typography.fontFamily.primary,
              margin: 0
            }}
          >
            2024 Gradient Kitchen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
