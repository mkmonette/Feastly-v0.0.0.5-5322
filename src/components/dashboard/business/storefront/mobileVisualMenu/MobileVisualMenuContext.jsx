import React, { createContext, useContext, useState } from 'react';
import { mobileVisualMenuTokens } from '../mobileVisualMenuTokens';
import { useProducts } from '@/context/ProductContext';

const MobileVisualMenuContext = createContext();

export const useMobileVisualMenu = () => {
  const context = useContext(MobileVisualMenuContext);
  if (!context) {
    throw new Error('useMobileVisualMenu must be used within MobileVisualMenuProvider');
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
      preText: 'Delicious Food',
      headline: 'Fresh & Tasty Meals',
      headlineHighlight: 'Tasty Meals',
      subtitle: 'Order now and enjoy amazing flavors delivered fast',
      ctaPrimary: 'Order Now',
      ctaSecondary: 'See Menu',
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
      title: 'Popular Picks',
      titleHighlight: 'Popular',
      subtitle: "Customer favorites you'll love"
    }
  },
  {
    id: 'products',
    name: 'Product Grid',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Full Menu',
      titleHighlight: 'Full',
      subtitle: 'Explore all our delicious options'
    }
  },
  {
    id: 'banner',
    name: 'Banner',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Limited Time Deal',
      titleHighlight: 'Limited Time',
      description: 'First order? Get 25% off with code FRESH25',
      buttonText: 'Get Discount'
    }
  },
  {
    id: 'gallery',
    name: 'Gallery',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Visual Gallery',
      titleHighlight: 'Visual',
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
      title: 'What Customers Say',
      titleHighlight: 'Customers Say',
      testimonials: [
        {
          name: 'Emily Davis',
          role: 'Food Lover',
          content: 'Amazing quality and presentation! Worth every penny.',
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
      title: 'Download Our App',
      titleHighlight: 'App',
      subtitle: 'Get exclusive mobile-only offers',
      buttonText: 'Download Now'
    }
  },
  {
    id: 'contact',
    name: 'Contact',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] },
    content: {
      title: 'Contact Us',
      titleHighlight: 'Contact',
      phone: '(555) 987-6543',
      email: 'support@freshmeals.com',
      address: '456 Food Street, City, State'
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    visibility: { enabled: true, devices: ['desktop', 'mobile'], conditions: [] }
  }
];

export const MobileVisualMenuProvider = ({ children }) => {
  const [tokens, setTokens] = useState(mobileVisualMenuTokens);
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
    <MobileVisualMenuContext.Provider value={value}>
      {children}
    </MobileVisualMenuContext.Provider>
  );
};
