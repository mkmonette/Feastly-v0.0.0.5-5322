import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';

const CartPanel = () => {
  const { tokens } = useModernMinimal();

  const cartItems = [
    { id: 1, name: 'Truffle Pasta', price: 24, quantity: 2 },
    { id: 2, name: 'Caesar Salad', price: 14, quantity: 1 }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div
      style={{
        position: 'sticky',
        top: tokens.components.header.height,
        height: `calc(100vh - ${tokens.components.header.height})`,
        background: tokens.components.cart.background,
        borderLeft: `1px solid ${tokens.colors.border}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <div style={{ padding: tokens.components.cart.padding, borderBottom: `1px solid ${tokens.colors.border}` }}>
        <h3
          style={{
            fontSize: tokens.typography.fontSize.lg,
            fontWeight: tokens.typography.fontWeight.bold,
            color: tokens.colors.text.primary,
            fontFamily: tokens.typography.fontFamily.primary,
            margin: 0
          }}
        >
          Your Order
        </h3>
        <p
          style={{
            fontSize: tokens.typography.fontSize.sm,
            color: tokens.colors.text.secondary,
            fontFamily: tokens.typography.fontFamily.primary,
            margin: `${tokens.spacing.xs} 0 0 0`
          }}
        >
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: tokens.components.cart.padding
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.components.cart.itemSpacing }}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: tokens.colors.cart.itemBg,
                padding: tokens.spacing.md,
                borderRadius: tokens.borderRadius.md,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
                <h4
                  style={{
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    color: tokens.colors.text.primary,
                    fontFamily: tokens.typography.fontFamily.primary,
                    margin: 0
                  }}
                >
                  {item.name}
                </h4>
                <span
                  style={{
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    color: tokens.colors.text.primary,
                    fontFamily: tokens.typography.fontFamily.primary
                  }}
                >
                  ${item.price * item.quantity}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
                <button
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: tokens.borderRadius.sm,
                    border: `1px solid ${tokens.colors.border}`,
                    background: tokens.colors.background,
                    fontSize: tokens.typography.fontSize.sm,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: tokens.typography.fontFamily.primary
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.medium,
                    color: tokens.colors.text.primary,
                    fontFamily: tokens.typography.fontFamily.primary,
                    minWidth: '24px',
                    textAlign: 'center'
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: tokens.borderRadius.sm,
                    border: `1px solid ${tokens.colors.border}`,
                    background: tokens.colors.background,
                    fontSize: tokens.typography.fontSize.sm,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: tokens.typography.fontFamily.primary
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: tokens.components.cart.padding,
          borderTop: `1px solid ${tokens.colors.border}`,
          background: tokens.colors.background
        }}
      >
        <div style={{ marginBottom: tokens.spacing.md }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
            <span
              style={{
                fontSize: tokens.typography.fontSize.sm,
                color: tokens.colors.text.secondary,
                fontFamily: tokens.typography.fontFamily.primary
              }}
            >
              Subtotal
            </span>
            <span
              style={{
                fontSize: tokens.typography.fontSize.sm,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary
              }}
            >
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.md }}>
            <span
              style={{
                fontSize: tokens.typography.fontSize.sm,
                color: tokens.colors.text.secondary,
                fontFamily: tokens.typography.fontFamily.primary
              }}
            >
              Tax
            </span>
            <span
              style={{
                fontSize: tokens.typography.fontSize.sm,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary
              }}
            >
              ${tax.toFixed(2)}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: tokens.spacing.md,
              borderTop: `1px solid ${tokens.colors.border}`
            }}
          >
            <span
              style={{
                fontSize: tokens.typography.fontSize.base,
                fontWeight: tokens.typography.fontWeight.bold,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: tokens.typography.fontSize.lg,
                fontWeight: tokens.typography.fontWeight.bold,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary
              }}
            >
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        <button
          style={{
            width: '100%',
            background: tokens.components.cart.checkoutButtonColor,
            color: '#FFFFFF',
            padding: '0.875rem',
            borderRadius: tokens.borderRadius.md,
            fontSize: tokens.typography.fontSize.sm,
            fontWeight: tokens.typography.fontWeight.semibold,
            fontFamily: tokens.typography.fontFamily.primary,
            border: 'none',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.target.style.opacity = '1')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPanel;
