import React from 'react';
import { minimalRecipeTokens as tokens } from '../minimalRecipeTokens';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const Contact = () => {
  return (
    <section id="contact" style={{
      padding: `${tokens.spacing.xxl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.tertiary,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: tokens.spacing.xl,
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
            Visit Us
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacing.md,
          }}>
            <div style={{ display: 'flex', gap: tokens.spacing.sm, alignItems: 'flex-start' }}>
              <SafeIcon icon={FiIcons.FiMapPin} style={{ fontSize: '20px', color: tokens.colors.accent, marginTop: '2px' }} />
              <div>
                <div style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: tokens.colors.text.primary,
                  marginBottom: '4px',
                }}>
                  Address
                </div>
                <div style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '15px',
                  color: tokens.colors.text.secondary,
                  lineHeight: '1.5',
                }}>
                  123 Culinary Street<br />
                  Food District, FC 12345
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: tokens.spacing.sm, alignItems: 'flex-start' }}>
              <SafeIcon icon={FiIcons.FiPhone} style={{ fontSize: '20px', color: tokens.colors.accent, marginTop: '2px' }} />
              <div>
                <div style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: tokens.colors.text.primary,
                  marginBottom: '4px',
                }}>
                  Phone
                </div>
                <div style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '15px',
                  color: tokens.colors.text.secondary,
                }}>
                  (555) 123-4567
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: tokens.spacing.sm, alignItems: 'flex-start' }}>
              <SafeIcon icon={FiIcons.FiMail} style={{ fontSize: '20px', color: tokens.colors.accent, marginTop: '2px' }} />
              <div>
                <div style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: tokens.colors.text.primary,
                  marginBottom: '4px',
                }}>
                  Email
                </div>
                <div style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '15px',
                  color: tokens.colors.text.secondary,
                }}>
                  hello@delicio.com
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: tokens.spacing.sm, alignItems: 'flex-start' }}>
              <SafeIcon icon={FiIcons.FiClock} style={{ fontSize: '20px', color: tokens.colors.accent, marginTop: '2px' }} />
              <div>
                <div style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: tokens.colors.text.primary,
                  marginBottom: '4px',
                }}>
                  Hours
                </div>
                <div style={{
                  fontFamily: tokens.fonts.body,
                  fontSize: '15px',
                  color: tokens.colors.text.secondary,
                  lineHeight: '1.5',
                }}>
                  Monday - Friday: 11am - 10pm<br />
                  Saturday - Sunday: 10am - 11pm
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: tokens.colors.background.primary,
          borderRadius: tokens.borderRadius.lg,
          padding: tokens.spacing.lg,
          boxShadow: tokens.shadows.sm,
        }}>
          <h3 style={{
            fontFamily: tokens.fonts.heading,
            fontSize: '28px',
            fontWeight: '700',
            color: tokens.colors.text.primary,
            marginBottom: tokens.spacing.md,
          }}>
            Send us a message
          </h3>
          <form style={{
            display: 'flex',
            flexDirection: 'column',
            gap: tokens.spacing.md,
          }}>
            <input
              type="text"
              placeholder="Name"
              style={{
                fontFamily: tokens.fonts.body,
                fontSize: '15px',
                padding: tokens.spacing.sm,
                border: `1px solid ${tokens.colors.border}`,
                borderRadius: tokens.borderRadius.sm,
                outline: 'none',
              }}
            />
            <input
              type="email"
              placeholder="Email"
              style={{
                fontFamily: tokens.fonts.body,
                fontSize: '15px',
                padding: tokens.spacing.sm,
                border: `1px solid ${tokens.colors.border}`,
                borderRadius: tokens.borderRadius.sm,
                outline: 'none',
              }}
            />
            <textarea
              placeholder="Message"
              rows={4}
              style={{
                fontFamily: tokens.fonts.body,
                fontSize: '15px',
                padding: tokens.spacing.sm,
                border: `1px solid ${tokens.colors.border}`,
                borderRadius: tokens.borderRadius.sm,
                outline: 'none',
                resize: 'vertical',
              }}
            />
            <button
              type="submit"
              style={{
                fontFamily: tokens.fonts.body,
                fontSize: '16px',
                fontWeight: '600',
                color: tokens.colors.text.primary,
                backgroundColor: tokens.colors.accent,
                padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                border: 'none',
                borderRadius: tokens.borderRadius.full,
                cursor: 'pointer',
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
