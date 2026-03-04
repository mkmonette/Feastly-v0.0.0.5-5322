import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUploadField from '@/components/ui/ImageUploadField';
import { CURRENCY_CONFIG } from '@/common/currency';

const { FiX, FiType, FiFileText, FiDollarSign, FiTag, FiTrendingDown, FiStar, FiSun, FiSlash, FiPackage } = FiIcons;

const ProductForm = ({ isOpen, onClose, onSave, product, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    salePrice: '',
    description: '',
    imageUrl: '',
    status: 'Active',
    stock: '',
    flags: {
      featured: false,
      seasonal: false,
      outOfStock: false
    }
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price || '',
        salePrice: product.salePrice || '',
        description: product.description || '',
        imageUrl: product.imageUrl || '',
        status: product.status || 'Active',
        stock: product.stock || '',
        flags: {
          featured: product.flags?.featured || false,
          seasonal: product.flags?.seasonal || false,
          outOfStock: product.flags?.outOfStock || false
        }
      });
    } else {
      setFormData({
        name: '',
        category: categories?.[0]?.name || '',
        price: '',
        salePrice: '',
        description: '',
        imageUrl: '',
        status: 'Active',
        stock: '',
        flags: {
          featured: false,
          seasonal: false,
          outOfStock: false
        }
      });
    }
    setErrors({});
  }, [product, isOpen, categories]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    const priceVal = parseFloat(formData.price);
    if (!formData.price || isNaN(priceVal) || priceVal <= 0) {
      newErrors.price = 'Valid original price is required';
    }

    if (formData.stock && isNaN(parseInt(formData.stock))) {
      newErrors.stock = 'Stock must be a number';
    }

    if (formData.salePrice) {
      const saleVal = parseFloat(formData.salePrice);
      if (isNaN(saleVal) || saleVal < 0) {
        newErrors.salePrice = 'Sale price must be a valid number';
      } else if (saleVal >= priceVal) {
        newErrors.salePrice = 'Sale price must be lower than original price';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleToggleFlag = (flag) => {
    setFormData(prev => ({
      ...prev,
      flags: {
        ...prev.flags,
        [flag]: !prev.flags[flag]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-600 p-2 rounded-lg">
              <SafeIcon icon={FiIcons.FiLayers} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <SafeIcon icon={FiX} className="text-xl text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Product Name" 
              placeholder="e.g. Double Cheeseburger"
              icon={<SafeIcon icon={FiType} />}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
            <div className="space-y-1 text-left">
              <label className="block text-sm font-semibold text-gray-700 ml-1">Category</label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                  <SafeIcon icon={FiTag} />
                </div>
                <select 
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none text-gray-700 bg-gray-50 appearance-none ${errors.category ? 'border-red-300' : 'border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'}`}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input 
              label={`Original Price (${CURRENCY_CONFIG.symbol})`} 
              type="number" 
              step="0.01"
              icon={<SafeIcon icon={FiDollarSign} />}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              error={errors.price}
            />
            <Input 
              label={`Sale Price (${CURRENCY_CONFIG.symbol})`} 
              type="number" 
              step="0.01"
              icon={<SafeIcon icon={FiTrendingDown} className="text-orange-500" />}
              value={formData.salePrice}
              onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
              error={errors.salePrice}
              placeholder="Optional"
            />
            <Input 
              label="Stock Level" 
              type="number" 
              icon={<SafeIcon icon={FiPackage} className="text-gray-400" />}
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              error={errors.stock}
              placeholder="Qty"
            />
          </div>

          <div className="space-y-3 text-left">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Manual Flags</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleToggleFlag('featured')}
                className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${formData.flags.featured ? 'bg-orange-50 border-orange-200 text-orange-600 shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-400 opacity-60'}`}
              >
                <SafeIcon icon={FiStar} className="text-xl mb-1" />
                <span className="text-[10px] font-black uppercase tracking-widest">Featured</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleFlag('seasonal')}
                className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${formData.flags.seasonal ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-400 opacity-60'}`}
              >
                <SafeIcon icon={FiSun} className="text-xl mb-1" />
                <span className="text-[10px] font-black uppercase tracking-widest">Seasonal</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleFlag('outOfStock')}
                className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${formData.flags.outOfStock ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-400 opacity-60'}`}
              >
                <SafeIcon icon={FiSlash} className="text-xl mb-1" />
                <span className="text-[10px] font-black uppercase tracking-widest">Disabled</span>
              </button>
            </div>
          </div>

          <div className="space-y-1 text-left">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Visibility Status</label>
            <div className="flex p-1 bg-gray-100 rounded-xl">
              {['Active', 'Inactive'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFormData({ ...formData, status: s })}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${formData.status === s ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1 text-left">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Description</label>
            <div className="relative group">
              <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                <SafeIcon icon={FiFileText} />
              </div>
              <textarea 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-orange-500 outline-none text-gray-700 min-h-[100px]"
                placeholder="Product description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <ImageUploadField 
            label="Product Image"
            value={formData.imageUrl}
            onChange={(val) => setFormData({ ...formData, imageUrl: val })}
          />

          <div className="flex space-x-3 pt-4 sticky bottom-0 bg-white border-t border-gray-50 -mx-6 px-6 py-4">
            <Button variant="outline" className="flex-1" onClick={onClose} type="button">Cancel</Button>
            <Button variant="primary" className="flex-1" type="submit">
              {product ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductForm;