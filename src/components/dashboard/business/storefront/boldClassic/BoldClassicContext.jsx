import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import boldClassicTokens from '../boldClassicTokens';
import { mergeTokens } from '../utils/tokenUtils';

const BoldClassicContext = createContext(null);

const DEFAULT_SECTIONS = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { logoText: 'BOLD' }
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'BOLD',
      titleHighlight: 'FLAVORS',
      subtitle: 'Experience dining that makes a statement. Strong tastes, bold choices, unforgettable moments.',
      buttonText: 'ORDER NOW',
      badgeText: 'NEW'
    }
  },
  {
    id: 'about',
    name: 'About Us',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'NO',
      titleHighlight: 'COMPROMISE',
      description: 'We don\'t do subtle. Every dish is a declaration, every ingredient makes an impact. This is food with attitude.',
      buttonText: 'OUR PHILOSOPHY',
      experienceYears: '5+',
      experienceText: 'YEARS BOLD'
    }
  },
  {
    id: 'banner',
    name: 'Scrolling Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      textPre: 'FRESH • BOLD • ',
      textHighlight: 'UNFORGETTABLE'
    }
  },
  {
    id: 'featured',
    name: 'Featured Products',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'SIGNATURE',
      titleHighlight: 'DISHES',
      subtitle: 'FEATURED'
    }
  },
  {
    id: 'products',
    name: 'Product Grid',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'THE',
      titleHighlight: 'MENU',
      subtitle: 'FULL MENU'
    }
  },
  {
    id: 'gallery',
    name: 'Gallery',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'VISUAL',
      titleHighlight: 'IMPACT'
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'BOLD',
      titleHighlight: 'REVIEWS',
      subtitle: 'TESTIMONIALS'
    }
  },
  {
    id: 'cta',
    name: 'CTA Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'MAKE YOUR',
      titleHighlight: 'STATEMENT',
      buttonText: 'ORDER YOUR FIRST MEAL'
    }
  },
  {
    id: 'contact',
    name: 'Contact Form',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'GET',
      titleHighlight: 'IN TOUCH',
      subtitle: 'CONTACT US',
      description: 'Ready to make a bold choice? Reach out and let\'s create something memorable.'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      footerDescription: 'Bold flavors. Bold choices. Bold experiences.',
      copyrightText: '© 2024 BOLD. ALL RIGHTS RESERVED.'
    }
  }
];

export const BoldClassicProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('boldClassicOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [sectionsConfig, setSectionsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('boldClassicSectionsConfig');
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
      name: 'BOLD',
      email: 'hello@bold.com',
      phone: '+1 555 123 4567',
      address: '123 Main Street, NYC',
      description: 'Bold flavors for bold people.',
      logoUrl: '',
      bannerUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000',
      tagline: 'NO COMPROMISE',
    };
  });

  const [previewDevice, setPreviewDevice] = useState('desktop');

  const effectiveTokens = useMemo(() => {
    return mergeTokens(boldClassicTokens, overrideTokens);
  }, [overrideTokens]);

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev => prev.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  const saveTokens = () => {
    localStorage.setItem('boldClassicOverrideTokens', JSON.stringify(overrideTokens));
    localStorage.setItem('boldClassicSectionsConfig', JSON.stringify(sectionsConfig));
  };

  const resetTokens = () => {
    localStorage.removeItem('boldClassicOverrideTokens');
    localStorage.removeItem('boldClassicSectionsConfig');
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
    <BoldClassicContext.Provider value={value}>
      {children}
    </BoldClassicContext.Provider>
  );
};

export const useBoldClassic = () => {
  const context = useContext(BoldClassicContext);
  if (!context) {
    throw new Error('useBoldClassic must be used within a BoldClassicProvider');
  }
  return context;
};
