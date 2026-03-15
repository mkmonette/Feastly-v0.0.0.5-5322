import React from 'react';
import { useMobileCompactMenu } from './MobileCompactMenuContext';
import { mobileCompactMenuTokens as tokens } from '../mobileCompactMenuTokens';
import { formatCurrency } from '@/common/currency';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

export default function CartDrawer() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, isCartOpen, setIsCartOpen } = useMobileCompactMenu();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 40,
        }}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: '70vh',
          backgroundColor: tokens.colors.cartBackground,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.15)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '1rem',
            borderBottom: `1px solid ${tokens.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: tokens.typography.fontWeight.heading,
              color: tokens.colors.primaryText,
              margin: 0,
            }}
          >
            Cart ({cart.length})
          </h3>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: tokens.colors.secondaryText,
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <SafeIcon icon={FiIcons.FiX} size={20} />
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.875rem',
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                color: tokens.colors.secondaryText,
              }}
            >
              <SafeIcon icon={FiIcons.FiShoppingBag} size={40} style={{ marginBottom: '0.75rem', opacity: 0.3 }} />
              <p style={{ fontSize: tokens.typography.fontSize.bodyText, margin: 0 }}>
                Cart is empty
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '0.625rem',
                    padding: '0.625rem',
                    backgroundColor: tokens.colors.background,
                    borderRadius: tokens.borderRadius.card,
                    border: `1px solid ${tokens.colors.border}`,
                  }}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: tokens.borderRadius.image,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4
                      style={{
                        fontSize: tokens.typography.fontSize.productTitle,
                        fontWeight: tokens.typography.fontWeight.subheading,
                        color: tokens.colors.primaryText,
                        margin: '0 0 0.25rem 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.name}
                    </h4>
                    <p
                      style={{
                        fontSize: tokens.typography.fontSize.bodyText,
                        color: tokens.colors.accent,
                        fontWeight: tokens.typography.fontWeight.bold,
                        margin: '0 0 0.5rem 0',
                      }}
                    >
                      {formatCurrency(item.salePrice || item.price)}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: `1px solid ${tokens.colors.border}`,
                          borderRadius: '4px',
                          backgroundColor: tokens.colors.surface,
                          color: tokens.colors.primaryText,
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                        }}
                      >
                        -
                      </button>
                      <span
                        style={{
                          fontSize: tokens.typography.fontSize.smallText,
                          fontWeight: tokens.typography.fontWeight.subheading,
                          minWidth: '20px',
                          textAlign: 'center',
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: `1px solid ${tokens.colors.border}`,
                          borderRadius: '4px',
                          backgroundColor: tokens.colors.surface,
                          color: tokens.colors.primaryText,
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          color: tokens.colors.secondaryText,
                          cursor: 'pointer',
                          padding: '0.25rem',
                        }}
                      >
                        <SafeIcon icon={FiIcons.FiTrash2} size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            padding: '0.875rem',
            borderTop: `1px solid ${tokens.colors.border}`,
            backgroundColor: tokens.colors.surface,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.875rem',
            }}
          >
            <span
              style={{
                fontSize: tokens.typography.fontSize.bodyText,
                fontWeight: tokens.typography.fontWeight.subheading,
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: '1.375rem',
                fontWeight: tokens.typography.fontWeight.heading,
                color: tokens.colors.primaryText,
              }}
            >
              {formatCurrency(getCartTotal())}
            </span>
          </div>
          <button
            disabled={cart.length === 0}
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: cart.length === 0 ? tokens.colors.border : tokens.colors.accent,
              color: tokens.colors.buttonText,
              border: 'none',
              borderRadius: tokens.borderRadius.button,
              fontSize: tokens.typography.fontSize.bodyText,
              fontWeight: tokens.typography.fontWeight.bold,
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
              opacity: cart.length === 0 ? 0.5 : 1,
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
