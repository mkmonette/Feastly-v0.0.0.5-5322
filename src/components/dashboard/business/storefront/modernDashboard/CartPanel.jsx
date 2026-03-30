import { useModernDashboard } from './ModernDashboardContext';
import { formatCurrency } from '../../../../../common/currency';

export const CartPanel = () => {
  const { tokens, cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useModernDashboard();
  const { colors, typography, components } = tokens;

  const deliveryFee = 50;
  const finalTotal = cartTotal + deliveryFee;

  const styles = {
    panel: {
      height: '100vh',
      position: 'sticky',
      top: 0,
      backgroundColor: colors.cardBg,
      borderLeft: `1px solid ${colors.borderColor}`,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    header: {
      padding: '2rem',
      borderBottom: `1px solid ${colors.borderColor}`,
      backgroundColor: colors.cardBg,
      position: 'sticky',
      top: 0,
      zIndex: 10,
    },
    headerTitle: {
      fontSize: typography.h3Size,
      fontWeight: typography.headingWeight,
      color: colors.primaryTextColor,
      marginBottom: '0.5rem',
      fontFamily: typography.fontFamily,
    },
    itemCount: {
      fontSize: typography.smallSize,
      color: colors.secondaryTextColor,
      fontFamily: typography.fontFamily,
    },
    content: {
      flex: 1,
      padding: '2rem',
      overflowY: 'auto',
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: colors.secondaryTextColor,
      fontFamily: typography.fontFamily,
    },
    emptyIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      opacity: 0.5,
    },
    emptyText: {
      fontSize: typography.bodySize,
    },
    items: {
      display: 'flex',
      flexDirection: 'column',
      gap: components.cart.itemSpacing,
    },
    item: {
      display: 'flex',
      gap: '1rem',
      paddingBottom: '1.25rem',
      borderBottom: `1px solid ${colors.borderColor}`,
    },
    itemImage: {
      width: '80px',
      height: '80px',
      borderRadius: '12px',
      objectFit: 'cover',
      backgroundColor: colors.secondaryBg,
      flexShrink: 0,
    },
    itemDetails: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    itemName: {
      fontSize: '1rem',
      fontWeight: '600',
      color: colors.primaryTextColor,
      fontFamily: typography.fontFamily,
    },
    itemPrice: {
      fontSize: typography.smallSize,
      color: colors.secondaryTextColor,
      fontFamily: typography.fontFamily,
    },
    itemControls: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    quantityButton: {
      width: '28px',
      height: '28px',
      borderRadius: '8px',
      border: `1px solid ${colors.borderColor}`,
      backgroundColor: colors.cardBg,
      color: colors.primaryTextColor,
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: typography.fontFamily,
    },
    quantity: {
      fontSize: '0.9375rem',
      fontWeight: '600',
      color: colors.primaryTextColor,
      minWidth: '24px',
      textAlign: 'center',
      fontFamily: typography.fontFamily,
    },
    removeButton: {
      background: 'none',
      border: 'none',
      color: colors.secondaryTextColor,
      fontSize: '1.25rem',
      cursor: 'pointer',
      padding: '0.25rem',
      transition: 'color 0.2s ease',
    },
    footer: {
      padding: '2rem',
      borderTop: `1px solid ${colors.borderColor}`,
      backgroundColor: colors.cardBg,
      position: 'sticky',
      bottom: 0,
    },
    summary: {
      display: 'flex',
      flexDirection: 'column',
      gap: components.cart.summarySpacing,
      marginBottom: '1.5rem',
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: typography.bodySize,
      fontFamily: typography.fontFamily,
    },
    summaryLabel: {
      color: colors.secondaryTextColor,
    },
    summaryValue: {
      color: colors.primaryTextColor,
      fontWeight: '600',
    },
    divider: {
      height: '1px',
      backgroundColor: colors.borderColor,
      margin: '1rem 0',
    },
    totalRow: {
      fontSize: '1.25rem',
      fontWeight: typography.headingWeight,
    },
    checkoutButton: {
      width: '100%',
      backgroundColor: colors.accentColor,
      color: '#FFFFFF',
      padding: '1rem',
      borderRadius: components.button.borderRadius,
      fontSize: components.button.fontSize,
      fontWeight: components.button.fontWeight,
      border: 'none',
      cursor: 'pointer',
      transition: components.button.transition,
      fontFamily: typography.fontFamily,
      boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
    },
  };

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Your Cart</h2>
        <p style={styles.itemCount}>
          {cartCount} {cartCount === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div style={styles.content}>
        {cart.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🛒</div>
            <p style={styles.emptyText}>Your cart is empty</p>
          </div>
        ) : (
          <div style={styles.items}>
            {cart.map(item => (
              <div key={item.id} style={styles.item}>
                <img
                  src={item.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200'}
                  alt={item.name}
                  style={styles.itemImage}
                />
                <div style={styles.itemDetails}>
                  <div style={styles.itemName}>{item.name}</div>
                  <div style={styles.itemPrice}>{formatCurrency(item.price)} each</div>
                  <div style={styles.itemControls}>
                    <div style={styles.quantityControl}>
                      <button
                        style={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = colors.secondaryBg;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = colors.cardBg;
                        }}
                      >
                        -
                      </button>
                      <span style={styles.quantity}>{item.quantity}</span>
                      <button
                        style={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = colors.secondaryBg;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = colors.cardBg;
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      style={styles.removeButton}
                      onClick={() => removeFromCart(item.id)}
                      onMouseEnter={(e) => {
                        e.target.style.color = colors.accentColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = colors.secondaryTextColor;
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div style={styles.footer}>
          <div style={styles.summary}>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Subtotal</span>
              <span style={styles.summaryValue}>{formatCurrency(cartTotal)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Delivery Fee</span>
              <span style={styles.summaryValue}>{formatCurrency(deliveryFee)}</span>
            </div>
            <div style={styles.divider}></div>
            <div style={{...styles.summaryRow, ...styles.totalRow}}>
              <span>Total</span>
              <span>{formatCurrency(finalTotal)}</span>
            </div>
          </div>
          <button
            style={styles.checkoutButton}
            onMouseEnter={(e) => {
              e.target.style.transform = components.button.hoverTransform;
              e.target.style.boxShadow = '0 6px 16px rgba(255, 107, 53, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'none';
              e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};
