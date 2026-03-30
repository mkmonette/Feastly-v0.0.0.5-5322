import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { modernDashboardTokens } from '../modernDashboardTokens';

const ModernDashboardContext = createContext();

export const useModernDashboard = () => {
  const context = useContext(ModernDashboardContext);
  if (!context) {
    throw new Error('useModernDashboard must be used within ModernDashboardProvider');
  }
  return context;
};

export const ModernDashboardProvider = ({ children, products = [], categories = [] }) => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const popularProducts = products.filter(p => p.popular).slice(0, 6);
  const newProducts = products.filter(p => p.new).slice(0, 6);

  const value = {
    tokens: modernDashboardTokens,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    products,
    filteredProducts,
    featuredProducts,
    popularProducts,
    newProducts,
    categories
  };

  return (
    <ModernDashboardContext.Provider value={value}>
      {children}
    </ModernDashboardContext.Provider>
  );
};
