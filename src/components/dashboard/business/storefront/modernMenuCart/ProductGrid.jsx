import { useModernMenuCart } from './ModernMenuCartContext';
import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], title }) => {
  const { tokens } = useModernMenuCart();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section style={{ padding: '1.5rem 1rem' }}>
      {title && (
        <h2
          style={{
            fontFamily: tokens.typography.fontFamily.heading,
            fontSize: tokens.typography.fontSize.sectionTitle,
            fontWeight: tokens.typography.fontWeight.heading,
            color: tokens.colors.sectionHeadlineNormal,
            marginBottom: '1rem',
          }}
        >
          {title}
        </h2>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
