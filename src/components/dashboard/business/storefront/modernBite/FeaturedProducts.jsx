import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernBite } from './ModernBiteContext';

const FeaturedProducts = ({ products = [] }) => {
  const { tokens, sectionsConfig, addToCart } = useModernBite();
  const featuredSection = sectionsConfig.find(s => s.id === 'featured');

  if (!featuredSection?.visibility.enabled) return null;

  const { badge, title } = featuredSection.content;
  const featuredProducts = products.slice(0, 4);

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tokens.colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-sm font-bold tracking-widest uppercase mb-4 block"
            style={{
              fontFamily: tokens.typography.fontFamily.primary,
              color: tokens.colors.primary
            }}
          >
            {badge}
          </span>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{
              fontFamily: tokens.typography.fontFamily.primary,
              color: tokens.colors.text.primary
            }}
          >
            {title}
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl overflow-hidden transition-all hover:shadow-xl"
              style={{
                backgroundColor: tokens.colors.surface,
                borderRadius: tokens.typography.radii.card
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="font-bold mb-2 line-clamp-2"
                  style={{
                    fontFamily: tokens.typography.fontFamily.primary,
                    color: tokens.colors.text.primary
                  }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-sm mb-4 line-clamp-2"
                  style={{
                    fontFamily: tokens.typography.fontFamily.secondary,
                    color: tokens.colors.text.secondary
                  }}
                >
                  {product.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-lg font-black"
                    style={{
                      fontFamily: tokens.typography.fontFamily.primary,
                      color: tokens.colors.primary
                    }}
                  >
                    ${product.price?.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-2 rounded-full transition-all hover:scale-110"
                    style={{ backgroundColor: tokens.colors.primary }}
                  >
                    <SafeIcon icon={FiIcons.FiPlus} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;