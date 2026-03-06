import React from 'react';
import { freshCartTokens as tokens } from '../freshCartTokens';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const Contact = () => {
  return (
    <section style={{
      padding: `${tokens.spacing.xxl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.secondary,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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
            Get in Touch
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
                  456 Fresh Avenue<br />
                  Culinary District, CD 54321
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
                  (555) 987-6543
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
                  hello@freshcart.com
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: tokens.colors.background.primary,
          borderRadius: tokens.borderRadius.xl,
          padding: tokens.spacing.lg,
        }}>
          <h3 style={{
            fontFamily: tokens.fonts.heading,
            fontSize: '28px',
            fontWeight: '700',
            color: tokens.colors.text.primary,
            marginBottom: tokens.spacing.md,
          }}>
            Send a Message
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
                color: tokens.colors.text.white,
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
