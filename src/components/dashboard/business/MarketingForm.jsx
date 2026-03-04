import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUploadField from '@/components/ui/ImageUploadField';
import { formatCurrency, CURRENCY_CONFIG } from '@/common/currency';

const { 
  FiX, FiType, FiFileText, FiDollarSign, FiPercent, FiTrendingDown, 
  FiStar, FiAward, FiClock, FiPackage, FiSun, FiSlash, FiFilter, FiSearch
} = FiIcons;

const FlagBadge = ({ flag, active }) => {
  if (!active) return null;
  const config = {
    featured: { icon: FiStar, label: 'Featured', color: 'bg-orange-500 text-white' },
    bestSeller: { icon: FiAward, label: 'Best Seller', color: 'bg-purple-600 text-white' },
    new: { icon: FiClock, label: 'New', color: 'bg-blue-600 text-white' },
    lowStock: { icon: FiPackage, label: 'Low Stock', color: 'bg-amber-600 text-white' },
    onSale: { icon: FiTrendingDown, label: 'On Sale', color: 'bg-rose-600 text-white' },
    seasonal: { icon: FiSun, label: 'Seasonal', color: 'bg-sky-500 text-white' },
    outOfStock: { icon: FiSlash, label: 'Disabled', color: 'bg-red-600 text-white' }
  };
  const { icon, label, color } = config[flag];
  return (
    <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded ${color} shadow-sm`}>
      <SafeIcon icon={icon} className="text-[8px]" />
      <span className="text-[7px] font-black uppercase tracking-tighter whitespace-nowrap">{label}</span>
    </div>
  );
};

const MarketingForm = ({ isOpen, onClose, onSave, item, products = [], type }) => {
  const [formData, setFormData] = useState({
    name: '',
    associatedProducts: [],
    price: '',
    description: '',
    imageUrl: '',
    status: 'Active',
    discountType: 'none',
    discountValue: 0,
  });
  const [errors, setErrors] = useState({});
  const [productSearch, setProductSearch] = useState('');
  const [filterFlag, setFilterFlag] = useState('All');

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        associatedProducts: item.associatedProducts || [],
        price: item.price || '',
        description: item.description || '',
        imageUrl: item.imageUrl || '',
        status: item.status || 'Active',
        discountType: item.discountType || 'none',
        discountValue: item.discountValue || 0,
      });
    } else {
      setFormData({ 
        name: '', 
        associatedProducts: [], 
        price: '', 
        description: '', 
        imageUrl: '', 
        status: 'Active',
        discountType: 'none',
        discountValue: 0
      });
    }
    setErrors({});
  }, [item, isOpen]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
      const matchesFlag = filterFlag === 'All' || p.computedFlags?.[filterFlag];
      return matchesSearch && matchesFlag;
    });
  }, [products, productSearch, filterFlag]);

  const calculateFinalPrice = () => {
    const original = parseFloat(formData.price) || 0;
    const discount = parseFloat(formData.discountValue) || 0;
    
    if (formData.discountType === 'percentage') {
      return (original - (original * (discount / 100))).toFixed(2);
    } else if (formData.discountType === 'fixed') {
      return Math.max(0, original - discount).toFixed(2);
    }
    return original.toFixed(2);
  };

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
    
    const priceVal = parseFloat(formData.price);
    if (!formData.price || isNaN(priceVal) || priceVal < 0) {
      newErrors.price = 'Valid price is required';
    }

    const discountVal = parseFloat(formData.discountValue);
    if (formData.discountType === 'percentage' && (discountVal < 0 || discountVal > 100)) {
      newErrors.discountValue = 'Percentage must be between 0 and 100';
    }
    if (formData.discountType === 'fixed' && (discountVal < 0 || discountVal > priceVal)) {
      newErrors.discountValue = 'Discount cannot exceed original price';
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

  const finalPrice = calculateFinalPrice();

  const flagOptions = [
    { id: 'All', label: 'All', icon: FiFilter },
    { id: 'featured', label: 'Featured', icon: FiStar },
    { id: 'bestSeller', label: 'Best Sellers', icon: FiAward },
    { id: 'new', label: 'New', icon: FiClock },
    { id: 'onSale', label: 'On Sale', icon: FiTrendingDown },
    { id: 'lowStock', label: 'Low Stock', icon: FiPackage },
    { id: 'seasonal', label: 'Seasonal', icon: FiSun }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10 text-left">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-600 p-2.5 rounded-2xl shadow-lg shadow-orange-600/20">
              <SafeIcon icon={type === 'Upsell' ? FiIcons.FiTrendingUp : FiIcons.FiZap} className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">
                {item ? `Edit ${type}` : `New ${type} Offer`}
              </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Growth Tool Config</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
            <SafeIcon icon={FiX} className="text-2xl text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input 
              label={`${type} Name`} 
              placeholder={`e.g. ${type === 'Upsell' ? 'Premium Meal Upgrade' : 'Add a Drink'}`}
              icon={<SafeIcon icon={FiType} />}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
            <Input 
              label={`Original Price (${CURRENCY_CONFIG.symbol})`} 
              type="number"
              step="0.01"
              icon={<SafeIcon icon={FiDollarSign} />}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              error={errors.price}
            />
          </div>

          {/* Discount Section */}
          <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100/50 space-y-4 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-orange-900 uppercase tracking-widest flex items-center">
                <SafeIcon icon={FiTrendingDown} className="mr-2" /> Discount Pricing
              </label>
              <div className="flex bg-orange-100/50 p-1 rounded-xl">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'percentage', label: '%' },
                  { id: 'fixed', label: CURRENCY_CONFIG.symbol }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, discountType: opt.id, discountValue: 0 })}
                    className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${formData.discountType === opt.id ? 'bg-white text-orange-600 shadow-sm' : 'text-orange-900/50 hover:text-orange-900'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {formData.discountType !== 'none' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <Input 
                  label={formData.discountType === 'percentage' ? 'Discount Rate (%)' : `Discount Amount (${CURRENCY_CONFIG.symbol})`}
                  type="number"
                  step={formData.discountType === 'percentage' ? '1' : '0.01'}
                  icon={<SafeIcon icon={formData.discountType === 'percentage' ? FiPercent : FiDollarSign} />}
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  error={errors.discountValue}
                />
                <div className="bg-white p-4 rounded-2xl border border-orange-100 flex justify-between items-center shadow-sm">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Final Price</span>
                  <span className="text-xl font-black text-orange-600">{formatCurrency(finalPrice)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Product Selection with Flags */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Target Products</label>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-[10px] outline-none focus:border-orange-500 w-32"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
                <div className="flex overflow-x-auto no-scrollbar max-w-[200px] bg-gray-100 p-0.5 rounded-xl">
                  {flagOptions.map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFilterFlag(opt.id)}
                      className={`px-2 py-1 rounded-lg transition-all shrink-0 ${filterFlag === opt.id ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}
                      title={opt.label}
                    >
                      <SafeIcon icon={opt.icon} className="text-xs" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-[2rem] border border-gray-100 max-h-56 overflow-y-auto custom-scrollbar">
              {filteredProducts.map(product => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleProduct(product.name)}
                  className={`flex items-center p-3 rounded-2xl transition-all border text-left group ${
                    formData.associatedProducts.includes(product.name)
                      ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/20'
                      : 'bg-white text-gray-600 border-gray-100 hover:border-orange-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 mr-3 shadow-sm border border-gray-100">
                    <img src={product.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-black truncate leading-tight ${formData.associatedProducts.includes(product.name) ? 'text-white' : 'text-gray-900'}`}>
                      {product.name}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {Object.entries(product.computedFlags || {})
                        .filter(([_, val]) => val)
                        .map(([flag]) => <FlagBadge key={flag} flag={flag} active={true} />)
                      }
                    </div>
                  </div>
                </button>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-8 text-center">
                  <p className="text-xs font-bold text-gray-400 italic">No products match your criteria</p>
                </div>
              )}
            </div>
            {errors.products && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">{errors.products}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Marketing Copy</label>
            <div className="relative group">
              <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                <SafeIcon icon={FiFileText} />
              </div>
              <textarea 
                className="w-full pl-12 pr-4 py-4 rounded-3xl border border-gray-200 bg-gray-50 focus:border-orange-500 outline-none text-sm text-gray-700 min-h-[100px] font-medium"
                placeholder="Hook your customers with a great description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <ImageUploadField 
              label="Offer Banner"
              value={formData.imageUrl}
              onChange={(val) => setFormData({ ...formData, imageUrl: val })}
            />
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
              <div className="flex p-1.5 bg-gray-100 rounded-2xl">
                {['Active', 'Inactive'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, status: s })}
                    className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${formData.status === s ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-6 sticky bottom-0 bg-white border-t border-gray-50 -mx-8 px-8 py-6">
            <Button variant="outline" className="flex-1 rounded-2xl h-14 font-black uppercase tracking-widest" onClick={onClose} type="button">Discard</Button>
            <Button variant="primary" className="flex-1 rounded-2xl h-14 font-black uppercase tracking-widest shadow-xl shadow-orange-600/20" type="submit">
              {item ? 'Update Offer' : `Execute ${type}`}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MarketingForm;