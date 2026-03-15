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
  const { products, addToCart, cart, removeFromCart, updateCartQuantity } = useProducts();

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
