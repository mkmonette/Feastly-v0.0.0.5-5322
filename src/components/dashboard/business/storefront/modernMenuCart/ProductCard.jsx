import { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernMenuCart } from './ModernMenuCartContext';
import { formatCurrency } from '@/common/currency';

const ProductCard = ({ product }) => {
  const { tokens, addToCart } = useModernMenuCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.borderRadius.card,
        overflow: 'hidden',
        boxShadow: isHovered ? tokens.shadows.cardHover : tokens.shadows.card,
        transition: 'all 0.2s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ position: 'relative', width: '100%', paddingBottom: '75%', overflow: 'hidden' }}>
        <img
          src={product.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'}
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
        {product.is_featured && (
          <div
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              backgroundColor: tokens.colors.accent,
              color: '#ffffff',
              padding: '0.25rem 0.625rem',
              borderRadius: '12px',
              fontSize: tokens.typography.fontSize.smallText,
              fontWeight: tokens.typography.fontWeight.bold,
            }}
          >
            Featured
          </div>
        )}
      </div>

      <div style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <h3
          style={{
            fontFamily: tokens.typography.fontFamily.heading,
            fontSize: tokens.typography.fontSize.productTitle,
            fontWeight: tokens.typography.fontWeight.subheading,
            color: tokens.colors.primaryText,
            lineHeight: '1.3',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.6em',
          }}
        >
          {product.name}
        </h3>

        {product.description && (
          <p
            style={{
              fontSize: tokens.typography.fontSize.smallText,
              color: tokens.colors.secondaryText,
              lineHeight: '1.4',
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

        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
          <span
            style={{
              fontSize: tokens.typography.fontSize.productTitle,
              fontWeight: tokens.typography.fontWeight.bold,
              color: tokens.colors.accent,
            }}
          >
            {formatCurrency(product.price)}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            style={{
              backgroundColor: tokens.colors.accent,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tokens.colors.accentHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = tokens.colors.accent}
          >
            <SafeIcon icon={FiIcons.FiPlus} style={{ fontSize: '1.125rem' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
