import React, { createContext, useContext, useState } from 'react';
import { modernMinimalTokens } from '../modernMinimalTokens';

const ModernMinimalContext = createContext();

export const useModernMinimal = () => {
  const context = useContext(ModernMinimalContext);
  if (!context) {
    throw new Error('useModernMinimal must be used within ModernMinimalProvider');
  }
  return context;
};

export const ModernMinimalProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState({});
  const [sectionsConfig, setSectionsConfig] = useState([
    {
      id: 'hero',
      name: 'Hero Section',
      visibility: { enabled: true, devices: ['desktop', 'mobile'] }
    },
    {
      id: 'products',
      name: 'Products',
      visibility: { enabled: true, devices: ['desktop', 'mobile'] }
    },
    {
      id: 'footer',
      name: 'Footer',
      visibility: { enabled: true, devices: ['desktop', 'mobile'] }
    }
  ]);
  const [contentData, setContentData] = useState({});

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
    return merge(modernMinimalTokens, overrideTokens);
  }, [overrideTokens]);

  const resetTokens = () => {
    setOverrideTokens({});
  };

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
  };

  const updateContent = (sectionId, key, value) => {
    setContentData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [key]: value
      }
    }));
  };

  return (
    <ModernMinimalContext.Provider value={{
      tokens,
      overrideTokens,
      setOverrideTokens,
      resetTokens,
      sectionsConfig,
      updateSection,
      contentData,
      updateContent
    }}>
      {children}
    </ModernMinimalContext.Provider>
  );
};
