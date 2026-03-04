import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import { CURRENCY_CONFIG } from '@/common/currency';

const { FiAlertTriangle, FiCalendar, FiTag, FiDollarSign, FiTrash2, FiActivity } = FiIcons;

const BulkActionModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  action, 
  menuType, 
  count,
  meta = {} 
}) => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');

  if (!isOpen) return null;

  const renderContent = () => {
    switch (action) {
      case 'delete':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
              <SafeIcon icon={FiTrash2} className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete {count} {menuType}s?</h3>
            <p className="text-gray-500 mb-8 text-sm">This action cannot be undone. All selected items will be permanently removed.</p>
          </div>
        );
      case 'assign-category':
        return (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
              <SafeIcon icon={FiTag} className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Assign Category</h3>
            <p className="text-gray-500 text-center mb-6 text-sm">Move {count} products to a new category.</p>
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Select Category</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                <option value="">Select a category...</option>
                {meta.categories?.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        );
      case 'apply-sale':
        return (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600">
              <SafeIcon icon={FiDollarSign} className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Apply Sale Price</h3>
            <p className="text-gray-500 text-center mb-6 text-sm">Set a promotional price for {count} products.</p>
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{`Sale Price (${CURRENCY_CONFIG.symbol})`}</label>
              <input 
                type="number"
                placeholder="10.99"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
        );
      case 'update-dates':
        return (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
              <SafeIcon icon={FiCalendar} className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Update Campaign Dates</h3>
            <p className="text-gray-500 text-center mb-6 text-sm">Change timing for {count} selected campaigns.</p>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
                <input 
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">End Date</label>
                <input 
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl overflow-hidden relative"
      >
        {renderContent()}
        
        <div className="flex space-x-3 mt-8">
          <Button variant="outline" className="flex-1 rounded-2xl py-3" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            className={`flex-1 rounded-2xl py-3 ${action === 'delete' ? 'bg-red-600 hover:bg-red-700' : ''}`}
            onClick={() => onConfirm(action === 'update-dates' ? { start: value, end: value2 } : value)}
            disabled={action !== 'delete' && !value}
          >
            {action === 'delete' ? 'Delete' : 'Confirm'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default BulkActionModal;