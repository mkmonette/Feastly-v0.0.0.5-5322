import React, { createContext, useContext, useState } from 'react';
import { citrusTokens } from '../citrusTokens';
import { useProducts } from '@/context/ProductContext';

const CitrusContext = createContext();

export const useCitrus = () => {
  const ctx = useContext(CitrusContext);
  if (!ctx) throw new Error('useCitrus must be used within CitrusProvider');
  return ctx;
};

const defaultSectionsConfig = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      brand: 'Citrus',
      tagline: 'Kitchen · Pickup · Delivery',
      address: '42 Sunset Ave · BGC',
      phone: '+63 917 555 0142',
    },
  },
  {
    id: 'hero',
    name: 'Hero strip',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      eyebrow: 'Order ahead · ready in 25 min',
      headline: 'Hand-pressed.\nMade today.',
      subtitle:
        'A small, citrus-bright kitchen. Pick what you crave, pay online, skip the line.',
      facts: [
        { value: '25', unit: 'min', label: 'Prep time' },
        { value: '4.9', unit: '★', label: 'Rated' },
        { value: '12', unit: 'mi', label: 'Delivery' },
      ],
    },
  },
  {
    id: 'menu',
    name: 'Menu board',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'The menu',
      subtitle: 'Tap an item to add it to your order',
    },
  },
  {
    id: 'sidebar',
    name: 'Order sidebar',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Your order',
      pickupLabel: 'Pickup',
      deliveryLabel: 'Delivery',
      emptyMessage: 'Tap any dish on the left to start your order.',
      checkoutLabel: 'Checkout',
      promoNote: 'Use code CITRUS10 for 10% off your first order.',
    },
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
  },
];

export const CitrusProvider = ({ children }) => {
  const [tokens] = useState(citrusTokens);
  const [overrideTokens, setOverrideTokens] = useState({});
  const [sectionsConfig, setSectionsConfig] = useState(defaultSectionsConfig);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState('pickup'); // 'pickup' | 'delivery'

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

  const cartSubtotal = cartItems.reduce(
    (sum, i) => sum + parseFloat(i.salePrice || i.price || 0) * i.quantity,
    0
  );
  const deliveryFee = fulfillment === 'delivery' && cartSubtotal > 0 ? 49 : 0;
  const cartTotal = cartSubtotal + deliveryFee;
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
    deliveryFee,
    cartTotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    isCartOpen,
    setIsCartOpen,
    fulfillment,
    setFulfillment,
  };

  return <CitrusContext.Provider value={value}>{children}</CitrusContext.Provider>;
};
