import React, { createContext, useContext, useState } from 'react';
import { modernGradientTokens } from '../modernGradientTokens';

const ModernGradientContext = createContext();

export const useModernGradient = () => {
  const context = useContext(ModernGradientContext);
  if (!context) {
    throw new Error('useModernGradient must be used within ModernGradientProvider');
  }
  return context;
};

export const ModernGradientProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState({});

  const tokens = React.useMemo(() => {
    const merge = (target, source) => {
      const result = { ...target };
      for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          result[key] = merge(target[key] || {}, source[key]);
        } else {
          result[key] = source[key];
        }
      }
      return result;
    };
    return merge(modernGradientTokens, overrideTokens);
  }, [overrideTokens]);

  const resetTokens = () => {
    setOverrideTokens({});
  };

  return (
    <ModernGradientContext.Provider value={{ tokens, overrideTokens, setOverrideTokens, resetTokens }}>
      {children}
    </ModernGradientContext.Provider>
  );
};
