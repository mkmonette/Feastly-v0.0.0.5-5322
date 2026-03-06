import React from 'react';
import { useWarmCulinary } from './WarmCulinaryContext';
import { useStorefront } from './contextBridge';
import { useProducts } from '@/context/ProductContext';
import { formatCurrency } from '@/common/currency';
import { FiPlus } from 'react-icons/fi';

const ProductCard = ({ product, tokens, onAddToCart }) => {
  return (
    <div
      className="rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
      style={{
        backgroundColor: tokens.colors.cardBackground,
        boxShadow: `0 4px 20px ${tokens.colors.cardShadow}`
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3
              className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.h4} ${tokens.typography.weights.bold} mb-2`}
              style={{ color: tokens.colors.textPrimary }}
            >
              {product.name}
            </h3>
            <p
              className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall} ${tokens.typography.lineHeights.relaxed}`}
              style={{ color: tokens.colors.textSecondary }}
            >
              {product.description}
            </p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ml-4"
            style={{ backgroundColor: tokens.colors.accent }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tokens.colors.accentHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = tokens.colors.accent}
          >
            <FiPlus className="w-5 h-5" style={{ color: tokens.colors.textPrimary }} />
          </button>
        </div>

        <div
          className="aspect-[4/3] rounded-2xl overflow-hidden mb-4"
          style={{ backgroundColor: tokens.colors.surfaceAlt }}
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ color: tokens.colors.textMuted }}>No image</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.h5} ${tokens.typography.weights.bold}`}
            style={{ color: tokens.colors.primary }}
          >
            {formatCurrency(product.price)}
          </span>
          {product.category && (
            <span
              className={`px-3 py-1 rounded-full ${tokens.typography.fontSecondary} ${tokens.typography.scale.xs} ${tokens.typography.weights.medium}`}
              style={{
                backgroundColor: tokens.colors.surfaceAlt,
                color: tokens.colors.textMuted
              }}
            >
              {product.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const { tokens, addToCart } = useWarmCulinary();
  const { products } = useProducts();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <section id="menu" className={`${tokens.layout.sectionPadding}`} style={{ backgroundColor: tokens.colors.surface }}>
      <div className={`${tokens.layout.container} ${tokens.layout.containerWidth} ${tokens.layout.horizontalPadding}`}>
        <div className="text-center mb-12">
          <div
            className={`inline-block px-4 py-2 rounded-full ${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall} ${tokens.typography.weights.semibold} ${tokens.typography.transform.uppercase} ${tokens.typography.tracking.wider} mb-4`}
            style={{ backgroundColor: tokens.colors.surfaceAlt, color: tokens.colors.primary }}
          >
            Our Menu
          </div>
          <h2
            className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.h2} ${tokens.typography.weights.bold} mb-4`}
            style={{ color: tokens.colors.textPrimary }}
          >
            Explore Our Delicious Offerings
          </h2>
          <p
            className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.bodyLarge} mx-auto max-w-2xl`}
            style={{ color: tokens.colors.textSecondary }}
          >
            Each dish is crafted with care using fresh, locally-sourced ingredients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                tokens={tokens}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p style={{ color: tokens.colors.textMuted }}>No products available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
