import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileAurora } from './MobileAuroraContext';
import { formatCurrency } from '@/common/currency';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80';

const Featured = () => {
  const { tokens, sectionsConfig, products, addToCart } = useMobileAurora();
  const section = sectionsConfig.find((s) => s.id === 'featured');
  if (!section?.content) return null;

  const { title, seeAllText } = section.content;
  const featured = products.filter((p) => p.flags?.featured || p.computedFlags?.bestSeller);
  const list = (featured.length > 0 ? featured : products).slice(0, 5);
  if (list.length === 0) return null;

  return (
    <section className="relative pt-8 pb-2" data-testid="aurora-featured">
      <div className="px-4 flex items-end justify-between mb-3">
        <div>
          <h2
            className="text-xl font-black tracking-tight"
            style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
          >
            {title}
          </h2>
          <p className="text-[11px] font-semibold mt-0.5" style={{ color: tokens.colors.textMuted }}>
            Curated by our chefs
          </p>
        </div>
        <button
          className="text-[11px] font-bold inline-flex items-center gap-1"
          style={{ color: tokens.colors.primary }}
          data-testid="aurora-featured-see-all"
        >
          {seeAllText} <SafeIcon icon={FiIcons.FiArrowRight} className="text-xs" />
        </button>
      </div>

      <div
        className="flex gap-3.5 overflow-x-auto pb-3 px-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {list.map((product, idx) => {
          const price = product.salePrice || product.price;
          const onSale = !!product.salePrice;
          const img = product.imageUrl || product.image || FALLBACK_IMAGE;
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="relative flex-shrink-0 w-[210px] snap-start rounded-[26px] overflow-hidden"
              style={{
                backgroundColor: tokens.colors.surface,
                border: `1px solid ${tokens.colors.border}`,
                boxShadow: tokens.effects.shadow.card,
              }}
            >
              <div className="relative h-[150px] overflow-hidden">
                <img src={img} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.35) 100%)' }} />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                  {onSale && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider text-white"
                      style={{ background: tokens.colors.auroraGradient }}
                    >
                      On sale
                    </span>
                  )}
                  {product.computedFlags?.bestSeller && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                      style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: tokens.colors.text }}
                    >
                      ★ Top
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-[13.5px] font-black leading-snug line-clamp-2 flex-1"
                    style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                  >
                    {product.name}
                  </h3>
                </div>
                <p
                  className="text-[11px] font-medium mt-0.5 line-clamp-1"
                  style={{ color: tokens.colors.textMuted }}
                >
                  {product.category || 'Featured'}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-[15px] font-black"
                      style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                    >
                      {formatCurrency(price)}
                    </span>
                    {onSale && (
                      <span
                        className="text-[10px] font-bold line-through"
                        style={{ color: tokens.colors.textMuted }}
                      >
                        {formatCurrency(product.price)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                    style={{
                      background: tokens.colors.auroraGradient,
                      boxShadow: tokens.effects.shadow.soft,
                    }}
                    data-testid={`aurora-featured-add-${product.id}`}
                  >
                    <SafeIcon icon={FiIcons.FiPlus} className="text-sm" />
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

export default Featured;
