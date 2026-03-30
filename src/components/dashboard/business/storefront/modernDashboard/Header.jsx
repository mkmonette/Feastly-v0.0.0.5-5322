import { FiShoppingCart, FiSearch, FiMenu } from 'react-icons/fi';
import { useModernDashboard } from './ModernDashboardContext';

export const Header = ({ businessName, logo }) => {
  const { tokens, cartCount, setIsCartOpen } = useModernDashboard();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: tokens.header.height,
        background: tokens.header.background,
        borderBottom: tokens.header.borderBottom,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: tokens.header.padding,
        transition: tokens.transitions.default,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {logo && (
          <img
            src={logo}
            alt={businessName}
            style={{
              height: '48px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        )}
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: tokens.colors.primaryTextColor,
            fontFamily: tokens.typography.fontFamily,
            margin: 0,
          }}
        >
          {businessName || 'FoodiePinoy'}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: tokens.colors.secondaryTextColor,
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.borderRadius.medium,
            transition: tokens.transitions.fast,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = tokens.colors.secondaryBg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <FiSearch size={20} />
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            background: tokens.colors.accentColor,
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderRadius: tokens.borderRadius.full,
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.body.fontSize,
            fontWeight: '600',
            boxShadow: tokens.shadows.button,
            transition: tokens.transitions.fast,
          }}
          className="cart-button"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <FiShoppingCart size={20} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span
              style={{
                background: '#FFFFFF',
                color: tokens.colors.accentColor,
                borderRadius: tokens.borderRadius.full,
                padding: '0.125rem 0.5rem',
                fontSize: '0.875rem',
                fontWeight: '700',
                minWidth: '24px',
                textAlign: 'center',
              }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
