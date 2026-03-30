import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernDashboard } from './ModernDashboardContext';
import { formatCurrency } from '@/common/currency';

const CartPanel = () => {
  const { settings, cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useModernDashboard();
  const { tokens } = settings;

  const discount = 0;
  const deliveryFee = cartTotal > 0 ? 50 : 0;
  const finalTotal = cartTotal - discount + deliveryFee;

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        backgroundColor: tokens.cartBackground,
        borderLeft: `1px solid ${tokens.cartBorderColor}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          padding: tokens.spacing.xl,
          borderBottom: `1px solid ${tokens.borderColor}`
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <h2
            style={{
              fontSize: tokens.fontSize.xl,
              fontWeight: tokens.fontWeight.bold,
              color: tokens.primaryTextColor,
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing.sm
            }}
          >
            <SafeIcon icon={FiIcons.FiShoppingCart} size={24} />
            My Cart
          </h2>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              style={{
                background: 'none',
                border: 'none',
                color: tokens.sectionTextColor,
                cursor: 'pointer',
                fontSize: tokens.fontSize.sm,
                padding: tokens.spacing.sm,
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing.xs
              }}
            >
              <SafeIcon icon={FiIcons.FiTrash2} size={16} />
              Clear
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: tokens.spacing.lg
        }}
      >
        {cart.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              color: tokens.sectionTextColor
            }}
          >
            <SafeIcon icon={FiIcons.FiShoppingCart} size={64} style={{ marginBottom: tokens.spacing.lg, opacity: 0.3 }} />
            <p style={{ fontSize: tokens.fontSize.base }}>Your cart is empty</p>
            <p style={{ fontSize: tokens.fontSize.sm, marginTop: tokens.spacing.sm }}>
              Add items to get started
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: tokens.categoryPillBackground,
                  borderRadius: tokens.borderRadius,
                  padding: tokens.spacing.md,
                  display: 'flex',
                  gap: tokens.spacing.md
                }}
              >
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: tokens.borderRadius,
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: tokens.borderColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <SafeIcon icon={FiIcons.FiImage} size={24} style={{ color: tokens.sectionTextColor }} />
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: tokens.spacing.sm
                    }}
                  >
                    <h4
                      style={{
                        fontSize: tokens.fontSize.sm,
                        fontWeight: tokens.fontWeight.semibold,
                        color: tokens.primaryTextColor,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: tokens.sectionTextColor,
                        cursor: 'pointer',
                        padding: '2px',
                        flexShrink: 0
                      }}
                    >
                      <SafeIcon icon={FiIcons.FiX} size={16} />
                    </button>
                  </div>

                  <div
                    style={{
                      fontSize: tokens.fontSize.base,
                      fontWeight: tokens.fontWeight.bold,
                      color: tokens.accentColor,
                      marginBottom: tokens.spacing.sm
                    }}
                  >
                    {formatCurrency(item.price)}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: tokens.spacing.sm,
                      backgroundColor: tokens.cardBackground,
                      borderRadius: tokens.borderRadius,
                      padding: tokens.spacing.xs,
                      width: 'fit-content'
                    }}
                  >
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: tokens.primaryTextColor,
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = tokens.categoryPillBackground;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <SafeIcon icon={FiIcons.FiMinus} size={14} />
                    </button>

                    <span
                      style={{
                        fontSize: tokens.fontSize.sm,
                        fontWeight: tokens.fontWeight.semibold,
                        color: tokens.primaryTextColor,
                        minWidth: '24px',
                        textAlign: 'center'
                      }}
                    >
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: tokens.primaryTextColor,
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '4px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = tokens.categoryPillBackground;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <SafeIcon icon={FiIcons.FiPlus} size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div
          style={{
            borderTop: `1px solid ${tokens.borderColor}`,
            padding: tokens.spacing.xl
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing.md,
              marginBottom: tokens.spacing.lg
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: tokens.fontSize.sm,
                color: tokens.sectionTextColor
              }}
            >
              <span>Subtotal</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            {discount > 0 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: tokens.fontSize.sm,
                  color: '#10B981'
                }}
              >
                <span>Discount</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: tokens.fontSize.sm,
                color: tokens.sectionTextColor
              }}
            >
              <span>Delivery Fee</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
            <div
              style={{
                borderTop: `1px solid ${tokens.borderColor}`,
                paddingTop: tokens.spacing.md,
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: tokens.fontSize.lg,
                fontWeight: tokens.fontWeight.bold,
                color: tokens.primaryTextColor
              }}
            >
              <span>Total</span>
              <span style={{ color: tokens.accentColor }}>{formatCurrency(finalTotal)}</span>
            </div>
          </div>

          <button
            style={{
              width: '100%',
              backgroundColor: tokens.accentColor,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: tokens.borderRadius,
              padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
              fontSize: tokens.fontSize.base,
              fontWeight: tokens.fontWeight.bold,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: tokens.spacing.md,
              transition: 'all 0.2s',
              boxShadow: tokens.shadowMd
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = tokens.shadowLg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = tokens.shadowMd;
            }}
          >
            Proceed to Checkout
            <SafeIcon icon={FiIcons.FiArrowRight} size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPanel;
