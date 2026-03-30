import { useState, useEffect } from 'react';
import { useModernDashboard } from './ModernDashboardContext';
import { Header } from './Header';
import { Hero } from './Hero';
import { CategoryTabs } from './CategoryTabs';
import { FeaturedProducts } from './FeaturedProducts';
import { ProductGrid } from './ProductGrid';
import { PopularDishes } from './PopularDishes';
import { PromoBanner } from './PromoBanner';
import { NewItems } from './NewItems';
import { Testimonials } from './Testimonials';
import { About } from './About';
import { Footer } from './Footer';
import { CartPanel } from './CartPanel';
import { CartOverlay } from './CartOverlay';

const ModernDashboardContent = ({ config, products, categories }) => {
  const { tokens } = useModernDashboard();
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products || []);
    } else {
      setFilteredProducts(
        (products || []).filter(p => p.category_id === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div
      style={{
        fontFamily: tokens.typography.fontFamily,
        background: tokens.colors.primaryBg,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
        <Header businessName={config?.businessName} logo={config?.logo} />

        <div style={{ display: 'flex', flex: 1 }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Hero
              title={config?.hero?.title}
              subtitle={config?.hero?.subtitle}
              backgroundImage={config?.hero?.backgroundImage}
              ctaText={config?.hero?.ctaText}
              ctaAction={() => console.log('CTA clicked')}
            />

            <CategoryTabs
              categories={categories}
              onCategoryChange={handleCategoryChange}
            />

            <FeaturedProducts products={products} />

            <ProductGrid
              products={filteredProducts}
              title={selectedCategory === 'all' ? 'All Dishes' : 'Dishes'}
            />

            <PopularDishes products={products} />

            <PromoBanner
              title={config?.promo?.title || 'Limited Time Offer'}
              description={config?.promo?.description || 'Get 20% off on your first order! Use code: FIRSTORDER'}
              ctaText={config?.promo?.ctaText || 'Order Now'}
              backgroundImage={config?.promo?.backgroundImage}
            />

            <NewItems products={products} />

            <Testimonials />

            <About
              title={config?.about?.title}
              description={config?.about?.description}
              image={config?.about?.image}
            />

            <Footer
              businessName={config?.businessName}
              contactInfo={config?.contactInfo}
            />
          </div>

          <div className="hidden lg:block">
            <CartPanel />
          </div>
        </div>

        <CartOverlay />
      </div>
  );
};

export const ModernDashboardRenderer = (props) => {
  return <ModernDashboardContent {...props} />;
};
