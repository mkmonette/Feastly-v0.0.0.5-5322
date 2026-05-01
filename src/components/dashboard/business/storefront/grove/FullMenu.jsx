import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useGrove } from './GroveContext';
import { formatCurrency } from '@/common/currency';

const CATEGORY_ICONS = { Burgers: '🍔', Pizza: '🍕', Salads: '🥗', Drinks: '🥤', Desserts: '🍰' };

const PLACEHOLDER_MENU = {
  Burgers: [
    { id: 'm1', name: 'Classic Cheeseburger', description: 'Juicy beef patty with melted cheddar, lettuce, tomato, and special sauce', price: 12.99, cal: '650 cal', image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg' },
    { id: 'm2', name: 'Spicy Chicken Burger', description: 'Crispy chicken with jalapeños, pepper jack cheese, and chipotle mayo', price: 14.50, cal: '580 cal', image: 'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg' },
    { id: 'm3', name: 'BBQ Bacon Burger', description: 'Smoked bacon, crispy onion rings, and tangy BBQ sauce', price: 15.99, cal: '780 cal', image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg' },
    { id: 'm4', name: 'Veggie Delight', description: 'Plant-based patty with avocado, sprouts, and herb mayo', price: 13.50, cal: '420 cal', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' }
  ],
  Pizza: [
    { id: 'm5', name: 'Artisan Pepperoni', description: 'Classic pepperoni with mozzarella on hand-tossed dough', price: 18.00, cal: '700 cal', image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg' },
    { id: 'm6', name: 'Margherita', description: 'Fresh basil, buffalo mozzarella, and San Marzano tomatoes', price: 15.00, cal: '600 cal', image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg' },
    { id: 'm7', name: 'BBQ Chicken', description: 'Grilled chicken, red onion, BBQ sauce, and cilantro', price: 17.50, cal: '680 cal', image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg' },
    { id: 'm8', name: 'Veggie Supreme', description: 'Bell peppers, mushrooms, olives, and goat cheese', price: 16.00, cal: '520 cal', image: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg' }
  ],
  Salads: [
    { id: 'm9', name: 'Cobb Salad', description: 'Grilled chicken, bacon, eggs, avocado, and blue cheese', price: 14.99, cal: '380 cal', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' },
    { id: 'm10', name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, and house Caesar dressing', price: 12.99, cal: '320 cal', image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg' },
    { id: 'm11', name: 'Greek Salad', description: 'Cucumber, tomato, feta, olives, and oregano vinaigrette', price: 11.99, cal: '280 cal', image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg' }
  ],
  Drinks: [
    { id: 'm12', name: 'Fresh Lemonade', description: 'Squeezed daily with a hint of mint', price: 5.99, cal: '120 cal', image: 'https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg' },
    { id: 'm13', name: 'Iced Matcha Latte', description: 'Premium ceremonial grade matcha with oat milk', price: 6.99, cal: '180 cal', image: 'https://images.pexels.com/photos/3879495/pexels-photo-3879495.jpeg' },
    { id: 'm14', name: 'Cold Brew Coffee', description: 'Slow-steeped 18 hours, smooth and rich', price: 5.50, cal: '15 cal', image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg' }
  ],
  Desserts: [
    { id: 'm15', name: 'Chocolate Brownie', description: 'Warm fudgy brownie with vanilla ice cream', price: 7.99, cal: '480 cal', image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg' },
    { id: 'm16', name: 'Cheesecake Slice', description: 'New York style with berry compote', price: 8.99, cal: '420 cal', image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg' },
    { id: 'm17', name: 'Crème Brûlée', description: 'Classic French custard with caramelized sugar crust', price: 9.50, cal: '350 cal', image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg' }
  ]
};

/* Grove menu card: image top full-width with cal badge, white body, full desc, price + Add button */
const GroveCard = ({ product, tokens, onAdd }) => (
  <div
    className="rounded-xl overflow-hidden flex flex-col"
    style={{ backgroundColor: tokens.colors.cardBackground, border: `1px solid ${tokens.colors.cardBorder}` }}
  >
    <div className="relative">
      <img
        src={product.image || 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'}
        alt={product.name}
        className="w-full object-cover"
        style={{ height: 170 }}
      />
      {product.cal && (
        <span
          className="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: tokens.colors.calBadgeBg, color: tokens.colors.calBadgeText }}
        >
          {product.cal}
        </span>
      )}
    </div>

    <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
      <h3 className="text-base font-bold leading-snug" style={{ color: tokens.colors.primaryText }}>
        {product.name}
      </h3>
      <p className="text-xs leading-relaxed" style={{ color: tokens.colors.descriptionText }}>
        {product.description}
      </p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-base font-black" style={{ color: tokens.colors.primaryText }}>
          {formatCurrency(product.price)}
        </span>
        <button
          onClick={() => onAdd(product)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-85 active:scale-95"
          style={{ backgroundColor: tokens.colors.buttonPrimary, color: tokens.colors.buttonText }}
        >
          <SafeIcon icon={FiIcons.FiPlus} className="text-xs" />
          Add
        </button>
      </div>
    </div>
  </div>
);

const FullMenu = () => {
  const { tokens, sectionsConfig, products, addToCart } = useGrove();
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
        {subtitle && (
          <p className="text-sm mb-6" style={{ color: tokens.colors.mutedText }}>{subtitle}</p>
        )}

        {/* Category tabs: dark green active, border inactive, emoji + name + (count) */}
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
            <GroveCard key={product.id || i} product={product} tokens={tokens} onAdd={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FullMenu;
