import React from 'react';
import { useModernMenuCart } from './ModernMenuCartContext';
import { useProducts } from '@/context/ProductContext';
import { formatCurrency } from '@/common/currency';
import { FiPlus } from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

export default function FeaturedProducts() {
  const { tokens, sectionsConfig, addToCart } = useModernMenuCart();
  const { products } = useProducts();
  const section = sectionsConfig.find(s => s.id === 'featured');

  if (!section?.visibility?.enabled) return null;

  const content = section.content || {};
  const featuredProducts = products
    .filter(p => p.flags?.featured && p.status === 'Active')
    .slice(0, 4);

  if (featuredProducts.length === 0) return null;

  return (
    <section style={{
      padding: tokens.spacing.sectionPadding,
      backgroundColor: tokens.colors.background
    }}>
      <div style={{
        maxWidth: tokens.layout.maxWidth,
        margin: '0 auto',
        padding: `0 ${tokens.spacing.lg}`
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: tokens.spacing.xl
        }}>
          <h2 style={{
            fontSize: tokens.typography.fontSize.sectionTitle,
            fontWeight: tokens.typography.fontWeight.bold,
            color: tokens.colors.text,
            margin: 0
          }}>
            <span style={{ color: tokens.colors.sectionHeadlineNormal }}>
              {content.titlePre}{' '}
            </span>
            <span style={{ color: tokens.colors.sectionHeadlineHighlight }}>
              {content.titleHighlight}
            </span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: tokens.spacing.lg
        }}>
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                ...tokens.components.card,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = tokens.components.card.hoverShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = tokens.components.card.shadow;
              }}
            >
              <div style={{
                width: '100%',
                height: '200px',
                borderRadius: tokens.borderRadius.lg,
                overflow: 'hidden',
                marginBottom: tokens.spacing.md,
                backgroundColor: tokens.colors.surfaceHover
              }}>
                <img
                  src={product.imageUrl || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <h3 style={{
                fontSize: tokens.typography.fontSize.productTitle,
                fontWeight: tokens.typography.fontWeight.semibold,
                color: tokens.colors.text,
                margin: `0 0 ${tokens.spacing.sm} 0`
              }}>
                {product.name}
              </h3>

              {product.description && (
                <p style={{
                  fontSize: tokens.typography.fontSize.sm,
                  color: tokens.colors.textLight,
                  margin: `0 0 ${tokens.spacing.md} 0`,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {product.description}
                </p>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: tokens.typography.fontSize.lg,
                  fontWeight: tokens.typography.fontWeight.bold,
                  color: tokens.colors.primary
                }}>
                  {formatCurrency(product.price)}
                </span>

                <button
                  onClick={() => addToCart(product)}
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    background: tokens.colors.primary,
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = tokens.colors.primaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = tokens.colors.primary;
                  }}
                >
                  <SafeIcon icon={FiPlus} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
