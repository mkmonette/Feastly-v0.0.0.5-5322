import React from 'react';
import { useModernSplitCart } from './ModernSplitCartContext';
import { modernSplitCartTokens as tokens } from '../modernSplitCartTokens';
import { formatCurrency } from '@/common/currency';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

export default function CartPanel() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useModernSplitCart();

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: tokens.layout.cartWidth,
        backgroundColor: tokens.colors.cartBackground,
        borderLeft: `1px solid ${tokens.colors.cartBorder}`,
        boxShadow: tokens.shadows.cartPanel,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '2rem 1.5rem',
          borderBottom: `1px solid ${tokens.colors.border}`,
        }}
      >
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: tokens.typography.fontWeight.heading,
            color: tokens.colors.primaryText,
            fontFamily: tokens.typography.fontFamily.heading,
            margin: 0,
          }}
        >
          Your Order
        </h3>
        <p
          style={{
            fontSize: tokens.typography.fontSize.smallText,
            color: tokens.colors.secondaryText,
            margin: '0.5rem 0 0 0',
          }}
        >
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
        }}
      >
        {cart.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: tokens.colors.secondaryText,
            }}
          >
            <SafeIcon icon={FiIcons.FiShoppingCart} size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <p style={{ fontSize: tokens.typography.fontSize.bodyText, margin: 0 }}>
              Your cart is empty
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
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
                      width: '60px',
                      height: '60px',
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
                      margin: '0 0 0.5rem 0',
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
                      margin: '0 0 0.75rem 0',
                    }}
                  >
                    {formatCurrency(item.salePrice || item.price)}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: '6px',
                        backgroundColor: tokens.colors.surface,
                        color: tokens.colors.primaryText,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        fontWeight: tokens.typography.fontWeight.bold,
                      }}
                    >
                      -
                    </button>
                    <span
                      style={{
                        fontSize: tokens.typography.fontSize.bodyText,
                        fontWeight: tokens.typography.fontWeight.subheading,
                        color: tokens.colors.primaryText,
                        minWidth: '24px',
                        textAlign: 'center',
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        border: `1px solid ${tokens.colors.border}`,
                        borderRadius: '6px',
                        backgroundColor: tokens.colors.surface,
                        color: tokens.colors.primaryText,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        fontWeight: tokens.typography.fontWeight.bold,
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
                      <SafeIcon icon={FiIcons.FiTrash2} size={16} />
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
          padding: '1.5rem',
          borderTop: `1px solid ${tokens.colors.border}`,
          backgroundColor: tokens.colors.surface,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <span
            style={{
              fontSize: tokens.typography.fontSize.bodyText,
              color: tokens.colors.primaryText,
              fontWeight: tokens.typography.fontWeight.subheading,
            }}
          >
            Subtotal
          </span>
          <span
            style={{
              fontSize: '1.25rem',
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
            padding: '1rem',
            backgroundColor: cart.length === 0 ? tokens.colors.border : tokens.colors.accent,
            color: tokens.colors.buttonText,
            border: 'none',
            borderRadius: tokens.borderRadius.button,
            fontSize: tokens.typography.fontSize.bodyText,
            fontWeight: tokens.typography.fontWeight.bold,
            cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
            opacity: cart.length === 0 ? 0.5 : 1,
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            if (cart.length > 0) {
              e.target.style.backgroundColor = tokens.colors.accentHover;
            }
          }}
          onMouseLeave={(e) => {
            if (cart.length > 0) {
              e.target.style.backgroundColor = tokens.colors.accent;
            }
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
