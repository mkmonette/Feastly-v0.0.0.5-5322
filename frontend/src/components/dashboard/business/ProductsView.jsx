import React, { useState } from 'react';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import AddOnManagement from './AddOnManagement';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useProducts } from '@/context/ProductContext';

const { FiBox, FiGrid, FiPlusCircle } = FiIcons;

const ProductsView = ({ readOnly = false }) => {
  const [activeTab, setActiveTab] = useState('products');
  const { products, setProducts, categories, setCategories } = useProducts();

  const tabs = [
    { id: 'products', label: 'Products', icon: FiBox },
    { id: 'categories', label: 'Categories', icon: FiGrid },
    { id: 'addons', label: 'Add-ons', icon: FiPlusCircle },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {readOnly ? 'Audit Products' : 'Product Management'}
          </h2>
          <p className="text-gray-500 mt-1">
            {readOnly 
              ? 'Viewing product catalog and menu structure.' 
              : 'Create and organize your digital menu and product catalog.'}
          </p>
        </div>
      </div>

      <div className="flex space-x-1 bg-white p-1.5 rounded-2xl border border-gray-100 w-fit shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <SafeIcon icon={tab.icon} className="text-lg" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        {activeTab === 'products' && (
          <ProductManagement 
            readOnly={readOnly} 
            categories={categories}
            products={products}
            setProducts={setProducts}
          />
        )}
        {activeTab === 'categories' && (
          <CategoryManagement 
            readOnly={readOnly} 
            categories={categories}
            setCategories={setCategories}
          />
        )}
        {activeTab === 'addons' && (
          <AddOnManagement 
            readOnly={readOnly} 
            products={products}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsView;