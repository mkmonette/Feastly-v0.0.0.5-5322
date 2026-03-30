import { useModernDashboard } from './ModernDashboardContext';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products, title, showTitle = true }) => {
  const { tokens } = useModernDashboard();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        padding: tokens.spacing.sectionPadding,
        background: tokens.colors.secondaryBg,
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.containerMaxWidth,
          margin: '0 auto',
        }}
      >
        {showTitle && title && (
          <h2
            style={{
              fontSize: tokens.typography.sectionTitle.fontSize,
              fontWeight: tokens.typography.sectionTitle.fontWeight,
              lineHeight: tokens.typography.sectionTitle.lineHeight,
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.primaryTextColor,
              margin: '0 0 2rem 0',
            }}
          >
            {title}
          </h2>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: tokens.spacing.cardGap,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
