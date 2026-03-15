import React from 'react';
import { useModernGradient } from './ModernGradientContext';

const ProductGrid = () => {
  const { tokens } = useModernGradient();

  const products = [
    { id: 1, name: 'Rainbow Bowl', price: 22, category: 'Bowls', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, name: 'Sunset Sushi', price: 28, category: 'Sushi', image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, name: 'Tropical Smoothie', price: 12, category: 'Drinks', image: 'https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 4, name: 'Colorful Tacos', price: 18, category: 'Tacos', image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 5, name: 'Berry Parfait', price: 14, category: 'Desserts', image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 6, name: 'Gourmet Burger', price: 24, category: 'Burgers', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600' }
  ];

  const gradients = [
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  ];

  return (
    <section style={{ padding: `${tokens.spacing['2xl']} ${tokens.spacing.xl}` }}>
      <div style={{ marginBottom: tokens.spacing.xl }}>
        <h3
          style={{
            fontSize: tokens.typography.fontSize['2xl'],
            fontWeight: tokens.typography.fontWeight.extrabold,
            color: tokens.colors.text.primary,
            fontFamily: tokens.typography.fontFamily.primary,
            marginBottom: tokens.spacing.sm
          }}
        >
          Featured Dishes
        </h3>
        <p
          style={{
            fontSize: tokens.typography.fontSize.sm,
            color: tokens.colors.text.secondary,
            fontFamily: tokens.typography.fontFamily.primary
          }}
        >
          A vibrant collection of our chef's specialties
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: tokens.spacing.lg
        }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{
              background: tokens.components.productCard.background,
              border: tokens.components.productCard.border,
              borderRadius: tokens.components.productCard.borderRadius,
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = tokens.components.productCard.hover.shadow;
              e.currentTarget.style.transform = tokens.components.productCard.hover.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                width: '100%',
                height: '200px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: gradients[index],
                  opacity: 0.15,
                  zIndex: 1
                }}
              />
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{ padding: tokens.components.productCard.padding }}>
              <span
                style={{
                  fontSize: tokens.typography.fontSize.xs,
                  color: tokens.colors.text.tertiary,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  fontFamily: tokens.typography.fontFamily.primary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: tokens.spacing.xs
                }}
              >
                {product.category}
              </span>
              <h4
                style={{
                  fontSize: tokens.typography.fontSize.base,
                  fontWeight: tokens.typography.fontWeight.bold,
                  color: tokens.colors.text.primary,
                  fontFamily: tokens.typography.fontFamily.primary,
                  marginBottom: tokens.spacing.md
                }}
              >
                {product.name}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: tokens.typography.fontSize.lg,
                    fontWeight: tokens.typography.fontWeight.extrabold,
                    color: tokens.colors.text.primary,
                    fontFamily: tokens.typography.fontFamily.primary
                  }}
                >
                  ${product.price}
                </span>
                <button
                  style={{
                    background: gradients[index],
                    color: '#FFFFFF',
                    padding: '0.5rem 1.25rem',
                    borderRadius: tokens.borderRadius.md,
                    fontSize: tokens.typography.fontSize.xs,
                    fontWeight: tokens.typography.fontWeight.bold,
                    fontFamily: tokens.typography.fontFamily.primary,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s, transform 0.2s',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '0.9';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
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

export default ProductGrid;
