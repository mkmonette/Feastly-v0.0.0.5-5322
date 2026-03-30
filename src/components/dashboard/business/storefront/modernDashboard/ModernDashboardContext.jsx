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

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Adobo',
    description: 'Classic Filipino chicken adobo with soy sauce and vinegar',
    price: 180,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'main',
    featured: true,
    popular: true,
  },
  {
    id: 2,
    name: 'Sinigang',
    description: 'Sour tamarind soup with pork and vegetables',
    price: 160,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'soup',
    featured: true,
  },
  {
    id: 3,
    name: 'Lumpia',
    description: 'Crispy Filipino spring rolls with sweet chili sauce',
    price: 120,
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'appetizer',
    popular: true,
    new: true,
  },
  {
    id: 4,
    name: 'Kare-Kare',
    description: 'Oxtail and vegetables in peanut sauce',
    price: 220,
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'main',
    featured: true,
  },
  {
    id: 5,
    name: 'Pancit Canton',
    description: 'Stir-fried noodles with chicken and vegetables',
    price: 140,
    image: 'https://images.pexels.com/photos/1907228/pexels-photo-1907228.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'noodles',
    popular: true,
  },
  {
    id: 6,
    name: 'Sisig',
    description: 'Sizzling chopped pork with onions and chili',
    price: 190,
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'main',
    new: true,
  },
  {
    id: 7,
    name: 'Halo-Halo',
    description: 'Classic Filipino dessert with shaved ice and sweet beans',
    price: 90,
    image: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'dessert',
    featured: true,
  },
  {
    id: 8,
    name: 'Lechon Kawali',
    description: 'Crispy deep-fried pork belly',
    price: 210,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'main',
    popular: true,
  },
  {
    id: 9,
    name: 'Bicol Express',
    description: 'Spicy pork in coconut milk',
    price: 170,
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'main',
    new: true,
  },
];

const SAMPLE_CATEGORIES = [
  { id: 'main', name: 'Main Dishes' },
  { id: 'soup', name: 'Soups' },
  { id: 'appetizer', name: 'Appetizers' },
  { id: 'noodles', name: 'Noodles' },
  { id: 'dessert', name: 'Desserts' },
];

export const ModernDashboardProvider = ({ children, products, categories }) => {
  const finalProducts = products && products.length > 0 ? products : SAMPLE_PRODUCTS;
  const finalCategories = categories && categories.length > 0 ? categories : SAMPLE_CATEGORIES;
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

  const filteredProducts = finalProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = finalProducts.filter(p => p.featured).slice(0, 6);
  const popularProducts = finalProducts.filter(p => p.popular).slice(0, 6);
  const newProducts = finalProducts.filter(p => p.new).slice(0, 6);

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
    products: finalProducts,
    filteredProducts,
    featuredProducts,
    popularProducts,
    newProducts,
    categories: finalCategories
  };

  return (
    <ModernDashboardContext.Provider value={value}>
      {children}
    </ModernDashboardContext.Provider>
  );
};
