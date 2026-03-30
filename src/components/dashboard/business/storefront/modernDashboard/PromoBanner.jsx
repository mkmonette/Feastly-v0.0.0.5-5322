import { useModernDashboard } from './ModernDashboardContext';

export const PromoBanner = () => {
  const { tokens } = useModernDashboard();
  const { colors, typography, components, spacing } = tokens;

  const styles = {
    section: {
      padding: spacing.sectionPadding,
      backgroundColor: colors.secondaryBg,
    },
    banner: {
      background: `linear-gradient(135deg, ${colors.accentColor} 0%, #FF8C61 100%)`,
      borderRadius: components.card.borderRadius,
      padding: '3rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      boxShadow: components.card.shadow,
    },
    title: {
      fontSize: typography.h2Size,
      fontWeight: typography.headingWeight,
      color: '#FFFFFF',
      marginBottom: '1rem',
      fontFamily: typography.fontFamily,
    },
    subtitle: {
      fontSize: typography.h3Size,
      color: '#FFFFFF',
      opacity: 0.95,
      marginBottom: '2rem',
      fontFamily: typography.fontFamily,
      maxWidth: '600px',
    },
    ctaButton: {
      backgroundColor: '#FFFFFF',
      color: colors.accentColor,
      padding: components.button.padding,
      borderRadius: components.button.borderRadius,
      fontSize: components.button.fontSize,
      fontWeight: components.button.fontWeight,
      border: 'none',
      cursor: 'pointer',
      transition: components.button.transition,
      fontFamily: typography.fontFamily,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
      <div style={styles.banner}>
        <h2 style={styles.title}>Special Offer</h2>
        <p style={styles.subtitle}>
          Get 20% off on your first order. Fresh, authentic Filipino dishes delivered to your door.
        </p>
        <button
          style={styles.ctaButton}
          onClick={handleCTAClick}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
        >
          Order Now
        </button>
      </div>
    </section>
  );
};
