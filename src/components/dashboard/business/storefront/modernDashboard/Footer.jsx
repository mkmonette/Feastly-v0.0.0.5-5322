import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernDashboard } from './ModernDashboardContext';

const Footer = () => {
  const { settings } = useModernDashboard();
  const { tokens } = settings;

  if (!settings.sections.footer.visible) return null;

  return (
    <footer
      style={{
        backgroundColor: tokens.footerBackground,
        color: tokens.footerText,
        marginTop: tokens.spacing.xxxl
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: `${tokens.spacing.xxxl} ${tokens.spacing.xl}`
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: tokens.spacing.xxxl,
            marginBottom: tokens.spacing.xxxl
          }}
        >
          <div>
            <h3
              style={{
                fontSize: tokens.fontSize.xl,
                fontWeight: tokens.fontWeight.bold,
                color: '#FFFFFF',
                marginBottom: tokens.spacing.lg
              }}
            >
              {settings.businessName}
            </h3>
            <p
              style={{
                fontSize: tokens.fontSize.sm,
                lineHeight: 1.6,
                marginBottom: tokens.spacing.lg
              }}
            >
              Bringing authentic Filipino flavors to your doorstep with love and care.
            </p>
            <div style={{ display: 'flex', gap: tokens.spacing.md }}>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = tokens.accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <SafeIcon icon={FiIcons.FiFacebook} size={20} />
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = tokens.accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <SafeIcon icon={FiIcons.FiInstagram} size={20} />
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = tokens.accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <SafeIcon icon={FiIcons.FiTwitter} size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: tokens.fontSize.base,
                fontWeight: tokens.fontWeight.semibold,
                color: '#FFFFFF',
                marginBottom: tokens.spacing.lg
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Menu', 'About Us', 'Contact', 'FAQ'].map((link) => (
                <li key={link} style={{ marginBottom: tokens.spacing.md }}>
                  <a
                    href="#"
                    style={{
                      color: tokens.footerText,
                      textDecoration: 'none',
                      fontSize: tokens.fontSize.sm,
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = tokens.accentColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = tokens.footerText;
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
                fontSize: tokens.fontSize.base,
                fontWeight: tokens.fontWeight.semibold,
                color: '#FFFFFF',
                marginBottom: tokens.spacing.lg
              }}
            >
              Contact Us
            </h4>
            <div style={{ fontSize: tokens.fontSize.sm }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: tokens.spacing.md,
                  marginBottom: tokens.spacing.md
                }}
              >
                <SafeIcon icon={FiIcons.FiPhone} size={18} />
                <span>+63 912 345 6789</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: tokens.spacing.md,
                  marginBottom: tokens.spacing.md
                }}
              >
                <SafeIcon icon={FiIcons.FiMail} size={18} />
                <span>hello@foodiepinoy.ph</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: tokens.spacing.md
                }}
              >
                <SafeIcon icon={FiIcons.FiMapPin} size={18} style={{ marginTop: '2px' }} />
                <span>123 Roxas Boulevard, Manila, Philippines</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
            paddingTop: tokens.spacing.xl,
            textAlign: 'center',
            fontSize: tokens.fontSize.sm
          }}
        >
          <p>&copy; 2024 {settings.businessName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
