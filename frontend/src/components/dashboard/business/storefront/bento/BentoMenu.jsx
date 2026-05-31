import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useBento } from './BentoContext';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80';

const TILE_PALETTE = [
  { bg: '#FDE68A', ink: '#0F172A' }, // butter
  { bg: '#A7F3D0', ink: '#0F172A' }, // mint
  { bg: '#DDD6FE', ink: '#0F172A' }, // lavender
  { bg: '#FBCFE8', ink: '#0F172A' }, // blush
  { bg: '#BAE6FD', ink: '#0F172A' }, // sky
  { bg: '#FED7AA', ink: '#0F172A' }, // peach
];

const colorForIndex = (i) => TILE_PALETTE[i % TILE_PALETTE.length];

const ProductTile = ({ product, idx, span = '1', tone, onAdd, tokens }) => {
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
      transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative text-left rounded-[26px] overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed ${span}`}
      style={{
        backgroundColor: tone.bg,
        boxShadow: tokens.effects.shadow.tile,
      }}
      data-testid={`bento-tile-${product.id}`}
    >
      {/* Image */}
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

      {/* Caption */}
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
            <span
              className="text-[15px] font-black"
              style={{ fontFamily: tokens.typography.fontHeading }}
            >
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

const FeaturedTile = ({ product, onAdd, tokens }) => {
  if (!product) return null;
  const price = product.salePrice || product.price;
  const onSale = !!product.salePrice;
  const img = product.imageUrl || product.image || FALLBACK_IMAGE;

  return (
    <motion.button
      type="button"
      onClick={() => onAdd(product)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative text-left col-span-12 md:col-span-7 row-span-2 rounded-[32px] overflow-hidden"
      style={{
        backgroundColor: tokens.colors.surfaceInk,
        minHeight: '420px',
        boxShadow: tokens.effects.shadow.tile,
      }}
      data-testid={`bento-featured-${product.id}`}
    >
      <img
        src={img}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.0) 30%, rgba(15,23,42,0.85) 100%)' }} />

      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        <span
          className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
          style={{ backgroundColor: tokens.colors.primary, color: '#fff' }}
        >
          ★ Featured
        </span>
        <span
          className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur"
          style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}
        >
          Chef's pick
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7 text-white">
        <div className="text-[10px] font-black uppercase tracking-[0.28em] opacity-75">
          {product.category || 'Featured'}
        </div>
        <h2
          className="text-[36px] lg:text-[44px] font-black leading-[1.02] tracking-tight mt-2 max-w-md"
          style={{ fontFamily: tokens.typography.fontHeading }}
        >
          {product.name}
        </h2>
        {product.description && (
          <p className="text-[13px] font-medium mt-2 max-w-md opacity-80 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span
              className="text-[28px] font-black"
              style={{ fontFamily: tokens.typography.fontHeading }}
            >
              {formatCurrency(price)}
            </span>
            {onSale && (
              <span className="text-[13px] font-bold line-through opacity-60">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          <div
            className="inline-flex items-center gap-2 pl-4 pr-2 py-2 rounded-full"
            style={{ backgroundColor: '#fff', color: tokens.colors.text }}
          >
            <span className="text-[11px] font-black uppercase tracking-widest">Add to cart</span>
            <span
              className="w-7 h-7 rounded-full inline-flex items-center justify-center"
              style={{ backgroundColor: tokens.colors.primary, color: '#fff' }}
            >
              <SafeIcon icon={FiIcons.FiPlus} className="text-sm" />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

const PromoTile = ({ promo, tokens }) => {
  if (!promo) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative col-span-12 md:col-span-5 rounded-[26px] overflow-hidden p-6 lg:p-7 flex flex-col justify-between"
      style={{
        backgroundColor: tokens.colors.primary,
        color: '#fff',
        minHeight: '200px',
        boxShadow: tokens.effects.shadow.brand,
      }}
      data-testid="bento-promo"
    >
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-40 blur-2xl"
        style={{ background: 'radial-gradient(circle, #fff, transparent 70%)' }}
      />
      <div className="relative z-10">
        <div className="text-[10px] font-black uppercase tracking-[0.28em] opacity-80">
          {promo.eyebrow}
        </div>
        <h3
          className="text-[28px] lg:text-[32px] font-black leading-[1.05] tracking-tight mt-2 max-w-[280px]"
          style={{ fontFamily: tokens.typography.fontHeading }}
        >
          {promo.title}
        </h3>
        <p className="text-[12px] font-medium mt-2 max-w-[280px] opacity-90 leading-relaxed">
          {promo.copy}
        </p>
      </div>
      <button
        type="button"
        className="relative z-10 mt-4 self-start inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-black uppercase tracking-widest"
        style={{ backgroundColor: '#fff', color: tokens.colors.text }}
        data-testid="bento-promo-cta"
      >
        {promo.cta}
        <SafeIcon icon={FiIcons.FiArrowRight} className="text-sm" />
      </button>
    </motion.div>
  );
};

const BentoMenu = () => {
  const { tokens, sectionsConfig, products, addToCart } = useBento();
  const section = sectionsConfig.find((s) => s.id === 'menu');

  // Pick a featured product: bestSeller > first product
  const featured = useMemo(() => {
    const best = products.find((p) => p.computedFlags?.bestSeller);
    return best || products[0] || null;
  }, [products]);

  const others = useMemo(
    () => products.filter((p) => p && p.id !== featured?.id),
    [products, featured]
  );

  if (!section?.content) return null;
  const { title, subtitle, promo } = section.content;

  return (
    <section className="relative" data-testid="bento-menu">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 pt-10 lg:pt-14 pb-10">
        {/* Title */}
        <div className="max-w-3xl mb-8 lg:mb-10">
          <h1
            className="text-[40px] lg:text-[64px] font-black tracking-[-0.03em] leading-[0.98]"
            style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-4 text-[14px] lg:text-[16px] font-medium leading-relaxed max-w-[600px]"
              style={{ color: tokens.colors.textMuted }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Top row: featured (7/12) + promo (5/12) */}
        {(featured || promo) && (
          <div className="grid grid-cols-12 gap-4 lg:gap-5 mb-4 lg:mb-5">
            {featured && (
              <FeaturedTile product={featured} onAdd={addToCart} tokens={tokens} />
            )}
            {promo && <PromoTile promo={promo} tokens={tokens} />}
          </div>
        )}

        {/* Bento tile grid */}
        {others.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {others.map((p, idx) => (
              <ProductTile
                key={p.id}
                product={p}
                idx={idx}
                tone={colorForIndex(idx)}
                onAdd={addToCart}
                tokens={tokens}
              />
            ))}
          </div>
        )}

        {products.length === 0 && (
          <div
            className="rounded-[24px] p-10 text-center"
            style={{
              backgroundColor: tokens.colors.surface,
              border: `1px solid ${tokens.colors.border}`,
            }}
          >
            <p className="text-[14px] font-bold" style={{ color: tokens.colors.textMuted }}>
              No dishes yet. Add some products to see your bento menu come to life.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BentoMenu;
