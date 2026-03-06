import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import modernCardTokens from '../modernCardTokens';
import { mergeTokens } from '../utils/tokenUtils';

const ModernCardContext = createContext(null);

const DEFAULT_SECTIONS = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { logoText: 'RECIPE' }
  },
  {
    id: 'hero',
    name: 'Hero Card',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Featured Recipe',
      subtitle: 'Discover our signature dish',
      description: 'Heat olive oil in a large pot over medium-high heat.',
      showButton: true,
      buttonText: 'View Recipe'
    }
  },
  {
    id: 'products',
    name: 'Product Cards',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Our Menu',
      titleHighlight: 'Menu',
      showCategories: true
    }
  },
  {
    id: 'about',
    name: 'About Card',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Our Story',
      description: 'We craft each dish with passion, using only the finest ingredients sourced from local farms and artisans.',
      showButton: true,
      buttonText: 'Learn More'
    }
  },
  {
    id: 'contact',
    name: 'Contact Card',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Get in Touch',
      description: 'Visit us or reach out to make a reservation',
      showButton: true,
      buttonText: 'Contact Us'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      copyrightText: '© 2024 All rights reserved'
    }
  }
];

export const ModernCardProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState({});
  const [sectionsConfig, setSectionsConfig] = useState(DEFAULT_SECTIONS);

  const tokens = useMemo(() => {
    return mergeTokens(modernCardTokens, overrideTokens);
  }, [overrideTokens]);

  const resetTokens = () => {
    setOverrideTokens({});
  };

  const updateSectionContent = (sectionId, newContent) => {
    setSectionsConfig(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, content: { ...section.content, ...newContent } }
          : section
      )
    );
  };

  const updateSectionVisibility = (sectionId, visibility) => {
    setSectionsConfig(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, visibility: { ...section.visibility, ...visibility } }
          : section
      )
    );
  };

  const value = {
    tokens,
    overrideTokens,
    setOverrideTokens,
    resetTokens,
    sectionsConfig,
    setSectionsConfig,
    updateSectionContent,
    updateSectionVisibility
  };

  return (
    <ModernCardContext.Provider value={value}>
      {children}
    </ModernCardContext.Provider>
  );
};

export const useModernCard = () => {
  const context = useContext(ModernCardContext);
  if (!context) {
    throw new Error('useModernCard must be used within ModernCardProvider');
  }
  return context;
};
