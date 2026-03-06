import React, { useState } from 'react';
import { useModernCard } from './ModernCardContext';
import { useProducts } from '@/context/ProductContext';
import { formatCurrency } from '@/common/currency';

const ProductCards = () => {
  const { tokens, sectionsConfig } = useModernCard();
  const { products } = useProducts();
  const section = sectionsConfig.find(s => s.id === 'products');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!section?.content) return null;

  const { title, titleHighlight, showCategories } = section.content;

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className={tokens.layout.spacing.section}>
      <div className={`${tokens.layout.maxWidth} mx-auto`}>
        <div className="mb-8 text-center">
          <h2
            className={`text-3xl ${tokens.typography.headingWeight} ${tokens.typography.fontFamily}`}
            style={{ color: tokens.colors.primaryText }}
          >
            {normalText}
            {highlightText && (
              <span style={{ color: tokens.colors.accent }}> {highlightText}</span>
            )}
          </h2>
        </div>

        {showCategories && categories.length > 1 && (
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}>
            <style>{`
              .category-scroll::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 ${tokens.layout.borderRadius.button} text-xs ${tokens.typography.buttonWeight} uppercase tracking-widest whitespace-nowrap ${tokens.effects.transition}`}
                style={{
                  backgroundColor: selectedCategory === category ? tokens.colors.accent : tokens.colors.cardBackground,
                  color: selectedCategory === category ? tokens.colors.buttonText : tokens.colors.secondaryText,
                  border: `1px solid ${tokens.colors.border}`
                }}
              >
                {category === 'all' ? 'All Items' : category}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`${tokens.layout.borderRadius.card} ${tokens.effects.shadow.card} overflow-hidden ${tokens.effects.transition} ${tokens.effects.shadow.hover}`}
              style={{
                backgroundColor: tokens.colors.cardBackground,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3
                      className={`text-2xl ${tokens.typography.headingWeight} mb-2 ${tokens.typography.fontFamily}`}
                      style={{ color: tokens.colors.primaryText }}
                    >
                      {product.name}
                    </h3>
                    {product.description && (
                      <p
                        className={`text-sm ${tokens.typography.bodyWeight} leading-relaxed`}
                        style={{ color: tokens.colors.secondaryText }}
                      >
                        {product.description}
                      </p>
                    )}
                  </div>
                  <button
                    className={`w-12 h-12 ${tokens.layout.borderRadius.button} flex items-center justify-center ${tokens.effects.shadow.button} ${tokens.effects.transition} flex-shrink-0 ml-4`}
                    style={{
                      backgroundColor: tokens.colors.accent,
                      color: tokens.colors.buttonText
                    }}
                  >
                    <span className="text-2xl font-black">+</span>
                  </button>
                </div>

                {product.image_url ? (
                  <div
                    className={`${tokens.layout.borderRadius.image} overflow-hidden mb-4`}
                    style={{ backgroundColor: '#F5E6D3' }}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`${tokens.layout.borderRadius.image} overflow-hidden mb-4`}
                    style={{ backgroundColor: '#F5E6D3', minHeight: '256px' }}
                  >
                    <div className="w-full h-64 flex items-center justify-center">
                      <div className="text-center" style={{ color: tokens.colors.lightText }}>
                        <svg className="w-16 h-16 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm font-medium">Product Image</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p
                    className={`text-2xl ${tokens.typography.headingWeight} ${tokens.typography.fontFamily}`}
                    style={{ color: tokens.colors.primaryText }}
                  >
                    {formatCurrency(product.price)}
                  </p>
                  {product.category && (
                    <span
                      className={`px-4 py-1 ${tokens.layout.borderRadius.button} text-xs ${tokens.typography.bodyWeight} uppercase tracking-wider`}
                      style={{
                        backgroundColor: tokens.colors.background,
                        color: tokens.colors.secondaryText
                      }}
                    >
                      {product.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div
              className={`${tokens.layout.borderRadius.card} p-12 text-center`}
              style={{
                backgroundColor: tokens.colors.cardBackground,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <p style={{ color: tokens.colors.secondaryText }}>No products available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
