import React from 'react';
import { useModernBite } from './ModernBiteContext';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Ticker from './Ticker';
import FeaturedProducts from './FeaturedProducts';
import ProductGrid from './ProductGrid';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import CTABanner from './CTABanner';
import Contact from './Contact';
import Footer from './Footer';
import CartPanel from './CartPanel';

const mockCategories = [
  { id: '1', name: 'Burgers', icon: 'FiMenu' },
  { id: '2', name: 'Pizza', icon: 'FiPieChart' },
  { id: '3', name: 'Salads', icon: 'FiCheckCircle' },
  { id: '4', name: 'Drinks', icon: 'FiCoffee' },
  { id: '5', name: 'Desserts', icon: 'FiHeart' },
];

const mockProducts = [
  { id: '1', categoryId: '1', name: 'Classic Cheeseburger', description: 'Juicy beef patty with melted cheddar, lettuce, tomato, and special sauce', price: 12.99, calories: '850 cal', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80', isPopular: true },
  { id: '2', categoryId: '2', name: 'Artisan Pepperoni', description: 'Hand-tossed crust, san marzano tomato sauce, fresh mozzarella, and pepperoni', price: 18.00, calories: '1200 cal', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80', isPopular: true },
  { id: '3', categoryId: '3', name: 'Cobb Salad', description: 'Mixed greens, grilled chicken, bacon, avocado, egg, blue cheese', price: 14.99, calories: '580 cal', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80', isPopular: true },
  { id: '4', categoryId: '5', name: 'Chocolate Brownie', description: 'Warm fudge brownie served with vanilla bean ice cream', price: 7.99, calories: '450 cal', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80', isPopular: true },
  { id: '5', categoryId: '1', name: 'Spicy Chicken Burger', description: 'Crispy chicken with jalapeños, pepper jack cheese, and chipotle mayo', price: 14.50, calories: '950 cal', image: 'https://images.unsplash.com/photo-1615486171448-4228b6d81745?auto=format&fit=crop&q=80' },
  { id: '6', categoryId: '1', name: 'BBQ Bacon Burger', description: 'Smoked bacon, crispy onion rings, and tangy BBQ sauce', price: 15.99, calories: '1100 cal', image: 'https://images.unsplash.com/photo-1594212691516-74898e2b7b5c?auto=format&fit=crop&q=80' },
  { id: '7', categoryId: '1', name: 'Veggie Delight', description: 'Plant-based patty with avocado, sprouts, and herb mayo', price: 13.50, calories: '620 cal', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80' },
];

const ModernBiteRenderer = () => {
  const { tokens, sectionsConfig } = useModernBite();
  
  const getSection = (id) => sectionsConfig.find(s => s.id === id);
  const isVisible = (id) => getSection(id)?.visibility?.enabled !== false;

  return (
    <div className="flex h-full min-h-screen bg-white" style={{ fontFamily: tokens.typography.fontFamily.sans }}>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white">
        {isVisible('header') && <Header section={getSection('header')} />}
        
        <div className="px-8 pb-12 max-w-6xl mx-auto w-full">
          {isVisible('hero') && <Hero section={getSection('hero')} />}
          {isVisible('about') && <About section={getSection('about')} />}
          {isVisible('ticker') && <Ticker section={getSection('ticker')} />}
          {isVisible('featured') && <FeaturedProducts section={getSection('featured')} products={mockProducts} />}
          {isVisible('products') && <ProductGrid section={getSection('products')} products={mockProducts} categories={mockCategories} />}
          {isVisible('gallery') && <Gallery section={getSection('gallery')} />}
          {isVisible('testimonials') && <Testimonials section={getSection('testimonials')} />}
          {isVisible('cta') && <CTABanner section={getSection('cta')} />}
          {isVisible('contact') && <Contact section={getSection('contact')} />}
        </div>
        
        {isVisible('footer') && <Footer section={getSection('footer')} />}
      </div>

      {/* Right Cart Sidebar */}
      <div className="w-[380px] shrink-0 sticky top-0 h-screen overflow-hidden z-20">
        <CartPanel />
      </div>
    </div>
  );
};

export default ModernBiteRenderer;