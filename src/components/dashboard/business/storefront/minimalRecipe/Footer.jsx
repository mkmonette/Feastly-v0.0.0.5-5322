import React from 'react';
import { minimalRecipeTokens as tokens } from '../minimalRecipeTokens';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const Footer = () => {
  return (
    <footer style={{
      padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.primary,
      borderTop: `1px solid ${tokens.colors.border}`,
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: tokens.spacing.xl,
          marginBottom: tokens.spacing.xl,
        }}>
          <div>
            <div style={{
              fontFamily: tokens.fonts.heading,
              fontSize: '28px',
              fontWeight: '700',
              color: tokens.colors.text.primary,
              marginBottom: tokens.spacing.md,
              letterSpacing: '-0.02em',
            }}>
              Delicio
            </div>
            <p style={{
              fontFamily: tokens.fonts.body,
              fontSize: '14px',
              color: tokens.colors.text.secondary,
              lineHeight: '1.6',
            }}>
              Crafting unforgettable culinary experiences since 2010.
            </p>
          </div>

          <div>
            <h4 style={{
              fontFamily: tokens.fonts.body,
              fontSize: '16px',
              fontWeight: '600',
              color: tokens.colors.text.primary,
              marginBottom: tokens.spacing.md,
            }}>
              Quick Links
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing.sm,
            }}>
              {['Menu', 'About', 'Contact', 'Reservations'].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  style={{
                    fontFamily: tokens.fonts.body,
                    fontSize: '14px',
                    color: tokens.colors.text.secondary,
                    textDecoration: 'none',
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontFamily: tokens.fonts.body,
              fontSize: '16px',
              fontWeight: '600',
              color: tokens.colors.text.primary,
              marginBottom: tokens.spacing.md,
            }}>
              Follow Us
            </h4>
            <div style={{
              display: 'flex',
              gap: tokens.spacing.sm,
            }}>
              {[FiIcons.FiInstagram, FiIcons.FiFacebook, FiIcons.FiTwitter].map((Icon, i) => (
                <button
                  key={i}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: tokens.colors.background.secondary,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SafeIcon icon={Icon} style={{ fontSize: '18px', color: tokens.colors.text.primary }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: tokens.spacing.md,
          borderTop: `1px solid ${tokens.colors.border}`,
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: tokens.fonts.body,
            fontSize: '14px',
            color: tokens.colors.text.secondary,
          }}>
            © 2024 Delicio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
