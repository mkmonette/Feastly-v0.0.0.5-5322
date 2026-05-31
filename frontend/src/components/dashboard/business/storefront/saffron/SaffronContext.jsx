import React, { createContext, useContext, useState } from 'react';
import { saffronTokens } from '../saffronTokens';
import { useProducts } from '@/context/ProductContext';

const SaffronContext = createContext();

export const useSaffron = () => {
  const ctx = useContext(SaffronContext);
  if (!ctx) throw new Error('useSaffron must be used within SaffronProvider');
  return ctx;
};

const defaultSectionsConfig = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { brand: 'Saffron', tagline: 'Modern kitchen' },
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      eyebrow: 'Open · Delivering now',
      headline: 'Good food,\nfast and warm.',
      subtitle:
        'Hand-prepped meals from our open kitchen — pickup in 15, delivered in 30.',
      cta: 'Order now',
      heroImage:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80',
      facts: [
        { value: '4.9', label: 'Avg. rating', sub: '12k reviews' },
        { value: '25 min', label: 'Avg. delivery', sub: 'within 5 km' },
        { value: 'Free', label: 'Delivery', sub: 'over ₱500' },
      ],
    },
  },
  {
    id: 'popular',
    name: 'Popular picks',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Popular picks',
      subtitle: 'What our guests reach for first',
      ctaText: 'See all',
    },
  },
  {
    id: 'menu',
    name: 'Our menu',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Our menu',
      subtitle: 'Tap a tab to filter by category',
    },
  },
  {
    id: 'commitment',
    name: 'Commitments band',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Why guests come back',
      items: [
        { icon: 'leaf', title: 'Sourced honestly', copy: 'Local farms, named suppliers.' },
        { icon: 'flame', title: 'Cooked to order', copy: 'Nothing held under heat lamps.' },
        { icon: 'box', title: 'Eco packaging', copy: 'Plant-based, compostable.' },
        { icon: 'heart', title: 'Loved by 12k+', copy: 'Five-star rating since 2022.' },
      ],
    },
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      address: '42 Sunset Avenue · BGC, Taguig',
      phone: '+63 917 555 0142',
      hours: 'Daily · 10:00 — 23:00',
    },
  },
];

export const SaffronProvider = ({ children }) => {
  const [tokens] = useState(saffronTokens);
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

  return <SaffronContext.Provider value={value}>{children}</SaffronContext.Provider>;
};
