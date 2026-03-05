import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useQuickOrder } from './QuickOrderContext';
import { formatCurrency } from '@/common/currency';

const ProductGrid = () => {
  const { tokens, filteredProducts, addToCart } = useQuickOrder();

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-medium">No products available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {filteredProducts.map(product => (
        <div
          key={product.id}
          className={`${tokens.layout.borderRadius.card} overflow-hidden ${tokens.effects.shadow.card} border hover:shadow-md transition-all`}
          style={{
            backgroundColor: tokens.colors.cardBackground,
            borderColor: tokens.colors.border
          }}
        >
          <div className="relative aspect-square">
            <img
              src={product.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <div
                className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold"
                style={{
                  backgroundColor: tokens.colors.accent,
                  color: tokens.colors.buttonText
                }}
              >
                -{product.discount}%
              </div>
            )}
          </div>

          <div className="p-3">
            <h3
              className="text-sm md:text-base font-semibold mb-1 line-clamp-2"
              style={{ color: tokens.colors.primaryText }}
            >
              {product.name}
            </h3>

            <p
              className="text-base md:text-lg font-bold mb-3"
              style={{ color: tokens.colors.primary }}
            >
              {formatCurrency(product.price)}
            </p>

            <button
              onClick={() => addToCart(product)}
              className={`w-full ${tokens.layout.borderRadius.button} ${tokens.layout.spacing.button} text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95`}
              style={{
                backgroundColor: tokens.colors.buttonPrimary,
                color: tokens.colors.buttonText
              }}
            >
              <SafeIcon icon={FiIcons.FiPlus} className="text-sm" />
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
