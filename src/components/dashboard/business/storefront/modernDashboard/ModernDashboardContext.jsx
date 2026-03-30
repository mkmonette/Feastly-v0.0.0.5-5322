import { createContext, useContext, useState, useMemo } from 'react';
import { modernDashboardTokens } from '../modernDashboardTokens';
import { mergeTokens } from '../utils/tokenUtils';

const ModernDashboardContext = createContext();

export const useModernDashboard = () => {
  const context = useContext(ModernDashboardContext);
  if (!context) {
    throw new Error('useModernDashboard must be used within ModernDashboardProvider');
  }
  return context;
};

export const ModernDashboardProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('modernDashboardOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load modern dashboard tokens", e);
      return {};
    }
  });

  const tokens = useMemo(() => {
    return mergeTokens(modernDashboardTokens, overrideTokens);
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
    localStorage.removeItem('modernDashboardOverrideTokens');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ModernDashboardContext.Provider
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
    </ModernDashboardContext.Provider>
  );
};
