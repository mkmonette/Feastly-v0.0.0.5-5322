import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUploadField from '@/components/ui/ImageUploadField';
import { CURRENCY_CONFIG, formatCurrency } from '@/common/currency';

const { 
  FiX, FiType, FiClock, FiPlus, FiTrash2, FiRepeat, FiPercent, FiDollarSign, 
  FiChevronRight, FiAlertCircle, FiSearch, FiFilter,
  FiStar, FiAward, FiPackage, FiSun, FiSlash, FiTrendingDown
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

const FlashSaleForm = ({ isOpen, onClose, onSave, sale, products = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    associatedItems: [],
    rounds: [{ discountType: 'percentage', discountValue: '', durationMinutes: 60 }],
    isCyclical: false,
    status: 'Active',
    imageUrl: '',
    startDate: new Date().toISOString().split('T')[0],
    startTime: '00:00'
  });
  const [errors, setErrors] = useState({});
  const [productSearch, setProductSearch] = useState('');
  const [filterFlag, setFilterFlag] = useState('All');

  useEffect(() => {
    if (sale) {
      setFormData({
        ...sale,
        rounds: sale.rounds || [{ discountType: 'percentage', discountValue: '', durationMinutes: 60 }],
      });
    } else {
      setFormData({
        name: '',
        associatedItems: [],
        rounds: [{ discountType: 'percentage', discountValue: '', durationMinutes: 60 }],
        isCyclical: false,
        status: 'Active',
        imageUrl: '',
        startDate: new Date().toISOString().split('T')[0],
        startTime: '00:00'
      });
    }
    setErrors({});
  }, [sale, isOpen]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
      const matchesFlag = filterFlag === 'All' || p.computedFlags?.[filterFlag];
      return matchesSearch && matchesFlag;
    });
  }, [products, productSearch, filterFlag]);

  const addRound = () => {
    setFormData({
      ...formData,
      rounds: [...formData.rounds, { discountType: 'percentage', discountValue: '', durationMinutes: 60 }]
    });
  };

  const removeRound = (index) => {
    if (formData.rounds.length === 1) return;
    const newRounds = formData.rounds.filter((_, i) => i !== index);
    setFormData({ ...formData, rounds: newRounds });
  };

  const updateRound = (index, field, value) => {
    const newRounds = [...formData.rounds];
    newRounds[index][field] = value;
    setFormData({ ...formData, rounds: newRounds });
  };

  const toggleItem = (itemName) => {
    const current = [...formData.associatedItems];
    const index = current.indexOf(itemName);
    if (index > -1) current.splice(index, 1);
    else current.push(itemName);
    setFormData({ ...formData, associatedItems: current });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Sequence name required';
    if (formData.associatedItems.length === 0) newErrors.items = 'Select target items';
    
    formData.rounds.forEach((round, i) => {
      if (!round.discountValue || isNaN(round.discountValue)) newErrors[`round_${i}_val`] = 'Err';
      if (!round.durationMinutes || round.durationMinutes <= 0) newErrors[`round_${i}_dur`] = 'Err';
    });

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
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
      >
        <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-600 p-3 rounded-2xl shadow-lg shadow-orange-600/20">
              <SafeIcon icon={FiIcons.FiZap} className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                {sale ? 'Edit Flash Sequence' : 'New Flash Campaign'}
              </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pricing Strategy Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
            <SafeIcon icon={FiX} className="text-2xl text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-10 py-8 space-y-10 overflow-y-auto custom-scrollbar flex-1 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Input 
                label="Campaign Name" 
                placeholder="e.g. Midweek Madness"
                icon={<SafeIcon icon={FiType} />}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
              />
              
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Visual Branding</label>
                <ImageUploadField 
                  value={formData.imageUrl}
                  onChange={(val) => setFormData({ ...formData, imageUrl: val })}
                />
              </div>

              <div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100/50 shadow-inner">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiRepeat} className="text-orange-600" />
                    <span className="text-sm font-black text-orange-900 uppercase">Cyclical Loop</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, isCyclical: !formData.isCyclical })}
                    className={`w-12 h-6 rounded-full transition-all relative ${formData.isCyclical ? 'bg-orange-600' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isCyclical ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
                <p className="text-[10px] font-bold text-orange-700/60 leading-relaxed uppercase tracking-wider">
                  Restart automatically from round 1 after the final step expires.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Discount Steps</label>
                <button type="button" onClick={addRound} className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline flex items-center">
                  <SafeIcon icon={FiPlus} className="mr-1" /> Add Round
                </button>
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                <AnimatePresence mode="popLayout">
                  {formData.rounds.map((round, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-5 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col space-y-4 relative"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-lg bg-gray-900 text-white text-[10px] font-black flex items-center justify-center">0{index + 1}</span>
                          <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Step Config</span>
                        </div>
                        {formData.rounds.length > 1 && (
                          <button type="button" onClick={() => removeRound(index)} className="p-1.5 text-gray-300 hover:text-red-500 transition-colors">
                            <SafeIcon icon={FiTrash2} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex bg-white p-1 rounded-2xl border border-gray-200 shadow-sm">
                          <button type="button" onClick={() => updateRound(index, 'discountType', 'percentage')} className={`flex-1 flex items-center justify-center py-2 rounded-xl transition-all font-black text-xs ${round.discountType === 'percentage' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400'}`}>%</button>
                          <button type="button" onClick={() => updateRound(index, 'discountType', 'fixed')} className={`flex-1 flex items-center justify-center py-2 rounded-xl transition-all font-black text-xs ${round.discountType === 'fixed' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400'}`}>{CURRENCY_CONFIG.symbol}</button>
                        </div>
                        <input 
                          type="number" 
                          placeholder="Value"
                          className={`w-full px-4 py-3 rounded-2xl border bg-white text-sm font-black outline-none focus:ring-2 focus:ring-orange-100 ${errors[`round_${index}_val`] ? 'border-red-300' : 'border-gray-200'}`}
                          value={round.discountValue}
                          onChange={(e) => updateRound(index, 'discountValue', e.target.value)}
                        />
                      </div>

                      <div className="flex items-center space-x-3 bg-white px-4 py-3 rounded-2xl border border-gray-200 shadow-sm">
                        <SafeIcon icon={FiClock} className="text-orange-600" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex-1">Duration</span>
                        <input 
                          type="number" 
                          className="w-16 bg-transparent text-right font-black text-gray-900 text-sm outline-none"
                          value={round.durationMinutes}
                          onChange={(e) => updateRound(index, 'durationMinutes', e.target.value)}
                        />
                        <span className="text-[10px] font-black text-gray-900 uppercase">Min</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Timeline Preview */}
              {formData.rounds.length > 0 && (
                <div className="p-6 bg-gray-900 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <SafeIcon icon={FiAlertCircle} className="text-orange-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Sequence Preview</span>
                  </div>
                  <div className="relative flex items-center justify-between px-4">
                    <div className="absolute left-0 right-0 h-0.5 bg-gray-800 top-1/2 -translate-y-1/2" />
                    {formData.rounds.map((r, i) => (
                      <div key={i} className="relative z-10 flex flex-col items-center">
                        <div className="w-3.5 h-3.5 rounded-full bg-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.8)]" />
                        <span className="mt-2 text-[9px] font-black text-white">
                          {r.discountType === 'percentage' ? `${r.discountValue}%` : formatCurrency(r.discountValue)}
                        </span>
                        <span className="text-[8px] font-bold text-gray-600">{r.durationMinutes}m</span>
                      </div>
                    ))}
                    {formData.isCyclical && (
                      <div className="relative z-10 flex flex-col items-center">
                        <SafeIcon icon={FiRepeat} className="text-gray-600 text-xs" />
                        <span className="mt-2 text-[8px] font-bold text-gray-700 uppercase">Loop</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Selection with Flags */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Target Inventory</label>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl text-[10px] outline-none focus:border-orange-500 w-40"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
                <div className="flex overflow-x-auto no-scrollbar max-w-[250px] bg-gray-100 p-0.5 rounded-xl">
                  {flagOptions.map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFilterFlag(opt.id)}
                      className={`px-2.5 py-1.5 rounded-lg transition-all shrink-0 ${filterFlag === opt.id ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}
                      title={opt.label}
                    >
                      <SafeIcon icon={opt.icon} className="text-xs" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 max-h-64 overflow-y-auto custom-scrollbar">
              {filteredProducts.map(product => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleItem(product.name)}
                  className={`flex items-center p-3 rounded-2xl transition-all border text-left group shrink-0 ${
                    formData.associatedItems.includes(product.name)
                      ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/20'
                      : 'bg-white text-gray-600 border-gray-100 hover:border-orange-200'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 mr-3 shadow-sm border border-gray-100">
                    <img src={product.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[11px] font-black truncate leading-tight ${formData.associatedItems.includes(product.name) ? 'text-white' : 'text-gray-900'}`}>
                      {product.name}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {Object.entries(product.computedFlags || {})
                        .filter(([_, val]) => val)
                        .map(([flag]) => <FlagBadge key={flag} flag={flag} active={true} />)
                      }
                    </div>
                  </div>
                </button>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-xs font-bold text-gray-400 italic">No inventory matches your filters</p>
                </div>
              )}
            </div>
            {errors.items && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-1">{errors.items}</p>}
          </div>

          <div className="flex space-x-4 pt-8 sticky bottom-0 bg-white border-t border-gray-50 -mx-10 px-10 py-8">
            <Button variant="outline" className="flex-1 rounded-2xl h-14 font-black uppercase tracking-widest" onClick={onClose} type="button">Discard</Button>
            <Button variant="primary" className="flex-1 rounded-2xl h-14 font-black uppercase tracking-widest bg-orange-600 shadow-2xl shadow-orange-600/20" type="submit">
              {sale ? 'Update Sequence' : 'Launch Campaign'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default FlashSaleForm;