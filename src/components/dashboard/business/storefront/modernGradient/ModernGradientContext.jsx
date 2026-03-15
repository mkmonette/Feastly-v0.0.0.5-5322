import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import modernGradientTokens from '../modernGradientTokens';
import { mergeTokens } from '../utils/tokenUtils';

const ModernGradientContext = createContext(null);

const DEFAULT_SECTIONS = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { logoText: 'Gradient Cafe' }
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Modern Flavors',
      titleHighlight: 'Bold Colors',
      subtitle: 'Experience a vibrant fusion of international cuisine in a contemporary setting. Where modern meets delicious.',
      buttonText: 'View Menu',
      badgeText: 'Trending'
    }
  },
  {
    id: 'about',
    name: 'About Us',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Crafted with',
      titleHighlight: 'Passion',
      description: 'We blend traditional techniques with modern innovation to create dishes that are as beautiful as they are delicious. Every plate is a work of art.',
      buttonText: 'Our Story',
      experienceYears: '8+',
      experienceText: 'Years Crafting'
    }
  },
  {
    id: 'banner',
    name: 'Scrolling Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      textPre: 'Modern Cuisine • Vibrant Atmosphere • ',
      textHighlight: 'Reserve Now'
    }
  },
  {
    id: 'featured',
    name: 'Featured Products',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Popular',
      titleHighlight: 'Dishes',
      subtitle: 'Trending'
    }
  },
  {
    id: 'products',
    name: 'Product Grid',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Full',
      titleHighlight: 'Menu',
      subtitle: 'All Items'
    }
  },
  {
    id: 'gallery',
    name: 'Gallery',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Visual',
      titleHighlight: 'Feast'
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'What People',
      titleHighlight: 'Are Saying',
      subtitle: 'Testimonials'
    }
  },
  {
    id: 'cta',
    name: 'CTA Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Ready to',
      titleHighlight: 'Experience?',
      buttonText: 'Make a Reservation'
    }
  },
  {
    id: 'contact',
    name: 'Contact Form',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Let\'s',
      titleHighlight: 'Connect',
      subtitle: 'Get In Touch',
      description: 'Questions about our menu or special events? We\'d love to hear from you.'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      footerDescription: 'Modern cuisine in a vibrant atmosphere. Come experience the fusion of flavors and colors.',
      copyrightText: '© 2024 Gradient Cafe. All Rights Reserved.'
    }
  }
];

export const ModernGradientProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('modernGradientOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [sectionsConfig, setSectionsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('modernGradientSectionsConfig');
      let config = DEFAULT_SECTIONS;
      
      if (saved) {
        const parsed = JSON.parse(saved);
        config = DEFAULT_SECTIONS.map(def => {
          const existing = parsed.find(p => p.id === def.id);
          if (!existing) return def;
          let visibility = { ...def.visibility, ...existing.visibility };
          const content = { ...def.content, ...existing.content };
          return { ...existing, visibility, content };
        });
      }
      return config;
    } catch (e) {
      console.error('Failed to load sections config', e);
      return DEFAULT_SECTIONS;
    }
  });

  const [businessData, setBusinessData] = useState(() => {
    try {
      const saved = localStorage.getItem('feastly_business_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load business data', e);
    }

    return {
      name: 'Gradient Cafe',
      email: 'hello@gradientcafe.com',
      phone: '+1 555 345 6789',
      address: '789 Modern Ave, Austin',
      description: 'Modern cuisine with a vibrant twist.',
      logoUrl: '',
      bannerUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000',
      tagline: 'Where Colors Meet Flavors',
    };
  });

  const [previewDevice, setPreviewDevice] = useState('desktop');

  const effectiveTokens = useMemo(() => {
    return mergeTokens(modernGradientTokens, overrideTokens);
  }, [overrideTokens]);

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev => prev.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  const saveTokens = () => {
    localStorage.setItem('modernGradientOverrideTokens', JSON.stringify(overrideTokens));
    localStorage.setItem('modernGradientSectionsConfig', JSON.stringify(sectionsConfig));
  };

  const resetTokens = () => {
    localStorage.removeItem('modernGradientOverrideTokens');
    localStorage.removeItem('modernGradientSectionsConfig');
    setOverrideTokens({});
    setSectionsConfig(DEFAULT_SECTIONS);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('feastly_business_settings');
        if (saved) setBusinessData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to sync business data', e);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value = {
    tokens: effectiveTokens,
    businessData,
    overrideTokens,
    setOverrideTokens,
    sectionsConfig,
    updateSection,
    saveTokens,
    resetTokens,
    previewDevice,
    setPreviewDevice
  };

  return (
    <ModernGradientContext.Provider value={value}>
      {children}
    </ModernGradientContext.Provider>
  );
};

export const useModernGradient = () => {
  const context = useContext(ModernGradientContext);
  if (!context) {
    throw new Error('useModernGradient must be used within a ModernGradientProvider');
  }
  return context;
};
