import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import modernSplitTokens from '../modernSplitTokens';
import { mergeTokens } from '../utils/tokenUtils';

const ModernSplitStorefrontContext = createContext(null);

const DEFAULT_SECTIONS = [
  {
    id: 'header',
    name: 'Header',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { logoText: 'MODERN EATS' }
  },
  {
    id: 'hero',
    name: 'Hero',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      subtitle: 'Fresh Food Delivered',
      titlePre: 'Order Your Favorite',
      titleHighlight: 'Meals Online',
      description: 'Browse our menu, add items to cart, and enjoy delicious food delivered to your door.',
      button1Text: 'Start Ordering',
      button2Text: 'View Menu',
      showSubtitle: true,
      showButton1: true,
      showButton2: true
    }
  },
  {
    id: 'featured',
    name: 'Featured Products',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Popular',
      titleHighlight: 'Dishes',
      subtitle: 'Customer Favorites'
    }
  },
  {
    id: 'products',
    name: 'Product Grid',
    enabled: true,
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
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Our',
      titleHighlight: 'Atmosphere',
      subtitle: 'Gallery'
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'What Our',
      titleHighlight: 'Customers Say',
      subtitle: 'Testimonials'
    }
  },
  {
    id: 'cta',
    name: 'CTA Banner',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Ready to Order?',
      titleHighlight: 'Get Started Today',
      description: 'Join thousands of happy customers enjoying fresh, delicious food.',
      buttonText: 'Order Now',
      showButton: true
    }
  },
  {
    id: 'contact',
    name: 'Contact',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Contact',
      titleHighlight: 'Us',
      subtitle: 'Get in Touch',
      description: 'Have questions? We\'d love to hear from you.'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    enabled: true,
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      description: 'Fresh food, delivered fast. Quality ingredients, exceptional taste.',
      quickLinks: ['Home', 'Menu', 'About', 'Gallery', 'Contact'],
      openingHours: [
        { day: 'Monday - Friday', hours: '11:00 AM - 10:00 PM' },
        { day: 'Saturday', hours: '10:00 AM - 11:00 PM' },
        { day: 'Sunday', hours: '10:00 AM - 9:00 PM' }
      ]
    }
  }
];

export const ModernSplitStorefrontProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('modernSplitOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load modern split tokens", e);
      return {};
    }
  });

  const [sectionsConfig, setSectionsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('modernSplitSectionsConfig');
      if (saved) {
        const parsed = JSON.parse(saved);
        return DEFAULT_SECTIONS.map(def => {
          const existing = parsed.find(p => p.id === def.id);
          return existing ? { ...def, ...existing } : def;
        });
      }
      return DEFAULT_SECTIONS;
    } catch (e) {
      console.error("Failed to load modern split sections", e);
      return DEFAULT_SECTIONS;
    }
  });

  const [businessData, setBusinessData] = useState(() => {
    try {
      const saved = localStorage.getItem('feastly_business_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load business data", e);
    }
    return {
      name: 'Modern Eats',
      description: 'Fresh food delivered fast',
      logoUrl: '',
      address: '123 Main St, City',
      phone: '(555) 123-4567',
      email: 'hello@moderneats.com'
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('modernSplitOverrideTokens', JSON.stringify(overrideTokens));
    } catch (e) {
      console.error("Failed to save modern split tokens", e);
    }
  }, [overrideTokens]);

  useEffect(() => {
    try {
      localStorage.setItem('modernSplitSectionsConfig', JSON.stringify(sectionsConfig));
    } catch (e) {
      console.error("Failed to save modern split sections", e);
    }
  }, [sectionsConfig]);

  const tokens = useMemo(() => mergeTokens(modernSplitTokens, overrideTokens), [overrideTokens]);

  const resetTokens = () => setOverrideTokens({});

  const value = {
    tokens,
    overrideTokens,
    setOverrideTokens,
    resetTokens,
    sectionsConfig,
    setSectionsConfig,
    businessData,
    setBusinessData
  };

  return (
    <ModernSplitStorefrontContext.Provider value={value}>
      {children}
    </ModernSplitStorefrontContext.Provider>
  );
};

export const useModernSplitStorefront = () => {
  const context = useContext(ModernSplitStorefrontContext);
  if (!context) {
    throw new Error('useModernSplitStorefront must be used within ModernSplitStorefrontProvider');
  }
  return context;
};
