import { useModernDashboard } from './ModernDashboardContext';

export const Footer = () => {
  const { tokens } = useModernDashboard();
  const { colors, typography, spacing } = tokens;

  const styles = {
    footer: {
      backgroundColor: colors.primaryTextColor,
      color: '#FFFFFF',
      padding: '3rem 2rem 2rem',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    columnTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      fontFamily: typography.fontFamily,
    },
    link: {
      fontSize: typography.smallSize,
      color: '#FFFFFF',
      opacity: 0.8,
      textDecoration: 'none',
      transition: 'opacity 0.2s ease',
      cursor: 'pointer',
      fontFamily: typography.fontFamily,
    },
    divider: {
      height: '1px',
      backgroundColor: '#FFFFFF',
      opacity: 0.2,
      margin: '2rem 0',
    },
    bottom: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
    },
    copyright: {
      fontSize: typography.smallSize,
      opacity: 0.8,
      fontFamily: typography.fontFamily,
    },
    socials: {
      display: 'flex',
      gap: '1rem',
    },
    socialLink: {
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      backgroundColor: '#FFFFFF',
      color: colors.primaryTextColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      transition: 'transform 0.2s ease',
      cursor: 'pointer',
    },
  };

  return (
    <footer style={styles.footer} id="contact">
      <div style={styles.container}>
        <div style={styles.grid}>
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>FoodiePinoy</h3>
            <p style={{...styles.link, cursor: 'default'}}>
              Authentic Filipino cuisine delivered fresh to your door.
            </p>
          </div>
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>Quick Links</h3>
            <a
              style={styles.link}
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={(e) => e.target.style.opacity = 1}
              onMouseLeave={(e) => e.target.style.opacity = 0.8}
            >
              Menu
            </a>
            <a
              style={styles.link}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={(e) => e.target.style.opacity = 1}
              onMouseLeave={(e) => e.target.style.opacity = 0.8}
            >
              About Us
            </a>
            <a
              style={styles.link}
              onMouseEnter={(e) => e.target.style.opacity = 1}
              onMouseLeave={(e) => e.target.style.opacity = 0.8}
            >
              Contact
            </a>
          </div>
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>Legal</h3>
            <a
              style={styles.link}
              onMouseEnter={(e) => e.target.style.opacity = 1}
              onMouseLeave={(e) => e.target.style.opacity = 0.8}
            >
              Privacy Policy
            </a>
            <a
              style={styles.link}
              onMouseEnter={(e) => e.target.style.opacity = 1}
              onMouseLeave={(e) => e.target.style.opacity = 0.8}
            >
              Terms of Service
            </a>
          </div>
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>Contact</h3>
            <p style={{...styles.link, cursor: 'default'}}>
              Email: hello@foodiepinoy.com
            </p>
            <p style={{...styles.link, cursor: 'default'}}>
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div style={styles.divider}></div>
        <div style={styles.bottom}>
          <div style={styles.copyright}>
            © 2024 FoodiePinoy. All rights reserved.
          </div>
          <div style={styles.socials}>
            <a
              style={styles.socialLink}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
            >
              f
            </a>
            <a
              style={styles.socialLink}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
            >
              𝕏
            </a>
            <a
              style={styles.socialLink}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
            >
              in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
