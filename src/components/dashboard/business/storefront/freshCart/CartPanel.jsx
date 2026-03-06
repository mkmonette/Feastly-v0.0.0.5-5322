import React from 'react';
import { useFreshCart } from './FreshCartContext';
import { freshCartTokens as tokens } from '../freshCartTokens';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const CartPanel = () => {
  const { cart, updateQuantity, getCartTotal, clearCart } = useFreshCart();

  return (
    <div style={{
      width: '420px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      backgroundColor: tokens.colors.background.cart,
      borderLeft: `1px solid ${tokens.colors.border}`,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: tokens.shadows.cart,
    }}>
      <div style={{
        padding: tokens.spacing.lg,
        borderBottom: `1px solid ${tokens.colors.border}`,
      }}>
        <h2 style={{
          fontFamily: tokens.fonts.heading,
          fontSize: '32px',
          fontWeight: '700',
          color: tokens.colors.text.primary,
          margin: 0,
        }}>
          Your Cart
        </h2>
        <p style={{
          fontFamily: tokens.fonts.body,
          fontSize: '14px',
          color: tokens.colors.text.secondary,
          marginTop: tokens.spacing.xs,
        }}>
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: tokens.spacing.lg,
      }}>
        {cart.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: `${tokens.spacing.xxl} ${tokens.spacing.md}`,
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: tokens.colors.secondary,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: tokens.spacing.md,
            }}>
              <SafeIcon icon={FiIcons.FiShoppingCart} style={{ fontSize: '32px', color: tokens.colors.accent }} />
            </div>
            <p style={{
              fontFamily: tokens.fonts.body,
              fontSize: '16px',
              color: tokens.colors.text.secondary,
            }}>
              Your cart is empty
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.md }}>
            {cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                backgroundColor: tokens.colors.background.tertiary,
                borderRadius: tokens.borderRadius.lg,
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: tokens.borderRadius.md,
                  backgroundColor: tokens.colors.background.secondary,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: tokens.fonts.heading,
                    fontSize: '18px',
                    fontWeight: '700',
                    color: tokens.colors.text.primary,
                    margin: 0,
                    marginBottom: tokens.spacing.xs,
                  }}>
                    {item.name}
                  </h3>
                  <div style={{
                    fontFamily: tokens.fonts.body,
                    fontSize: '16px',
                    fontWeight: '600',
                    color: tokens.colors.accent,
                    marginBottom: tokens.spacing.xs,
                  }}>
                    ${item.price.toFixed(2)}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: tokens.colors.background.secondary,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      <SafeIcon icon={FiIcons.FiMinus} style={{ fontSize: '14px', color: tokens.colors.text.primary }} />
                    </button>
                    <span style={{
                      fontFamily: tokens.fonts.body,
                      fontSize: '16px',
                      fontWeight: '600',
                      color: tokens.colors.text.primary,
                      minWidth: '24px',
                      textAlign: 'center',
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: tokens.colors.background.secondary,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      <SafeIcon icon={FiIcons.FiPlus} style={{ fontSize: '14px', color: tokens.colors.text.primary }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div style={{
          padding: tokens.spacing.lg,
          borderTop: `1px solid ${tokens.colors.border}`,
          backgroundColor: tokens.colors.background.primary,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: tokens.spacing.md,
          }}>
            <span style={{
              fontFamily: tokens.fonts.body,
              fontSize: '18px',
              fontWeight: '600',
              color: tokens.colors.text.primary,
            }}>
              Total
            </span>
            <span style={{
              fontFamily: tokens.fonts.heading,
              fontSize: '32px',
              fontWeight: '700',
              color: tokens.colors.text.primary,
            }}>
              ${getCartTotal().toFixed(2)}
            </span>
          </div>
          <button style={{
            width: '100%',
            padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
            backgroundColor: tokens.colors.accent,
            color: tokens.colors.text.white,
            fontFamily: tokens.fonts.body,
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: tokens.borderRadius.full,
            cursor: 'pointer',
            marginBottom: tokens.spacing.sm,
            transition: 'all 0.2s',
          }}>
            Checkout
          </button>
          <button
            onClick={clearCart}
            style={{
              width: '100%',
              padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
              backgroundColor: 'transparent',
              color: tokens.colors.text.secondary,
              fontFamily: tokens.fonts.body,
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPanel;
