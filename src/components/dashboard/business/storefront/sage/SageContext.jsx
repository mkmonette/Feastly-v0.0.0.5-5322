import React, { createContext, useContext, useState } from 'react';
import sageTokens from '../sageTokens';
import { useProducts } from '@/context/ProductContext';

const SageContext = createContext(null);

export const useSage = () => {
  const ctx = useContext(SageContext);
  if (!ctx) throw new Error('useSage must be used within SageProvider');
  return ctx;
};

const DEFAULT_SECTIONS = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: { logoText: 'SAGE' }
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      preText: 'New Seasonal Menu',
      headline: 'Modern Dining, Timeless Flavors',
      subtitle: 'Where culinary innovation meets tradition. Every plate is a masterpiece crafted with locally-sourced ingredients and passion.',
      button1Text: 'View Menu',
      button2Text: 'Reserve a Table',
      heroImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      rating: '4.9',
      ratingCount: '2.4k reviews'
    }
  },
  {
    id: 'about',
    name: 'Our Story',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      label: 'OUR STORY',
      title: 'Crafting Memories',
      description: 'Founded in 2019, SAGE has been at the forefront of culinary innovation. We believe the best dining experiences are born from a deep respect for quality ingredients and bold creativity.\n\nOur chefs bring together flavors from around the world, creating dishes that surprise and delight every bite.',
      linkText: 'Learn More About Us',
      image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg'
    }
  },
  {
    id: 'banner',
    name: 'Sliding Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      items: ['FRESH INGREDIENTS', 'SEASONAL MENU', 'FARM TO TABLE', 'CRAFTED DAILY', 'PREMIUM QUALITY', 'LOCAL PRODUCE', 'CHEF CURATED', 'ORGANIC SOURCED']
    }
  },
  {
    id: 'featured',
    name: "Chef's Favorites",
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      label: "CHEF'S SELECTION",
      title: "Chef's Favorites"
    }
  },
  {
    id: 'products',
    name: 'Explore Our Menu',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      label: 'FEATURED',
      title: 'Explore Our Menu',
      subtitle: 'Each dish is crafted with the finest locally-sourced ingredients.'
    }
  },
  {
    id: 'gallery',
    name: 'Visual Journey',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      label: 'GALLERY',
      title: 'Visual Journey'
    }
  },
  {
    id: 'testimonials',
    name: 'Guest Stories',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      label: 'TESTIMONIALS',
      title: 'Guest Stories'
    }
  },
  {
    id: 'cta',
    name: 'CTA',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Ready for an Experience?',
      subtitle: 'Join us for an unforgettable dining experience. Order now and taste the difference that passion makes.',
      buttonText: 'Order Your First Meal'
    }
  },
  {
    id: 'contact',
    name: 'Get In Touch',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      label: 'FIND US TODAY',
      title: 'Get In Touch',
      subtitle: 'Have questions or want to make a special request? We would love to hear from you.',
      address: '123 Farmers Culinary District',
      phone: '+1 (555) 234-5678',
      email: 'hello@sagerestaurant.com'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      logoText: 'SAGE',
      description: 'Bringing culinary masterpieces to your table. We\'re dedicated to delivering exceptional meals that passion makes.',
      quickLinks: ['Our Menu', 'About Us', 'Gallery', 'Contact'],
      hours: {
        weekday: '10:00am - 10:00pm',
        friday: '10:00am - 11:00pm',
        saturday: '09:00am - 11:00pm',
        sunday: '09:00am - 09:00pm'
      }
    }
  }
];

export const SageProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState({});
  const [sectionsConfig, setSectionsConfig] = useState(DEFAULT_SECTIONS);
  const { products } = useProducts();

  const tokens = {
    ...sageTokens,
    colors: { ...sageTokens.colors, ...overrideTokens.colors }
  };

  const updateSection = (sectionId, updates) =>
    setSectionsConfig(prev => prev.map(s => s.id === sectionId ? { ...s, ...updates } : s));

  const resetTokens = () => setOverrideTokens({});
  const saveTokens = () => {};

  const businessData = {
    name: 'SAGE',
    address: '123 Farmers Culinary District',
    phone: '+1 (555) 234-5678',
    email: 'hello@sagerestaurant.com',
  };

  const value = {
    tokens,
    overrideTokens,
    setOverrideTokens,
    sectionsConfig,
    setSectionsConfig,
    updateSection,
    resetTokens,
    saveTokens,
    businessData,
    products
  };

  return <SageContext.Provider value={value}>{children}</SageContext.Provider>;
};
