import { useModernMenuCart } from './ModernMenuCartContext';
import Header from './Header';
import Hero from './Hero';
import CategoryTabs from './CategoryTabs';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import PopularDishes from './PopularDishes';
import PromoBanner from './PromoBanner';
import NewItems from './NewItems';
import Testimonials from './Testimonials';
import About from './About';
import Footer from './Footer';
import CartPanel from './CartPanel';

export const ModernMenuCartRenderer = ({ config, products = [], categories = [] }) => {
  const { tokens } = useModernMenuCart();

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: tokens.colors.background,
        fontFamily: tokens.typography.fontFamily.body,
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 'calc(100% - 380px)' }}>
        <Header config={config} />

        <main style={{ flex: 1 }}>
          <Hero config={config} />

          <CategoryTabs categories={categories} />

          <FeaturedProducts products={products} />

          <ProductGrid products={products} title="All Menu Items" />

          <PopularDishes products={products} />

          <PromoBanner />

          <NewItems products={products} />

          <Testimonials />

          <About config={config} />

          <Footer config={config} />
        </main>
      </div>

      <CartPanel />
    </div>
  );
};

export default ModernMenuCartRenderer;
