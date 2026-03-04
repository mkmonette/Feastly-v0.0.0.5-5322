import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import defaultDesignTokens from './defaultDesignTokens';
import { mergeTokens } from './utils/tokenUtils';

const StorefrontContext = createContext(null);

const DEFAULT_SECTIONS = [
  { 
    id: 'header', 
    name: 'Header', 
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { logoText: 'FEASTLY' }
  },
  { 
    id: 'hero', 
    name: 'Hero', 
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { 
      titlePre: 'The Ultimate', 
      titleHighlight: 'Dining Experience', 
      subtitle: 'Discover the art of fine dining with our chef-curated seasonal menus and exquisite wine pairings.',
      buttonText: 'Reserve a Table',
      badgeText: 'New Seasonal Menu'
    }
  },
  { 
    id: 'about', 
    name: 'About Us', 
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Crafting',
      titleHighlight: 'Memories',
      description: 'Founded in 2010, Feastly has been at the forefront of culinary innovation, bringing together the freshest local ingredients and global techniques.',
      buttonText: 'Learn More About Us',
      experienceYears: '15+',
      experienceText: 'Years of Experience',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop'
    }
  },
  { 
    id: 'banner', 
    name: 'Scrolling Banner', 
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      textPre: 'Fresh Ingredients • Seasonal Menu • ',
      textHighlight: 'Book Now'
    }
  },
  { 
    id: 'featured', 
    name: 'Featured Products', 
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: "Chef's",
      titleHighlight: 'Favorites',
      subtitle: "Chef's Selection"
    }
  },
  { 
    id: 'products', 
    name: 'Product Grid', 
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Explore Our',
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
      titlePre: 'Guest',
      titleHighlight: 'Stories',
      subtitle: 'Testimonials'
    }
  },
  { 
    id: 'cta', 
    name: 'CTA Banner', 
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Ready for an',
      titleHighlight: 'Experience?',
      buttonText: 'Order Your First Meal'
    }
  },
  { 
    id: 'contact', 
    name: 'Contact Form', 
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Get in',
      titleHighlight: 'Touch',
      subtitle: 'Visit Us Today',
      description: "Have questions or want to make a special request? We'd love to hear from you."
    }
  },
  { 
    id: 'footer', 
    name: 'Footer', 
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      footerDescription: "Bringing elite culinary experiences to your home. We're redefining what it means to eat well, every single day.",
      copyrightText: '© 2024 Feastly. All Rights Reserved.'
    }
  }
];

export const StorefrontProvider = ({ children }) => {
  // Load design tokens from localStorage on init
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('templateOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load tokens from localStorage", e);
      return {};
    }
  });

  // Load section configuration with migration logic
  const [sectionsConfig, setSectionsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('templateSectionsConfig');
      let config = DEFAULT_SECTIONS;
      
      if (saved) {
        const parsed = JSON.parse(saved);
        config = DEFAULT_SECTIONS.map(def => {
          const existing = parsed.find(p => p.id === def.id);
          if (!existing) return def;

          // Migrate old visibility schema to V2
          let visibility = { ...def.visibility, ...existing.visibility };
          
          if (existing.visibility?.hideOnMobile !== undefined || existing.visibility?.hideOnDesktop !== undefined) {
            const devices = [];
            if (!existing.visibility.hideOnDesktop) devices.push('desktop');
            if (!existing.visibility.hideOnMobile) devices.push('mobile');
            
            visibility.devices = devices;
            visibility.conditions = visibility.conditions || [];
            
            // Cleanup old fields
            delete visibility.hideOnMobile;
            delete visibility.hideOnDesktop;
          }

          // Merge content if missing
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

  // Load business content data from localStorage
  const [businessData, setBusinessData] = useState(() => {
    try {
      const saved = localStorage.getItem('feastly_business_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load business data", e);
    }
    
    // Default fallback content
    return {
      name: 'Feastly Burger Bar',
      email: 'contact@feastly.com',
      phone: '+63 912 345 6789',
      address: '123 Makati Ave, Manila, Philippines',
      description: 'The best burgers in town since 2010.',
      logoUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=200',
      bannerUrl: 'https://images.unsplash.com/photo-1514356425877-05c7300223b2?q=80&w=1200',
      tagline: 'Crafting Culinary Masterpieces',
      operatingHours: {
        monday: { open: '09:00', close: '22:00', isOpen: true },
        tuesday: { open: '09:00', close: '22:00', isOpen: true },
        wednesday: { open: '09:00', close: '22:00', isOpen: true },
        thursday: { open: '09:00', close: '22:00', isOpen: true },
        friday: { open: '09:00', close: '23:00', isOpen: true },
        saturday: { open: '10:00', close: '23:00', isOpen: true },
        sunday: { open: '10:00', close: '21:00', isOpen: true },
      }
    };
  });

  const [previewDevice, setPreviewDevice] = useState('desktop');

  const effectiveTokens = useMemo(() => {
    return mergeTokens(defaultDesignTokens, overrideTokens);
  }, [overrideTokens]);

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev => prev.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  const saveTokens = () => {
    localStorage.setItem('templateOverrideTokens', JSON.stringify(overrideTokens));
    localStorage.setItem('templateSectionsConfig', JSON.stringify(sectionsConfig));
  };

  const resetTokens = () => {
    localStorage.removeItem('templateOverrideTokens');
    localStorage.removeItem('templateSectionsConfig');
    setOverrideTokens({});
    setSectionsConfig(DEFAULT_SECTIONS);
  };

  // Sync with localStorage when it changes in other tabs/windows
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
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
};

export const useStorefront = () => {
  const context = useContext(StorefrontContext);
  if (!context) {
    throw new Error('useStorefront must be used within a StorefrontProvider');
  }
  return context;
};

export const useStorefrontTokens = () => {
  const { tokens } = useStorefront();
  return tokens;
};

export const useStorefrontBusinessData = () => {
  const { businessData } = useStorefront();
  return businessData;
};