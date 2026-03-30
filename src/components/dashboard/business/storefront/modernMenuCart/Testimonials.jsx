import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernMenuCart } from './ModernMenuCartContext';

const Testimonials = () => {
  const { tokens } = useModernMenuCart();

  const testimonials = [
    {
      id: 1,
      name: 'Maria Santos',
      rating: 5,
      text: 'Best Filipino food in town! Fresh and delicious.',
    },
    {
      id: 2,
      name: 'Juan Dela Cruz',
      rating: 5,
      text: 'Fast delivery and amazing taste. Highly recommend!',
    },
    {
      id: 3,
      name: 'Ana Reyes',
      rating: 5,
      text: 'Authentic flavors that remind me of home cooking.',
    },
  ];

  return (
    <section style={{ padding: '1.5rem 1rem' }}>
      <h2
        style={{
          fontFamily: tokens.typography.fontFamily.heading,
          fontSize: tokens.typography.fontSize.sectionTitle,
          fontWeight: tokens.typography.fontWeight.heading,
          color: tokens.colors.sectionHeadlineNormal,
          marginBottom: '1rem',
        }}
      >
        Customer <span style={{ color: tokens.colors.sectionHeadlineHighlight }}>Reviews</span>
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
        }}
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            style={{
              backgroundColor: tokens.colors.surface,
              borderRadius: tokens.borderRadius.card,
              padding: '1rem',
              boxShadow: tokens.shadows.card,
            }}
          >
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <SafeIcon key={i} icon={FiIcons.FiStar} style={{ fontSize: '1rem', color: '#FFC107', fill: '#FFC107' }} />
              ))}
            </div>
            <p
              style={{
                fontSize: tokens.typography.fontSize.bodyText,
                color: tokens.colors.primaryText,
                lineHeight: tokens.typography.lineHeight.body,
                marginBottom: '0.75rem',
              }}
            >
              {testimonial.text}
            </p>
            <p
              style={{
                fontSize: tokens.typography.fontSize.smallText,
                color: tokens.colors.secondaryText,
                fontWeight: tokens.typography.fontWeight.subheading,
              }}
            >
              - {testimonial.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
