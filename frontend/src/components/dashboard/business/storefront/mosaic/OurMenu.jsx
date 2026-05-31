import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMosaic } from './MosaicContext';
import { tileColorForIndex } from '../mosaicTokens';
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

const ProductTile = ({ product, idx, tone, tokens, onAdd }) => {
  const price = product.salePrice || product.price;
  const onSale = !!product.salePrice;
  const img = product.imageUrl || product.image || FALLBACK_IMAGE;
  const outOfStock = product.computedFlags?.outOfStock;

  return (
    <motion.button
      type="button"
      onClick={() => !outOfStock && onAdd(product)}
      disabled={outOfStock}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative text-left rounded-[26px] overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        backgroundColor: tone.bg,
        boxShadow: tokens.effects.shadow.tile,
      }}
      data-testid={`mosaic-menu-tile-${product.id}`}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={img}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${outOfStock ? 'grayscale' : ''}`}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(15,23,42,0.35) 100%)' }} />
        {product.computedFlags?.bestSeller && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
            style={{ backgroundColor: tokens.colors.surfaceInk, color: '#fff' }}
          >
            ★ Best
          </span>
        )}
        {onSale && (
          <span
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
            style={{ backgroundColor: tokens.colors.primary, color: '#fff' }}
          >
            On sale
          </span>
        )}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(15,23,42,0.55)' }}>
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Sold out</span>
          </div>
        )}
      </div>
      <div className="p-4 flex items-end justify-between gap-3" style={{ color: tone.ink }}>
        <div className="min-w-0">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
            {product.category || 'Menu'}
          </div>
          <h3
            className="text-[15px] font-black leading-tight tracking-tight truncate mt-0.5"
            style={{ fontFamily: tokens.typography.fontHeading }}
          >
            {product.name}
          </h3>
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-[15px] font-black" style={{ fontFamily: tokens.typography.fontHeading }}>
              {formatCurrency(price)}
            </span>
            {onSale && (
              <span className="text-[11px] font-bold line-through opacity-50">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </div>
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
          style={{ backgroundColor: tokens.colors.surfaceInk, color: '#fff' }}
        >
          <SafeIcon icon={FiIcons.FiPlus} className="text-sm" />
        </div>
      </div>
    </motion.button>
  );
};

const OurMenu = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMosaic();
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
    <section className="relative pt-10 pb-2" data-testid="mosaic-menu">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2"
              style={{ backgroundColor: tokens.colors.surface, border: `1px solid ${tokens.colors.border}` }}
            >
              <SafeIcon icon={FiIcons.FiGrid} className="text-xs" style={{ color: tokens.colors.text }} />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: tokens.colors.text }}>
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
            style={{ color: tokens.colors.textMuted }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.colors.primary }} />
            {filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'}
          </div>
        </div>

        {/* Sticky category tabs (bento-style with dark-navy active) */}
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
                          backgroundColor: tokens.colors.surfaceInk,
                          color: '#fff',
                          boxShadow: tokens.effects.shadow.tile,
                        }
                      : {
                          backgroundColor: tokens.colors.surface,
                          color: tokens.colors.text,
                          border: `1px solid ${tokens.colors.border}`,
                        }
                  }
                  data-testid={`mosaic-menu-tab-${cat}`}
                >
                  <SafeIcon icon={Icon} className="text-[12px]" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento-style pastel tile grid (filtered by tab) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {filtered.map((p, idx) => (
            <ProductTile
              key={p.id}
              product={p}
              idx={idx}
              tone={tileColorForIndex(idx)}
              tokens={tokens}
              onAdd={addToCart}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            className="rounded-[24px] p-10 text-center mt-4"
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

export default OurMenu;
