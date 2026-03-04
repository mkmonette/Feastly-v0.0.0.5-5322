import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';

const { FiZap, FiCopy, FiSearch, FiFilter, FiCheck, FiInfo, FiExternalLink } = FiIcons;

/**
 * SHORTCODE DEFINITIONS
 * Future-proof: Simply add new objects to this array to expand the library.
 */
const INITIAL_SHORTCODES = [
  // Product Shortcodes
  { id: '1', type: 'Product', name: 'Product Name', shortcode: '{{product_name}}', description: 'Displays the name of the product' },
  { id: '2', type: 'Product', name: 'Product Price', shortcode: '{{product_price}}', description: 'Displays the price of the product' },
  { id: '3', type: 'Product', name: 'Product SKU', shortcode: '{{product_sku}}', description: 'Displays the unique identifier of the product' },
  
  // Category Shortcodes
  { id: '4', type: 'Category', name: 'Category Name', shortcode: '{{category_name}}', description: 'Displays the name of the current category' },
  { id: '5', type: 'Category', name: 'Item Count', shortcode: '{{category_count}}', description: 'Displays number of items in the current category' },
  
  // Coupon Shortcodes
  { id: '6', type: 'Coupon', name: 'Promo Code', shortcode: '{{promo_code}}', description: 'Displays the active promotional code' },
  { id: '7', type: 'Coupon', name: 'Discount Value', shortcode: '{{discount_value}}', description: 'Displays the discount amount or percentage' },
  { id: '8', type: 'Coupon', name: 'Expiry Date', shortcode: '{{expiry_date}}', description: 'Displays when the coupon expires' },
  
  // Customer Shortcodes
  { id: '9', type: 'Customer', name: 'Customer Name', shortcode: '{{customer_name}}', description: 'Displays the customer\'s full name' },
  { id: '10', type: 'Customer', name: 'Customer Email', shortcode: '{{customer_email}}', description: 'Displays the customer\'s registered email' },
  { id: '11', type: 'Customer', name: 'Order Count', shortcode: '{{order_count}}', description: 'Displays total number of orders by this customer' },
  
  // Cart Shortcodes
  { id: '12', type: 'Cart', name: 'Cart Subtotal', shortcode: '{{cart_total}}', description: 'Displays the current cart subtotal' },
  { id: '13', type: 'Cart', name: 'Total Items', shortcode: '{{items_count}}', description: 'Displays the total quantity of items in cart' },
];

const ENTITY_TYPES = ['All', 'Product', 'Category', 'Coupon', 'Customer', 'Cart'];

const ShortcodeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const filteredShortcodes = useMemo(() => {
    return INITIAL_SHORTCODES.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.shortcode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'All' || item.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setShowToast(true);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <SafeIcon icon={FiZap} className="mr-2 text-orange-600" />
            Shortcodes Library
          </h3>
          <p className="text-sm text-gray-500">Copy dynamic placeholders to personalize your content across Feastly.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <SafeIcon icon={FiSearch} />
              </span>
              <input
                type="text"
                placeholder="Search by name, description or shortcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-4 focus:ring-orange-600/10 focus:border-orange-600 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {ENTITY_TYPES.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedType === type 
                    ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/20' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Shortcodes Table */}
        <div className="overflow-x-auto rounded-3xl border border-gray-50 bg-gray-50/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Entity Type</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Name & Description</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Shortcode</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredShortcodes.map((item) => (
                  <motion.tr 
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-orange-50/40 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        item.type === 'Product' ? 'bg-blue-50 text-blue-600' :
                        item.type === 'Category' ? 'bg-purple-50 text-purple-600' :
                        item.type === 'Coupon' ? 'bg-green-50 text-green-600' :
                        item.type === 'Customer' ? 'bg-amber-50 text-amber-600' :
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{item.name}</span>
                        <span className="text-[11px] text-gray-400 font-medium">{item.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-2">
                        <code className="px-3 py-1.5 bg-gray-900 text-orange-400 rounded-lg text-xs font-mono font-bold border border-gray-800 shadow-xl">
                          {item.shortcode}
                        </code>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleCopy(item.id, item.shortcode)}
                        className={`p-2.5 rounded-xl transition-all active:scale-95 ${
                          copiedId === item.id 
                            ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' 
                            : 'bg-white text-gray-400 border border-gray-100 hover:text-orange-600 hover:border-orange-200 hover:shadow-md'
                        }`}
                        title="Copy to Clipboard"
                      >
                        <SafeIcon icon={copiedId === item.id ? FiCheck : FiCopy} className="text-lg" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredShortcodes.length === 0 && (
            <div className="py-24 text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                <SafeIcon icon={FiZap} className="text-4xl" />
              </div>
              <div className="max-w-xs mx-auto">
                <h4 className="font-bold text-gray-900">No shortcodes match your search</h4>
                <p className="text-sm text-gray-500">Try using different keywords or selecting another category.</p>
              </div>
            </div>
          )}
        </div>

        {/* Integration Info Box */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[32px] border border-blue-100 flex items-start space-x-4">
          <div className="shrink-0 p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-600/20">
            <SafeIcon icon={FiExternalLink} className="text-xl" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-black text-blue-900 uppercase tracking-widest">Universal Integration</p>
            <p className="text-sm text-blue-700/80 font-medium leading-relaxed">
              These shortcodes are universal. You can paste them into <span className="text-blue-900 font-bold underline decoration-blue-200">Notification Bars</span>, <span className="text-blue-900 font-bold underline decoration-blue-200">Email Templates</span>, <span className="text-blue-900 font-bold underline decoration-blue-200">Receipt Templates</span>, or custom content editors. Feastly will automatically replace them with real-time data when viewed by customers.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <Toast 
            message="Shortcode copied to clipboard!" 
            type="success" 
            onClose={() => setShowToast(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShortcodeManagement;