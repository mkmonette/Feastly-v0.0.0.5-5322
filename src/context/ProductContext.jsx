import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  // 1. Categories State
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('feastly_categories');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Main Course', description: 'Hearty meals for lunch and dinner', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', items: 12, status: 'Active' },
      { id: 2, name: 'Beverages', description: 'Fresh juices, sodas and coffee', imageUrl: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b', items: 24, status: 'Active' },
      { id: 3, name: 'Burgers', description: 'Our signature handcrafted burgers', imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', items: 8, status: 'Inactive' },
    ];
  });

  // 2. Products State - Updated to PHP-equivalent values
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('feastly_products');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        name: 'Truffle Burger', 
        category: 'Main Course', 
        price: '995.00', 
        salePrice: '799.00', 
        status: 'Active', 
        stock: 25,
        salesCount: 150,
        createdAt: '2024-05-20',
        flags: { featured: true, seasonal: false, outOfStock: false },
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', 
        description: 'Double wagyu beef with truffle mayo and caramelized onions.' 
      },
      { 
        id: 2, 
        name: 'Margherita Pizza', 
        category: 'Main Course', 
        price: '750.00', 
        status: 'Active', 
        stock: 5,
        salesCount: 80,
        createdAt: '2024-06-10',
        flags: { featured: false, seasonal: true, outOfStock: false },
        imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3', 
        description: 'Fresh mozzarella, basil and tomatoes.' 
      },
      { 
        id: 3, 
        name: 'Iced Latte', 
        category: 'Beverages', 
        price: '185.00', 
        salePrice: '145.00', 
        status: 'Inactive', 
        stock: 100,
        salesCount: 300,
        createdAt: '2024-06-18',
        flags: { featured: false, seasonal: false, outOfStock: true },
        imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c', 
        description: 'Cold brewed coffee with organic whole milk.' 
      },
      { 
        id: 4, 
        name: 'French Fries', 
        category: 'Main Course', 
        price: '225.00', 
        status: 'Active', 
        stock: 50,
        salesCount: 450,
        createdAt: '2024-01-01',
        flags: { featured: false, seasonal: false, outOfStock: false },
        imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808b71e40', 
        description: 'Crispy golden fries with sea salt.' 
      },
      { 
        id: 5, 
        name: 'Double Cheeseburger', 
        category: 'Burgers', 
        price: '650.00', 
        status: 'Active', 
        stock: 15,
        salesCount: 120,
        createdAt: '2024-06-22',
        flags: { featured: false, seasonal: false, outOfStock: false },
        imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349', 
        description: 'Classic double beef patty with melted cheese.' 
      },
    ];
  });

  // 3. Computed Products (Automatic Flags)
  const computedProducts = useMemo(() => {
    const now = new Date();
    const newThresholdDays = 7;
    const lowStockThreshold = 10;
    const topSalesThreshold = 100;

    return products.map(p => {
      const createdDate = new Date(p.createdAt || Date.now());
      const diffDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
      
      const autoFlags = {
        bestSeller: (p.salesCount || 0) >= topSalesThreshold,
        new: diffDays <= newThresholdDays,
        lowStock: (p.stock || 0) > 0 && (p.stock || 0) <= lowStockThreshold,
        onSale: !!p.salePrice && parseFloat(p.salePrice) < parseFloat(p.price)
      };

      return {
        ...p,
        computedFlags: {
          ...p.flags,
          ...autoFlags,
          outOfStock: p.flags?.outOfStock || (p.stock || 0) <= 0
        }
      };
    });
  }, [products]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('feastly_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('feastly_products', JSON.stringify(products));
  }, [products]);

  const value = {
    products: computedProducts,
    rawProducts: products,
    setProducts,
    categories,
    setCategories
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};