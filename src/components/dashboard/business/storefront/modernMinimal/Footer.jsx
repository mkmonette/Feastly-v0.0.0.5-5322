import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';

const Footer = () => {
  const { tokens } = useModernMinimal();

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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: tokens.spacing.xl, marginBottom: tokens.spacing.xl }}>
          <div>
            <h4
              style={{
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.semibold,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary,
                marginBottom: tokens.spacing.md
              }}
            >
              About Us
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
              Crafting exceptional dining experiences with fresh, locally-sourced ingredients.
            </p>
          </div>
          <div>
            <h4
              style={{
                fontSize: tokens.typography.fontSize.sm,
                fontWeight: tokens.typography.fontWeight.semibold,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary,
                marginBottom: tokens.spacing.md
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Menu', 'Reservations', 'Catering', 'Gift Cards'].map((link) => (
                <li key={link} style={{ marginBottom: tokens.spacing.sm }}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    style={{
                      fontSize: tokens.typography.fontSize.sm,
                      color: tokens.colors.text.secondary,
                      textDecoration: 'none',
                      fontFamily: tokens.typography.fontFamily.primary
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
                fontWeight: tokens.typography.fontWeight.semibold,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary,
                marginBottom: tokens.spacing.md
              }}
            >
              Contact
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
              123 Culinary Street<br />
              New York, NY 10001<br />
              (555) 123-4567
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
            2024 Minimal Eats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
