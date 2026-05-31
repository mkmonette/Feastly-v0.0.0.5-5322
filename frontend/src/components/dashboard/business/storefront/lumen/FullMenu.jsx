import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useLumen } from './LumenContext';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80';

const ICON_FOR_CATEGORY = {
  'main course': FiIcons.FiCoffee,
  beverages: FiIcons.FiDroplet,
  burgers: FiIcons.FiPackage,
  pizza: FiIcons.FiTarget,
  salad: FiIcons.FiSun,
  salads: FiIcons.FiSun,
  drinks: FiIcons.FiDroplet,
  desserts: FiIcons.FiHeart,
};

const iconFor = (cat) => {
  if (!cat) return FiIcons.FiStar;
  return ICON_FOR_CATEGORY[cat.toLowerCase()] || FiIcons.FiStar;
};

const FullMenu = () => {
  const { tokens, sectionsConfig, products, addToCart } = useLumen();
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
    <section className="relative pt-10 pb-4" data-testid="lumen-menu">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2"
              style={{ backgroundColor: tokens.colors.sageSoft }}
            >
              <SafeIcon icon={FiIcons.FiList} className="text-xs" style={{ color: tokens.colors.sage }} />
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: tokens.colors.sage }}
              >
                Full menu
              </span>
            </div>
            <h2
              className="text-[30px] lg:text-[40px] font-black tracking-[-0.025em] leading-none"
              style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-[13px] font-medium mt-2" style={{ color: tokens.colors.textMuted }}>
                {subtitle}
              </p>
            )}
          </div>
          <div
            className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest"
            style={{ color: tokens.colors.textSubtle }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.colors.primary }} />
            {filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'}
          </div>
        </div>

        {/* Sticky category tabs */}
        <div
          className="sticky top-[68px] z-30 -mx-1 px-1 py-3 mb-5"
          style={{
            backgroundColor: tokens.colors.background,
            borderBottom: `1px solid ${tokens.colors.border}`,
          }}
        >
          <div
            className="flex gap-2 overflow-x-auto"
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
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all"
                  style={
                    isActive
                      ? {
                          backgroundColor: tokens.colors.primary,
                          color: tokens.colors.textOnPrimary,
                          boxShadow: tokens.effects.shadow.brand,
                        }
                      : {
                          backgroundColor: tokens.colors.surface,
                          color: tokens.colors.text,
                          border: `1px solid ${tokens.colors.border}`,
                        }
                  }
                  data-testid={`lumen-menu-tab-${cat}`}
                >
                  <SafeIcon icon={Icon} className="text-[12px]" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid (same Hearth-style card pattern: text on left, photo on right, but with Lumen styling) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {filtered.map((product, idx) => {
            const price = product.salePrice || product.price;
            const onSale = !!product.salePrice;
            const img = product.imageUrl || product.image || FALLBACK_IMAGE;
            const outOfStock = product.computedFlags?.outOfStock;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.035 }}
                whileHover={{ y: -3 }}
                className="relative rounded-[24px] overflow-hidden flex"
                style={{
                  backgroundColor: tokens.colors.cardBackground,
                  border: `1px solid ${tokens.colors.cardBorder}`,
                  boxShadow: tokens.effects.shadow.card,
                }}
                data-testid={`lumen-menu-card-${product.id}`}
              >
                {/* Left: text */}
                <div className="flex-1 min-w-0 p-4 flex flex-col">
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest mb-1"
                    style={{ color: tokens.colors.textSubtle }}
                  >
                    {product.category || 'Menu'}
                  </div>
                  <h3
                    className="text-[16px] font-black tracking-tight leading-tight"
                    style={{ color: tokens.colors.cardPrimaryText, fontFamily: tokens.typography.fontHeading }}
                  >
                    {product.name}
                  </h3>
                  {product.description && (
                    <p
                      className="text-[12px] font-medium mt-1.5 line-clamp-2 leading-relaxed"
                      style={{ color: tokens.colors.cardDescriptionText }}
                    >
                      {product.description}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    {onSale && (
                      <span
                        className="px-1.5 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest"
                        style={{ backgroundColor: tokens.colors.accent, color: '#fff' }}
                      >
                        Sale
                      </span>
                    )}
                    {product.computedFlags?.new && (
                      <span
                        className="px-1.5 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest"
                        style={{ backgroundColor: tokens.colors.sageSoft, color: tokens.colors.sage }}
                      >
                        New
                      </span>
                    )}
                    {product.computedFlags?.bestSeller && (
                      <span
                        className="px-1.5 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-widest"
                        style={{ backgroundColor: tokens.colors.primarySoft, color: tokens.colors.primary }}
                      >
                        ★ Best
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-3 flex items-end justify-between gap-2">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="text-[18px] font-black"
                        style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                      >
                        {formatCurrency(price)}
                      </span>
                      {onSale && (
                        <span className="text-[11px] font-bold line-through" style={{ color: tokens.colors.textSubtle }}>
                          {formatCurrency(product.price)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => !outOfStock && addToCart(product)}
                      disabled={outOfStock}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: tokens.colors.addButtonBg,
                        color: tokens.colors.addButtonText,
                        boxShadow: tokens.effects.shadow.brand,
                      }}
                      data-testid={`lumen-menu-add-${product.id}`}
                    >
                      <SafeIcon icon={FiIcons.FiPlus} className="text-sm" />
                    </button>
                  </div>
                </div>

                {/* Right: photo */}
                <div className="relative w-[110px] sm:w-[120px] flex-shrink-0 m-3 ml-0">
                  <div
                    className="relative w-full h-full rounded-[16px] overflow-hidden"
                    style={{ boxShadow: tokens.effects.shadow.card }}
                  >
                    <img
                      src={img}
                      alt={product.name}
                      className={`absolute inset-0 w-full h-full object-cover ${outOfStock ? 'grayscale opacity-70' : ''}`}
                    />
                    {outOfStock && (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(21,21,42,0.55)' }}>
                        <span className="text-white text-[9px] font-black uppercase tracking-widest text-center px-1">
                          Sold out
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div
            className="rounded-[20px] p-10 text-center mt-4"
            style={{
              backgroundColor: tokens.colors.surface,
              border: `1px solid ${tokens.colors.border}`,
            }}
          >
            <p className="text-[13px] font-bold" style={{ color: tokens.colors.textMuted }}>
              No dishes in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FullMenu;
