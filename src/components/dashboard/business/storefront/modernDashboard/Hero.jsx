import { useModernDashboard } from './ModernDashboardContext';

export const Hero = () => {
  const { tokens } = useModernDashboard();
  const { colors, typography, components, spacing } = tokens;

  const styles = {
    section: {
      padding: spacing.sectionPadding,
      backgroundColor: colors.secondaryBg,
    },
    heroContainer: {
      minHeight: components.hero.minHeight,
      borderRadius: components.hero.borderRadius,
      background: `linear-gradient(${colors.overlayColor}, ${colors.overlayColor}), url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: components.hero.padding,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      position: 'relative',
      overflow: 'hidden',
    },
    preText: {
      fontSize: typography.bodySize,
      fontWeight: '600',
      color: colors.heroPreTextColor,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '1rem',
      fontFamily: typography.fontFamily,
    },
    title: {
      fontSize: typography.h1Size,
      fontWeight: typography.headingWeight,
      color: '#FFFFFF',
      lineHeight: typography.h1LineHeight,
      marginBottom: '1rem',
      maxWidth: '600px',
      fontFamily: typography.fontFamily,
    },
    subtitle: {
      fontSize: typography.h3Size,
      fontWeight: typography.bodyWeight,
      color: '#FFFFFF',
      opacity: 0.95,
      lineHeight: typography.h3LineHeight,
      marginBottom: '2rem',
      maxWidth: '500px',
      fontFamily: typography.fontFamily,
    },
    ctaButton: {
      backgroundColor: colors.accentColor,
      color: '#FFFFFF',
      padding: components.button.padding,
      borderRadius: components.button.borderRadius,
      fontSize: components.button.fontSize,
      fontWeight: components.button.fontWeight,
      border: 'none',
      cursor: 'pointer',
      transition: components.button.transition,
      fontFamily: typography.fontFamily,
      boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
    },
  };

  const handleCTAClick = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.heroContainer}>
        <div style={styles.preText}>Authentic Filipino Cuisine</div>
        <h1 style={styles.title}>Delicious Food Delivered to Your Door</h1>
        <p style={styles.subtitle}>Experience the authentic taste of Filipino home cooking</p>
        <button
          style={styles.ctaButton}
          onClick={handleCTAClick}
          onMouseEnter={(e) => {
            e.target.style.transform = components.button.hoverTransform;
            e.target.style.boxShadow = '0 6px 16px rgba(255, 107, 53, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'none';
            e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
          }}
        >
          Order Now
        </button>
      </div>
    </section>
  );
};
