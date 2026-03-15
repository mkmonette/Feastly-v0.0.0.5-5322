import React from 'react';
import { useModernGradient } from './ModernGradientContext';

const CartPanel = () => {
  const { tokens } = useModernGradient();

  const cartItems = [
    { id: 1, name: 'Rainbow Bowl', price: 22, quantity: 1 },
    { id: 2, name: 'Sunset Sushi', price: 28, quantity: 2 }
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
      <div
        style={{
          padding: tokens.components.cart.padding,
          borderBottom: `1px solid ${tokens.colors.border}`,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
        }}
      >
        <h3
          style={{
            fontSize: tokens.typography.fontSize.lg,
            fontWeight: tokens.typography.fontWeight.extrabold,
            background: tokens.colors.gradients.hero,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: tokens.typography.fontFamily.primary,
            margin: 0
          }}
        >
          Your Cart
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
                borderRadius: tokens.borderRadius.lg,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: tokens.shadows.sm
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacing.md }}>
                <h4
                  style={{
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.bold,
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
                    fontWeight: tokens.typography.fontWeight.bold,
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
                    width: '32px',
                    height: '32px',
                    borderRadius: tokens.borderRadius.sm,
                    border: `1px solid ${tokens.colors.border}`,
                    background: tokens.colors.background,
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.bold,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: tokens.typography.fontFamily.primary,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = tokens.colors.primary;
                    e.target.style.color = tokens.colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = tokens.colors.border;
                    e.target.style.color = tokens.colors.text.primary;
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.semibold,
                    color: tokens.colors.text.primary,
                    fontFamily: tokens.typography.fontFamily.primary,
                    minWidth: '28px',
                    textAlign: 'center'
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: tokens.borderRadius.sm,
                    border: `1px solid ${tokens.colors.border}`,
                    background: tokens.colors.background,
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.bold,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: tokens.typography.fontFamily.primary,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = tokens.colors.primary;
                    e.target.style.color = tokens.colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = tokens.colors.border;
                    e.target.style.color = tokens.colors.text.primary;
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
                fontWeight: tokens.typography.fontWeight.medium,
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
                fontWeight: tokens.typography.fontWeight.medium,
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
              borderTop: `2px solid ${tokens.colors.border}`
            }}
          >
            <span
              style={{
                fontSize: tokens.typography.fontSize.base,
                fontWeight: tokens.typography.fontWeight.extrabold,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: tokens.typography.fontSize.xl,
                fontWeight: tokens.typography.fontWeight.extrabold,
                background: tokens.colors.gradients.hero,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
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
            background: tokens.components.cart.checkoutButtonGradient,
            color: '#FFFFFF',
            padding: '1rem',
            borderRadius: tokens.borderRadius.lg,
            fontSize: tokens.typography.fontSize.sm,
            fontWeight: tokens.typography.fontWeight.bold,
            fontFamily: tokens.typography.fontFamily.primary,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: tokens.shadows.gradient
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = tokens.shadows.gradient;
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPanel;
