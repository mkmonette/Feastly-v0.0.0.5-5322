import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernMenuCart } from './ModernMenuCartContext';

const PromoBanner = () => {
  const { tokens } = useModernMenuCart();

  return (
    <section style={{ padding: '1.5rem 1rem' }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${tokens.colors.accent} 0%, ${tokens.colors.accentHover} 100%)`,
          borderRadius: tokens.borderRadius.card,
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h3
            style={{
              fontFamily: tokens.typography.fontFamily.heading,
              fontSize: '1.25rem',
              fontWeight: tokens.typography.fontWeight.heading,
              color: '#ffffff',
              marginBottom: '0.5rem',
            }}
          >
            Special Offer!
          </h3>
          <p
            style={{
              fontSize: tokens.typography.fontSize.bodyText,
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            Get 20% off on orders above ₱500
          </p>
        </div>

        <button
          style={{
            backgroundColor: '#ffffff',
            color: tokens.colors.accent,
            border: 'none',
            borderRadius: tokens.borderRadius.button,
            padding: '0.75rem 1.5rem',
            fontSize: tokens.typography.fontSize.bodyText,
            fontWeight: tokens.typography.fontWeight.bold,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Order Now
          <SafeIcon icon={FiIcons.FiArrowRight} />
        </button>
      </div>
    </section>
  );
};

export default PromoBanner;
