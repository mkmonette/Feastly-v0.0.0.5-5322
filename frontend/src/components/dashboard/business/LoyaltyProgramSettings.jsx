import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';
import { useNotifications } from '@/context/NotificationContext';

const { 
  FiAward, FiPlus, FiSearch, FiEdit2, 
  FiTrash2, FiToggleLeft, FiToggleRight, FiInfo,
  FiUserPlus, FiShoppingBag, FiUsers, FiStar, FiX, FiCheck, FiRefreshCw
} = FiIcons;

const INITIAL_RULES = [
  { 
    id: '1', 
    type: 'Purchase', 
    description: 'Earn points for every dollar spent on orders', 
    pointsEarned: 5, 
    minPurchase: 0,
    redeemValue: 1, 
    status: 'Enabled',
    icon: FiShoppingBag,
    color: 'blue'
  },
  { 
    id: '2', 
    type: 'Signup', 
    description: 'Welcome bonus for creating a new account', 
    pointsEarned: 500, 
    minPurchase: 0,
    redeemValue: 5, 
    status: 'Enabled',
    icon: FiUserPlus,
    color: 'green'
  }
];

const RULE_TYPES = [
  { value: 'Purchase', label: 'Purchase', icon: FiShoppingBag, color: 'blue' },
  { value: 'Signup', label: 'Signup', icon: FiUserPlus, color: 'green' },
  { value: 'Referral', label: 'Referral', icon: FiUsers, color: 'purple' },
  { value: 'Product Bonus', label: 'Product Bonus', icon: FiStar, color: 'amber' }
];

