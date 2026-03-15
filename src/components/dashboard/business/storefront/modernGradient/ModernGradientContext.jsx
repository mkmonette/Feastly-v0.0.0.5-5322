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
  const [sectionsConfig, setSectionsConfig] = useState([
    {
      id: 'header',
      name: 'Header',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: { logoText: 'GRADIENT EATS' }
    },
    {
      id: 'hero',
      name: 'Hero',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        preText: 'Welcome to',
        titlePre: 'Vibrant Flavors',
        titleHighlight: 'Bold Colors',
        subtitle: 'Experience dining with stunning visual appeal and exceptional taste.',
        button1Text: 'Explore Menu',
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
        titleHighlight: 'Vision',
        description: 'We combine bold flavors with stunning presentation to create unforgettable experiences.',
        buttonText: 'Learn More',
        experienceYears: '8+',
        experienceText: 'Years',
        imagePosition: 'left'
      }
    },
    {
      id: 'banner',
      name: 'Banner',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        textPre: 'Bold Flavors • Vibrant Colors • ',
        textHighlight: 'Visit Us',
        useGradient: true
      }
    },
    {
      id: 'featured',
      name: 'Featured Products',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: "Chef's",
        titleHighlight: 'Specials',
        subtitle: 'Featured'
      }
    },
    {
      id: 'products',
      name: 'Product Grid',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: 'Full',
        titleHighlight: 'Menu',
        subtitle: 'Our Menu'
      }
    },
    {
      id: 'gallery',
      name: 'Gallery',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: 'Visual',
        titleHighlight: 'Journey'
      }
    },
    {
      id: 'testimonials',
      name: 'Testimonials',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: 'Happy',
        titleHighlight: 'Customers',
        subtitle: 'Reviews'
      }
    },
    {
      id: 'cta',
      name: 'CTA Banner',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: 'Ready for',
        titleHighlight: 'Adventure?',
        subtitle: 'Join us for a colorful culinary experience.',
        buttonText: 'Book Now'
      }
    },
    {
      id: 'contact',
      name: 'Contact',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        titlePre: 'Connect',
        titleHighlight: 'With Us',
        subtitle: 'Contact',
        description: 'We would love to hear from you. Reach out anytime.'
      }
    },
    {
      id: 'footer',
      name: 'Footer',
      visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
      content: {
        footerDescription: 'Bold flavors, vibrant experiences, unforgettable moments.',
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
    return merge(modernGradientTokens, overrideTokens);
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
    <ModernGradientContext.Provider value={{
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
    </ModernGradientContext.Provider>
  );
};
