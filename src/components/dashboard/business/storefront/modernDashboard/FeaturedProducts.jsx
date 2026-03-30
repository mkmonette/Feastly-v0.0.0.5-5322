import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useModernDashboard } from './ModernDashboardContext';
import { formatCurrency } from '@/common/currency';

const FeaturedProducts = () => {
  const { settings, featuredProducts, addToCart } = useModernDashboard();
  const { tokens } = settings;

  if (!settings.sections.featuredProducts.visible || featuredProducts.length === 0) return null;

  return (
    <section
      style={{
        padding: `${tokens.spacing.xl} ${tokens.spacing.xl}`,
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <Headline
        title="Featured Dishes"
        subtitle="Our chef's special recommendations"
        accentColor={tokens.sectionHighlightColor}
        textColor={tokens.primaryTextColor}
        subtitleColor={tokens.sectionTextColor}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: tokens.spacing.xl,
          marginTop: tokens.spacing.xl
        }}
      >
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: tokens.accentColor,
              borderRadius: tokens.borderRadiusLg,
              overflow: 'hidden',
              boxShadow: tokens.shadowXl,
              position: 'relative',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ position: 'relative', height: '280px' }}>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <SafeIcon icon={FiIcons.FiImage} size={48} style={{ color: '#FFFFFF', opacity: 0.5 }} />
                </div>
              )}
              <div
                style={{
                  position: 'absolute',
                  top: tokens.spacing.lg,
                  right: tokens.spacing.lg,
                  backgroundColor: '#FFD700',
                  color: '#1a1a1a',
                  padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
                  borderRadius: tokens.borderRadius,
                  fontSize: tokens.fontSize.xs,
                  fontWeight: tokens.fontWeight.bold,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Featured
              </div>
            </div>

            <div
              style={{
                padding: tokens.spacing.xl,
                color: '#FFFFFF'
              }}
            >
              <h3
                style={{
                  fontSize: tokens.fontSize.xl,
                  fontWeight: tokens.fontWeight.bold,
                  marginBottom: tokens.spacing.sm
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  fontSize: tokens.fontSize.sm,
                  opacity: 0.95,
                  marginBottom: tokens.spacing.lg,
                  lineHeight: 1.5
                }}
              >
                {product.description || 'Delicious and carefully prepared with the finest ingredients.'}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: tokens.spacing.lg
                }}
              >
                <div
                  style={{
                    fontSize: tokens.fontSize.xxl,
                    fontWeight: tokens.fontWeight.bold
                  }}
                >
                  {formatCurrency(product.price)}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: tokens.accentColor,
                    border: 'none',
                    borderRadius: tokens.borderRadius,
                    padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
                    fontSize: tokens.fontSize.sm,
                    fontWeight: tokens.fontWeight.semibold,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    transition: 'all 0.2s',
                    boxShadow: tokens.shadowMd
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <SafeIcon icon={FiIcons.FiShoppingCart} size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
