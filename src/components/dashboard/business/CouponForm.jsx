import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUploadField from '@/components/ui/ImageUploadField';
import { CURRENCY_CONFIG, formatCurrency } from '@/common/currency';

const { 
  FiX, FiType, FiClock, FiCalendar, FiDollarSign, FiPercent, FiHash, FiTrendingDown, 
  FiShoppingCart, FiUserCheck, FiArrowRight, FiSearch, FiFilter,
  FiStar, FiAward, FiPackage, FiSun, FiSlash
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

const CouponForm = ({ isOpen, onClose, onSave, coupon, products = [] }) => {
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    maxDiscount: '',
    minPurchase: '',
    maxUses: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    associatedItems: [],
    status: 'Active',
    imageUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [productSearch, setProductSearch] = useState('');
  const [filterFlag, setFilterFlag] = useState('All');

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || '',
        discountType: coupon.discountType || 'percentage',
        discountValue: coupon.discountValue || '',
        maxDiscount: coupon.maxDiscount || '',
        minPurchase: coupon.minPurchase || '',
        maxUses: coupon.maxUses || '',
        startDate: coupon.startDate || '',
        startTime: coupon.startTime || '',
        endDate: coupon.endDate || '',
        endTime: coupon.endTime || '',
        associatedItems: coupon.associatedItems || [],
        status: coupon.status || 'Active',
        imageUrl: coupon.imageUrl || ''
      });
    } else {
      setFormData({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        maxDiscount: '',
        minPurchase: '',
        maxUses: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        associatedItems: [],
        status: 'Active',
        imageUrl: ''
      });
    }
    setErrors({});
  }, [coupon, isOpen]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
      const matchesFlag = filterFlag === 'All' || p.computedFlags?.[filterFlag];
      return matchesSearch && matchesFlag;
    });
  }, [products, productSearch, filterFlag]);

  const toggleItem = (itemName) => {
    const current = [...formData.associatedItems];
    const index = current.indexOf(itemName);
    if (index > -1) current.splice(index, 1);
    else current.push(itemName);
    setFormData({ ...formData, associatedItems: current });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.code.trim()) newErrors.code = 'Coupon code is required';
    if (!formData.discountValue || isNaN(formData.discountValue)) newErrors.discountValue = 'Valid discount is required';
    if (!formData.startDate || !formData.startTime) newErrors.start = 'Start time is required';
    if (!formData.endDate || !formData.endTime) newErrors.end = 'End time is required';

    const start = new Date(`${formData.startDate}T${formData.startTime}`);
    const end = new Date(`${formData.endDate}T${formData.endTime}`);
    if (end <= start) newErrors.end = 'End time must be after start time';

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm text-left">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-2.5 rounded-2xl">
              <SafeIcon icon={FiIcons.FiTag} className="text-orange-600 text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">
                {coupon ? 'Edit Coupon' : 'New Promo Code'}
              </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Promotion Config</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
            <SafeIcon icon={FiX} className="text-2xl text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input 
              label="Coupon Code" 
              placeholder="e.g. SAVE20"
              icon={<SafeIcon icon={FiHash} />}
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              error={errors.code}
            />
            <div className="space-y-1 text-left">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Discount Value</label>
              <div className="flex space-x-2">
                <div className="flex bg-gray-100 p-1 rounded-2xl shrink-0">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, discountType: 'percentage' })}
                    className={`px-4 py-2 rounded-xl transition-all font-black text-xs ${formData.discountType === 'percentage' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}
                  >
                    %
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, discountType: 'fixed' })}
                    className={`px-4 py-2 rounded-xl transition-all font-black text-xs ${formData.discountType === 'fixed' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}
                  >
                    {CURRENCY_CONFIG.symbol}
                  </button>
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Value"
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl outline-none focus:border-orange-500 transition-all font-bold text-sm ${errors.discountValue ? 'border-red-300' : 'border-gray-200 focus:ring-4 focus:ring-orange-100'}`}
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  />
                </div>
              </div>
              {errors.discountValue && <p className="text-[10px] font-black text-red-500 uppercase mt-1 ml-1">{errors.discountValue}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input 
              label={`Min. Purchase (${CURRENCY_CONFIG.symbol})`} 
              type="number"
              placeholder="0.00"
              icon={<SafeIcon icon={FiShoppingCart} />}
              value={formData.minPurchase}
              onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
            />
            <Input 
              label="Daily Usage Limit" 
              type="number"
              placeholder="Unlimited"
              icon={<SafeIcon icon={FiUserCheck} />}
              value={formData.maxUses}
              onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 text-left">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Valid From</label>
              <div className="flex space-x-2">
                <input type="date" className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-orange-500 font-bold" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                <input type="time" className="w-32 p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-orange-500 font-bold" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
              </div>
              {errors.start && <p className="text-[10px] font-black text-red-500 uppercase ml-1">{errors.start}</p>}
            </div>
            <div className="space-y-2 text-left">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Expires On</label>
              <div className="flex space-x-2">
                <input type="date" className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-orange-500 font-bold" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                <input type="time" className="w-32 p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:border-orange-500 font-bold" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} />
              </div>
              {errors.end && <p className="text-[10px] font-black text-red-500 uppercase ml-1">{errors.end}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Applicable Products</label>
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
                  onClick={() => toggleItem(product.name)}
                  className={`flex items-center p-3 rounded-2xl transition-all border text-left group ${
                    formData.associatedItems.includes(product.name)
                      ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/20'
                      : 'bg-white text-gray-600 border-gray-100 hover:border-orange-200'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 mr-3 shadow-sm border border-gray-100">
                    <img src={product.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-black truncate leading-tight ${formData.associatedItems.includes(product.name) ? 'text-white' : 'text-gray-900'}`}>
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
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">* Leave empty to apply to all store items.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <ImageUploadField 
              label="Promo Visual"
              value={formData.imageUrl}
              onChange={(val) => setFormData({ ...formData, imageUrl: val })}
            />
            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Visibility Status</label>
              <div className="flex p-1.5 bg-gray-100 rounded-2xl">
                {['Active', 'Inactive'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({ ...formData, status: s })}
                    className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${formData.status === s ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-6 sticky bottom-0 bg-white border-t border-gray-50 -mx-8 px-8 py-6 text-left">
            <Button variant="outline" className="flex-1 rounded-2xl h-14 font-black uppercase tracking-widest" onClick={onClose} type="button">Discard</Button>
            <Button variant="primary" className="flex-1 rounded-2xl h-14 font-black uppercase tracking-widest shadow-xl shadow-orange-600/20" type="submit">
              {coupon ? 'Update Code' : 'Launch Promo'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CouponForm;