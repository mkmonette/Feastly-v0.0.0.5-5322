import { useModernMenuCart } from './ModernMenuCartContext';
import ProductCard from './ProductCard';

const PopularDishes = ({ products = [] }) => {
  const { tokens } = useModernMenuCart();

  const sortedProducts = [...products].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  }).slice(0, 4);

  if (sortedProducts.length === 0) {
    return null;
  }

  return (
    <section style={{ padding: '1.5rem 1rem' }}>
      <h2
        style={{
          fontFamily: tokens.typography.fontFamily.heading,
          fontSize: tokens.typography.fontSize.sectionTitle,
          fontWeight: tokens.typography.fontWeight.heading,
          color: tokens.colors.sectionHeadlineNormal,
          marginBottom: '1rem',
        }}
      >
        <span style={{ color: tokens.colors.sectionHeadlineHighlight }}>Popular</span> Dishes
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PopularDishes;
