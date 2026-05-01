import React, { createContext, useContext, useState } from 'react';
import { emberTokens } from '../emberTokens';
import { useProducts } from '@/context/ProductContext';

const EmberContext = createContext();

export const useEmber = () => {
  const ctx = useContext(EmberContext);
  if (!ctx) throw new Error('useEmber must be used within EmberProvider');
  return ctx;
};

const defaultSectionsConfig = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      preText: 'Open late night',
      headline: 'Night Kitchen',
      subtitle: 'Curated late-night dining. Bold flavors served after dark.',
      backgroundImage: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
      stats: [
        { value: '24+', label: 'Dishes' },
        { value: '30 min', label: 'Delivery' },
        { value: '4.9', label: 'Rating', star: true }
      ]
    }
  },
  {
    id: 'popular',
    name: 'Popular Picks',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Popular Picks',
      subtitle: 'Fan favorites from our kitchen'
    }
  },
  {
    id: 'menu',
    name: 'Full Menu',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Full Menu',
      subtitle: 'Everything we have to offer'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      businessName: 'EMBER',
      address: '456 Ember Lane',
      phone: '+1 (555) 987-6543',
      hours: '5pm – 2am'
    }
  }
];

export const EmberProvider = ({ children }) => {
  const [tokens] = useState(emberTokens);
  const [overrideTokens, setOverrideTokens] = useState({});
  const [sectionsConfig, setSectionsConfig] = useState(defaultSectionsConfig);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products } = useProducts();

  const mergedTokens = {
    ...tokens,
    colors: { ...tokens.colors, ...overrideTokens.colors }
  };

  const updateSection = (sectionId, updates) =>
    setSectionsConfig(prev => prev.map(s => s.id === sectionId ? { ...s, ...updates } : s));

  const resetTokens = () => setOverrideTokens({});
  const saveTokens = () => {};

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(i => i.id !== id));

  const updateCartQuantity = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => setCartItems([]);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartItemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const value = {
    tokens: mergedTokens,
    overrideTokens,
    setOverrideTokens,
    sectionsConfig,
    updateSection,
    resetTokens,
    saveTokens,
    previewDevice,
    setPreviewDevice,
    products,
    cartItems,
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen
  };

  return <EmberContext.Provider value={value}>{children}</EmberContext.Provider>;
};
