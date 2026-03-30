import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernMenuCart } from './ModernMenuCartContext';

const Hero = ({ config }) => {
  const { tokens } = useModernMenuCart();

  const stats = [
    { icon: FiIcons.FiClock, label: '30 min delivery' },
    { icon: FiIcons.FiStar, label: '4.8 Rating' },
    { icon: FiIcons.FiTruck, label: 'Free Delivery' },
  ];

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${tokens.colors.background} 0%, #fff5f0 100%)`,
        borderRadius: tokens.borderRadius.card,
        padding: '1.5rem 1.5rem',
        margin: '1rem 1rem 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <p
            style={{
              fontSize: tokens.typography.fontSize.smallText,
              color: tokens.colors.heroPreText,
              fontWeight: tokens.typography.fontWeight.body,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem',
            }}
          >
            {config?.hero?.pretext || 'Welcome to'}
          </p>
          <h2
            style={{
              fontFamily: tokens.typography.fontFamily.heading,
              fontSize: tokens.typography.fontSize.heroTitle,
              fontWeight: tokens.typography.fontWeight.heading,
              color: tokens.colors.primaryText,
              lineHeight: tokens.typography.lineHeight.heading,
              marginBottom: '0.5rem',
            }}
          >
            {config?.hero?.title || 'Delicious Filipino Cuisine'}
          </h2>
          <p
            style={{
              fontSize: tokens.typography.fontSize.heroSubtitle,
              color: tokens.colors.secondaryText,
              fontWeight: tokens.typography.fontWeight.body,
            }}
          >
            {config?.hero?.subtitle || 'Fresh & Authentic'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SafeIcon
                icon={stat.icon}
                style={{ fontSize: '1.125rem', color: tokens.colors.accent }}
              />
              <span
                style={{
                  fontSize: tokens.typography.fontSize.smallText,
                  fontWeight: tokens.typography.fontWeight.subheading,
                  color: tokens.colors.primaryText,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
