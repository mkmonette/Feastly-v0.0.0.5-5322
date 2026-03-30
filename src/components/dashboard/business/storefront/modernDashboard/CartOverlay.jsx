import { FiX } from 'react-icons/fi';
import { useModernDashboard } from './ModernDashboardContext';
import { CartPanel } from './CartPanel';

export const CartOverlay = () => {
  const { tokens, isCartOpen, setIsCartOpen } = useModernDashboard();

  if (!isCartOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          background: tokens.colors.cardBg,
          boxShadow: tokens.shadows.elevated,
        }}
      >
        <button
          onClick={() => setIsCartOpen(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: tokens.colors.secondaryBg,
            border: 'none',
            color: tokens.colors.primaryTextColor,
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            borderRadius: tokens.borderRadius.full,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <FiX size={24} />
        </button>

        <div style={{ height: '100vh', overflowY: 'auto' }}>
          <CartPanel />
        </div>
      </div>
    </div>
  );
};
