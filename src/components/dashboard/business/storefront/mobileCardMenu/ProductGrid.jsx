import React from 'react';
import { useProducts } from '@/context/ProductContext';
import { mobileCardMenuTokens as tokens } from '../mobileCardMenuTokens';
import { useMobileCardMenu } from './MobileCardMenuContext';
import { formatCurrency } from '@/common/currency';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

export default function ProductGrid() {
  const { products } = useProducts();
  const { addToCart, activeCategory } = useMobileCardMenu();

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
                backgroundColor: tokens.colors.surface,
                borderRadius: tokens.borderRadius.card,
                overflow: 'hidden',
                boxShadow: tokens.shadows.card,
                transition: 'box-shadow 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = tokens.shadows.cardHover;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = tokens.shadows.card;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {product.image && (
                <div
                  style={{
                    width: '100%',
                    height: '140px',
                    overflow: 'hidden',
                    backgroundColor: tokens.colors.background,
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
                </div>
              )}

              <div style={{ padding: tokens.spacing.cardPadding }}>
                <h3
                  style={{
                    fontSize: tokens.typography.fontSize.productTitle,
                    fontWeight: tokens.typography.fontWeight.subheading,
                    color: tokens.colors.primaryText,
                    margin: '0 0 0.25rem 0',
                    fontFamily: tokens.typography.fontFamily.heading,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {product.name}
                </h3>

                {product.description && (
                  <p
                    style={{
                      fontSize: tokens.typography.fontSize.smallText,
                      color: tokens.colors.secondaryText,
                      lineHeight: tokens.typography.lineHeight.body,
                      margin: '0 0 0.75rem 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {product.description}
                  </p>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0.75rem',
                  }}
                >
                  <div>
                    {product.salePrice ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                        <span
                          style={{
                            fontSize: tokens.typography.fontSize.productTitle,
                            fontWeight: tokens.typography.fontWeight.bold,
                            color: tokens.colors.accent,
                          }}
                        >
                          {formatCurrency(product.salePrice)}
                        </span>
                        <span
                          style={{
                            fontSize: tokens.typography.fontSize.smallText,
                            color: tokens.colors.secondaryText,
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
                          color: tokens.colors.primaryText,
                        }}
                      >
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: tokens.colors.accent,
                      color: tokens.colors.buttonText,
                      border: 'none',
                      borderRadius: tokens.borderRadius.button,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = tokens.colors.accentHover)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = tokens.colors.accent)}
                  >
                    <SafeIcon icon={FiIcons.FiPlus} size={18} />
                  </button>
                </div>
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
