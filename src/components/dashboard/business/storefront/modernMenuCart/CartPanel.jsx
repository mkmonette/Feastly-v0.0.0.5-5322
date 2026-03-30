import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernMenuCart } from './ModernMenuCartContext';
import { formatCurrency } from '@/common/currency';

const CartPanel = () => {
  const { tokens, cart, cartTotal, updateQuantity, removeFromCart } = useModernMenuCart();

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '380px',
        backgroundColor: tokens.colors.cartBackground,
        borderLeft: `1px solid ${tokens.colors.cartBorder}`,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      <div style={{ padding: '1.5rem 1rem 1rem', borderBottom: `1px solid ${tokens.colors.border}` }}>
        <h3
          style={{
            fontFamily: tokens.typography.fontFamily.heading,
            fontSize: '1.25rem',
            fontWeight: tokens.typography.fontWeight.heading,
            color: tokens.colors.primaryText,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <SafeIcon icon={FiIcons.FiShoppingCart} />
          Your Cart ({cart.length})
        </h3>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {cart.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <SafeIcon icon={FiIcons.FiShoppingCart} style={{ fontSize: '3rem', color: tokens.colors.border, marginBottom: '1rem' }} />
            <p
              style={{
                fontSize: tokens.typography.fontSize.bodyText,
                color: tokens.colors.secondaryText,
              }}
            >
              Your cart is empty
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: tokens.colors.surface,
                  borderRadius: tokens.borderRadius.card,
                  padding: '0.75rem',
                  display: 'flex',
                  gap: '0.75rem',
                  boxShadow: tokens.shadows.card,
                }}
              >
                <img
                  src={item.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={item.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: tokens.borderRadius.image,
                    objectFit: 'cover',
                  }}
                />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <h4
                      style={{
                        fontFamily: tokens.typography.fontFamily.body,
                        fontSize: tokens.typography.fontSize.bodyText,
                        fontWeight: tokens.typography.fontWeight.subheading,
                        color: tokens.colors.primaryText,
                        lineHeight: '1.3',
                      }}
                    >
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                      }}
                    >
                      <SafeIcon icon={FiIcons.FiTrash2} style={{ fontSize: '1rem', color: tokens.colors.secondaryText }} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontSize: tokens.typography.fontSize.bodyText,
                        fontWeight: tokens.typography.fontWeight.bold,
                        color: tokens.colors.accent,
                      }}
                    >
                      {formatCurrency(item.price)}
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: tokens.colors.background,
                        borderRadius: tokens.borderRadius.button,
                        padding: '0.25rem',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                        }}
                      >
                        <SafeIcon icon={FiIcons.FiMinus} style={{ fontSize: '0.875rem', color: tokens.colors.primaryText }} />
                      </button>
                      <span
                        style={{
                          fontSize: tokens.typography.fontSize.smallText,
                          fontWeight: tokens.typography.fontWeight.subheading,
                          color: tokens.colors.primaryText,
                          minWidth: '20px',
                          textAlign: 'center',
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                        }}
                      >
                        <SafeIcon icon={FiIcons.FiPlus} style={{ fontSize: '0.875rem', color: tokens.colors.primaryText }} />
                      </button>
                    </div>
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
            borderTop: `1px solid ${tokens.colors.border}`,
            padding: '1rem',
            backgroundColor: tokens.colors.surface,
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontSize: tokens.typography.fontSize.bodyText,
                  color: tokens.colors.secondaryText,
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontSize: tokens.typography.fontSize.bodyText,
                  color: tokens.colors.primaryText,
                  fontWeight: tokens.typography.fontWeight.subheading,
                }}
              >
                {formatCurrency(cartTotal)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontSize: tokens.typography.fontSize.bodyText,
                  color: tokens.colors.secondaryText,
                }}
              >
                Delivery Fee
              </span>
              <span
                style={{
                  fontSize: tokens.typography.fontSize.bodyText,
                  color: tokens.colors.primaryText,
                  fontWeight: tokens.typography.fontWeight.subheading,
                }}
              >
                {formatCurrency(50)}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: `1px solid ${tokens.colors.border}`,
              }}
            >
              <span
                style={{
                  fontSize: '1.125rem',
                  fontWeight: tokens.typography.fontWeight.heading,
                  color: tokens.colors.primaryText,
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontSize: '1.125rem',
                  fontWeight: tokens.typography.fontWeight.heading,
                  color: tokens.colors.accent,
                }}
              >
                {formatCurrency(cartTotal + 50)}
              </span>
            </div>
          </div>

          <button
            style={{
              width: '100%',
              backgroundColor: tokens.colors.accent,
              color: '#ffffff',
              border: 'none',
              borderRadius: tokens.borderRadius.button,
              padding: '0.875rem',
              fontSize: tokens.typography.fontSize.bodyText,
              fontWeight: tokens.typography.fontWeight.bold,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tokens.colors.accentHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = tokens.colors.accent}
          >
            Proceed to Checkout
            <SafeIcon icon={FiIcons.FiArrowRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPanel;
