import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useModernDashboard } from './ModernDashboardContext';

export const Footer = ({ businessName, contactInfo }) => {
  const { tokens } = useModernDashboard();

  return (
    <footer
      style={{
        background: tokens.colors.primaryTextColor,
        color: '#FFFFFF',
        padding: '4rem 2rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.containerMaxWidth,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                fontFamily: tokens.typography.fontFamily,
                margin: '0 0 1rem 0',
              }}
            >
              {businessName || 'FoodiePinoy'}
            </h3>
            <p
              style={{
                fontSize: '0.875rem',
                lineHeight: '1.6',
                fontFamily: tokens.typography.fontFamily,
                opacity: 0.8,
                margin: '0 0 1.5rem 0',
              }}
            >
              Authentic Filipino cuisine delivered to your doorstep. Fresh ingredients, traditional recipes, modern service.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[FiFacebook, FiInstagram, FiTwitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: tokens.borderRadius.medium,
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    transition: tokens.transitions.fast,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = tokens.colors.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                fontFamily: tokens.typography.fontFamily,
                margin: '0 0 1rem 0',
              }}
            >
              Quick Links
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {['Menu', 'About Us', 'Order Now', 'Contact'].map((item) => (
                <li key={item} style={{ marginBottom: '0.75rem' }}>
                  <a
                    href="#"
                    style={{
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontFamily: tokens.typography.fontFamily,
                      opacity: 0.8,
                      transition: tokens.transitions.fast,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.color = tokens.colors.accentColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                fontFamily: tokens.typography.fontFamily,
                margin: '0 0 1rem 0',
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { Icon: FiPhone, text: contactInfo?.phone || '+63 912 345 6789' },
                { Icon: FiMail, text: contactInfo?.email || 'hello@foodiepinoy.com' },
                { Icon: FiMapPin, text: contactInfo?.address || 'Manila, Philippines' },
              ].map(({ Icon, text }, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <Icon size={16} style={{ opacity: 0.8 }} />
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontFamily: tokens.typography.fontFamily,
                      opacity: 0.8,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '0.875rem',
              fontFamily: tokens.typography.fontFamily,
              opacity: 0.6,
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} {businessName || 'FoodiePinoy'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
