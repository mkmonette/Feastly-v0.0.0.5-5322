import { FiX, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { useModernDashboard } from './ModernDashboardContext';
import { formatCurrency } from '../../../../../common/currency';

export const CartPanel = () => {
  const { tokens, cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useModernDashboard();

  const deliveryFee = 50;
  const total = cartTotal + deliveryFee;

  return (
    <div
      style={{
        position: 'sticky',
        top: tokens.header.height,
        height: `calc(100vh - ${tokens.header.height})`,
        width: tokens.cart.width,
        background: tokens.cart.background,
        borderLeft: tokens.cart.borderLeft,
        padding: tokens.cart.padding,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            fontFamily: tokens.typography.fontFamily,
            color: tokens.colors.primaryTextColor,
            margin: '0 0 0.5rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <FiShoppingBag size={24} />
          Your Order
        </h2>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            style={{
              background: 'transparent',
              border: 'none',
              color: tokens.colors.secondaryTextColor,
              fontSize: '0.875rem',
              fontFamily: tokens.typography.fontFamily,
              cursor: 'pointer',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            Clear all
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem 0',
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <p
            style={{
              fontSize: tokens.typography.body.fontSize,
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.secondaryTextColor,
              margin: 0,
            }}
          >
            Your cart is empty
          </p>
        </div>
      ) : (
        <>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: tokens.colors.secondaryBg,
                    borderRadius: tokens.borderRadius.medium,
                    padding: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: tokens.borderRadius.small,
                        }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          fontFamily: tokens.typography.fontFamily,
                          color: tokens.colors.primaryTextColor,
                          margin: '0 0 0.25rem 0',
                        }}
                      >
                        {item.name}
                      </h4>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          fontFamily: tokens.typography.fontFamily,
                          color: tokens.colors.accentColor,
                          fontWeight: '600',
                          margin: 0,
                        }}
                      >
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: tokens.colors.secondaryTextColor,
                        cursor: 'pointer',
                        padding: '0.25rem',
                      }}
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        background: tokens.colors.primaryBg,
                        border: 'none',
                        color: tokens.colors.primaryTextColor,
                        cursor: 'pointer',
                        width: '32px',
                        height: '32px',
                        borderRadius: tokens.borderRadius.small,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: tokens.transitions.fast,
                      }}
                    >
                      <FiMinus size={16} />
                    </button>
                    <span
                      style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        fontFamily: tokens.typography.fontFamily,
                        color: tokens.colors.primaryTextColor,
                        minWidth: '30px',
                        textAlign: 'center',
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        background: tokens.colors.accentColor,
                        border: 'none',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        width: '32px',
                        height: '32px',
                        borderRadius: tokens.borderRadius.small,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: tokens.transitions.fast,
                      }}
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              borderTop: `1px solid ${tokens.colors.borderColor}`,
              paddingTop: '1.5rem',
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}
              >
                <span
                  style={{
                    fontSize: tokens.typography.body.fontSize,
                    fontFamily: tokens.typography.fontFamily,
                    color: tokens.colors.secondaryTextColor,
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    fontSize: tokens.typography.body.fontSize,
                    fontFamily: tokens.typography.fontFamily,
                    color: tokens.colors.primaryTextColor,
                    fontWeight: '600',
                  }}
                >
                  {formatCurrency(cartTotal)}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}
              >
                <span
                  style={{
                    fontSize: tokens.typography.body.fontSize,
                    fontFamily: tokens.typography.fontFamily,
                    color: tokens.colors.secondaryTextColor,
                  }}
                >
                  Delivery Fee
                </span>
                <span
                  style={{
                    fontSize: tokens.typography.body.fontSize,
                    fontFamily: tokens.typography.fontFamily,
                    color: tokens.colors.primaryTextColor,
                    fontWeight: '600',
                  }}
                >
                  {formatCurrency(deliveryFee)}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: `1px solid ${tokens.colors.borderColor}`,
                }}
              >
                <span
                  style={{
                    fontSize: '1.125rem',
                    fontFamily: tokens.typography.fontFamily,
                    color: tokens.colors.primaryTextColor,
                    fontWeight: '700',
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontSize: '1.125rem',
                    fontFamily: tokens.typography.fontFamily,
                    color: tokens.colors.accentColor,
                    fontWeight: '700',
                  }}
                >
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <button
              style={{
                width: '100%',
                background: tokens.colors.accentColor,
                color: '#FFFFFF',
                border: 'none',
                padding: '1rem',
                borderRadius: tokens.borderRadius.medium,
                fontSize: '1rem',
                fontWeight: '600',
                fontFamily: tokens.typography.fontFamily,
                cursor: 'pointer',
                boxShadow: tokens.shadows.button,
                transition: tokens.transitions.fast,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = tokens.shadows.cardHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = tokens.shadows.button;
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
