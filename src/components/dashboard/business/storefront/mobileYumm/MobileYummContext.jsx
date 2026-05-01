import React, { createContext, useContext, useState } from 'react';
import { mobileYummTokens } from '../mobileYummTokens';
import { useProducts } from '@/context/ProductContext';

const MobileYummContext = createContext();

export const useMobileYumm = () => {
  const context = useContext(MobileYummContext);
  if (!context) {
    throw new Error('useMobileYumm must be used within MobileYummProvider');
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
      preText: 'Free delivery today',
      headline: 'Delicious Food, Delivered Fast',
      headlineHighlight: 'Delivered Fast',
      subtitle: 'Fast. Fresh. Delivered.',
      backgroundImage: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
      stats: [
        { value: '24+', label: 'Items' },
        { value: '30', label: 'Min' },
        { value: '4.9', label: 'Rating' }
      ]
    }
  },
  {
    id: 'why',
    name: 'Why Choose Us',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Why Choose Us',
      features: [
        { icon: 'fast', label: 'Fast', desc: '30 min delivery' },
        { icon: 'safe', label: 'Safe', desc: 'Quality assured' },
        { icon: 'free', label: 'Free', desc: 'Orders $50+' },
        { icon: 'fresh', label: 'Fresh', desc: 'Made daily' }
      ]
    }
  },
  {
    id: 'ticker',
    name: 'Ticker Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      items: ['FREE DELIVERY', 'FRESH DAILY', '30 MIN']
    }
  },
  {
    id: 'featured',
    name: 'Popular Now',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Popular Now',
      seeAllText: 'See All'
    }
  },
  {
    id: 'categories',
    name: 'Our Menu',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Our Menu'
    }
  },
  {
    id: 'gallery',
    name: 'Gallery',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Gallery',
      images: [
        'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
        'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg'
      ]
    }
  },
  {
    id: 'testimonials',
    name: 'Reviews',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Reviews',
      testimonials: [
        {
          name: 'Sarah Jenkins',
          rating: 4,
          content: "Absolutely amazing food! The Classic Cheeseburger is the best I've ever had. The atmosphere is cozy and the service is exceptional.",
          image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
        },
        {
          name: 'Michael Ch.',
          rating: 5,
          content: 'This place has become our go-to for pizza nights. The Artisan Pepperoni is incredible and the delivery is always fast.',
          image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
        }
      ]
    }
  },
  {
    id: 'cta',
    name: 'CTA Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Get 20% Off!',
      subtitle: 'On your first order. Use code: FRST20',
      buttonText: 'Order Now'
    }
  },
  {
    id: 'contact',
    name: 'Contact',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Contact Us',
      address: '123 Food Street',
      phone: '+1 (555) 123-4567',
      hours: '11am - 10pm'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
  }
];

export const MobileYummProvider = ({ children }) => {
  const [tokens] = useState(mobileYummTokens);
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

  const resetTokens = () => setOverrideTokens({});

  const saveTokens = () => {
    console.log('Saving tokens...', { overrideTokens, sectionsConfig });
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
    <MobileYummContext.Provider value={value}>
      {children}
    </MobileYummContext.Provider>
  );
};
