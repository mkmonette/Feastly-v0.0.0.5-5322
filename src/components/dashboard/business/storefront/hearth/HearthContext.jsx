import React, { createContext, useContext, useState } from 'react';
import { hearthTokens } from '../hearthTokens';
import { useProducts } from '@/context/ProductContext';

const HearthContext = createContext();

export const useHearth = () => {
  const ctx = useContext(HearthContext);
  if (!ctx) throw new Error('useHearth must be used within HearthProvider');
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
      preText: 'Made from scratch',
      headline: 'Crafted with Soul',
      subtitle: 'Honest cooking rooted in tradition. Every dish tells a story of warmth, family, and real ingredients.',
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
      subtitle: 'Our most-loved dishes'
    }
  },
  {
    id: 'menu',
    name: 'Our Menu',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Our Menu',
      subtitle: 'Browse every dish we offer'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      businessName: 'HEARTH',
      address: '321 Hearth Way',
      phone: '+1 (555) 321-9876',
      hours: '11am - 10pm'
    }
  }
];

export const HearthProvider = ({ children }) => {
  const [tokens] = useState(hearthTokens);
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

  return <HearthContext.Provider value={value}>{children}</HearthContext.Provider>;
};
