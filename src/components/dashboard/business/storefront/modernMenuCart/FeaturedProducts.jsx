import { useModernMenuCart } from './ModernMenuCartContext';
import ProductCard from './ProductCard';

const FeaturedProducts = ({ products = [] }) => {
  const { tokens } = useModernMenuCart();

  const featuredProducts = products.filter(p => p.is_featured);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section style={{ padding: '1.5rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2
          style={{
            fontFamily: tokens.typography.fontFamily.heading,
            fontSize: tokens.typography.fontSize.sectionTitle,
            fontWeight: tokens.typography.fontWeight.heading,
            color: tokens.colors.sectionHeadlineNormal,
          }}
        >
          <span style={{ color: tokens.colors.sectionHeadlineHighlight }}>Featured</span> Dishes
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
