import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUploadField from '@/components/ui/ImageUploadField';

const { FiX, FiType, FiFileText } = FiIcons;

const CategoryForm = ({ isOpen, onClose, onSave, category }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        imageUrl: category.imageUrl || '',
      });
    } else {
      setFormData({ name: '', description: '', imageUrl: '' });
    }
    setErrors({});
  }, [category, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors({ name: 'Category name is required' });
      return;
    }
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h3 className="text-xl font-bold text-gray-900">
            {category ? 'Edit Category' : 'Create New Category'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <SafeIcon icon={FiX} className="text-xl text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <Input 
            label="Category Name" 
            placeholder="e.g. Burgers, Pizza, Desserts"
            icon={<SafeIcon icon={FiType} />}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />

          <div className="space-y-1 text-left">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Description</label>
            <div className="relative group">
              <div className="absolute left-3 top-3 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                <SafeIcon icon={FiFileText} />
              </div>
              <textarea 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-orange-500 outline-none text-gray-700 min-h-[100px]"
                placeholder="Brief description of this category..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <ImageUploadField 
            label="Category Image"
            value={formData.imageUrl}
            onChange={(val) => setFormData({ ...formData, imageUrl: val })}
          />

          <div className="flex space-x-3 pt-4 sticky bottom-0 bg-white border-t border-gray-50 -mx-6 px-6 py-4">
            <Button variant="outline" className="flex-1" onClick={onClose} type="button">Cancel</Button>
            <Button variant="primary" className="flex-1" type="submit">
              {category ? 'Save Changes' : 'Create Category'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CategoryForm;