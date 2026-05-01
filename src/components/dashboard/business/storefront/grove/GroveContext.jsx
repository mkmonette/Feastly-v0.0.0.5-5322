import React, { createContext, useContext, useState } from 'react';
import { groveTokens } from '../groveTokens';
import { useProducts } from '@/context/ProductContext';

const GroveContext = createContext();

export const useGrove = () => {
  const ctx = useContext(GroveContext);
  if (!ctx) throw new Error('useGrove must be used within GroveProvider');
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
      preText: 'Fresh menu daily',
      headline: 'Farm to Table',
      subtitle: 'Fresh ingredients, bold flavors, and meals crafted with care.\nExplore our full menu and order your favorites.',
      backgroundImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      stats: [
        { value: '24+', label: 'Menu Items' },
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
      subtitle: 'Most loved by our customers'
    }
  },
  {
    id: 'menu',
    name: 'Our Menu',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Our Menu',
      subtitle: 'Browse our full selection of dishes'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      businessName: 'GROVE',
      address: '123 Grove St',
      phone: '+1 (555) 123-4567',
      hours: '11am – 10pm'
    }
  }
];

export const GroveProvider = ({ children }) => {
  const [tokens] = useState(groveTokens);
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

  return <GroveContext.Provider value={value}>{children}</GroveContext.Provider>;
};
