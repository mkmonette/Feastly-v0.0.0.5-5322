import { useModernDashboard } from './ModernDashboardContext';
import { ProductCard } from './ProductCard';

export const NewItems = ({ products }) => {
  const { tokens } = useModernDashboard();

  if (!products || products.length === 0) {
    return null;
  }

  const sortedProducts = [...products]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4);

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
            New on the Menu
          </h2>
          <p
            style={{
              fontSize: tokens.typography.body.fontSize,
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.sectionTextColor,
              margin: 0,
            }}
          >
            Fresh additions to try
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: tokens.spacing.cardGap,
          }}
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
