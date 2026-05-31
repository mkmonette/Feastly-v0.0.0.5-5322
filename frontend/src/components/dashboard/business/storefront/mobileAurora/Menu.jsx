import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileAurora } from './MobileAuroraContext';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80';

const CATEGORY_ICONS = {
  'main course': FiIcons.FiCoffee,
  beverages: FiIcons.FiDroplet,
  burgers: FiIcons.FiPackage,
  pizza: FiIcons.FiTarget,
  salad: FiIcons.FiSun,
  desserts: FiIcons.FiHeart,
  default: FiIcons.FiStar,
};

const iconFor = (cat) => {
  if (!cat) return CATEGORY_ICONS.default;
  return CATEGORY_ICONS[cat.toLowerCase()] || CATEGORY_ICONS.default;
};

const Menu = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMobileAurora();
  const section = sectionsConfig.find((s) => s.id === 'menu');

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );

  const [activeCategory, setActiveCategory] = useState('all');

  if (!section?.content) return null;
  const { title, subtitle } = section.content;

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (products.length === 0) return null;

  return (
    <section className="relative pt-6 pb-2" data-testid="aurora-menu">
      <div className="px-4 mb-3">
        <h2
          className="text-xl font-black tracking-tight"
          style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-[11px] font-semibold mt-0.5" style={{ color: tokens.colors.textMuted }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Category chips */}
      <div
        className="flex gap-2 overflow-x-auto pb-3 px-4"
        style={{ scrollbarWidth: 'none' }}
      >
        {['all', ...categories].map((cat) => {
          const isActive = activeCategory === cat;
          const Icon = cat === 'all' ? FiIcons.FiGrid : iconFor(cat);
          const label = cat === 'all' ? 'All' : cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all"
              style={
                isActive
                  ? {
                      background: tokens.colors.auroraGradient,
                      color: '#fff',
                      boxShadow: tokens.effects.shadow.soft,
                    }
                  : {
                      backgroundColor: tokens.colors.surface,
                      color: tokens.colors.text,
                      border: `1px solid ${tokens.colors.border}`,
                    }
              }
              data-testid={`aurora-menu-chip-${cat}`}
            >
              <SafeIcon icon={Icon} className="text-[11px]" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Product grid */}
      <div className="px-4 grid grid-cols-2 gap-3.5">
        {filtered.map((product, idx) => {
          const price = product.salePrice || product.price;
          const onSale = !!product.salePrice;
          const img = product.imageUrl || product.image || FALLBACK_IMAGE;
          const outOfStock = product.computedFlags?.outOfStock;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="relative rounded-[24px] overflow-hidden flex flex-col"
              style={{
                backgroundColor: tokens.colors.surface,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: tokens.effects.shadow.card,
              }}
            >
              {/* Floating image card */}
              <div className="relative p-2.5 pb-0">
                <div
                  className="relative w-full overflow-hidden rounded-[18px]"
                  style={{ height: '120px' }}
                >
                  <img
                    src={img}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${outOfStock ? 'grayscale opacity-60' : 'hover:scale-110'}`}
                  />
                  {product.computedFlags?.new && (
                    <span
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-white"
                      style={{ background: tokens.colors.auroraGradient }}
                    >
                      New
                    </span>
                  )}
                  {outOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(27,27,58,0.45)' }}>
                      <span className="text-white text-[10px] font-black uppercase tracking-widest">
                        Sold out
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 pt-2.5 flex flex-col flex-1">
                <h3
                  className="text-[13px] font-black leading-snug line-clamp-2"
                  style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-[10px] font-medium mt-0.5 line-clamp-1"
                  style={{ color: tokens.colors.textMuted }}
                >
                  {product.category || 'Menu'}
                </p>

                <div className="flex items-center justify-between mt-2.5">
                  <div className="flex flex-col leading-tight">
                    <span
                      className="text-[13.5px] font-black"
                      style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                    >
                      {formatCurrency(price)}
                    </span>
                    {onSale && (
                      <span
                        className="text-[9px] font-bold line-through"
                        style={{ color: tokens.colors.textMuted }}
                      >
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => !outOfStock && addToCart(product)}
                    disabled={outOfStock}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: tokens.colors.auroraGradient,
                      boxShadow: tokens.effects.shadow.soft,
                    }}
                    data-testid={`aurora-menu-add-${product.id}`}
                  >
                    <SafeIcon icon={FiIcons.FiPlus} className="text-xs" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Menu;
