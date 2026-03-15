import React, { createContext, useContext, useState } from 'react';
import { mobileNativeTokens } from '../mobileNativeTokens';
import { useProducts } from '@/context/ProductContext';

const MobileNativeContext = createContext();

export const useMobileNative = () => {
  const context = useContext(MobileNativeContext);
  if (!context) {
    throw new Error('useMobileNative must be used within MobileNativeProvider');
  }
  return context;
};

export const MobileNativeProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState({});
  const [cart, setCart] = useState([]);
  const { products: rawProducts } = useProducts();

  const products = rawProducts.map(p => ({
    ...p,
    price: parseFloat(p.salePrice || p.price),
    images: p.imageUrl ? [p.imageUrl] : (p.images || [])
  }));

  const tokens = {
    ...mobileNativeTokens,
    colors: { ...mobileNativeTokens.colors, ...overrideTokens.colors },
    typography: { ...mobileNativeTokens.typography, ...overrideTokens.typography },
    layout: {
      ...mobileNativeTokens.layout,
      ...overrideTokens.layout,
      spacing: { ...mobileNativeTokens.layout.spacing, ...overrideTokens.layout?.spacing },
      borderRadius: { ...mobileNativeTokens.layout.borderRadius, ...overrideTokens.layout?.borderRadius }
    },
    effects: {
      ...mobileNativeTokens.effects,
      shadow: { ...mobileNativeTokens.effects.shadow, ...overrideTokens.effects?.shadow }
    }
  };

  const resetTokens = () => {
    setOverrideTokens({});
  };

  const addToCart = (product) => {
    setCart(prev => {
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
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const value = {
    tokens,
    overrideTokens,
    setOverrideTokens,
    resetTokens,
    products,
    addToCart,
    cart,
    removeFromCart,
    updateCartQuantity
  };

  return (
    <MobileNativeContext.Provider value={value}>
      {children}
    </MobileNativeContext.Provider>
  );
};
