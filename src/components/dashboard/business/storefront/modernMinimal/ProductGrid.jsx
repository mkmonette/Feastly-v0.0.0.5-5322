import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';

const ProductGrid = () => {
  const { tokens } = useModernMinimal();

  const products = [
    { id: 1, name: 'Truffle Pasta', price: 24, category: 'Pasta', image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 2, name: 'Grilled Salmon', price: 32, category: 'Seafood', image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, name: 'Caesar Salad', price: 14, category: 'Salads', image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 4, name: 'Ribeye Steak', price: 42, category: 'Steaks', image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 5, name: 'Margherita Pizza', price: 18, category: 'Pizza', image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 6, name: 'Lobster Risotto', price: 36, category: 'Pasta', image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600' }
  ];

  return (
    <section style={{ padding: `${tokens.spacing['2xl']} ${tokens.spacing.xl}` }}>
      <div style={{ marginBottom: tokens.spacing.xl }}>
        <h3
          style={{
            fontSize: tokens.typography.fontSize['2xl'],
            fontWeight: tokens.typography.fontWeight.bold,
            color: tokens.colors.text.primary,
            fontFamily: tokens.typography.fontFamily.primary,
            marginBottom: tokens.spacing.sm
          }}
        >
          Our Menu
        </h3>
        <p
          style={{
            fontSize: tokens.typography.fontSize.sm,
            color: tokens.colors.text.secondary,
            fontFamily: tokens.typography.fontFamily.primary
          }}
        >
          Hand-picked dishes prepared with care
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: tokens.spacing.lg
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: tokens.components.productCard.background,
              border: tokens.components.productCard.border,
              borderRadius: tokens.components.productCard.borderRadius,
              padding: tokens.components.productCard.padding,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
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
                height: '180px',
                borderRadius: tokens.borderRadius.md,
                overflow: 'hidden',
                marginBottom: tokens.spacing.md,
                background: tokens.colors.surface
              }}
            >
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
            <span
              style={{
                fontSize: tokens.typography.fontSize.xs,
                color: tokens.colors.text.tertiary,
                fontWeight: tokens.typography.fontWeight.medium,
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
                fontWeight: tokens.typography.fontWeight.semibold,
                color: tokens.colors.text.primary,
                fontFamily: tokens.typography.fontFamily.primary,
                marginBottom: tokens.spacing.sm
              }}
            >
              {product.name}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: tokens.typography.fontSize.lg,
                  fontWeight: tokens.typography.fontWeight.bold,
                  color: tokens.colors.text.primary,
                  fontFamily: tokens.typography.fontFamily.primary
                }}
              >
                ${product.price}
              </span>
              <button
                style={{
                  background: tokens.components.button.primary.background,
                  color: tokens.components.button.primary.color,
                  padding: '0.5rem 1rem',
                  borderRadius: tokens.components.button.primary.borderRadius,
                  fontSize: tokens.typography.fontSize.xs,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  fontFamily: tokens.typography.fontFamily.primary,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
