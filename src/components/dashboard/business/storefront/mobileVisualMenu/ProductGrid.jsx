import React from 'react';
import { useProducts } from '@/context/ProductContext';
import { mobileVisualMenuTokens as tokens } from '../mobileVisualMenuTokens';
import { useMobileVisualMenu } from './MobileVisualMenuContext';
import { formatCurrency } from '@/common/currency';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

export default function ProductGrid() {
  const { products } = useProducts();
  const { addToCart, activeCategory } = useMobileVisualMenu();

  const availableProducts = products?.filter(p => p.available) || [];

  const filteredProducts = activeCategory === 'all'
    ? availableProducts
    : availableProducts.filter(p => p.categoryId === activeCategory);

  return (
    <section
      style={{
        padding: tokens.spacing.sectionPadding,
        backgroundColor: tokens.colors.background,
        paddingBottom: '6rem',
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.containerMaxWidth,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: tokens.spacing.gridGap,
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                position: 'relative',
                backgroundColor: tokens.colors.surface,
                borderRadius: tokens.borderRadius.card,
                overflow: 'hidden',
                boxShadow: tokens.shadows.card,
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = tokens.shadows.cardHover;
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = tokens.shadows.card;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {product.image && (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '180px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: tokens.colors.overlayGradient,
                      padding: '2.5rem 0.875rem 0.875rem 0.875rem',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: tokens.typography.fontSize.productTitle,
                        fontWeight: tokens.typography.fontWeight.bold,
                        color: '#ffffff',
                        margin: '0 0 0.25rem 0',
                        fontFamily: tokens.typography.fontFamily.heading,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {product.name}
                    </h3>
                    {product.salePrice ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <span
                          style={{
                            fontSize: tokens.typography.fontSize.productTitle,
                            fontWeight: tokens.typography.fontWeight.bold,
                            color: '#ffffff',
                          }}
                        >
                          {formatCurrency(product.salePrice)}
                        </span>
                        <span
                          style={{
                            fontSize: tokens.typography.fontSize.smallText,
                            color: 'rgba(255, 255, 255, 0.7)',
                            textDecoration: 'line-through',
                          }}
                        >
                          {formatCurrency(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span
                        style={{
                          fontSize: tokens.typography.fontSize.productTitle,
                          fontWeight: tokens.typography.fontWeight.bold,
                          color: '#ffffff',
                        }}
                      >
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div
                style={{
                  padding: '0.875rem',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    backgroundColor: tokens.colors.accent,
                    color: tokens.colors.buttonText,
                    border: 'none',
                    borderRadius: tokens.borderRadius.button,
                    fontSize: tokens.typography.fontSize.smallText,
                    fontWeight: tokens.typography.fontWeight.bold,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = tokens.colors.accentHover)}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = tokens.colors.accent)}
                >
                  <SafeIcon icon={FiIcons.FiPlus} size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: tokens.colors.secondaryText,
            }}
          >
            <p style={{ fontSize: tokens.typography.fontSize.bodyText, margin: 0 }}>
              No items found
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
