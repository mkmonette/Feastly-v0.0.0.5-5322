import React, { createContext, useContext, useState, useMemo } from 'react';
import modernBiteTokens from './modernBiteTokens';
import { mergeTokens } from '../utils/tokenUtils';

const ModernBiteContext = createContext(null);

const DEFAULT_SECTIONS = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'] },
    content: {
      placeholder: 'Search for dishes...'
    }
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'] },
    content: {
      title: 'BITE',
      subtitle: 'Fresh & Flavorful',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80',
      stats: [
        { value: '24', label: 'Total Orders' },
        { value: '05', label: 'Categories' },
        { value: '30', label: 'Min Delivery' }
      ]
    }
  },
  {
    id: 'about',
    name: 'About Us',
    visibility: { enabled: true, devices: ['desktop', 'mobile'] },
    content: {
      badge: 'ABOUT US',
      title: 'Why Choose BITE?',
      description: 'Crafted with passion, served with love. We believe in bringing you the finest culinary experiences with every bite, combining tradition with modern flavors.',
      features: [
        { title: 'Expert Chefs', description: 'Crafted by professional culinary artists', icon: 'FiStar' },
        { title: 'Fast Delivery', description: 'Hot food at your doorstep in 30 mins', icon: 'FiClock' },
        { title: 'Quality First', description: 'Premium ingredients, zero compromise', icon: 'FiAward' },
        { title: 'Fresh Daily', description: 'Locally sourced, always fresh', icon: 'FiSun' }
      ]
    }
  },
  {
    id: 'ticker',
    name: 'Ticker',
    visibility: { enabled: true, devices: ['desktop', 'mobile'] },
    content: {
      items: ['FREE DELIVERY ON ORDERS OVER $50', 'FRESH INGREDIENTS DAILY', '10% OFF YOUR FIRST ORDER', 'MADE WITH LOVE']
    }
  },
  {
    id: 'featured',
    name: 'Featured Products',
    visibility: { enabled: true, devices: ['desktop', 'mobile'] },
    content: {
      badge: 'POPULAR',
      title: 'Featured Dishes'
    }
  },
  {
    id: 'products',
    name: 'Product Grid',
    visibility: { enabled: true, devices: ['desktop', 'mobile'] },
    content: {
      badge: 'MENU',
      title: 'Our Menu'
    }
  },
  {
    id: 'gallery',
    name: 'Gallery',
    visibility: { enabled: true, devices: ['desktop', 'mobile'] },
    content: {
      badge: 'GALLERY',
      title: 'Our Space',
      images: [
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80'
      ]
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    visibility: { enabled: true, devices: ['desktop', 'mobile'] },
    content: {
      badge: 'TESTIMONIALS',
      title: 'What Our Customers Say',
      testimonials: [
        { name: 'Sarah Jenkins', role: 'Food Critic', content: 'Absolutely amazing food! The Classic Cheeseburger is the best I\'ve ever had. The atmosphere is cozy and the service is impeccable.', image: 'https://i.pravatar.cc/150?u=1' },
        { name: 'Michael Chen', role: 'Local Guide', content: 'This place has become my go-to spot for pizza nights. The Artisan Pepperoni is incredible and the online ordering is so convenient!', image: 'https://i.pravatar.cc/150?u=2' },
        { name: 'Emily Rodriguez', role: 'Regular Customer', content: 'Great selection of healthy options. The salads are fresh and flavorful. Love the fast delivery and the eco-friendly packaging.', image: 'https://i.pravatar.cc/150?u=3' }
      ]
    }
  },
  {
    id: 'cta',
    name: 'CTA Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'] },
    content: {
      badge: 'SPECIAL OFFER',
      title: 'Get 20% Off Your First Order',
      subtitle: 'Sign up now and receive exclusive discounts, early access to new dishes, and special treats!',
      buttonText: 'Claim Offer'
    }
  },
  {
    id: 'contact',
    name: 'Contact',
    visibility: { enabled: true, devices: ['desktop', 'mobile'] },
    content: {
      badge: 'CONTACT',
      title: 'Get In Touch',
      address: '123 Culinary Avenue, Foodie District, FC 12345',
      phone: '+1 (555) 123-4567',
      email: 'hello@biterestaurant.com',
      hours: 'Mon-Fri: 11:00 AM - 10:00 PM\nSat-Sun: 10:00 AM - 11:00 PM'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'] },
    content: {
      brandText: 'Crafted with passion, served with love',
      copyright: '© 2024 BITE. All rights reserved.'
    }
  }
];

export const ModernBiteProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState(() => {
    try {
      const saved = localStorage.getItem('modernBiteOverrideTokens');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [sectionsConfig, setSectionsConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('modernBiteSectionsConfig');
      if (saved) {
        const parsed = JSON.parse(saved);
        return DEFAULT_SECTIONS.map(def => {
          const existing = parsed.find(p => p.id === def.id);
          if (!existing) return def;
          return { ...existing, visibility: { ...def.visibility, ...existing.visibility }, content: { ...def.content, ...existing.content } };
        });
      }
      return DEFAULT_SECTIONS;
    } catch (e) {
      return DEFAULT_SECTIONS;
    }
  });

  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [cart, setCart] = useState([]);

  const effectiveTokens = useMemo(() => {
    return mergeTokens(modernBiteTokens, overrideTokens);
  }, [overrideTokens]);

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev => prev.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  const saveTokens = () => {
    try {
      localStorage.setItem('modernBiteOverrideTokens', JSON.stringify(overrideTokens));
      localStorage.setItem('modernBiteSectionsConfig', JSON.stringify(sectionsConfig));
    } catch (e) {
      console.error('Error saving config', e);
    }
  };

  const resetTokens = () => {
    localStorage.removeItem('modernBiteOverrideTokens');
    localStorage.removeItem('modernBiteSectionsConfig');
    setOverrideTokens({});
    setSectionsConfig(DEFAULT_SECTIONS);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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

  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

  const value = {
    tokens: effectiveTokens,
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
    <ModernBiteContext.Provider value={value}>
      {children}
    </ModernBiteContext.Provider>
  );
};

export const useModernBite = () => {
  const context = useContext(ModernBiteContext);
  if (!context) throw new Error('useModernBite must be used within ModernBiteProvider');
  return context;
};