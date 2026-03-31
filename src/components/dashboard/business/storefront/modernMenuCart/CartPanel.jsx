import React from 'react';
import { useModernMenuCart } from './ModernMenuCartContext';
import { FiEdit2, FiMinus, FiPlus } from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { formatCurrency } from '@/common/currency';

export default function CartPanel() {
  const { tokens, cart, updateQuantity, cartTotal, cartCount } = useModernMenuCart();

  return (
    <div style={{
      position: 'sticky',
      top: '2rem',
      ...tokens.components.cartPanel,
      boxShadow: tokens.shadows.cartPanel
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{
          fontSize: tokens.typography.fontSize.xl,
          fontWeight: tokens.typography.fontWeight.bold,
          color: tokens.colors.text,
          margin: 0
        }}>
          My cart
        </h2>
        <button style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: tokens.colors.text,
          fontSize: '1.125rem',
          padding: '0.25rem'
        }}>
          <SafeIcon icon={FiEdit2} />
        </button>
      </div>

      <div style={{
        maxHeight: '400px',
        overflowY: 'auto',
        marginBottom: '1.5rem'
      }}>
        {cart.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem 0',
            color: tokens.colors.textMuted,
            fontSize: tokens.typography.fontSize.sm
          }}>
            Your cart is empty
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                backgroundColor: tokens.colors.cartItemBg,
                borderRadius: tokens.borderRadius.md,
                marginBottom: '0.75rem'
              }}
            >
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: tokens.borderRadius.md,
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img
                  src={item.imageUrl || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200'}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: tokens.typography.fontSize.sm,
                  fontWeight: tokens.typography.fontWeight.medium,
                  color: tokens.colors.text,
                  marginBottom: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    color: tokens.colors.text,
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.normal
                  }}>
                    {item.quantity} ×
                  </span>
                  <span style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.name}
                  </span>
                </div>
                <div style={{
                  fontSize: tokens.typography.fontSize.base,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  color: tokens.colors.primary
                }}>
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                flexShrink: 0
              }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '0.25rem',
                    border: 'none',
                    background: tokens.colors.primary,
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem'
                  }}
                >
                  <SafeIcon icon={FiPlus} />
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '0.25rem',
                    border: 'none',
                    background: tokens.colors.surface,
                    color: tokens.colors.text,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    boxShadow: tokens.shadows.sm
                  }}
                >
                  <SafeIcon icon={FiMinus} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{
        padding: '1rem',
        backgroundColor: tokens.colors.surfaceHover,
        borderRadius: tokens.borderRadius.md,
        marginBottom: '1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: tokens.typography.fontSize.sm,
          color: tokens.colors.text
        }}>
          <span>Final</span>
          <span>{formatCurrency(cartTotal)}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
          fontSize: tokens.typography.fontSize.sm,
          color: tokens.colors.text
        }}>
          <span>Discount</span>
          <span style={{ color: tokens.colors.error }}>%10</span>
        </div>
        <div style={{
          borderTop: `1px solid ${tokens.colors.border}`,
          paddingTop: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: tokens.typography.fontSize.base,
            fontWeight: tokens.typography.fontWeight.semibold,
            color: tokens.colors.text
          }}>
            Final
          </span>
          <span style={{
            fontSize: tokens.typography.fontSize.xl,
            fontWeight: tokens.typography.fontWeight.bold,
            color: tokens.colors.primary
          }}>
            {formatCurrency(cartTotal * 0.9)}
          </span>
        </div>
      </div>

      <button
        disabled={cart.length === 0}
        style={{
          width: '100%',
          padding: '0.875rem',
          background: cart.length === 0 ? tokens.colors.textMuted : tokens.colors.secondary,
          color: '#fff',
          border: 'none',
          borderRadius: tokens.components.button.primary.borderRadius,
          fontSize: tokens.components.button.primary.fontSize,
          fontWeight: tokens.components.button.primary.fontWeight,
          cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          opacity: cart.length === 0 ? 0.6 : 1
        }}
        onMouseEnter={(e) => {
          if (cart.length > 0) {
            e.target.style.background = tokens.colors.secondaryHover;
          }
        }}
        onMouseLeave={(e) => {
          if (cart.length > 0) {
            e.target.style.background = tokens.colors.secondary;
          }
        }}
      >
        Checkout
      </button>
    </div>
  );
}
