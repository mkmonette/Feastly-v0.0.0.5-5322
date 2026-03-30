import { useModernDashboard } from './ModernDashboardContext';

export const Testimonials = () => {
  const { tokens } = useModernDashboard();
  const { colors, typography, components, spacing } = tokens;

  const testimonials = [
    {
      id: 1,
      name: 'Maria Santos',
      role: 'Regular Customer',
      content: 'The best Filipino food delivery service! The adobo tastes just like my grandmother used to make. Highly recommended!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Juan dela Cruz',
      role: 'Food Enthusiast',
      content: 'Fresh ingredients, authentic flavors, and quick delivery. FoodiePinoy never disappoints. My go-to for Filipino comfort food.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Anna Reyes',
      role: 'Busy Professional',
      content: 'Perfect for when I miss home-cooked Filipino meals but don\'t have time to cook. The quality is consistently excellent.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Carlos Mendoza',
      role: 'Food Blogger',
      content: 'As a food blogger, I\'ve tried many Filipino restaurants. FoodiePinoy stands out for its authenticity and convenience.',
      rating: 5,
    },
  ];

  const styles = {
    section: {
      padding: spacing.sectionPadding,
      backgroundColor: colors.cardBg,
    },
    header: {
      marginBottom: '2rem',
      textAlign: 'center',
    },
    title: {
      fontSize: typography.h2Size,
      fontWeight: typography.headingWeight,
      color: colors.primaryTextColor,
      marginBottom: '0.5rem',
      fontFamily: typography.fontFamily,
    },
    subtitle: {
      fontSize: typography.bodySize,
      color: colors.sectionTextColor,
      fontFamily: typography.fontFamily,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      backgroundColor: colors.cardBg,
      borderRadius: components.card.borderRadius,
      padding: '2rem',
      boxShadow: components.card.shadow,
      transition: components.card.transition,
      border: `1px solid ${colors.borderColor}`,
    },
    rating: {
      display: 'flex',
      gap: '0.25rem',
      marginBottom: '1rem',
      color: colors.accentColor,
    },
    content: {
      fontSize: typography.bodySize,
      color: colors.primaryTextColor,
      lineHeight: typography.bodyLineHeight,
      marginBottom: '1.5rem',
      fontFamily: typography.fontFamily,
    },
    footer: {
      borderTop: `1px solid ${colors.borderColor}`,
      paddingTop: '1rem',
    },
    name: {
      fontSize: '1rem',
      fontWeight: '600',
      color: colors.primaryTextColor,
      marginBottom: '0.25rem',
      fontFamily: typography.fontFamily,
    },
    role: {
      fontSize: typography.smallSize,
      color: colors.secondaryTextColor,
      fontFamily: typography.fontFamily,
    },
  };

  return (
    <section style={styles.section} id="testimonials">
      <div style={styles.header}>
        <h2 style={styles.title}>What Our Customers Say</h2>
        <p style={styles.subtitle}>Trusted by thousands of happy customers</p>
      </div>
      <div style={styles.grid}>
        {testimonials.map(testimonial => (
          <div
            key={testimonial.id}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = components.card.hoverShadow;
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = components.card.shadow;
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={styles.rating}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p style={styles.content}>{testimonial.content}</p>
            <div style={styles.footer}>
              <div style={styles.name}>{testimonial.name}</div>
              <div style={styles.role}>{testimonial.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
