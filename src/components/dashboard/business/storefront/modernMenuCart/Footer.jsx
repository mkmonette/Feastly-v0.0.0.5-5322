import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernMenuCart } from './ModernMenuCartContext';

const Footer = ({ config }) => {
  const { tokens } = useModernMenuCart();

  return (
    <footer
      style={{
        backgroundColor: tokens.colors.surface,
        borderTop: `1px solid ${tokens.colors.border}`,
        padding: '1.5rem 1rem',
        marginTop: '2rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3
            style={{
              fontFamily: tokens.typography.fontFamily.heading,
              fontSize: '1.125rem',
              fontWeight: tokens.typography.fontWeight.heading,
              color: tokens.colors.primaryText,
              marginBottom: '0.5rem',
            }}
          >
            {config?.businessName || 'FoodiePinoy'}
          </h3>
          <p
            style={{
              fontSize: tokens.typography.fontSize.smallText,
              color: tokens.colors.secondaryText,
            }}
          >
            © 2024 All rights reserved
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <SafeIcon icon={FiIcons.FiFacebook} style={{ fontSize: '1.25rem', color: tokens.colors.secondaryText }} />
          </button>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <SafeIcon icon={FiIcons.FiInstagram} style={{ fontSize: '1.25rem', color: tokens.colors.secondaryText }} />
          </button>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <SafeIcon icon={FiIcons.FiTwitter} style={{ fontSize: '1.25rem', color: tokens.colors.secondaryText }} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
