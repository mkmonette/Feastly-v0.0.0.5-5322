import { useModernDashboard } from './ModernDashboardContext';

export const Header = () => {
  const { tokens } = useModernDashboard();
  const { colors, typography, components } = tokens;

  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: colors.cardBg,
      borderBottom: `1px solid ${colors.borderColor}`,
      boxShadow: components.header.shadow,
      height: components.header.height,
      display: 'flex',
      alignItems: 'center',
      padding: components.header.padding,
    },
    container: {
      maxWidth: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      backgroundColor: colors.accentColor,
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontWeight: typography.headingWeight,
      fontSize: '1.25rem',
    },
    logoText: {
      fontSize: components.header.logoSize,
      fontWeight: typography.headingWeight,
      color: colors.primaryTextColor,
      fontFamily: typography.fontFamily,
    },
    nav: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
    },
    navLink: {
      fontSize: typography.bodySize,
      fontWeight: '500',
      color: colors.secondaryTextColor,
      textDecoration: 'none',
      transition: 'color 0.2s ease',
      cursor: 'pointer',
    },
  };

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>F</div>
          <span style={styles.logoText}>FoodiePinoy</span>
        </div>
        <nav style={styles.nav}>
          <a
            style={styles.navLink}
            onClick={() => handleNavClick('menu')}
            onMouseEnter={(e) => e.target.style.color = colors.accentColor}
            onMouseLeave={(e) => e.target.style.color = colors.secondaryTextColor}
          >
            Menu
          </a>
          <a
            style={styles.navLink}
            onClick={() => handleNavClick('about')}
            onMouseEnter={(e) => e.target.style.color = colors.accentColor}
            onMouseLeave={(e) => e.target.style.color = colors.secondaryTextColor}
          >
            About
          </a>
          <a
            style={styles.navLink}
            onClick={() => handleNavClick('contact')}
            onMouseEnter={(e) => e.target.style.color = colors.accentColor}
            onMouseLeave={(e) => e.target.style.color = colors.secondaryTextColor}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};
