import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import MarketingForm from './MarketingForm';
import Toast from '@/components/ui/Toast';
import DataTable from './DataTable';
import BulkActionsBar from './BulkActionsBar';
import BulkActionModal from './BulkActionModal';
import useTableSelection from '@/hooks/useTableSelection';
import { formatCurrency } from '@/common/currency';

const { FiPlus, FiEdit2, FiTrash2, FiCopy, FiSearch, FiTrendingUp, FiGrid, FiList, FiPackage, FiDownload, FiUpload, FiFile, FiAward, FiStar, FiClock, FiTrendingDown, FiSun, FiSlash, FiFilter } = FiIcons;

const UpsellManagement = ({ products = [] }) => {
  const [viewMode, setViewMode] = useState('table');
  const [upsells, setUpsells] = useState([
    { id: 1, name: 'Combo Upgrade', associatedProducts: ['Truffle Burger'], price: '250.00', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000&auto=format&fit=crop', discountType: 'percentage', discountValue: 20 },
    { id: 2, name: 'Family Size', associatedProducts: ['Margherita Pizza', 'Double Cheeseburger'], price: '450.00', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop', discountType: 'none', discountValue: 0 },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFlag, setFilterFlag] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [bulkModal, setBulkModal] = useState({ isOpen: false, action: null });
  const fileInputRef = useRef(null);

  const selection = useTableSelection(upsells);

  const getProductBadges = (productName) => {
    const p = products.find(prod => prod.name === productName);
    return p?.computedFlags || null;
  };

  const getUpsellPriority = (item) => {
    let score = 0;
    item.associatedProducts.forEach(pName => {
      const flags = getProductBadges(pName);
      if (!flags) return;
      if (flags.featured) score += 100;
      if (flags.bestSeller) score += 80;
      if (flags.new) score += 60;
      if (flags.onSale) score += 20;
    });
    return score;
  };

  const filtered = useMemo(() => {
    let result = upsells.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.associatedProducts.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFlag = filterFlag === 'All' || u.associatedProducts.some(pName => {
        const flags = getProductBadges(pName);
        return flags?.[filterFlag];
      });
      return matchesSearch && matchesFlag;
    });

    return result.sort((a, b) => {
      const scoreA = getUpsellPriority(a);
      const scoreB = getUpsellPriority(b);
      return scoreB - scoreA; // Featured/Best Sellers first
    });
  }, [upsells, searchQuery, filterFlag, products]);

  const handleBulkAction = (action) => {
    if (action === 'delete') setBulkModal({ isOpen: true, action });
    else executeBulkAction(action);
  };

  const executeBulkAction = (action, data = null) => {
    setUpsells(prev => {
      let updated = [...prev];
      if (action === 'delete') updated = updated.filter(u => !selection.selectedIds.includes(u.id));
      else if (action === 'activate') updated = updated.map(u => selection.selectedIds.includes(u.id) ? { ...u, status: 'Active' } : u);
      else if (action === 'deactivate') updated = updated.map(u => selection.selectedIds.includes(u.id) ? { ...u, status: 'Inactive' } : u);
      return updated;
    });
    setToast({ type: 'success', message: `Bulk ${action} performed on ${selection.count} upsells.` });
    selection.clearSelection();
    setBulkModal({ isOpen: false, action: null });
  };

  const getFinalPrice = (item) => {
    const original = parseFloat(item.price);
    const val = parseFloat(item.discountValue);
    if (item.discountType === 'percentage') return (original - (original * (val / 100))).toFixed(2);
    if (item.discountType === 'fixed') return (original - val).toFixed(2);
    return original.toFixed(2);
  };

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
    const { icon, color } = config[flag];
    return (<div className={`p-0.5 rounded ${color} flex items-center shadow-xs`}><SafeIcon icon={icon} className="text-[7px]" /></div>);
  };

  const upsellColumns = [
    { key: 'name', label: 'Offer Name', render: (u) => (<div className="flex items-center space-x-3 text-left"><img src={u.imageUrl} className="w-10 h-10 rounded-lg object-cover shadow-sm" alt="" /><span className="font-bold text-gray-900">{u.name}</span></div>) },
    { key: 'associatedProducts', label: 'Linked For', render: (u) => (<div className="flex flex-wrap gap-1.5">{u.associatedProducts.map(pName => { const flags = getProductBadges(pName); return (<div key={pName} className="flex flex-col space-y-1"><span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg text-[9px] font-bold border border-gray-100 whitespace-nowrap">{pName}</span>{flags && (<div className="flex gap-0.5 ml-0.5">{Object.entries(flags).filter(([_, v]) => v).map(([f]) => <FlagBadge key={f} flag={f} active={true} />)}</div>)}</div>); })}</div>)},
    { key: 'price', label: 'Original', render: (u) => <span className="text-gray-400 line-through text-xs font-bold">{formatCurrency(u.price)}</span> },
    { key: 'finalPrice', label: 'Sale Price', render: (u) => <span className="text-orange-600 font-extrabold">{formatCurrency(getFinalPrice(u))}</span> },
    { key: 'status', label: 'Status', render: (u) => (<span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${u.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{u.status}</span>) },
    { key: 'actions', label: 'Actions', render: (u) => (<div className="flex items-center space-x-2"><button onClick={() => setUpsells([{ ...u, id: Date.now(), name: `Copy of ${u.name}` }, ...upsells])} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiCopy} /></button><button onClick={() => { setEditingItem(u); setIsFormOpen(true); }} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiEdit2} /></button><button onClick={() => setDeleteId(u.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><SafeIcon icon={FiTrash2} /></button></div>) }
  ];

  const flagFilters = [
    { id: 'All', label: 'All Upsells', icon: FiFilter },
    { id: 'featured', label: 'Featured Targets', icon: FiStar },
    { id: 'bestSeller', label: 'Best Sellers', icon: FiAward },
    { id: 'onSale', label: 'Sale Items', icon: FiTrendingDown }
  ];

  return (
    <div className="space-y-6 text-left">
      <BulkActionsBar selectedIds={selection.selectedIds} onBulkAction={handleBulkAction} menuType="Upsell" onClear={selection.clearSelection} />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md"><div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SafeIcon icon={FiSearch} /></div><input type="text" placeholder="Search upsells..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none shadow-sm text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
          <div className="flex bg-gray-100 p-1 rounded-2xl overflow-x-auto no-scrollbar">
            {flagFilters.map(opt => (
              <button key={opt.id} onClick={() => setFilterFlag(opt.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap text-[10px] font-black uppercase tracking-widest ${filterFlag === opt.id ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}><SafeIcon icon={opt.icon} className={filterFlag === opt.id ? 'text-orange-500' : ''} /><span>{opt.label}</span></button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3"><div className="flex bg-gray-100 p-1 rounded-xl shadow-sm"><button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}><SafeIcon icon={FiGrid} /></button><button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}><SafeIcon icon={FiList} /></button></div><Button onClick={() => { setEditingItem(null); setIsFormOpen(true); }} className="shadow-lg"><SafeIcon icon={FiPlus} className="mr-2" /> New Upsell</Button></div>
      </div>
      {viewMode === 'table' ? (<DataTable columns={upsellColumns} data={filtered} selection={{ selectedIds: selection.selectedIds, onSelect: selection.toggleSelect, onSelectAll: selection.toggleSelectAll }} />) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left"><AnimatePresence mode="popLayout">{filtered.map((item) => (<motion.div layout key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`bg-white rounded-[2rem] border overflow-hidden shadow-sm hover:shadow-xl transition-all p-0 flex flex-col group relative ${selection.isSelected(item.id) ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-100'}`}><div className="absolute top-4 left-4 z-20"><input type="checkbox" checked={selection.isSelected(item.id)} onChange={() => selection.toggleSelect(item.id)} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer shadow-sm" /></div><div className="h-40 relative overflow-hidden bg-gray-100"><img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div><div className="absolute bottom-4 left-12"><h4 className="font-black text-white text-xl tracking-tight">{item.name}</h4><span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${item.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>{item.status}</span></div><div className="absolute top-4 right-4 flex flex-col items-end shrink-0"><span className="text-[10px] text-white/50 line-through font-bold leading-none">{formatCurrency(item.price)}</span><span className="text-white font-black text-2xl leading-tight">{formatCurrency(getFinalPrice(item))}</span></div></div><div className="p-6 flex-1 flex flex-col"><div className="mb-4 text-left"><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center"><SafeIcon icon={FiPackage} className="mr-2 text-orange-500" /> Priority: {getUpsellPriority(item)}</p><div className="flex flex-wrap gap-2">{item.associatedProducts.map(pName => { const flags = getProductBadges(pName); return (<div key={pName} className="flex flex-col space-y-1"><span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-xl text-[10px] font-black border border-gray-100 group-hover:border-orange-200 group-hover:bg-orange-50/50 transition-colors">{pName}</span>{flags && (<div className="flex gap-0.5 ml-1">{Object.entries(flags).filter(([_, v]) => v).map(([f]) => <FlagBadge key={f} flag={f} active={true} />)}</div>)}</div>); })}</div></div><div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto"><div className="flex space-x-1"><button onClick={() => setUpsells([{ ...item, id: Date.now(), name: `Copy of ${item.name}` }, ...upsells])} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"><SafeIcon icon={FiCopy} /></button><button onClick={() => { setEditingItem(item); setIsFormOpen(true); }} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"><SafeIcon icon={FiEdit2} /></button></div><button onClick={() => setDeleteId(item.id)} className="p-2 text-gray-200 hover:text-red-500 transition-all"><SafeIcon icon={FiTrash2} /></button></div></div></motion.div>))}</AnimatePresence></div>)}
      <MarketingForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={(data) => { if (editingItem) setUpsells(prev => prev.map(u => u.id === editingItem.id ? { ...u, ...data } : u)); else setUpsells([{ ...data, id: Date.now() }, ...upsells]); setIsFormOpen(false); }} item={editingItem} products={products} type="Upsell" />
    </div>
  );
};

export default UpsellManagement;