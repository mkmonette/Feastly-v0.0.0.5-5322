import React from 'react';
import { useMinimalRecipe } from './MinimalRecipeContext';
import { minimalRecipeTokens as tokens } from '../minimalRecipeTokens';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Vegetable Soup',
    description: 'Heat olive oil in a large pot over medium-high heat.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
  },
  {
    id: 2,
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan and house dressing.',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg',
  },
  {
    id: 3,
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with seasonal vegetables and lemon.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg',
  },
  {
    id: 4,
    name: 'Pasta Primavera',
    description: 'Fresh pasta with garden vegetables in garlic oil.',
    price: 16.99,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
  },
  {
    id: 5,
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella and basil.',
    price: 18.99,
    image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg',
  },
  {
    id: 6,
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with ganache frosting.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg',
  },
];

const ProductCard = ({ product }) => {
  const { addToCart } = useMinimalRecipe();

  return (
    <div style={{
      backgroundColor: tokens.colors.background.primary,
      borderRadius: tokens.borderRadius.lg,
      overflow: 'hidden',
      boxShadow: tokens.shadows.sm,
      transition: 'all 0.3s',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        position: 'relative',
        paddingTop: '75%',
        backgroundColor: tokens.colors.background.secondary,
        overflow: 'hidden',
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div style={{
        padding: tokens.spacing.md,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: tokens.spacing.xs,
        }}>
          <h3 style={{
            fontFamily: tokens.fonts.heading,
            fontSize: '24px',
            fontWeight: '700',
            color: tokens.colors.text.primary,
            lineHeight: '1.2',
            margin: 0,
            flex: 1,
          }}>
            {product.name}
          </h3>
          <button
            onClick={() => addToCart(product)}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: tokens.colors.accent,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginLeft: tokens.spacing.sm,
              transition: 'transform 0.2s',
            }}
          >
            <SafeIcon icon={FiIcons.FiPlus} style={{ fontSize: '20px', color: tokens.colors.text.primary }} />
          </button>
        </div>

        <p style={{
          fontFamily: tokens.fonts.body,
          fontSize: '14px',
          color: tokens.colors.text.secondary,
          lineHeight: '1.5',
          margin: `${tokens.spacing.sm} 0`,
          flex: 1,
        }}>
          {product.description}
        </p>

        <div style={{
          fontFamily: tokens.fonts.body,
          fontSize: '16px',
          fontWeight: '600',
          color: tokens.colors.text.primary,
          marginTop: 'auto',
        }}>
          ${product.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  return (
    <section id="menu" style={{
      padding: `${tokens.spacing.xxl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.background.tertiary,
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: tokens.spacing.xl,
        }}>
          <h2 style={{
            fontFamily: tokens.fonts.heading,
            fontSize: '48px',
            fontWeight: '700',
            color: tokens.colors.text.primary,
            marginBottom: tokens.spacing.sm,
            letterSpacing: '-0.02em',
          }}>
            Our Menu
          </h2>
          <p style={{
            fontFamily: tokens.fonts.body,
            fontSize: '16px',
            color: tokens.colors.text.secondary,
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Discover our carefully curated selection of dishes
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: tokens.spacing.lg,
        }}>
          {SAMPLE_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
