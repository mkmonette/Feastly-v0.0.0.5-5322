import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUploadField from '@/components/ui/ImageUploadField';
import { CURRENCY_CONFIG } from '@/common/currency';

const { FiX, FiType, FiFileText, FiDollarSign } = FiIcons;

const AddOnForm = ({ isOpen, onClose, onSave, addOn, products }) => {
  const [formData, setFormData] = useState({
    name: '',
    associatedProducts: [],
    price: '',
    description: '',
    imageUrl: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (addOn) {
      setFormData({
        name: addOn.name || '',
        associatedProducts: addOn.associatedProducts || [],
        price: addOn.price || '',
        description: addOn.description || '',
        imageUrl: addOn.imageUrl || '',
        status: addOn.status || 'Active'
      });
    } else {
      setFormData({ name: '', associatedProducts: [], price: '', description: '', imageUrl: '', status: 'Active' });
    }
    setErrors({});
  }, [addOn, isOpen]);

  const toggleProduct = (productName) => {
    const current = [...formData.associatedProducts];
    const index = current.indexOf(productName);
    if (index > -1) current.splice(index, 1);
    else current.push(productName);
    setFormData({ ...formData, associatedProducts: current });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.associatedProducts.length === 0) newErrors.products = 'Select at least one product';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h3 className="text-xl font-bold text-gray-900">
            {addOn ? 'Edit Add-On' : 'Create Add-On'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <SafeIcon icon={FiX} className="text-xl text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Add-On Name" 
              placeholder="e.g. Extra Cheese"
              icon={<SafeIcon icon={FiType} />}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
            <Input 
              label={`Price (${CURRENCY_CONFIG.symbol})`} 
              type="number"
              step="0.01"
              icon={<SafeIcon icon={FiDollarSign} />}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              error={errors.price}
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Associated Products</label>
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100 min-h-[80px]">
              {products.map(product => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleProduct(product.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    formData.associatedProducts.includes(product.name)
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  {product.name}
                </button>
              ))}
            </div>
            {errors.products && <p className="text-xs text-red-500 mt-1">{errors.products}</p>}
          </div>

          <ImageUploadField 
            label="Add-On Image"
            value={formData.imageUrl}
            onChange={(val) => setFormData({ ...formData, imageUrl: val })}
          />

          <div className="flex space-x-3 pt-4 sticky bottom-0 bg-white border-t border-gray-50 -mx-6 px-6 py-4">
            <Button variant="outline" className="flex-1" onClick={onClose} type="button">Cancel</Button>
            <Button variant="primary" className="flex-1" type="submit">
              {addOn ? 'Save Changes' : 'Create Add-On'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddOnForm;