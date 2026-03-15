import React from 'react';
import { useModernGradient } from './ModernGradientContext';
import { useProducts } from '@/context/ProductContext';
import { formatCurrency } from '@/common/currency';

const FeaturedProducts = () => {
  const { tokens, sectionsConfig } = useModernGradient();
  const { products } = useProducts();

  const section = sectionsConfig.find(s => s.id === 'featured');
  const content = section?.content || {};

  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  if (featuredProducts.length === 0) return null;

  return (
    <section
      style={{
        padding: `${tokens.spacing['3xl']} ${tokens.spacing.xl}`,
        background: tokens.colors.background
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: tokens.spacing['2xl'] }}>
          <div
            style={{
              fontSize: tokens.typography.fontSize.sm,
              fontWeight: tokens.typography.fontWeight.semibold,
              background: `linear-gradient(135deg, ${tokens.colors.gradients.primary.from}, ${tokens.colors.gradients.primary.to})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: tokens.spacing.md
            }}
          >
            {content.subtitle}
          </div>
          <h2
            style={{
              fontSize: tokens.typography.fontSize['3xl'],
              fontWeight: tokens.typography.fontWeight.bold,
              color: tokens.colors.text.primary,
              lineHeight: tokens.typography.lineHeight.tight
            }}
          >
            {content.titlePre} <span style={{ background: `linear-gradient(135deg, ${tokens.colors.gradients.primary.from}, ${tokens.colors.gradients.primary.to})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{content.titleHighlight}</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: tokens.spacing.xl }}>
          {featuredProducts.map(product => (
            <div
              key={product.id}
              style={{
                background: tokens.colors.surface,
                borderRadius: tokens.borderRadius.lg,
                overflow: 'hidden',
                boxShadow: tokens.shadows.lg,
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = tokens.shadows.xl;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = tokens.shadows.lg;
              }}
            >
              {product.image_url && (
                <div style={{ position: 'relative' }}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `linear-gradient(135deg, ${tokens.colors.gradients.primary.from}20, ${tokens.colors.gradients.primary.to}20)` }} />
                </div>
              )}
              <div style={{ padding: tokens.spacing.lg }}>
                <h3
                  style={{
                    fontSize: tokens.typography.fontSize.lg,
                    fontWeight: tokens.typography.fontWeight.bold,
                    color: tokens.colors.text.primary,
                    marginBottom: tokens.spacing.xs
                  }}
                >
                  {product.name}
                </h3>
                {product.description && (
                  <p
                    style={{
                      fontSize: tokens.typography.fontSize.sm,
                      color: tokens.colors.text.secondary,
                      marginBottom: tokens.spacing.md,
                      lineHeight: tokens.typography.lineHeight.relaxed
                    }}
                  >
                    {product.description}
                  </p>
                )}
                <div
                  style={{
                    fontSize: tokens.typography.fontSize.xl,
                    fontWeight: tokens.typography.fontWeight.bold,
                    background: `linear-gradient(135deg, ${tokens.colors.gradients.primary.from}, ${tokens.colors.gradients.primary.to})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {formatCurrency(product.price)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
