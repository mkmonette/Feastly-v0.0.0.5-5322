import React, { createContext, useContext, useState } from 'react';
import { mobileExpressTokens } from '../mobileExpressTokens';
import { useProducts } from '@/context/ProductContext';

const MobileExpressContext = createContext();

export const useMobileExpress = () => {
  const context = useContext(MobileExpressContext);
  if (!context) {
    throw new Error('useMobileExpress must be used within MobileExpressProvider');
  }
  return context;
};

const defaultSectionsConfig = [
  {
    id: 'header',
    name: 'Header',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
  },
  {
    id: 'hero',
    name: 'Hero',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      preText: 'Fast & Fresh',
      headline: 'Order Your Favorite Food',
      headlineHighlight: 'Favorite Food',
      subtitle: 'Delicious meals delivered to your door in minutes',
      ctaPrimary: 'Browse Menu',
      ctaSecondary: 'View Deals',
      backgroundImage: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'
    }
  },
  {
    id: 'categories',
    name: 'Category Tabs',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
  },
  {
    id: 'featured',
    name: 'Featured Products',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Trending',
      titleHighlight: 'Today',
      subtitle: 'Most popular items this week'
    }
  },
  {
    id: 'products',
    name: 'Product Grid',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Full Menu',
      titleHighlight: 'Menu',
      subtitle: 'Browse our complete selection'
    }
  },
  {
    id: 'banner',
    name: 'Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Special Offer',
      titleHighlight: 'Offer',
      description: 'Get 20% off your first order with code WELCOME20',
      buttonText: 'Claim Offer'
    }
  },
  {
    id: 'gallery',
    name: 'Gallery',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Food Gallery',
      titleHighlight: 'Gallery',
      images: [
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
        'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg'
      ]
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Customer Reviews',
      titleHighlight: 'Reviews',
      testimonials: [
        {
          name: 'Sarah Johnson',
          role: 'Regular Customer',
          content: 'Best food delivery service! Always fresh and on time.',
          image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
        }
      ]
    }
  },
  {
    id: 'cta',
    name: 'CTA Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Ready to Order?',
      titleHighlight: 'Order',
      subtitle: 'Download our app for exclusive deals',
      buttonText: 'Get Started'
    }
  },
  {
    id: 'contact',
    name: 'Contact',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Get in Touch',
      titleHighlight: 'Touch',
      phone: '(555) 123-4567',
      email: 'hello@foodapp.com',
      address: '123 Main St, City, State'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
  }
];

export const MobileExpressProvider = ({ children }) => {
  const [tokens, setTokens] = useState(mobileExpressTokens);
  const [overrideTokens, setOverrideTokens] = useState({});
  const [sectionsConfig, setSectionsConfig] = useState(defaultSectionsConfig);
  const [previewDevice, setPreviewDevice] = useState('mobile');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products } = useProducts();

  const mergedTokens = {
    colors: { ...tokens.colors, ...overrideTokens.colors },
    typography: { ...tokens.typography, ...overrideTokens.typography },
    layout: { ...tokens.layout, ...overrideTokens.layout },
    effects: { ...tokens.effects, ...overrideTokens.effects }
  };

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
  };

  const resetTokens = () => {
    setOverrideTokens({});
  };

  const saveTokens = () => {
    console.log('Saving tokens and sections config...', { overrideTokens, sectionsConfig });
  };

  const addToCart = (product) => {
    setCartItems(prev => {
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
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    tokens: mergedTokens,
    overrideTokens,
    setOverrideTokens,
    sectionsConfig,
    updateSection,
    resetTokens,
    saveTokens,
    previewDevice,
    setPreviewDevice,
    products,
    cartItems,
    cartItemCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    isCartOpen,
    setIsCartOpen
  };

  return (
    <MobileExpressContext.Provider value={value}>
      {children}
    </MobileExpressContext.Provider>
  );
};
