import React, { createContext, useContext, useState } from 'react';
import { mobileNativeTokens } from '../mobileNativeTokens';
import { useProducts } from '@/context/ProductContext';

const MobileNativeContext = createContext();

export const useMobileNative = () => {
  const context = useContext(MobileNativeContext);
  if (!context) {
    throw new Error('useMobileNative must be used within MobileNativeProvider');
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
      headline: 'Order Your Favorites',
      headlineHighlight: 'Favorites',
      subtitle: 'Delicious meals delivered to your door',
      ctaPrimary: 'Browse Menu',
      backgroundImage: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'
    }
  },
  {
    id: 'search',
    name: 'Search Bar',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
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
      title: 'Featured',
      titleHighlight: 'Featured',
      subtitle: 'Our most popular items'
    }
  },
  {
    id: 'products',
    name: 'Product Grid',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
  },
  {
    id: 'banner',
    name: 'Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Special Offer',
      titleHighlight: 'Offer',
      description: 'Get 20% off your first order',
      buttonText: 'Claim Now'
    }
  },
  {
    id: 'gallery',
    name: 'Gallery',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Gallery',
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
      title: 'Reviews',
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
      email: 'hello@restaurant.com',
      address: '123 Main St, City, State'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
  }
];

export const MobileNativeProvider = ({ children }) => {
  const [overrideTokens, setOverrideTokens] = useState({});
  const [sectionsConfig, setSectionsConfig] = useState(defaultSectionsConfig);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products: rawProducts } = useProducts();

  const products = rawProducts.map(p => ({
    ...p,
    price: parseFloat(p.salePrice || p.price),
    images: p.imageUrl ? [p.imageUrl] : (p.images || [])
  }));

  const tokens = {
    ...mobileNativeTokens,
    colors: { ...mobileNativeTokens.colors, ...overrideTokens.colors },
    typography: { ...mobileNativeTokens.typography, ...overrideTokens.typography },
    layout: {
      ...mobileNativeTokens.layout,
      ...overrideTokens.layout,
      spacing: { ...mobileNativeTokens.layout.spacing, ...overrideTokens.layout?.spacing },
      borderRadius: { ...mobileNativeTokens.layout.borderRadius, ...overrideTokens.layout?.borderRadius }
    },
    effects: {
      ...mobileNativeTokens.effects,
      shadow: { ...mobileNativeTokens.effects.shadow, ...overrideTokens.effects?.shadow }
    }
  };

  const resetTokens = () => {
    setOverrideTokens({});
  };

  const updateSection = (sectionId, updates) => {
    setSectionsConfig(prev =>
      prev.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
  };

  const saveTokens = () => {
    console.log('Saving tokens and sections config...', { overrideTokens, sectionsConfig });
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

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    tokens,
    overrideTokens,
    setOverrideTokens,
    resetTokens,
    sectionsConfig,
    updateSection,
    saveTokens,
    products,
    addToCart,
    cart,
    cartTotal,
    cartItemCount,
    removeFromCart,
    updateCartQuantity,
    isCartOpen,
    setIsCartOpen
  };

  return (
    <MobileNativeContext.Provider value={value}>
      {children}
    </MobileNativeContext.Provider>
  );
};
