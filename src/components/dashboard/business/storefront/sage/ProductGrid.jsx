import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSage } from './SageContext';
import { formatCurrency } from '@/common/currency';

const CATEGORY_ICONS = { Burgers: '🍔', Pizza: '🍕', Salads: '🥗', Drinks: '🥤', Desserts: '🍰' };

const PLACEHOLDER_MENU = {
  Burgers: [
    { id: 'm1', name: 'Classic Cheeseburger', description: 'Juicy beef patty with melted cheddar, lettuce, tomato, and special sauce', price: 12.99, image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg' },
    { id: 'm2', name: 'Spicy Chicken Burger', description: 'Crispy chicken with jalapeños, pepper jack cheese, and chipotle mayo', price: 14.50, image: 'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg' },
    { id: 'm3', name: 'BBQ Bacon Burger', description: 'Smoked bacon, crispy onion rings, and tangy BBQ sauce', price: 15.99, image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg' },
    { id: 'm4', name: 'Veggie Delight', description: 'Plant-based patty with avocado, sprouts, and herb mayo', price: 13.50, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' }
  ],
  Pizza: [
    { id: 'm5', name: 'Artisan Pepperoni', description: 'Classic pepperoni with mozzarella on hand-tossed dough', price: 18.00, image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg' },
    { id: 'm6', name: 'Margherita', description: 'Fresh basil, buffalo mozzarella, and San Marzano tomatoes', price: 15.00, image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg' },
    { id: 'm7', name: 'BBQ Chicken', description: 'Grilled chicken, red onion, BBQ sauce, and cilantro', price: 17.50, image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg' },
    { id: 'm8', name: 'Veggie Supreme', description: 'Bell peppers, mushrooms, olives, and goat cheese', price: 16.00, image: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg' }
  ],
  Salads: [
    { id: 'm9', name: 'Cobb Salad', description: 'Grilled chicken, bacon, eggs, avocado, and blue cheese', price: 14.99, image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' },
    { id: 'm10', name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, and house Caesar dressing', price: 12.99, image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg' },
    { id: 'm11', name: 'Greek Salad', description: 'Cucumber, tomato, feta, olives, and oregano vinaigrette', price: 11.99, image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg' }
  ],
  Drinks: [
    { id: 'm12', name: 'Fresh Lemonade', description: 'Squeezed daily with a hint of mint', price: 5.99, image: 'https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg' },
    { id: 'm13', name: 'Iced Matcha Latte', description: 'Premium ceremonial grade matcha with oat milk', price: 6.99, image: 'https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg' },
    { id: 'm14', name: 'Cold Brew Coffee', description: 'Slow-steeped 18 hours, smooth and rich', price: 5.50, image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg' }
  ],
  Desserts: [
    { id: 'm15', name: 'Chocolate Brownie', description: 'Warm fudgy brownie with vanilla ice cream', price: 7.99, image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg' },
    { id: 'm16', name: 'Cheesecake Slice', description: 'New York style with berry compote', price: 8.99, image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg' },
    { id: 'm17', name: 'Creme Brulee', description: 'Classic French custard with caramelized sugar crust', price: 9.50, image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg' }
  ]
};

/* Sage product card: dark surface, image on left side, text on right */
const SageCard = ({ product, tokens }) => (
  <div
    className="flex gap-4 p-4 rounded-xl transition-all hover:brightness-110"
    style={{ backgroundColor: tokens.colors.surfaceCard, border: `1px solid ${tokens.colors.border}` }}
  >
    <img
      src={product.image || 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'}
      alt={product.name}
      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
    />
    <div className="flex flex-col justify-between flex-1 min-w-0">
      <div>
        <h3 className="text-sm font-bold leading-snug mb-1" style={{ color: tokens.colors.textPrimary }}>
          {product.name}
        </h3>
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: tokens.colors.textMuted }}>
          {product.description}
        </p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-black" style={{ color: tokens.colors.primary }}>
          {formatCurrency(product.price)}
        </span>
        <button
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-85 active:scale-95"
          style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.textInverse }}
        >
          <SafeIcon icon={FiIcons.FiPlus} className="text-xs" />
          Add
        </button>
      </div>
    </div>
  </div>
);

const ProductGrid = () => {
  const { tokens, sectionsConfig, products } = useSage();
  const [activeCategory, setActiveCategory] = useState('Burgers');
  const section = sectionsConfig.find(s => s.id === 'products');
  if (!section) return null;
  const { label, title, subtitle } = section.content || {};

  const hasRealProducts = products?.length > 0;
  const categories = hasRealProducts
    ? [...new Set(products.map(p => p.category).filter(Boolean))]
    : Object.keys(PLACEHOLDER_MENU);

  const displayProducts = hasRealProducts
    ? products.filter(p => p.category === activeCategory)
    : PLACEHOLDER_MENU[activeCategory] || [];

  const getCount = cat => hasRealProducts
    ? products.filter(p => p.category === cat).length
    : (PLACEHOLDER_MENU[cat] || []).length;

  return (
    <section style={{ backgroundColor: tokens.colors.surfaceAlt }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          {label && (
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: tokens.colors.sectionLabel }}>
              {label}
            </p>
          )}
          <h2 className="text-3xl font-black mb-2" style={{ color: tokens.colors.textPrimary }}>{title}</h2>
          {subtitle && <p className="text-sm" style={{ color: tokens.colors.textMuted }}>{subtitle}</p>}
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1 justify-center flex-wrap">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive ? tokens.colors.primary : 'transparent',
                  color: isActive ? tokens.colors.textInverse : tokens.colors.textMuted,
                  border: isActive ? 'none' : `1px solid ${tokens.colors.border}`
                }}
              >
                <span>{CATEGORY_ICONS[cat] || '🍽️'}</span>
                <span>{cat}</span>
                <span className="opacity-60">({getCount(cat)})</span>
              </button>
            );
          })}
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayProducts.map((product, i) => (
            <SageCard key={product.id || i} product={product} tokens={tokens} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
