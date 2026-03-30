import { useModernMenuCart } from './ModernMenuCartContext';
import ProductCard from './ProductCard';

const NewItems = ({ products = [] }) => {
  const { tokens } = useModernMenuCart();

  const newProducts = [...products]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4);

  if (newProducts.length === 0) {
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
        <span style={{ color: tokens.colors.sectionHeadlineHighlight }}>New</span> Arrivals
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewItems;
