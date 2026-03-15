import React from 'react';
import { useProducts } from '@/context/ProductContext';
import { mobileCompactMenuTokens as tokens } from '../mobileCompactMenuTokens';
import { useMobileCompactMenu } from './MobileCompactMenuContext';
import { formatCurrency } from '@/common/currency';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

export default function ProductGrid() {
  const { products } = useProducts();
  const { addToCart, activeCategory } = useMobileCompactMenu();

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
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: tokens.shadows.card,
                transition: 'box-shadow 0.2s',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                padding: tokens.spacing.cardPadding,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = tokens.shadows.cardHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = tokens.shadows.card;
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.625rem' }}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: tokens.borderRadius.image,
                      flexShrink: 0,
                    }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: tokens.typography.fontSize.productTitle,
                      fontWeight: tokens.typography.fontWeight.subheading,
                      color: tokens.colors.primaryText,
                      margin: '0 0 0.25rem 0',
                      fontFamily: tokens.typography.fontFamily.heading,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '1.3',
                    }}
                  >
                    {product.name}
                  </h3>
                  <div>
                    {product.salePrice ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span
                          style={{
                            fontSize: tokens.typography.fontSize.bodyText,
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
                          fontSize: tokens.typography.fontSize.bodyText,
                          fontWeight: tokens.typography.fontWeight.bold,
                          color: tokens.colors.primaryText,
                        }}
                      >
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => addToCart(product)}
                style={{
                  padding: '0.5rem',
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
                  gap: '0.375rem',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = tokens.colors.accentHover)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = tokens.colors.accent)}
              >
                <SafeIcon icon={FiIcons.FiPlus} size={14} />
                Add
              </button>
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
