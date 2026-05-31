import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useCitrus } from './CitrusContext';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80';

const MenuBoard = () => {
  const { tokens, sectionsConfig, products, addToCart } = useCitrus();
  const section = sectionsConfig.find((s) => s.id === 'menu');

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );

  const [activeCategory, setActiveCategory] = useState('all');
  const tabsRef = useRef(null);
  const [tabsStuck, setTabsStuck] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!tabsRef.current) return;
      const top = tabsRef.current.getBoundingClientRect().top;
      setTabsStuck(top <= 80);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!section?.content) return null;
  const { title, subtitle } = section.content;

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="relative" data-testid="citrus-menu">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2
            className="text-[28px] lg:text-[36px] font-black tracking-tight leading-none"
            style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-[12px] font-bold mt-2" style={{ color: tokens.colors.textMuted }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest" style={{ color: tokens.colors.textMuted }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.colors.primary }} />
          {filtered.length} item{filtered.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Sticky category tabs */}
      <div
        ref={tabsRef}
        className={`sticky top-[64px] z-30 -mx-1 px-1 py-3 transition-all`}
        style={{
          backgroundColor: tabsStuck ? tokens.colors.background : 'transparent',
          borderBottom: tabsStuck ? tokens.effects.borderSoft : '1px solid transparent',
        }}
      >
        <div
          className="flex gap-2 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          {['all', ...categories].map((cat) => {
            const isActive = activeCategory === cat;
            const label = cat === 'all' ? 'Everything' : cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-black uppercase tracking-wider transition-all"
                style={
                  isActive
                    ? {
                        backgroundColor: tokens.colors.text,
                        color: tokens.colors.background,
                        border: tokens.effects.border,
                      }
                    : {
                        backgroundColor: tokens.colors.surface,
                        color: tokens.colors.text,
                        border: tokens.effects.border,
                      }
                }
                data-testid={`citrus-menu-chip-${cat}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of items */}
      {filtered.length === 0 ? (
        <div
          className="mt-6 rounded-[24px] p-10 text-center"
          style={{
            backgroundColor: tokens.colors.surface,
            border: tokens.effects.border,
          }}
        >
          <p className="text-[14px] font-bold" style={{ color: tokens.colors.textMuted }}>
            No dishes in this category yet.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {filtered.map((product, idx) => {
            const price = product.salePrice || product.price;
            const onSale = !!product.salePrice;
            const img = product.imageUrl || product.image || FALLBACK_IMAGE;
            const outOfStock = product.computedFlags?.outOfStock;

            return (
              <motion.button
                key={product.id}
                onClick={() => !outOfStock && addToCart(product)}
                disabled={outOfStock}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="group relative text-left rounded-[24px] overflow-hidden p-5 pr-28 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: tokens.colors.surface,
                  border: tokens.effects.border,
                  boxShadow: tokens.effects.shadow.card,
                  minHeight: '160px',
                }}
                data-testid={`citrus-menu-item-${product.id}`}
              >
                {/* Image disc top-right */}
                <div
                  className="absolute top-1/2 right-4 -translate-y-1/2 w-[108px] h-[108px] rounded-full overflow-hidden transition-transform duration-500 group-hover:scale-105"
                  style={{
                    border: tokens.effects.border,
                    boxShadow: tokens.effects.shadow.card,
                  }}
                >
                  <img
                    src={img}
                    alt={product.name}
                    className={`w-full h-full object-cover ${outOfStock ? 'grayscale' : ''}`}
                  />
                </div>

                {/* Badges */}
                <div className="flex items-center gap-1.5 mb-3">
                  {onSale && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                      style={{
                        backgroundColor: tokens.colors.primary,
                        color: '#fff',
                        border: tokens.effects.border,
                      }}
                    >
                      On sale
                    </span>
                  )}
                  {product.computedFlags?.new && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                      style={{
                        backgroundColor: tokens.colors.sun,
                        color: tokens.colors.text,
                        border: tokens.effects.border,
                      }}
                    >
                      New
                    </span>
                  )}
                  {product.computedFlags?.bestSeller && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                      style={{
                        backgroundColor: tokens.colors.accent,
                        color: '#fff',
                        border: tokens.effects.border,
                      }}
                    >
                      ★ Best seller
                    </span>
                  )}
                </div>

                <h3
                  className="text-[18px] font-black tracking-tight leading-tight"
                  style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                >
                  {product.name}
                </h3>
                {product.description && (
                  <p
                    className="text-[12px] font-medium mt-1.5 line-clamp-2 leading-relaxed pr-2"
                    style={{ color: tokens.colors.textMuted }}
                  >
                    {product.description}
                  </p>
                )}

                <div className="mt-4 flex items-end justify-between gap-3">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-[20px] font-black"
                      style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                    >
                      {formatCurrency(price)}
                    </span>
                    {onSale && (
                      <span
                        className="text-[12px] font-bold line-through"
                        style={{ color: tokens.colors.textMuted }}
                      >
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add chip (visual; click handled on whole card) */}
                <div
                  className="absolute -bottom-3 right-24 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                  style={{
                    backgroundColor: tokens.colors.text,
                    border: tokens.effects.border,
                    boxShadow: tokens.effects.shadow.lift,
                  }}
                >
                  <SafeIcon icon={FiIcons.FiPlus} className="text-xs" />
                  Add to order
                </div>

                {outOfStock && (
                  <div
                    className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                    style={{
                      backgroundColor: tokens.colors.text,
                      color: '#fff',
                      border: tokens.effects.border,
                    }}
                  >
                    Sold out
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MenuBoard;
