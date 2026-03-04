import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import boldClassicTokens from '../boldClassicTokens';
import { mergeTokens } from '../utils/tokenUtils';

const BoldClassicContext = createContext(null);

const DEFAULT_SECTIONS = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { logoText: 'BOLD BITES' }
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      preText: 'Experience Bold Flavors',
      titlePre: 'URBAN',
      titleHighlight: 'CUISINE',
      subtitle: 'Where traditional meets contemporary in every bite. Bold flavors, striking presentations, unforgettable experiences.',
      button1Text: 'View Menu',
      button2Text: 'Reserve Table',
      showButton1: true,
      showButton2: true
    }
  },
  {
    id: 'about',
    name: 'About Us',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Bold',
      titleHighlight: 'Approach',
      description: 'We push culinary boundaries with innovative techniques and bold flavor combinations, creating dining experiences that challenge and delight.',
      buttonText: 'Our Philosophy',
      imagePosition: 'right'
    }
  },
  {
    id: 'banner',
    name: 'Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      textPre: 'Locally Sourced • Chef Driven • ',
      textHighlight: 'Experience Bold',
      useGradient: false
    }
  },
  {
    id: 'featured',
    name: 'Featured Products',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Signature',
      titleHighlight: 'Dishes',
      subtitle: 'Featured'
    }
  },
  {
    id: 'products',
    name: 'Product Grid',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Complete',
      titleHighlight: 'Menu',
      subtitle: 'Our Menu'
    }
  },
  {
    id: 'gallery',
    name: 'Gallery',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Inside',
      titleHighlight: 'Bold'
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'What',
      titleHighlight: 'They Say',
      subtitle: 'Reviews'
    }
  },
  {
    id: 'cta',
    name: 'CTA Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Ready for',
      titleHighlight: 'Bold?',
      subtitle: 'Join us for an unforgettable dining experience where every dish tells a story.',
      buttonText: 'Make Reservation'
    }
  },
  {
    id: 'contact',
    name: 'Contact',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      titlePre: 'Get in',
      titleHighlight: 'Touch',
      subtitle: 'Contact',
      description: 'Have questions? Want to book a private event? Send us a message and our team will get back to you shortly.'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      footerDescription: 'Redefining modern cuisine with bold flavors, innovative techniques, and unforgettable dining experiences.',
      copyrightText: ''
    }
  }
];

export const BoldClassicProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('boldClassicOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to load tokens", e);
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
      name: 'Bold Bites',
      email: 'hello@boldbites.com',
      phone: '+63 917 456 7890',
      address: '789 Urban Street, Makati, Manila, Philippines',
      description: 'Contemporary urban cuisine with bold flavors.',
      logoUrl: '',
      bannerUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
      tagline: 'Bold Flavors, Urban Vibes',
      operatingHours: {
        monday: { open: '11:00', close: '23:00', isOpen: true },
        tuesday: { open: '11:00', close: '23:00', isOpen: true },
        wednesday: { open: '11:00', close: '23:00', isOpen: true },
        thursday: { open: '11:00', close: '23:00', isOpen: true },
        friday: { open: '11:00', close: '00:00', isOpen: true },
        saturday: { open: '11:00', close: '00:00', isOpen: true },
        sunday: { open: '12:00', close: '22:00', isOpen: true },
      }
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
    <BoldClassicContext.Provider value={value}>
      {children}
    </BoldClassicContext.Provider>
  );
};

export const useBoldClassic = () => {
  const context = useContext(BoldClassicContext);
  if (!context) {
    throw new Error('useBoldClassic must be used within BoldClassicProvider');
  }
  return context;
};
