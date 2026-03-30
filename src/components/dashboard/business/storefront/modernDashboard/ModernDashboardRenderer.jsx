import { useModernDashboard } from './ModernDashboardContext';
import { Header } from './Header';
import { Hero } from './Hero';
import { CategoryTabs } from './CategoryTabs';
import { FeaturedProducts } from './FeaturedProducts';
import { ProductGrid } from './ProductGrid';
import { PromoBanner } from './PromoBanner';
import { Testimonials } from './Testimonials';
import { About } from './About';
import { Footer } from './Footer';
import { CartPanel } from './CartPanel';

const ModernDashboardRenderer = () => {
  const { tokens, filteredProducts, popularProducts, newProducts } = useModernDashboard();
  const { colors, layout } = tokens;

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: colors.secondaryBg,
      fontFamily: tokens.typography.fontFamily,
    },
    leftSection: {
      width: layout.leftWidth,
      flex: '1 1 auto',
      overflowY: 'auto',
      minWidth: 0,
    },
    rightSection: {
      width: layout.rightWidth,
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <Header />
        <Hero />
        <CategoryTabs />
        <FeaturedProducts />
        <ProductGrid
          products={filteredProducts}
          title="Our Menu"
          subtitle="Browse our full selection of authentic Filipino dishes"
          sectionId="menu"
        />
        <ProductGrid
          products={popularProducts}
          title="Popular Dishes"
          subtitle="Customer favorites you'll love"
          sectionId="popular"
        />
        <PromoBanner />
        <ProductGrid
          products={newProducts}
          title="New Items"
          subtitle="Try our latest additions to the menu"
          sectionId="new"
        />
        <Testimonials />
        <About />
        <Footer />
      </div>
      <div style={styles.rightSection}>
        <CartPanel />
      </div>
    </div>
  );
};

export { ModernDashboardRenderer };
export default ModernDashboardRenderer;
