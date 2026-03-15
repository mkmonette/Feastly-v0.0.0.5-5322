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
      id: 'header',
      name: 'Header',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: { logoText: 'MODERN MINIMAL' }
    },
    {
      id: 'hero',
      name: 'Hero',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        preText: 'Welcome to',
        titlePre: 'Minimal Design',
        titleHighlight: 'Maximum Flavor',
        subtitle: 'Experience the perfect balance of simplicity and taste.',
        button1Text: 'View Menu',
        button2Text: 'Order Now',
        showButton1: true,
        showButton2: true
      }
    },
    {
      id: 'about',
      name: 'About Us',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: 'Our',
        titleHighlight: 'Philosophy',
        description: 'We believe in the power of simplicity and quality ingredients.',
        buttonText: 'Learn More',
        experienceYears: '5+',
        experienceText: 'Years',
        imagePosition: 'left'
      }
    },
    {
      id: 'banner',
      name: 'Banner',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        textPre: 'Fresh Daily • Minimal Design • ',
        textHighlight: 'Visit Today',
        useGradient: false
      }
    },
    {
      id: 'featured',
      name: 'Featured Products',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: "Today's",
        titleHighlight: 'Picks',
        subtitle: 'Featured'
      }
    },
    {
      id: 'products',
      name: 'Product Grid',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: 'Our',
        titleHighlight: 'Menu',
        subtitle: 'Menu'
      }
    },
    {
      id: 'gallery',
      name: 'Gallery',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: 'Visual',
        titleHighlight: 'Story'
      }
    },
    {
      id: 'testimonials',
      name: 'Testimonials',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: 'What',
        titleHighlight: 'People Say',
        subtitle: 'Reviews'
      }
    },
    {
      id: 'cta',
      name: 'CTA Banner',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: 'Ready to',
        titleHighlight: 'Order?',
        subtitle: 'Experience minimal design with maximum flavor.',
        buttonText: 'Order Now'
      }
    },
    {
      id: 'contact',
      name: 'Contact',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: 'Get in',
        titleHighlight: 'Touch',
        subtitle: 'Contact Us',
        description: 'We would love to hear from you.'
      }
    },
    {
      id: 'footer',
      name: 'Footer',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        footerDescription: 'Minimal design, maximum flavor.',
        copyrightText: ''
      }
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
