import { createContext, useContext, useState, useMemo } from 'react';
import { modernMenuCartTokens } from '../modernMenuCartTokens';
import { mergeTokens } from '../utils/tokenUtils';

const ModernMenuCartContext = createContext();

export const useModernMenuCart = () => {
  const context = useContext(ModernMenuCartContext);
  if (!context) {
    throw new Error('useModernMenuCart must be used within ModernMenuCartProvider');
  }
  return context;
};

export const ModernMenuCartProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('modernMenuCartOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load modern menu cart tokens", e);
      return {};
    }
  });

  const tokens = useMemo(() => {
    return mergeTokens(modernMenuCartTokens, overrideTokens);
  }, [overrideTokens]);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
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

  const clearCart = () => {
    setCart([]);
  };

  const resetTokens = () => {
    setOverrideTokens({});
    localStorage.removeItem('modernMenuCartOverrideTokens');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ModernMenuCartContext.Provider
      value={{
        tokens,
        overrideTokens,
        setOverrideTokens,
        resetTokens,
        cart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </ModernMenuCartContext.Provider>
  );
};
