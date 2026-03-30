import { useModernDashboard } from './ModernDashboardContext';
import { formatCurrency } from '../../../../../common/currency';

export const ProductGrid = ({ products, title, subtitle, sectionId }) => {
  const { tokens, addToCart } = useModernDashboard();
  const { colors, typography, components, spacing } = tokens;

  if (!products || products.length === 0) {
    return null;
  }

  const styles = {
    section: {
      padding: spacing.sectionPadding,
      backgroundColor: colors.cardBg,
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: typography.h2Size,
      fontWeight: typography.headingWeight,
      color: colors.primaryTextColor,
      marginBottom: '0.5rem',
      fontFamily: typography.fontFamily,
    },
    subtitle: {
      fontSize: typography.bodySize,
      color: colors.sectionTextColor,
      fontFamily: typography.fontFamily,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      backgroundColor: colors.cardBg,
      borderRadius: components.productCard.borderRadius,
      padding: components.productCard.padding,
      boxShadow: components.productCard.shadow,
      transition: components.card.transition,
      cursor: 'pointer',
      border: `1px solid ${colors.borderColor}`,
    },
    imageContainer: {
      width: '100%',
      height: components.productCard.imageHeight,
      borderRadius: components.productCard.imageBorderRadius,
      overflow: 'hidden',
      marginBottom: components.productCard.spacing,
      backgroundColor: colors.secondaryBg,
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    productName: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: colors.primaryTextColor,
      fontFamily: typography.fontFamily,
    },
    description: {
      fontSize: typography.smallSize,
      color: colors.secondaryTextColor,
      lineHeight: '1.5',
      fontFamily: typography.fontFamily,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '0.75rem',
    },
    price: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: colors.primaryTextColor,
      fontFamily: typography.fontFamily,
    },
    addButton: {
      backgroundColor: colors.accentColor,
      color: '#FFFFFF',
      padding: '0.625rem 1.25rem',
      borderRadius: components.button.borderRadius,
      fontSize: typography.smallSize,
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: components.button.transition,
      fontFamily: typography.fontFamily,
    },
  };

  return (
    <section style={styles.section} id={sectionId}>
      {title && (
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div style={styles.grid}>
        {products.map(product => (
          <div
            key={product.id}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = components.productCard.hoverShadow;
              e.currentTarget.style.transform = 'translateY(-4px)';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = components.productCard.shadow;
              e.currentTarget.style.transform = 'none';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            <div style={styles.imageContainer}>
              <img
                src={product.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'}
                alt={product.name}
                style={styles.image}
              />
            </div>
            <div style={styles.content}>
              <h3 style={styles.productName}>{product.name}</h3>
              {product.description && (
                <p style={styles.description}>{product.description}</p>
              )}
              <div style={styles.footer}>
                <span style={styles.price}>{formatCurrency(product.price)}</span>
                <button
                  style={styles.addButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
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
