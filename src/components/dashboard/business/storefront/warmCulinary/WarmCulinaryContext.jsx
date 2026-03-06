import React, { createContext, useContext, useState } from 'react';
import warmCulinaryTokens from '../warmCulinaryTokens';

const WarmCulinaryContext = createContext();

export const useWarmCulinary = () => {
  const context = useContext(WarmCulinaryContext);
  if (!context) {
    throw new Error('useWarmCulinary must be used within a WarmCulinaryProvider');
  }
  return context;
};

export const WarmCulinaryProvider = ({ children }) => {
  const [tokens] = useState(warmCulinaryTokens);
  const [cart, setCart] = useState([]);

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

  const value = {
    tokens,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  };

  return (
    <WarmCulinaryContext.Provider value={value}>
      {children}
    </WarmCulinaryContext.Provider>
  );
};
