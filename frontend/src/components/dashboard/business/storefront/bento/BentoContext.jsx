import React, { createContext, useContext, useState } from 'react';
import { bentoTokens } from '../bentoTokens';
import { useProducts } from '@/context/ProductContext';

const BentoContext = createContext();

export const useBento = () => {
  const ctx = useContext(BentoContext);
  if (!ctx) throw new Error('useBento must be used within BentoProvider');
  return ctx;
};

const defaultSectionsConfig = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      brand: 'Bento',
      tagline: 'A modular kitchen',
    },
  },
  {
    id: 'menu',
    name: 'Bento menu',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'The kitchen, in tiles',
      subtitle:
        'Build a meal the way we plate it: little squares of something good. Tap a tile to add it.',
      promo: {
        eyebrow: 'Bundle of the day',
        title: 'Three picks · one price',
        copy: 'Mix any three small plates and we knock 15% off — no code, applied at checkout.',
        cta: 'Build a bundle',
      },
    },
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      address: '42 Sunset Avenue · BGC, Taguig',
      phone: '+63 917 555 0142',
      hours: 'Daily · 11:00 — 23:00',
    },
  },
];

export const BentoProvider = ({ children }) => {
  const [tokens] = useState(bentoTokens);
  const [overrideTokens, setOverrideTokens] = useState({});
  const [sectionsConfig, setSectionsConfig] = useState(defaultSectionsConfig);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const productsCtx = useProducts();
  const products = productsCtx?.products || [];

  const mergedTokens = {
    colors: { ...tokens.colors, ...overrideTokens.colors },
    typography: { ...tokens.typography, ...overrideTokens.typography },
    effects: { ...tokens.effects, ...overrideTokens.effects },
  };

  const updateSection = (sectionId, updates) => {
    setSectionsConfig((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, ...updates } : s))
    );
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      setIsCartOpen(true);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    );
  };

  const cartSubtotal = cartItems.reduce(
    (sum, i) => sum + parseFloat(i.salePrice || i.price || 0) * i.quantity,
    0
  );
  const cartItemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const value = {
    tokens: mergedTokens,
    overrideTokens,
    setOverrideTokens,
    sectionsConfig,
    updateSection,
    resetTokens: () => setOverrideTokens({}),
    saveTokens: () => {},
    previewDevice,
    setPreviewDevice,
    products,
    cartItems,
    cartItemCount,
    cartSubtotal,
    cartTotal: cartSubtotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    isCartOpen,
    setIsCartOpen,
  };

  return <BentoContext.Provider value={value}>{children}</BentoContext.Provider>;
};
