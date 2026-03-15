import React from 'react';
import { useProducts } from '@/context/ProductContext';
import { modernSplitCartTokens as tokens } from '../modernSplitCartTokens';
import { useStorefront } from './contextBridge';
import { useModernSplitCart } from './ModernSplitCartContext';
import { formatCurrency } from '@/common/currency';
import Headline from '../Headline';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

export default function ProductGrid() {
  const { sectionsConfig } = useStorefront();
  const { products } = useProducts();
  const { addToCart } = useModernSplitCart();

  const productGridSection = sectionsConfig.find(s => s.id === 'productGrid');

  if (!productGridSection?.visible) return null;

  const content = productGridSection.content || {};
  const availableProducts = products?.filter(p => p.available) || [];

  return (
    <section
      style={{
        padding: '4rem 2rem',
        backgroundColor: tokens.colors.surface,
      }}
    >
      <div style={{ marginBottom: '3rem' }}>
        <Headline
          normalText={content.title || 'Our'}
          highlightText={content.titleHighlight || 'Menu'}
          tokens={tokens}
          as="h2"
          style={{
            fontSize: tokens.typography.fontSize.sectionTitle,
            fontWeight: tokens.typography.fontWeight.heading,
            fontFamily: tokens.typography.fontFamily.heading,
            lineHeight: tokens.typography.lineHeight.heading,
            margin: '0 0 1rem 0',
          }}
        />
        {content.description && (
          <p
            style={{
              fontSize: tokens.typography.fontSize.bodyText,
              color: tokens.colors.secondaryText,
              lineHeight: tokens.typography.lineHeight.body,
              margin: 0,
            }}
          >
            {content.description}
          </p>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: tokens.spacing.gridGap,
        }}
      >
        {availableProducts.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: tokens.colors.surface,
              border: `1px solid ${tokens.colors.border}`,
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
                  height: '200px',
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
                  margin: '0 0 0.5rem 0',
                  fontFamily: tokens.typography.fontFamily.heading,
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
                    margin: '0 0 1rem 0',
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
                  marginTop: '1rem',
                }}
              >
                <div>
                  {product.salePrice ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                    padding: '0.5rem 1rem',
                    backgroundColor: tokens.colors.accent,
                    color: tokens.colors.buttonText,
                    border: 'none',
                    borderRadius: tokens.borderRadius.button,
                    fontSize: tokens.typography.fontSize.smallText,
                    fontWeight: tokens.typography.fontWeight.bold,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = tokens.colors.accentHover)}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = tokens.colors.accent)}
                >
                  <SafeIcon icon={FiIcons.FiPlus} size={14} />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
