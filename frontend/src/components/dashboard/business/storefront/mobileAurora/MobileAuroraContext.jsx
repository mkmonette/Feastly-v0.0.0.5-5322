import React, { createContext, useContext, useState } from 'react';
import { mobileAuroraTokens } from '../mobileAuroraTokens';
import { useProducts } from '@/context/ProductContext';

const MobileAuroraContext = createContext();

export const useMobileAurora = () => {
  const ctx = useContext(MobileAuroraContext);
  if (!ctx) {
    throw new Error('useMobileAurora must be used within MobileAuroraProvider');
  }
  return ctx;
};

const defaultSectionsConfig = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { brand: 'Aurora', tagline: 'Eat Bright' },
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      eyebrow: 'Free delivery over ₱500',
      headline: 'A taste of\nsomething bright',
      subtitle: 'Fresh meals, delivered in under 30 minutes.',
      cta: 'Order now',
      stats: [
        { value: '4.9', label: 'Rating' },
        { value: '25m', label: 'Avg. delivery' },
        { value: '120+', label: 'Dishes' },
      ],
    },
  },
  {
    id: 'featured',
    name: 'Featured',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { title: "Today's picks", seeAllText: 'See all' },
  },
  {
    id: 'menu',
    name: 'Menu',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { title: 'Browse the menu', subtitle: 'Tap a category' },
  },
  {
    id: 'reviews',
    name: 'Reviews',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Loved by foodies',
      reviews: [
        {
          name: 'Maya R.',
          rating: 5,
          text: 'Hands down the best truffle burger I have had. Arrived hot and so quick!',
          avatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
        },
        {
          name: 'Daniel L.',
          rating: 5,
          text: 'The packaging alone is gorgeous. The flavors are even better.',
          avatar:
            'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80',
        },
        {
          name: 'Priya S.',
          rating: 4,
          text: 'Loved the bright vibe of the app and the menu curation. Will reorder!',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
        },
      ],
    },
  },
  {
    id: 'cta',
    name: 'CTA Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'First order? Enjoy 20% off.',
      subtitle: 'Use code AURORA20 at checkout.',
      buttonText: 'Claim offer',
    },
  },
  {
    id: 'contact',
    name: 'Contact',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Get in touch',
      address: '42 Sunset Avenue, BGC, Taguig',
      phone: '+63 917 555 0142',
      hours: 'Daily · 10:00 — 23:00',
    },
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
  },
];

export const MobileAuroraProvider = ({ children }) => {
  const [tokens] = useState(mobileAuroraTokens);
  const [overrideTokens, setOverrideTokens] = useState({});
  const [sectionsConfig, setSectionsConfig] = useState(defaultSectionsConfig);
  const [previewDevice, setPreviewDevice] = useState('mobile');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const productsCtx = useProducts();
  const products = productsCtx?.products || [];

  const mergedTokens = {
    colors: { ...tokens.colors, ...overrideTokens.colors },
    typography: { ...tokens.typography, ...overrideTokens.typography },
    layout: { ...tokens.layout, ...overrideTokens.layout },
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

  const cartTotal = cartItems.reduce(
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
    cartTotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    isCartOpen,
    setIsCartOpen,
  };

  return (
    <MobileAuroraContext.Provider value={value}>
      {children}
    </MobileAuroraContext.Provider>
  );
};
