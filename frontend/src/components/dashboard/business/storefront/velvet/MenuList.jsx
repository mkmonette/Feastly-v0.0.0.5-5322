import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useVelvet } from './VelvetContext';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80';

const MenuRow = ({ product, onAdd, tokens }) => {
  const [hovered, setHovered] = useState(false);
  const price = product.salePrice || product.price;
  const onSale = !!product.salePrice;
  const img = product.imageUrl || product.image || FALLBACK_IMAGE;
  const outOfStock = product.computedFlags?.outOfStock;

  return (
    <button
      type="button"
      onClick={() => !outOfStock && onAdd(product)}
      disabled={outOfStock}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-full text-left py-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        borderTop: `1px solid ${tokens.colors.border}`,
      }}
      data-testid={`velvet-menu-row-${product.id}`}
    >
      <div className="flex items-baseline gap-4">
        {/* Name + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3
              className="text-[24px] lg:text-[28px] leading-tight transition-colors"
              style={{
                color: hovered ? tokens.colors.primary : tokens.colors.text,
                fontFamily: tokens.typography.fontDisplay,
                fontWeight: 500,
              }}
            >
              {product.name}
            </h3>
            {product.computedFlags?.bestSeller && (
              <span
                className="text-[10px] italic"
                style={{
                  color: tokens.colors.primary,
                  fontFamily: tokens.typography.fontDisplay,
                }}
              >
                · chef's recommendation
              </span>
            )}
            {product.computedFlags?.new && (
              <span
                className="text-[10px] italic"
                style={{
                  color: tokens.colors.rosy,
                  fontFamily: tokens.typography.fontDisplay,
                }}
              >
                · new
              </span>
            )}
            {outOfStock && (
              <span
                className="text-[10px] italic"
                style={{ color: tokens.colors.textSubtle, fontFamily: tokens.typography.fontDisplay }}
              >
                · rested for the evening
              </span>
            )}
          </div>
          {product.description && (
            <p
              className="mt-2 text-[13px] italic leading-relaxed max-w-[540px]"
              style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.fontDisplay }}
            >
              {product.description}
            </p>
          )}
        </div>

        {/* Leader dots + price */}
        <div className="flex items-baseline gap-3 flex-shrink-0">
          <div
            className="hidden sm:block w-16 lg:w-24 border-b border-dotted"
            style={{ borderColor: tokens.colors.borderStrong, marginBottom: '6px' }}
          />
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-2">
              <span
                className="text-[20px] lg:text-[22px]"
                style={{
                  color: tokens.colors.primary,
                  fontFamily: tokens.typography.fontDisplay,
                  fontWeight: 500,
                }}
              >
                {formatCurrency(price)}
              </span>
              {onSale && (
                <span
                  className="text-[12px] italic line-through"
                  style={{ color: tokens.colors.textSubtle, fontFamily: tokens.typography.fontDisplay }}
                >
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            <div
              className="text-[10px] font-bold uppercase tracking-[0.28em] mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                color: tokens.colors.primary,
                fontFamily: tokens.typography.fontMono,
              }}
            >
              + Add to order
            </div>
          </div>
        </div>
      </div>

      {/* Hover image preview */}
      <motion.div
        initial={false}
        animate={{
          opacity: hovered && !outOfStock ? 1 : 0,
          y: hovered && !outOfStock ? 0 : 8,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 right-0 -translate-y-1/2 hidden lg:block pointer-events-none"
        style={{ transform: 'translateY(-50%)' }}
      >
        <div
          className="w-[170px] h-[120px] rounded-[14px] overflow-hidden"
          style={{
            border: `1px solid ${tokens.colors.borderStrong}`,
            boxShadow: tokens.effects.shadow.gold,
            transform: 'translate(40%, -50%)',
          }}
        >
          <img src={img} alt={product.name} className="w-full h-full object-cover" />
        </div>
      </motion.div>
    </button>
  );
};

const MenuList = () => {
  const { tokens, sectionsConfig, products, addToCart } = useVelvet();
  const section = sectionsConfig.find((s) => s.id === 'menu');

  const grouped = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const cat = p.category || 'Selections';
      if (!map[cat]) map[cat] = [];
      map[cat].push(p);
    });
    return map;
  }, [products]);

  if (!section?.content) return null;
  const { title, subtitle } = section.content;
  const categories = Object.keys(grouped);

  return (
    <section className="relative" data-testid="velvet-menu">
      <div className="mb-8 lg:mb-10 flex items-end justify-between gap-6">
        <div>
          <h2
            className="text-[36px] lg:text-[44px] leading-none tracking-tight"
            style={{
              color: tokens.colors.text,
              fontFamily: tokens.typography.fontDisplay,
              fontWeight: 500,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="mt-2 text-[13px] italic"
              style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.fontDisplay }}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div
          className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em]"
          style={{ color: tokens.colors.primary, fontFamily: tokens.typography.fontMono }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.colors.primary }} />
          {products.length} dishes tonight
        </div>
      </div>

      {categories.length === 0 ? (
        <div
          className="rounded-[18px] p-10 text-center"
          style={{
            backgroundColor: tokens.colors.surface,
            border: `1px solid ${tokens.colors.border}`,
          }}
        >
          <p
            className="text-[14px] italic"
            style={{ color: tokens.colors.textMuted, fontFamily: tokens.typography.fontDisplay }}
          >
            The kitchen is still composing tonight's menu.
          </p>
        </div>
      ) : (
        categories.map((cat) => (
          <div key={cat} className="mb-12 last:mb-0">
            {/* Category header */}
            <div className="flex items-center gap-3 mb-2">
              <SafeIcon
                icon={FiIcons.FiFeather}
                className="text-base"
                style={{ color: tokens.colors.primary }}
              />
              <h3
                className="text-[20px] italic"
                style={{
                  color: tokens.colors.primary,
                  fontFamily: tokens.typography.fontDisplay,
                  fontWeight: 500,
                }}
              >
                {cat}
              </h3>
              <span
                className="flex-1 h-px"
                style={{ backgroundColor: tokens.colors.border }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.32em]"
                style={{ color: tokens.colors.textSubtle, fontFamily: tokens.typography.fontMono }}
              >
                {grouped[cat].length} {grouped[cat].length === 1 ? 'dish' : 'dishes'}
              </span>
            </div>

            {/* Rows */}
            <div
              style={{ borderBottom: `1px solid ${tokens.colors.border}` }}
            >
              {grouped[cat].map((p) => (
                <MenuRow key={p.id} product={p} onAdd={addToCart} tokens={tokens} />
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default MenuList;
