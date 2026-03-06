import React from 'react';
import { useWarmCulinary } from './WarmCulinaryContext';
import { useProducts } from '@/context/ProductContext';
import { formatCurrency } from '@/common/currency';
import { FiPlus } from 'react-icons/fi';

const FeaturedProducts = () => {
  const { tokens, addToCart } = useWarmCulinary();
  const { products } = useProducts();

  const featuredProducts = products?.filter(p => p.featured)?.slice(0, 3) || [];

  if (featuredProducts.length === 0) return null;

  return (
    <section className={`${tokens.layout.sectionPadding}`} style={{ backgroundColor: tokens.colors.background }}>
      <div className={`${tokens.layout.container} ${tokens.layout.containerWidth} ${tokens.layout.horizontalPadding}`}>
        <div className="text-center mb-12">
          <div
            className={`inline-block px-4 py-2 rounded-full ${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall} ${tokens.typography.weights.semibold} ${tokens.typography.transform.uppercase} ${tokens.typography.tracking.wider} mb-4`}
            style={{ backgroundColor: tokens.colors.surfaceAlt, color: tokens.colors.primary }}
          >
            Chef's Specials
          </div>
          <h2
            className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.h2} ${tokens.typography.weights.bold}`}
            style={{ color: tokens.colors.textPrimary }}
          >
            Featured This Week
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
              style={{
                backgroundColor: tokens.colors.cardBackground,
                boxShadow: `0 4px 20px ${tokens.colors.cardShadow}`
              }}
            >
              <div
                className="aspect-[4/3] overflow-hidden"
                style={{ backgroundColor: tokens.colors.surfaceAlt }}
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.h5} ${tokens.typography.weights.bold} flex-1`}
                    style={{ color: tokens.colors.textPrimary }}
                  >
                    {product.name}
                  </h3>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ml-3"
                    style={{ backgroundColor: tokens.colors.accent }}
                  >
                    <FiPlus className="w-4 h-4" style={{ color: tokens.colors.textPrimary }} />
                  </button>
                </div>
                <p
                  className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall} mb-4`}
                  style={{ color: tokens.colors.textSecondary }}
                >
                  {product.description}
                </p>
                <span
                  className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.h5} ${tokens.typography.weights.bold}`}
                  style={{ color: tokens.colors.primary }}
                >
                  {formatCurrency(product.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
