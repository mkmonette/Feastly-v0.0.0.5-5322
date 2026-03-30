import { FiStar } from 'react-icons/fi';
import { useModernDashboard } from './ModernDashboardContext';

export const Testimonials = () => {
  const { tokens } = useModernDashboard();

  const testimonials = [
    {
      id: 1,
      name: 'Maria Santos',
      rating: 5,
      comment: 'Authentic Filipino flavors! The adobo reminds me of home. Best Filipino restaurant in town.',
      avatar: '👩',
    },
    {
      id: 2,
      name: 'Juan Dela Cruz',
      rating: 5,
      comment: 'Fresh ingredients, generous portions, and reasonable prices. My family loves the sinigang!',
      avatar: '👨',
    },
    {
      id: 3,
      name: 'Isabella Reyes',
      rating: 5,
      comment: 'Quick delivery and food arrived hot! The pancit canton is amazing. Highly recommended!',
      avatar: '👩‍🦱',
    },
  ];

  return (
    <section
      style={{
        padding: tokens.spacing.sectionPadding,
        background: tokens.colors.primaryBg,
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.containerMaxWidth,
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: tokens.typography.sectionTitle.fontSize,
              fontWeight: tokens.typography.sectionTitle.fontWeight,
              lineHeight: tokens.typography.sectionTitle.lineHeight,
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.primaryTextColor,
              margin: '0 0 0.5rem 0',
            }}
          >
            What Our Customers Say
          </h2>
          <p
            style={{
              fontSize: tokens.typography.body.fontSize,
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.sectionTextColor,
              margin: 0,
            }}
          >
            Real reviews from real customers
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: tokens.spacing.cardGap,
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                background: tokens.colors.cardBg,
                borderRadius: tokens.borderRadius.medium,
                padding: '2rem',
                boxShadow: tokens.shadows.card,
                transition: tokens.transitions.default,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = tokens.shadows.cardHover;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = tokens.shadows.card;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    fontSize: '3rem',
                    lineHeight: 1,
                  }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      fontFamily: tokens.typography.fontFamily,
                      color: tokens.colors.primaryTextColor,
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    {testimonial.name}
                  </h4>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={16}
                        fill={tokens.colors.accentColor}
                        color={tokens.colors.accentColor}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontSize: tokens.typography.body.fontSize,
                  lineHeight: tokens.typography.body.lineHeight,
                  fontFamily: tokens.typography.fontFamily,
                  color: tokens.colors.sectionTextColor,
                  margin: 0,
                }}
              >
                "{testimonial.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
