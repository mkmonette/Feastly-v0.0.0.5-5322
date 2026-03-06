import React from 'react';
import { useMinimalRecipe } from './MinimalRecipeContext';
import { minimalRecipeTokens as tokens } from '../minimalRecipeTokens';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const CartPanel = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, getCartTotal, clearCart } = useMinimalRecipe();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 998,
        }}
      />
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '480px',
        maxWidth: '100vw',
        backgroundColor: tokens.colors.background.primary,
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          padding: tokens.spacing.lg,
          borderBottom: `1px solid ${tokens.colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{
            fontFamily: tokens.fonts.heading,
            fontSize: '28px',
            fontWeight: '700',
            color: tokens.colors.text.primary,
            margin: 0,
          }}>
            Your Cart
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: tokens.colors.background.secondary,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SafeIcon icon={FiIcons.FiX} style={{ fontSize: '20px', color: tokens.colors.text.primary }} />
          </button>
        </div>

        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: tokens.spacing.lg,
        }}>
          {cart.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: tokens.spacing.xl,
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: tokens.colors.background.secondary,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: tokens.spacing.md,
              }}>
                <SafeIcon icon={FiIcons.FiShoppingBag} style={{ fontSize: '32px', color: tokens.colors.text.light }} />
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
                  borderRadius: tokens.borderRadius.md,
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: tokens.borderRadius.sm,
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
                      fontWeight: '600',
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
                      color: tokens.colors.text.primary,
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
                        }}
                      >
                        <SafeIcon icon={FiIcons.FiMinus} style={{ fontSize: '14px' }} />
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
                        }}
                      >
                        <SafeIcon icon={FiIcons.FiPlus} style={{ fontSize: '14px' }} />
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
                fontSize: '28px',
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
              color: tokens.colors.text.primary,
              fontFamily: tokens.fonts.body,
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: tokens.borderRadius.full,
              cursor: 'pointer',
              marginBottom: tokens.spacing.sm,
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
    </>
  );
};

export default CartPanel;
