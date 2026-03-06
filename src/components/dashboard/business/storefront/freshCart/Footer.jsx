import React from 'react';
import { freshCartTokens as tokens } from '../freshCartTokens';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const Footer = () => {
  return (
    <footer style={{
      padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.dark,
      color: tokens.colors.text.white,
    }}>
      <div>
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
              marginBottom: tokens.spacing.md,
              letterSpacing: '-0.02em',
            }}>
              FreshCart
            </div>
            <p style={{
              fontFamily: tokens.fonts.body,
              fontSize: '14px',
              lineHeight: '1.6',
              opacity: 0.8,
            }}>
              Delivering fresh, artisan meals to your doorstep since 2014.
            </p>
          </div>

          <div>
            <h4 style={{
              fontFamily: tokens.fonts.body,
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: tokens.spacing.md,
            }}>
              Quick Links
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing.sm,
            }}>
              {['Menu', 'About', 'Contact', 'Order Online'].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  style={{
                    fontFamily: tokens.fonts.body,
                    fontSize: '14px',
                    color: tokens.colors.text.white,
                    opacity: 0.8,
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
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SafeIcon icon={Icon} style={{ fontSize: '18px', color: tokens.colors.text.white }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: tokens.spacing.md,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: tokens.fonts.body,
            fontSize: '14px',
            opacity: 0.8,
          }}>
            © 2024 FreshCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
