import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import modernClassicTokens from '../modernClassicTokens';
import { mergeTokens } from '../utils/tokenUtils';

const ModernClassicContext = createContext(null);

const DEFAULT_SECTIONS = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { logoText: 'MODERN BISTRO' }
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      preText: 'Welcome to',
      titlePre: 'Modern Dining',
      titleHighlight: 'Redefined',
      subtitle: 'Experience culinary excellence with our contemporary take on classic dishes, crafted with passion and precision.',
      button1Text: 'Explore Menu',
      button2Text: 'Make Reservation',
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
      titleHighlight: 'Story',
      description: 'We believe in creating memorable dining experiences through innovation, quality ingredients, and exceptional service.',
      buttonText: 'Learn More',
      experienceYears: '10+',
      experienceText: 'Years',
      imagePosition: 'left'
    }
  },
  {
    id: 'banner',
    name: 'Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      textPre: 'Daily Fresh Ingredients • Locally Sourced • ',
      textHighlight: 'Visit Us Today',
      useGradient: false
    }
  },
  {
    id: 'featured',
    name: 'Featured Products',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: "Today's",
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
      titleHighlight: 'Experience'
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Customer',
      titleHighlight: 'Reviews',
      subtitle: 'Reviews'
    }
  },
  {
    id: 'cta',
    name: 'CTA Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Ready to',
      titleHighlight: 'Dine?',
      subtitle: 'Make your reservation today and experience exceptional dining.',
      buttonText: 'Book a Table'
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
      description: 'We would love to hear from you. Send us a message and we will respond as soon as possible.'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      footerDescription: 'Bringing modern culinary experiences to your table with passion, quality, and innovation.',
      copyrightText: ''
    }
  }
];

export const ModernClassicProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('modernClassicOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load tokens", e);
      return {};
    }
  });

  const [sectionsConfig, setSectionsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('modernClassicSectionsConfig');
      let config = DEFAULT_SECTIONS;

      if (saved) {
        const parsed = JSON.parse(saved);
        config = DEFAULT_SECTIONS.map(def => {
          const existing = parsed.find(p => p.id === def.id);
          if (!existing) return def;

          let visibility = { ...def.visibility, ...existing.visibility };

          if (existing.visibility?.hideOnMobile !== undefined || existing.visibility?.hideOnDesktop !== undefined) {
            const devices = [];
            if (!existing.visibility.hideOnDesktop) devices.push('desktop');
            if (!existing.visibility.hideOnMobile) devices.push('mobile');

            visibility.devices = devices;
            visibility.conditions = visibility.conditions || [];

            delete visibility.hideOnMobile;
            delete visibility.hideOnDesktop;
          }

          const content = { ...def.content, ...existing.content };

          return { ...existing, visibility, content };
        });
      }
      return config;
    } catch (e) {
      console.error("Failed to load section config", e);
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
      name: 'Modern Bistro',
      email: 'hello@modernbistro.com',
      phone: '+63 912 345 6789',
      address: '456 Modern Plaza, Manila, Philippines',
      description: 'Contemporary dining with classic inspiration.',
      logoUrl: '',
      bannerUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
      tagline: 'Modern Dining Redefined',
      operatingHours: {
        monday: { open: '10:00', close: '22:00', isOpen: true },
        tuesday: { open: '10:00', close: '22:00', isOpen: true },
        wednesday: { open: '10:00', close: '22:00', isOpen: true },
        thursday: { open: '10:00', close: '22:00', isOpen: true },
        friday: { open: '10:00', close: '23:00', isOpen: true },
        saturday: { open: '10:00', close: '23:00', isOpen: true },
        sunday: { open: '10:00', close: '21:00', isOpen: true },
      }
    };
  });

  const [previewDevice, setPreviewDevice] = useState('desktop');

  const effectiveTokens = useMemo(() => {
    return mergeTokens(modernClassicTokens, overrideTokens);
  }, [overrideTokens]);

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev => prev.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  const saveTokens = () => {
    localStorage.setItem('modernClassicOverrideTokens', JSON.stringify(overrideTokens));
    localStorage.setItem('modernClassicSectionsConfig', JSON.stringify(sectionsConfig));
  };

  const resetTokens = () => {
    localStorage.removeItem('modernClassicOverrideTokens');
    localStorage.removeItem('modernClassicSectionsConfig');
    setOverrideTokens({});
    setSectionsConfig(DEFAULT_SECTIONS);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('feastly_business_settings');
        if (saved) setBusinessData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to sync business data", e);
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
    <ModernClassicContext.Provider value={value}>
      {children}
    </ModernClassicContext.Provider>
  );
};

export const useModernClassic = () => {
  const context = useContext(ModernClassicContext);
  if (!context) {
    throw new Error('useModernClassic must be used within ModernClassicProvider');
  }
  return context;
};
