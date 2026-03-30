import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProducts } from '@/context/ProductContext';
import { modernDashboardTokens } from '../modernDashboardTokens';

const ModernDashboardContext = createContext();

export const useModernDashboard = () => {
  const context = useContext(ModernDashboardContext);
  if (!context) {
    throw new Error('useModernDashboard must be used within ModernDashboardProvider');
  }
  return context;
};

export const ModernDashboardProvider = ({ children }) => {
  const { products, categories } = useProducts();
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [settings, setSettings] = useState({
    tokens: modernDashboardTokens,
    businessName: 'FoodiePinoy',
    tagline: 'Authentic Filipino Cuisine Delivered Fresh',
    heroImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920',

    sections: {
      header: { visible: true },
      hero: { visible: true },
      categoryPills: { visible: true },
      featuredProducts: { visible: true },
      productGrid: { visible: true },
      popularDishes: { visible: true },
      promoBanner: { visible: true },
      newItems: { visible: true },
      testimonials: { visible: true },
      about: { visible: true },
      footer: { visible: true }
    },

    stats: {
      totalItems: '250+',
      categories: '12',
      outlets: '5'
    },

    promo: {
      title: 'Limited Time Offer!',
      subtitle: 'Get 20% off on all orders above ₱500',
      ctaText: 'Order Now'
    },

    about: {
      title: 'About FoodiePinoy',
      description: 'We bring authentic Filipino flavors to your doorstep. Our chefs prepare every dish with love and traditional recipes passed down through generations. Experience the taste of home-cooked Filipino meals, made fresh daily with the finest ingredients.'
    },

    testimonials: [
      {
        id: 1,
        name: 'Maria Santos',
        rating: 5,
        text: 'Best Filipino food delivery! The adobo tastes just like my lola\'s recipe. Always fresh and delicious!'
      },
      {
        id: 2,
        name: 'Juan Reyes',
        rating: 5,
        text: 'Fast delivery and amazing flavors. The sinigang is perfectly sour and the meat is so tender!'
      },
      {
        id: 3,
        name: 'Ana Cruz',
        rating: 5,
        text: 'I order from FoodiePinoy every week. Consistent quality and generous portions. Highly recommended!'
      }
    ]
  });

  const addToCart = (product, quantity = 1) => {
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
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(p => p.featured).slice(0, 2);
  const popularProducts = products.slice(0, 6);
  const newProducts = products.slice(0, 4);

  const value = {
    settings,
    setSettings,
    products,
    categories,
    filteredProducts,
    featuredProducts,
    popularProducts,
    newProducts,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  };

  return (
    <ModernDashboardContext.Provider value={value}>
      {children}
    </ModernDashboardContext.Provider>
  );
};
