import React, { createContext, useContext, useState } from 'react';
import { quickOrderTokens } from '../quickOrderTokens';
import { useProducts } from '@/context/ProductContext';

const QuickOrderContext = createContext();

export const useQuickOrder = () => {
  const context = useContext(QuickOrderContext);
  if (!context) {
    throw new Error('useQuickOrder must be used within QuickOrderProvider');
  }
  return context;
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
      preText: 'Quick & Easy',
      headline: 'Order Food Online',
      headlineHighlight: 'Online',
      description: 'Browse our menu and place your order in minutes'
    }
  },
  {
    id: 'categories',
    name: 'Category Tabs',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
  },
  {
    id: 'products',
    name: 'Product Grid',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
  },
  {
    id: 'cart',
    name: 'Cart Panel',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
  }
];

export const QuickOrderProvider = ({ children }) => {
  const [tokens, setTokens] = useState(quickOrderTokens);
  const [overrideTokens, setOverrideTokens] = useState({});
  const [sectionsConfig, setSectionsConfig] = useState(defaultSectionsConfig);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  const { products } = useProducts();

  const mergedTokens = {
    colors: { ...tokens.colors, ...overrideTokens.colors },
    typography: { ...tokens.typography, ...overrideTokens.typography },
    layout: { ...tokens.layout, ...overrideTokens.layout },
    effects: { ...tokens.effects, ...overrideTokens.effects }
  };

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
  };

  const resetTokens = () => {
    setOverrideTokens({});
  };

  const saveTokens = () => {
    console.log('Saving tokens and sections config...', { overrideTokens, sectionsConfig });
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category?.toLowerCase() === selectedCategory);

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
    filteredProducts,
    cartItems,
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    selectedCategory,
    setSelectedCategory,
    checkoutData,
    setCheckoutData
  };

  return (
    <QuickOrderContext.Provider value={value}>
      {children}
    </QuickOrderContext.Provider>
  );
};
