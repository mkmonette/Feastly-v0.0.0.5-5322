import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { elegantClassicTokens } from '../elegantClassicTokens';
import { mergeTokens } from '../utils/tokenUtils';

const ElegantClassicContext = createContext(null);

const DEFAULT_SECTIONS = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { logoText: 'ELEGANT BISTRO' }
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      preText: 'Welcome to',
      titlePre: 'Elegant',
      titleHighlight: 'Dining',
      subtitle: 'Experience exceptional cuisine crafted with passion and served with elegance.',
      button1Text: 'Order Now',
      button2Text: 'View Menu',
      showButton1: true,
      showButton2: true
    }
  },
  {
    id: 'about',
    name: 'About Us',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      subtitle: 'Our Story',
      titlePre: 'About',
      titleHighlight: 'Us',
      description: 'We are dedicated to providing the finest dining experience with fresh ingredients and exceptional service.'
    }
  },
  {
    id: 'banner',
    name: 'Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Special Offer',
      description: 'Limited time offer on selected items. Order now and enjoy exclusive discounts!',
      buttonText: 'Order Now',
      showButton: true
    }
  },
  {
    id: 'featured',
    name: 'Featured Products',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      subtitle: 'Featured',
      titlePre: 'Featured',
      titleHighlight: 'Dishes'
    }
  },
  {
    id: 'products',
    name: 'Product Grid',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      subtitle: 'Our Menu',
      titlePre: 'All',
      titleHighlight: 'Products'
    }
  },
  {
    id: 'gallery',
    name: 'Gallery',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      subtitle: 'Gallery',
      titlePre: 'Our',
      titleHighlight: 'Gallery'
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      subtitle: 'Testimonials',
      titlePre: 'What Our Customers',
      titleHighlight: 'Say'
    }
  },
  {
    id: 'cta',
    name: 'CTA Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      subtitle: 'Special Offer',
      titlePre: 'Ready to Experience Exceptional',
      titleHighlight: 'Dining?',
      description: 'Join us today and discover why our customers keep coming back for more.',
      buttonText: 'Order Now'
    }
  },
  {
    id: 'contact',
    name: 'Contact',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      subtitle: 'Get in Touch',
      titlePre: 'Contact',
      titleHighlight: 'Us'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      description: 'Experience exceptional dining with fresh ingredients and outstanding service.'
    }
  }
];

export const ElegantClassicProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('elegantClassicOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load tokens", e);
      return {};
    }
  });

  const [sectionsConfig, setSectionsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('elegantClassicSectionsConfig');
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
      name: 'Elegant Bistro',
      email: 'hello@elegantbistro.com',
      phone: '+63 912 345 6789',
      address: '789 Elegant Avenue, Manila, Philippines',
      description: 'Experience exceptional dining with fresh ingredients and outstanding service.',
      logoUrl: '',
      bannerUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920',
      tagline: 'Elegant Dining Redefined',
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
    return mergeTokens(elegantClassicTokens, overrideTokens);
  }, [overrideTokens]);

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev => prev.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  const saveTokens = () => {
    localStorage.setItem('elegantClassicOverrideTokens', JSON.stringify(overrideTokens));
    localStorage.setItem('elegantClassicSectionsConfig', JSON.stringify(sectionsConfig));
  };

  const resetTokens = () => {
    localStorage.removeItem('elegantClassicOverrideTokens');
    localStorage.removeItem('elegantClassicSectionsConfig');
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
    <ElegantClassicContext.Provider value={value}>
      {children}
    </ElegantClassicContext.Provider>
  );
};

export const useElegantClassic = () => {
  const context = useContext(ElegantClassicContext);
  if (!context) {
    throw new Error('useElegantClassic must be used within ElegantClassicProvider');
  }
  return context;
};

export { ElegantClassicContext };
