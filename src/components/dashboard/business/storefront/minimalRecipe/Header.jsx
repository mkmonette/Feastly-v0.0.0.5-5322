import React from 'react';
import { useMinimalRecipe } from './MinimalRecipeContext';
import { minimalRecipeTokens as tokens } from '../minimalRecipeTokens';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const Header = () => {
  const { getCartCount, setIsCartOpen } = useMinimalRecipe();
  const cartCount = getCartCount();

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: tokens.colors.background.primary,
      borderBottom: `1px solid ${tokens.colors.border}`,
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: tokens.fonts.heading,
          fontSize: '28px',
          fontWeight: '700',
          color: tokens.colors.text.primary,
          letterSpacing: '-0.02em',
        }}>
          Delicio
        </div>

        <nav style={{
          display: 'flex',
          gap: tokens.spacing.lg,
          alignItems: 'center',
        }}>
          <a href="#menu" style={{
            fontFamily: tokens.fonts.body,
            fontSize: '15px',
            fontWeight: '500',
            color: tokens.colors.text.secondary,
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}>
            Menu
          </a>
          <a href="#about" style={{
            fontFamily: tokens.fonts.body,
            fontSize: '15px',
            fontWeight: '500',
            color: tokens.colors.text.secondary,
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}>
            About
          </a>
          <a href="#contact" style={{
            fontFamily: tokens.fonts.body,
            fontSize: '15px',
            fontWeight: '500',
            color: tokens.colors.text.secondary,
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}>
            Contact
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              padding: '10px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: tokens.colors.text.primary,
            }}
          >
            <SafeIcon icon={FiIcons.FiShoppingBag} style={{ fontSize: '22px' }} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '18px',
                height: '18px',
                backgroundColor: tokens.colors.accent,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '600',
                color: tokens.colors.text.primary,
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
