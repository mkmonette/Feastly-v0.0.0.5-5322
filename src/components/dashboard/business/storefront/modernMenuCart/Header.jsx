import { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernMenuCart } from './ModernMenuCartContext';

const Header = ({ config }) => {
  const { tokens, cartCount } = useModernMenuCart();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: tokens.colors.surface,
        borderBottom: `1px solid ${tokens.colors.border}`,
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '200px' }}>
          <SafeIcon icon={FiIcons.FiMenu} style={{ fontSize: '1.25rem', color: tokens.colors.primaryText, cursor: 'pointer' }} />
          <h1
            style={{
              fontFamily: tokens.typography.fontFamily.heading,
              fontSize: '1.125rem',
              fontWeight: tokens.typography.fontWeight.heading,
              color: tokens.colors.primaryText,
            }}
          >
            {config?.businessName || 'FoodiePinoy'}
          </h1>
        </div>

        <div style={{ flex: 1, maxWidth: '500px' }}>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: tokens.colors.background,
              borderRadius: '8px',
              border: `1px solid ${tokens.colors.border}`,
              padding: '0.5rem 0.75rem',
            }}
          >
            <SafeIcon icon={FiIcons.FiSearch} style={{ fontSize: '1rem', color: tokens.colors.secondaryText, marginRight: '0.5rem' }} />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                width: '100%',
                fontSize: tokens.typography.fontSize.bodyText,
                fontFamily: tokens.typography.fontFamily.body,
                color: tokens.colors.primaryText,
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.5rem',
            }}
          >
            <SafeIcon icon={FiIcons.FiHeart} style={{ fontSize: '1.25rem', color: tokens.colors.secondaryText }} />
          </button>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.5rem',
            }}
          >
            <SafeIcon icon={FiIcons.FiUser} style={{ fontSize: '1.25rem', color: tokens.colors.secondaryText }} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
