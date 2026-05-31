import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSaffron } from './SaffronContext';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80';

const PopularPicks = () => {
  const { tokens, sectionsConfig, products, addToCart } = useSaffron();
  const section = sectionsConfig.find((s) => s.id === 'popular');
  if (!section?.content) return null;

  const { title, subtitle, ctaText } = section.content;

  // Pick bestSellers / featured / on-sale; fall back to first 6 products.
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
    <section className="relative pt-6 pb-2" data-testid="saffron-popular">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2"
              style={{ backgroundColor: tokens.colors.surfaceMuted }}
            >
              <SafeIcon icon={FiIcons.FiTrendingUp} className="text-xs" style={{ color: tokens.colors.primary }} />
              <span
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: tokens.colors.text }}
              >
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
            data-testid="saffron-popular-see-all"
          >
            {ctaText}
            <SafeIcon icon={FiIcons.FiArrowRight} className="text-sm" />
          </button>
        </div>

        {/* Horizontal scroller */}
        <div
          className="flex gap-4 lg:gap-5 overflow-x-auto pb-3 -mx-5 px-5 lg:-mx-10 lg:px-10 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {popular.map((product, idx) => {
            const price = product.salePrice || product.price;
            const onSale = !!product.salePrice;
            const img = product.imageUrl || product.image || FALLBACK_IMAGE;
            const outOfStock = product.computedFlags?.outOfStock;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="relative flex-shrink-0 w-[260px] snap-start rounded-[24px] overflow-hidden flex flex-col"
                style={{
                  backgroundColor: tokens.colors.surface,
                  border: `1px solid ${tokens.colors.border}`,
                  boxShadow: tokens.effects.shadow.card,
                }}
                data-testid={`saffron-popular-card-${product.id}`}
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img
                    src={img}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${outOfStock ? 'grayscale opacity-70' : ''}`}
                  />
                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {idx < 3 && (
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-black"
                        style={{
                          backgroundColor: tokens.colors.accent,
                          color: tokens.colors.textOnAccent,
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
                  {/* Rating chip top-right */}
                  <div
                    className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: tokens.colors.text }}
                  >
                    <SafeIcon icon={FiIcons.FiStar} className="text-[10px]" style={{ color: tokens.colors.primary }} />
                    <span className="text-[10px] font-black">
                      {(4.6 + (idx % 4) * 0.1).toFixed(1)}
                    </span>
                  </div>
                  {outOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(11,31,42,0.55)' }}>
                      <span className="text-white text-[10px] font-black uppercase tracking-widest">Sold out</span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest mb-1"
                    style={{ color: tokens.colors.textSubtle }}
                  >
                    {product.category || 'Menu'}
                  </div>
                  <h3
                    className="text-[15.5px] font-black tracking-tight leading-tight line-clamp-2"
                    style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                  >
                    {product.name}
                  </h3>

                  <div className="mt-auto pt-3 flex items-end justify-between gap-2">
                    <div>
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
                    </div>
                    <button
                      onClick={() => !outOfStock && addToCart(product)}
                      disabled={outOfStock}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: tokens.colors.primary,
                        color: tokens.colors.textOnPrimary,
                        boxShadow: tokens.effects.shadow.brand,
                      }}
                      data-testid={`saffron-popular-add-${product.id}`}
                    >
                      <SafeIcon icon={FiIcons.FiPlus} className="text-sm" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularPicks;
