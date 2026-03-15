import React, { createContext, useContext, useState } from 'react';
import { luxuryClassicTokens } from '../luxuryClassicTokens';

const LuxuryClassicContext = createContext();

export const useLuxuryClassic = () => {
  const context = useContext(LuxuryClassicContext);
  if (!context) {
    throw new Error('useLuxuryClassic must be used within LuxuryClassicProvider');
  }
  return context;
};

export const LuxuryClassicProvider = ({ children }) => {
  const [tokens] = useState(luxuryClassicTokens);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
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

  const toggleCart = () => setIsCartOpen(prev => !prev);
  const closeCart = () => setIsCartOpen(false);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    tokens,
    cart,
    cartTotal,
    cartCount,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    closeCart,
  };

  return (
    <LuxuryClassicContext.Provider value={value}>
      {children}
    </LuxuryClassicContext.Provider>
  );
};
