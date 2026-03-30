import { useModernDashboard } from './ModernDashboardContext';
import { ProductCard } from './ProductCard';

export const FeaturedProducts = ({ products }) => {
  const { tokens } = useModernDashboard();

  const featuredProducts = products?.filter(p => p.is_featured) || [];

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        padding: tokens.spacing.sectionPadding,
        background: tokens.colors.primaryBg,
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.containerMaxWidth,
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: tokens.typography.sectionTitle.fontSize,
              fontWeight: tokens.typography.sectionTitle.fontWeight,
              lineHeight: tokens.typography.sectionTitle.lineHeight,
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.primaryTextColor,
              margin: '0 0 0.5rem 0',
            }}
          >
            Featured Dishes
          </h2>
          <p
            style={{
              fontSize: tokens.typography.body.fontSize,
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.sectionTextColor,
              margin: 0,
            }}
          >
            Our chef's special selections
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: tokens.spacing.cardGap,
          }}
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
