import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import freshCartTokens from '../freshCartTokens';
import { mergeTokens } from '../utils/tokenUtils';

const FreshCartContext = createContext(null);

const DEFAULT_SECTIONS = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { logoText: 'Fresh Market' }
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Farm to',
      titleHighlight: 'Table Fresh',
      subtitle: 'Discover the finest organic produce, delivered fresh to your door daily. Quality you can taste, freshness you can trust.',
      buttonText: 'Shop Now',
      badgeText: 'Organic'
    }
  },
  {
    id: 'about',
    name: 'About Us',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Naturally',
      titleHighlight: 'Delicious',
      description: 'We partner with local farmers to bring you the freshest seasonal produce. Every item is hand-picked and carefully inspected for quality.',
      buttonText: 'Learn Our Story',
      experienceYears: '15+',
      experienceText: 'Years Fresh'
    }
  },
  {
    id: 'banner',
    name: 'Scrolling Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      textPre: '100% Organic • Locally Sourced • ',
      textHighlight: 'Free Delivery'
    }
  },
  {
    id: 'featured',
    name: 'Featured Products',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'This Week\'s',
      titleHighlight: 'Fresh Picks',
      subtitle: 'Featured'
    }
  },
  {
    id: 'products',
    name: 'Product Grid',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'All',
      titleHighlight: 'Products',
      subtitle: 'Shop All'
    }
  },
  {
    id: 'gallery',
    name: 'Gallery',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Fresh',
      titleHighlight: 'Gallery'
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
      titlePre: 'Start Shopping',
      titleHighlight: 'Fresh Today',
      buttonText: 'Browse Products'
    }
  },
  {
    id: 'contact',
    name: 'Contact Form',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Questions?',
      titleHighlight: 'We\'re Here',
      subtitle: 'Contact Us',
      description: 'Have questions about our products or delivery? We\'re here to help.'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      footerDescription: 'Fresh organic produce delivered daily. Supporting local farms and sustainable practices.',
      copyrightText: '© 2024 Fresh Market. All Rights Reserved.'
    }
  }
];

export const FreshCartProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('freshCartOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [sectionsConfig, setSectionsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('freshCartSectionsConfig');
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
      name: 'Fresh Market',
      email: 'hello@freshmarket.com',
      phone: '+1 555 234 5678',
      address: '456 Green Street, Portland',
      description: 'Fresh organic produce delivered daily.',
      logoUrl: '',
      bannerUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2000',
      tagline: 'Farm to Table Fresh',
    };
  });

  const [previewDevice, setPreviewDevice] = useState('desktop');

  const effectiveTokens = useMemo(() => {
    return mergeTokens(freshCartTokens, overrideTokens);
  }, [overrideTokens]);

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev => prev.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  const saveTokens = () => {
    localStorage.setItem('freshCartOverrideTokens', JSON.stringify(overrideTokens));
    localStorage.setItem('freshCartSectionsConfig', JSON.stringify(sectionsConfig));
  };

  const resetTokens = () => {
    localStorage.removeItem('freshCartOverrideTokens');
    localStorage.removeItem('freshCartSectionsConfig');
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
    <FreshCartContext.Provider value={value}>
      {children}
    </FreshCartContext.Provider>
  );
};

export const useFreshCart = () => {
  const context = useContext(FreshCartContext);
  if (!context) {
    throw new Error('useFreshCart must be used within a FreshCartProvider');
  }
  return context;
};
