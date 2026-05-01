import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useHearth } from './HearthContext';
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

/* Same white card layout as PopularPicks — name top + yellow circle +, desc, price, inset image at bottom */
const HearthCard = ({ product, tokens, onAdd }) => (
  <div
    className="rounded-2xl flex flex-col p-4"
    style={{ backgroundColor: tokens.colors.cardBackground, border: `1px solid ${tokens.colors.cardBorder}` }}
  >
    <div className="flex items-start justify-between gap-2 mb-2">
      <h3 className="text-base font-black leading-snug flex-1" style={{ color: tokens.colors.cardPrimaryText }}>
        {product.name}
      </h3>
      <button
        onClick={() => onAdd(product)}
        className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:opacity-85 active:scale-95"
        style={{ backgroundColor: tokens.colors.addButtonBg, color: tokens.colors.addButtonText }}
      >
        <SafeIcon icon={FiIcons.FiPlus} className="text-base" />
      </button>
    </div>

    <p className="text-xs leading-relaxed mb-3" style={{ color: tokens.colors.cardDescriptionText }}>
      {product.description}
    </p>

    <span className="text-base font-black mb-3" style={{ color: tokens.colors.cardPriceText }}>
      {formatCurrency(product.price)}
    </span>

    {/* Inset image — padded within card, rounded corners, not touching edges */}
    <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: '4/3' }}>
      <img
        src={product.image || 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

const FullMenu = () => {
  const { tokens, sectionsConfig, products, addToCart } = useHearth();
  const [activeCategory, setActiveCategory] = useState('Burgers');
  const section = sectionsConfig.find(s => s.id === 'menu');
  if (!section?.content) return null;
  const { title, subtitle } = section.content;

  const hasRealProducts = products?.length > 0;
  const categories = hasRealProducts
    ? [...new Set(products.map(p => p.category).filter(Boolean))]
    : Object.keys(PLACEHOLDER_MENU);

  const displayProducts = hasRealProducts
    ? products.filter(p => p.category === activeCategory).slice(0, 4)
    : PLACEHOLDER_MENU[activeCategory] || [];

  const getCount = (cat) => hasRealProducts
    ? products.filter(p => p.category === cat).length
    : (PLACEHOLDER_MENU[cat] || []).length;

  return (
    <section className="py-14" style={{ backgroundColor: tokens.colors.sectionAlt }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-1" style={{ color: tokens.colors.primaryText }}>{title}</h2>
        {subtitle && <p className="text-sm mb-6" style={{ color: tokens.colors.mutedText }}>{subtitle}</p>}

        {/* Tabs: yellow active, dark bordered inactive */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive ? tokens.colors.tabActive : 'transparent',
                  color: isActive ? tokens.colors.tabActiveText : tokens.colors.tabInactiveText,
                  border: isActive ? 'none' : `1px solid ${tokens.colors.tabInactiveBorder}`
                }}
              >
                <span>{CATEGORY_ICONS[cat] || '🍽️'}</span>
                <span>{cat}</span>
                <span className="opacity-70">({getCount(cat)})</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayProducts.map((product, i) => (
            <HearthCard key={product.id || i} product={product} tokens={tokens} onAdd={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FullMenu;
