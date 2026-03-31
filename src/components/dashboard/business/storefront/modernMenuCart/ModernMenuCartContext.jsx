import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import modernMenuCartTokens from '../modernMenuCartTokens';
import { mergeTokens } from '../utils/tokenUtils';

const ModernMenuCartContext = createContext(null);

const DEFAULT_SECTIONS = [
  {
    id: 'headerHero',
    name: 'Header & Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      logoText: 'Bell fresh',
      tagline: 'Fresh & healthy food recipe',
      totalItems: '24',
      totalCategories: '09',
      totalOutlets: '04',
      showSearch: true,
      showStats: true
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
      footerDescription: 'Bringing fresh and healthy food recipes to your table with passion and quality.',
      copyrightText: ''
    }
  }
];

export const ModernMenuCartProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('modernMenuCartOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load tokens", e);
      return {};
    }
  });

  const [sectionsConfig, setSectionsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('modernMenuCartSectionsConfig');
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
      name: 'Bell fresh',
      email: 'hello@bellfresh.com',
      phone: '+63 912 345 6789',
      address: '456 Fresh Plaza, Manila, Philippines',
      description: 'Fresh & healthy food recipe.',
      logoUrl: '',
      bannerUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
      tagline: 'Fresh & healthy food recipe',
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
  const [cart, setCart] = useState([]);

  const effectiveTokens = useMemo(() => {
    return mergeTokens(modernMenuCartTokens, overrideTokens);
  }, [overrideTokens]);

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev => prev.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  const saveTokens = () => {
    localStorage.setItem('modernMenuCartOverrideTokens', JSON.stringify(overrideTokens));
    localStorage.setItem('modernMenuCartSectionsConfig', JSON.stringify(sectionsConfig));
  };

  const resetTokens = () => {
    localStorage.removeItem('modernMenuCartOverrideTokens');
    localStorage.removeItem('modernMenuCartSectionsConfig');
    setOverrideTokens({});
    setSectionsConfig(DEFAULT_SECTIONS);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

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
    setPreviewDevice,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount
  };

  return (
    <ModernMenuCartContext.Provider value={value}>
      {children}
    </ModernMenuCartContext.Provider>
  );
};

export const useModernMenuCart = () => {
  const context = useContext(ModernMenuCartContext);
  if (!context) {
    throw new Error('useModernMenuCart must be used within ModernMenuCartProvider');
  }
  return context;
};
