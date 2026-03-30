import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useModernDashboard } from './ModernDashboardContext';
import { formatCurrency } from '../../../../../common/currency';

export const ProductCard = ({ product }) => {
  const { tokens, addToCart } = useModernDashboard();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: tokens.colors.cardBg,
        borderRadius: tokens.productCard.borderRadius,
        overflow: 'hidden',
        boxShadow: isHovered ? tokens.shadows.cardHover : tokens.shadows.card,
        transition: tokens.transitions.default,
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: tokens.productCard.imageHeight,
          overflow: 'hidden',
          background: tokens.colors.secondaryBg,
        }}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: tokens.transitions.default,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
            }}
          >
            🍽️
          </div>
        )}

        {product.is_featured && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: tokens.colors.accentColor,
              color: '#FFFFFF',
              padding: '0.25rem 0.75rem',
              borderRadius: tokens.borderRadius.full,
              fontSize: '0.75rem',
              fontWeight: '600',
              fontFamily: tokens.typography.fontFamily,
              boxShadow: tokens.shadows.button,
            }}
          >
            Featured
          </div>
        )}
      </div>

      <div
        style={{
          padding: tokens.productCard.contentPadding,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h3
          style={{
            fontSize: tokens.typography.productTitle.fontSize,
            fontWeight: tokens.typography.productTitle.fontWeight,
            lineHeight: tokens.typography.productTitle.lineHeight,
            fontFamily: tokens.typography.fontFamily,
            color: tokens.colors.primaryTextColor,
            margin: '0 0 0.5rem 0',
          }}
        >
          {product.name}
        </h3>

        {product.description && (
          <p
            style={{
              fontSize: '0.875rem',
              lineHeight: '1.5',
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.secondaryTextColor,
              margin: '0 0 1rem 0',
              flex: 1,
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
            marginTop: 'auto',
          }}
        >
          <span
            style={{
              fontSize: tokens.typography.productPrice.fontSize,
              fontWeight: tokens.typography.productPrice.fontWeight,
              lineHeight: tokens.typography.productPrice.lineHeight,
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.accentColor,
            }}
          >
            {formatCurrency(product.price)}
          </span>

          <button
            onClick={handleAddToCart}
            style={{
              background: tokens.colors.accentColor,
              color: '#FFFFFF',
              border: 'none',
              padding: '0.75rem',
              borderRadius: tokens.borderRadius.medium,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: tokens.shadows.button,
              transition: tokens.transitions.fast,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <FiPlus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
