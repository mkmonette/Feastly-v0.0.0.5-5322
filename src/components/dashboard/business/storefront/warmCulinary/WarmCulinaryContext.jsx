import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import warmCulinaryTokens from '../warmCulinaryTokens';
import { mergeTokens } from '../utils/tokenUtils';

const WarmCulinaryStorefrontContext = createContext(null);

const DEFAULT_SECTIONS = [
  {
    id: 'header',
    name: 'Header',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { logoText: 'Culinary Delights' }
  },
  {
    id: 'hero',
    name: 'Hero',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {}
  },
  {
    id: 'featured',
    name: 'Featured Products',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {}
  },
  {
    id: 'products',
    name: 'Product Grid',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {}
  },
  {
    id: 'gallery',
    name: 'Gallery',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {}
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {}
  },
  {
    id: 'cta',
    name: 'CTA Banner',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {}
  },
  {
    id: 'contact',
    name: 'Contact',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {}
  },
  {
    id: 'footer',
    name: 'Footer',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {}
  }
];

export const useWarmCulinary = () => {
  const context = useContext(WarmCulinaryStorefrontContext);
  if (!context) {
    throw new Error('useWarmCulinary must be used within a WarmCulinaryProvider');
  }
  return context;
};

export const WarmCulinaryProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('warmCulinaryOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [sectionsConfig, setSectionsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('warmCulinarySectionsConfig');
      if (saved) {
        const parsed = JSON.parse(saved);
        return DEFAULT_SECTIONS.map(def => {
          const existing = parsed.find(p => p.id === def.id);
          return existing ? { ...def, ...existing } : def;
        });
      }
      return DEFAULT_SECTIONS;
    } catch (e) {
      return DEFAULT_SECTIONS;
    }
  });

  const [businessData, setBusinessData] = useState(() => {
    try {
      const saved = localStorage.getItem('feastly_business_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load business data", e);
    }
    return {
      name: 'Culinary Delights',
      description: 'Handcrafted meals made with love',
      logoUrl: '',
      address: '123 Culinary Street, Food District, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'hello@culinarydelights.com'
    };
  });

  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('warmCulinaryOverrideTokens', JSON.stringify(overrideTokens));
    } catch (e) {
      console.error("Failed to save warm culinary tokens", e);
    }
  }, [overrideTokens]);

  useEffect(() => {
    try {
      localStorage.setItem('warmCulinarySectionsConfig', JSON.stringify(sectionsConfig));
    } catch (e) {
      console.error("Failed to save warm culinary sections", e);
    }
  }, [sectionsConfig]);

  const tokens = useMemo(() => mergeTokens(warmCulinaryTokens, overrideTokens), [overrideTokens]);

  const addToCart = (product, quantity = 1, selectedAddons = []) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity, selectedAddons }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const resetTokens = () => setOverrideTokens({});

  const value = {
    tokens,
    overrideTokens,
    setOverrideTokens,
    resetTokens,
    sectionsConfig,
    setSectionsConfig,
    businessData,
    setBusinessData,
    businessName: businessData.name,
    heroHeadline: 'Handcrafted Meals Made with Love',
    heroSubtext: 'Experience authentic flavors prepared fresh daily with the finest ingredients.',
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  };

  return (
    <WarmCulinaryStorefrontContext.Provider value={value}>
      {children}
    </WarmCulinaryStorefrontContext.Provider>
  );
};
