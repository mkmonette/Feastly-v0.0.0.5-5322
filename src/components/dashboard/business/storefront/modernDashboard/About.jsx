import { useModernDashboard } from './ModernDashboardContext';

export const About = () => {
  const { tokens } = useModernDashboard();
  const { colors, typography, components, spacing } = tokens;

  const styles = {
    section: {
      padding: spacing.sectionPadding,
      backgroundColor: colors.secondaryBg,
    },
    container: {
      backgroundColor: colors.cardBg,
      borderRadius: components.card.borderRadius,
      padding: '3rem',
      boxShadow: components.card.shadow,
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: typography.h2Size,
      fontWeight: typography.headingWeight,
      color: colors.primaryTextColor,
      marginBottom: '1rem',
      fontFamily: typography.fontFamily,
    },
    description: {
      fontSize: typography.bodySize,
      color: colors.secondaryTextColor,
      lineHeight: typography.bodyLineHeight,
      marginBottom: '2rem',
      fontFamily: typography.fontFamily,
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginTop: '2rem',
    },
    feature: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    featureIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      backgroundColor: colors.accentColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontSize: '1.5rem',
      marginBottom: '0.5rem',
    },
    featureTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: colors.primaryTextColor,
      fontFamily: typography.fontFamily,
    },
    featureDescription: {
      fontSize: typography.smallSize,
      color: colors.secondaryTextColor,
      lineHeight: '1.6',
      fontFamily: typography.fontFamily,
    },
  };

  const features = [
    {
      icon: '🍽️',
      title: 'Authentic Filipino Cuisine',
      description: 'Traditional recipes passed down through generations, prepared with love and care.',
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Hot, fresh meals delivered to your doorstep within 30-45 minutes.',
    },
    {
      icon: '🌿',
      title: 'Fresh Ingredients',
      description: 'We source the finest local ingredients to ensure quality in every dish.',
    },
    {
      icon: '💯',
      title: 'Quality Guaranteed',
      description: 'Every meal is prepared to perfection. Not satisfied? We\'ll make it right.',
    },
  ];

  return (
    <section style={styles.section} id="about">
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>About FoodiePinoy</h2>
          <p style={styles.description}>
            We bring the authentic taste of Filipino home cooking directly to your door.
            Founded by food lovers who missed the comforting flavors of traditional Filipino cuisine,
            FoodiePinoy is committed to delivering restaurant-quality meals that remind you of home.
          </p>
          <p style={styles.description}>
            Our chefs use time-honored recipes and the freshest ingredients to create dishes that
            capture the heart and soul of Filipino cooking. From classic adobo to savory sinigang,
            every dish is prepared with the same care and attention you'd find in a Filipino home kitchen.
          </p>
        </div>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.feature}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
