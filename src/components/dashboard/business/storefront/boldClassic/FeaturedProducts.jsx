import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from './contextBridge';
import { useProducts } from '@/context/ProductContext';
import { formatCurrency } from '@/common/currency';

const FeaturedProducts = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { products } = useProducts();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'featured');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const accentStyle = (colors.accent || colors.secondary).startsWith('#') ? { backgroundColor: (colors.accent || colors.secondary) } : {};
  const accentBorderStyle = (colors.accent || colors.secondary).startsWith('#') ? { borderColor: (colors.accent || colors.secondary) } : {};
  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const highlightColor = colors.sectionHeadlineHighlight || colors.sectionHeadlineNormal;
  const sectionHeadlineHighlightStyle = { color: highlightColor };

  const featuredProducts = products
    .filter(p => p.flags?.featured && p.status === 'Active')
    .slice(0, 3);

  return (
    <section className={`${layout.sectionPaddingLarge} bg-${colors.surface} text-white ${layout.horizontalPadding}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-left mb-20">
          <div className={`inline-block mb-6 px-4 py-2 border border-${colors.primary}`} style={colors.primary.startsWith('#') ? { borderColor: colors.primary } : {}}>
            <span
              className={`${typography.scale.bodySmall} ${typography.weights.bold} text-${colors.primary} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.fontPrimary}`}
              style={primaryStyle}
            >
              {content.subtitle || 'Featured'}
            </span>
          </div>
          <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.transform.uppercase} ${typography.lineHeights.tight} ${typography.fontPrimary}`}>
            {content.titleHighlight ? (
              <>
                <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>{' '}
                <span style={sectionHeadlineHighlightStyle}>{content.titleHighlight}</span>
              </>
            ) : (
              <span style={sectionHeadlineNormalStyle}>{content.titlePre}</span>
            )}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group relative overflow-hidden border-2 ${index === 1 ? 'md:-mt-12 md:mb-12 z-10 border-' + colors.primary : 'border-white/20'}`}
                style={index === 1 && colors.primary.startsWith('#') ? { borderColor: colors.primary } : {}}
              >
                <div className="relative h-96 overflow-hidden bg-gray-900">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <SafeIcon icon={FiIcons.FiImage} className="text-6xl" />
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent`} />

                  {product.category && (
                    <div className={`absolute top-6 left-6 bg-${colors.primary} px-4 py-2`} style={primaryBgStyle}>
                      <span className={`${typography.scale.xs} ${typography.weights.black} ${typography.transform.uppercase} text-black ${typography.fontPrimary}`}>
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  className="p-8 bg-black border-t-4 border-white transition-colors"
                  style={{ '--hover-border-color': colors.primary }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'white'}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`${typography.scale.h4} ${typography.weights.black} ${typography.transform.uppercase} ${typography.fontPrimary} line-clamp-1 flex-1`}>
                      {product.name}
                    </h3>
                    <span
                      className={`${typography.scale.h4} ${typography.weights.black} text-${colors.primary} ${typography.fontPrimary} ml-4`}
                      style={primaryStyle}
                    >
                      {formatCurrency(product.salePrice || product.price)}
                    </span>
                  </div>

                  <p className={`${typography.scale.bodySmall} text-${colors.textInverseMuted} mb-6 line-clamp-2 ${typography.fontSecondary}`}>
                    {product.description || 'Delicious and freshly prepared.'}
                  </p>

                  <button
                    className={`w-full py-4 text-black ${typography.scale.bodySmall} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.wide} transition-all ${typography.fontPrimary}`}
                    style={primaryBgStyle}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.accent || colors.secondary}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className={`text-${colors.textInverseMuted} ${typography.fontSecondary}`}>No featured products available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
