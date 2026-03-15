import React from 'react';
import { useMobileVisualMenu } from './MobileVisualMenuContext';
import { mobileVisualMenuTokens as tokens } from '../mobileVisualMenuTokens';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

export default function FloatingCartButton() {
  const { getCartCount, setIsCartOpen } = useMobileVisualMenu();
  const cartCount = getCartCount();

  if (cartCount === 0) return null;

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        width: '64px',
        height: '64px',
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
        <SafeIcon icon={FiIcons.FiShoppingCart} size={26} />
        <span
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            backgroundColor: tokens.colors.buttonText,
            color: tokens.colors.accent,
            fontSize: '0.75rem',
            fontWeight: tokens.typography.fontWeight.bold,
            width: '22px',
            height: '22px',
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
