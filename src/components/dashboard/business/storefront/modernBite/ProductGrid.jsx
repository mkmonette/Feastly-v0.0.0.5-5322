import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernBite } from './ModernBiteContext';

const ProductGrid = ({ section, products, categories }) => {
  const { tokens, addToCart } = useModernBite();
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);

  const filteredProducts = products.filter(p => p.categoryId === activeCategory);

  return (
    <div className="mt-20 space-y-8">
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: tokens.colors.primary }}>
          {section?.content?.badge}
        </h4>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">{section?.content?.title}</h2>
      </div>
      
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {categories.map(category => {
          const isActive = activeCategory === category.id;
          const Icon = FiIcons[category.icon] || FiIcons.FiCircle;
          return (
            <button 
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold transition-all whitespace-nowrap shadow-sm ${
                isActive 
                  ? 'bg-[#1a1a1a] text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <SafeIcon icon={Icon} className={isActive ? 'text-white' : 'text-gray-400'} />
              {category.name}
            </button>
          )
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white border border-gray-100 p-4 rounded-[24px] flex gap-5 hover:shadow-lg transition-all group">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-gray-50">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex-1 flex flex-col py-1 pr-2">
              <h3 className="font-bold text-gray-900 mb-1.5 text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed font-medium">{product.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-black text-lg text-gray-900">${product.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
                  style={{ backgroundColor: `${tokens.colors.primary}15`, color: tokens.colors.primary }}
                >
                  <SafeIcon icon={FiIcons.FiPlus} className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;