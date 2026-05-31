import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMosaic } from './MosaicContext';
import { tileColorForIndex } from '../mosaicTokens';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80';

const PopularTile = ({ product, idx, tone, tokens, onAdd }) => {
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
      className="group relative flex-shrink-0 w-[260px] snap-start text-left rounded-[26px] overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        backgroundColor: tone.bg,
        boxShadow: tokens.effects.shadow.tile,
      }}
      data-testid={`mosaic-popular-tile-${product.id}`}
    >
      <div className="relative w-full aspect-[5/4] overflow-hidden">
        <img
          src={img}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${outOfStock ? 'grayscale' : ''}`}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(15,23,42,0.35) 100%)' }}
        />
        {/* Rank + best */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {idx < 3 && (
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-black"
              style={{
                backgroundColor: tokens.colors.surfaceInk,
                color: '#fff',
                fontFamily: tokens.typography.fontHeading,
              }}
            >
              #{idx + 1}
            </span>
          )}
          {product.computedFlags?.bestSeller && (
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur"
              style={{ backgroundColor: 'rgba(255,255,255,0.95)', color: tokens.colors.text }}
            >
              <SafeIcon icon={FiIcons.FiStar} className="text-[10px]" style={{ color: tokens.colors.primary }} />
              Best
            </span>
          )}
        </div>
        {/* Rating chip */}
        <div
          className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: tokens.colors.text }}
        >
          <SafeIcon icon={FiIcons.FiStar} className="text-[10px]" style={{ color: tokens.colors.star }} />
          <span className="text-[10px] font-black">{(4.6 + (idx % 4) * 0.1).toFixed(1)}</span>
        </div>
        {onSale && (
          <span
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
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

const PopularPicks = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMosaic();
  const section = sectionsConfig.find((s) => s.id === 'popular');
  if (!section?.content) return null;
  const { title, subtitle, ctaText } = section.content;

  const popular = useMemo(() => {
    const flagged = products.filter(
      (p) =>
        p?.flags?.featured ||
        p?.computedFlags?.bestSeller ||
        p?.computedFlags?.new ||
        p?.salePrice
    );
    return (flagged.length >= 4 ? flagged : products).slice(0, 8);
  }, [products]);

  if (popular.length === 0) return null;

  return (
    <section className="relative pt-8 pb-2" data-testid="mosaic-popular">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2"
              style={{ backgroundColor: tokens.colors.surface, border: `1px solid ${tokens.colors.border}` }}
            >
              <SafeIcon icon={FiIcons.FiTrendingUp} className="text-xs" style={{ color: tokens.colors.primary }} />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: tokens.colors.text }}>
                Most ordered
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
          <button
            className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-black uppercase tracking-widest"
            style={{ color: tokens.colors.primary }}
            data-testid="mosaic-popular-see-all"
          >
            {ctaText}
            <SafeIcon icon={FiIcons.FiArrowRight} className="text-sm" />
          </button>
        </div>

        {/* Horizontal pastel-tile rail */}
        <div
          className="flex gap-4 lg:gap-5 overflow-x-auto pb-3 -mx-5 px-5 lg:-mx-10 lg:px-10 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {popular.map((product, idx) => (
            <PopularTile
              key={product.id}
              product={product}
              idx={idx}
              tone={tileColorForIndex(idx)}
              tokens={tokens}
              onAdd={addToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPicks;
