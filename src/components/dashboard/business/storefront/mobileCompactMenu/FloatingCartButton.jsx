import React from 'react';
import { useMobileCompactMenu } from './MobileCompactMenuContext';
import { mobileCompactMenuTokens as tokens } from '../mobileCompactMenuTokens';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

export default function FloatingCartButton() {
  const { getCartCount, setIsCartOpen } = useMobileCompactMenu();
  const cartCount = getCartCount();

  if (cartCount === 0) return null;

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        width: '56px',
        height: '56px',
        backgroundColor: tokens.colors.accent,
        color: tokens.colors.buttonText,
        border: 'none',
        borderRadius: '50%',
        boxShadow: tokens.shadows.floatingButton,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 30,
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
    >
      <div style={{ position: 'relative' }}>
        <SafeIcon icon={FiIcons.FiShoppingCart} size={22} />
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: tokens.colors.buttonText,
            color: tokens.colors.accent,
            fontSize: '0.6875rem',
            fontWeight: tokens.typography.fontWeight.bold,
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {cartCount}
        </span>
      </div>
    </button>
  );
}