const LoyaltyProgramSettings = () => {
  const { addNotification } = useNotifications();
  const [rules, setRules] = useState(INITIAL_RULES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    type: 'Purchase',
    description: '',
    pointsEarned: '',
    minPurchase: '',
    redeemValue: '',
    status: 'Enabled'
  });

  const filteredRules = useMemo(() => {
    return rules.filter(rule => {
      const matchesSearch = rule.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           rule.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'All' || rule.status === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [rules, searchQuery, filterType]);

  const handleOpenModal = (rule = null) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({
        type: rule.type,
        description: rule.description,
        pointsEarned: rule.pointsEarned,
        minPurchase: rule.minPurchase || '',
        redeemValue: rule.redeemValue,
        status: rule.status
      });
    } else {
      setEditingRule(null);
      setFormData({
        type: 'Purchase',
        description: '',
        pointsEarned: '',
        minPurchase: '',
        redeemValue: '',
        status: 'Enabled'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.type || !formData.pointsEarned || formData.redeemValue <= 0) {
      setToast({ type: 'error', message: 'Please fill all required fields correctly.' });
      return;
    }

    const ruleTypeInfo = RULE_TYPES.find(r => r.value === formData.type);
    const newRule = {
      ...formData,
      id: editingRule ? editingRule.id : Date.now().toString(),
      icon: ruleTypeInfo.icon,
      color: ruleTypeInfo.color,
      pointsEarned: Number(formData.pointsEarned),
      redeemValue: Number(formData.redeemValue),
      minPurchase: Number(formData.minPurchase || 0)
    };

    if (editingRule) {
      setRules(prev => prev.map(r => r.id === editingRule.id ? newRule : r));
      setToast({ type: 'success', message: 'Rule updated successfully' });
    } else {
      setRules(prev => [newRule, ...prev]);
      setToast({ type: 'success', message: 'New rule created successfully' });
      
      // Trigger Notification for New Rule
      addNotification({
        type: 'Loyalty',
        title: 'New Loyalty Rule Active',
        message: `Your new "${formData.type}" rule is now live. Customers earn ${formData.pointsEarned} points.`,
        priority: 'Info'
      });
    }
    
    setIsModalOpen(false);
  };

  const simulateActivity = () => {
    const names = ['Maria Santos', 'John Doe', 'Elena Reyes', 'Kevin Cruz'];
    const name = names[Math.floor(Math.random() * names.length)];
    const points = Math.floor(Math.random() * 50) + 10;
    
    addNotification({
      type: 'Loyalty',
      title: 'Customer Earned Points',
      message: `${name} just earned ${points} loyalty points from a purchase.`,
      priority: 'Info'
    });
    
    setToast({ type: 'success', message: `Simulated loyalty activity for ${name}` });
  };

  const toggleStatus = (id) => {
    setRules(prev => prev.map(rule => 
      rule.id === id 
        ? { ...rule, status: rule.status === 'Enabled' ? 'Disabled' : 'Enabled' } 
        : rule
    ));
    setToast({ type: 'success', message: 'Status updated' });
  };

  const deleteRule = (id) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
    setToast({ type: 'success', message: 'Rule deleted' });
  };

  const getTypeColor = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-100',
      green: 'bg-green-50 text-green-600 border-green-100',
      purple: 'bg-purple-50 text-purple-600 border-purple-100',
      amber: 'bg-amber-50 text-amber-600 border-amber-100',
      rose: 'bg-rose-50 text-rose-600 border-rose-100'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-3xl font-black text-gray-900 flex items-center tracking-tight">
            <SafeIcon icon={FiAward} className="mr-3 text-orange-600" />
            Loyalty Program Settings
          </h3>
          <p className="text-sm text-gray-500">Manage how your customers earn and redeem rewards through your loyalty program.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={simulateActivity} className="flex items-center space-x-2">
            <SafeIcon icon={FiRefreshCw} />
            <span>Simulate Activity</span>
          </Button>
          <Button onClick={() => handleOpenModal()} className="flex items-center space-x-2 shadow-lg shadow-orange-600/20">
            <SafeIcon icon={FiPlus} />
            <span>Add New Rule</span>
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <SafeIcon icon={FiSearch} />
            </span>
            <input
              type="text"
              placeholder="Search by rule type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-transparent rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-600/5 outline-none transition-all"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {['All', 'Enabled', 'Disabled'].map(status => (
              <button
                key={status}
                onClick={() => setFilterType(status)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  filterType === status 
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-gray-50">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Type</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Description</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Points Earned</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Redeem Value</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredRules.map((rule) => (
                  <motion.tr 
                    key={rule.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-orange-50/30 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl border ${getTypeColor(rule.color)}`}>
                          <SafeIcon icon={rule.icon} className="text-lg" />
                        </div>
                        <span className="font-bold text-gray-900 text-sm">{rule.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-500 font-medium leading-relaxed">{rule.description}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-black uppercase tracking-tight">
                        {rule.pointsEarned} Points
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-gray-700">₱{rule.redeemValue} Discount</span>
                    </td>
                    <td className="px-6 py-5">
                      <button 
                        onClick={() => toggleStatus(rule.id)}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full transition-all border ${
                          rule.status === 'Enabled' 
                            ? 'bg-green-50 text-green-600 border-green-100' 
                            : 'bg-gray-50 text-gray-400 border-gray-100'
                        }`}
                      >
                        <SafeIcon icon={rule.status === 'Enabled' ? FiToggleRight : FiToggleLeft} className="text-lg" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{rule.status}</span>
                      </button>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(rule)} className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-100 hover:shadow-sm rounded-xl transition-all">
                          <SafeIcon icon={FiEdit2} />
                        </button>
                        <button 
                          onClick={() => deleteRule(rule.id)}
                          className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-rose-600 hover:border-rose-100 hover:shadow-sm rounded-xl transition-all"
                        >
                          <SafeIcon icon={FiTrash2} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[40px] w-full max-w-xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-600 text-white rounded-2xl">
                    <SafeIcon icon={FiAward} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900">{editingRule ? 'Edit Rule' : 'New Program Rule'}</h4>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Loyalty Program Configuration</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-xl transition-colors">
                  <SafeIcon icon={FiX} className="text-gray-400 text-xl" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Reward Type</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-orange-500 transition-all outline-none"
                    >
                      {RULE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Points Earned</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 50"
                      value={formData.pointsEarned}
                      onChange={(e) => setFormData({...formData, pointsEarned: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-orange-500 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Redeem Value (₱)</label>
                    <input
                      type="number"
                      required
                      min="0.01"
                      step="0.01"
                      placeholder="Value in Pesos"
                      value={formData.redeemValue}
                      onChange={(e) => setFormData({...formData, redeemValue: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-orange-500 transition-all outline-none"
                    />
                  </div>

                  {formData.type === 'Purchase' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Min. Purchase (₱)</label>
                      <input
                        type="number"
                        placeholder="Optional"
                        value={formData.minPurchase}
                        onChange={(e) => setFormData({...formData, minPurchase: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-orange-500 transition-all outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Rule Description</label>
                  <textarea
                    placeholder="Short explanation for customers..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold focus:bg-white focus:border-orange-500 transition-all outline-none resize-none"
                  />
                </div>

                {/* Live Preview */}
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center space-x-4">
                  <div className="p-2 bg-orange-200 text-orange-700 rounded-xl">
                    <SafeIcon icon={FiInfo} />
                  </div>
                  <div className="text-xs font-bold text-orange-900 leading-relaxed">
                    Preview: A customer will earn <span className="text-orange-600">{formData.pointsEarned || 0} points</span> 
                    {formData.type === 'Purchase' ? ` for every ₱${formData.minPurchase || 100} spent.` : ` for ${formData.type}.`}
                    <br/>
                    Redemption: These points are worth <span className="text-orange-600">₱{formData.redeemValue || 0}</span> in discounts.
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, status: formData.status === 'Enabled' ? 'Disabled' : 'Enabled'})}
                    className="flex items-center space-x-2 text-sm font-bold text-gray-500"
                  >
                    <SafeIcon icon={formData.status === 'Enabled' ? FiToggleRight : FiToggleLeft} className={`text-2xl ${formData.status === 'Enabled' ? 'text-green-500' : 'text-gray-300'}`} />
                    <span>{formData.status}</span>
                  </button>
                  <div className="flex space-x-3">
                    <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button type="submit" className="px-8">{editingRule ? 'Update Rule' : 'Save Rule'}</Button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default LoyaltyProgramSettings;