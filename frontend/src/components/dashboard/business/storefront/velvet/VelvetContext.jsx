import React, { createContext, useContext, useState } from 'react';
import { velvetTokens } from '../velvetTokens';
import { useProducts } from '@/context/ProductContext';

const VelvetContext = createContext();

export const useVelvet = () => {
  const ctx = useContext(VelvetContext);
  if (!ctx) throw new Error('useVelvet must be used within VelvetProvider');
  return ctx;
};

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

const defaultSectionsConfig = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      brand: 'Velvet',
      kitchenLabel: 'Kitchen No. 7',
      address: '42 Sunset Avenue · BGC',
      reserveLabel: 'Reserve a table',
    },
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      date: today,
      eyebrow: 'À la carte · This evening',
      headline: 'A short, considered menu.',
      subhead: 'Composed daily. Sourced quietly. Plated with intention.',
      quote: '“We cook only what we would happily serve our own table.”',
      quoteAttr: '— The kitchen',
    },
  },
  {
    id: 'menu',
    name: 'Menu',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'The menu',
      subtitle:
        'Tap any line to add it to your order. Substitutions cheerfully accepted.',
    },
  },
  {
    id: 'sidebar',
    name: 'Order card',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Your order',
      emptyMessage: 'A blank menu. Begin wherever your appetite leads.',
      diningLabel: 'Dining',
      takeawayLabel: 'Takeaway',
      reserveCta: 'Reserve a table',
      checkoutCta: 'Place order',
      footnote: 'A 10% service charge is included in your final bill.',
    },
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      brandLine: 'Velvet · Kitchen No. 7',
      address: '42 Sunset Avenue · Bonifacio Global City, Taguig',
      phone: '+63 917 555 0142',
      hours: 'Tuesday – Sunday · 18:00 — 23:30',
      sign: 'Composed by hand in Manila.',
    },
  },
];

export const VelvetProvider = ({ children }) => {
  const [tokens] = useState(velvetTokens);
  const [overrideTokens, setOverrideTokens] = useState({});
  const [sectionsConfig, setSectionsConfig] = useState(defaultSectionsConfig);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [diningMode, setDiningMode] = useState('dining'); // 'dining' | 'takeaway'

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
  const serviceCharge = cartSubtotal * 0.10;
  const cartTotal = cartSubtotal + serviceCharge;
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
    serviceCharge,
    cartTotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    isCartOpen,
    setIsCartOpen,
    diningMode,
    setDiningMode,
  };

  return <VelvetContext.Provider value={value}>{children}</VelvetContext.Provider>;
};
