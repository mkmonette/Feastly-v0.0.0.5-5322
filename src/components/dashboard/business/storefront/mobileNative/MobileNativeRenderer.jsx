import React, { useState, useMemo } from 'react';
import { useMobileNative } from './MobileNativeContext';
import Header from './Header';
import SearchBar from './SearchBar';
import CategoryTabs from './CategoryTabs';
import ProductGrid from './ProductGrid';
import CartDrawer from './CartDrawer';

const MobileNativeRenderer = () => {
  const { tokens, products } = useMobileNative();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <div
      className={`min-h-screen ${tokens.typography.fontPrimary}`}
      style={{ backgroundColor: tokens.colors.background }}
    >
      <Header onCartClick={() => setIsCartOpen(true)} />
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ProductGrid products={filteredProducts} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default MobileNativeRenderer;
