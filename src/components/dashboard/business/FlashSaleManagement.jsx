import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import FlashSaleForm from './FlashSaleForm';
import Toast from '@/components/ui/Toast';
import DataTable from './DataTable';
import BulkActionsBar from './BulkActionsBar';
import BulkActionModal from './BulkActionModal';
import useTableSelection from '@/hooks/useTableSelection';
import CountdownTimer from './CountdownTimer';
import { formatCurrency } from '@/common/currency';

const { 
  FiPlus, FiEdit2, FiTrash2, FiCopy, FiSearch, FiZap, FiGrid, FiList, 
  FiClock, FiTrendingDown, FiDownload, FiUpload, FiFile, FiRepeat,
  FiPause, FiPlay, FiRefreshCw, FiChevronRight, FiStar, FiAward, FiPackage, FiSun, FiSlash, FiFilter
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
    outOfStock: { icon: FiSlash, label: 'Out of Stock', color: 'bg-red-600 text-white' }
  };
  const badgeConfig = config[flag];
  if (!badgeConfig) return null;
  const { icon, label, color } = badgeConfig;
  return (
    <div className={`flex items-center space-x-1 px-1.5 py-0.5 rounded ${color} shadow-sm shrink-0`}>
      <SafeIcon icon={icon} className="text-[8px]" />
      <span className="text-[7px] font-black uppercase tracking-tighter whitespace-nowrap">{label}</span>
    </div>
  );
};

const FlashSaleManagement = ({ products = [] }) => {
  const [viewMode, setViewMode] = useState('table');
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('feastly_flash_sales');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        name: 'Burger Bonanza', 
        associatedItems: ['Truffle Burger', 'Double Cheeseburger'], 
        rounds: [
          { discountType: 'percentage', discountValue: '40', durationMinutes: 60 },
          { discountType: 'percentage', discountValue: '20', durationMinutes: 30 }
        ],
        currentRoundIndex: 0,
        roundEndTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        isCyclical: true,
        isPaused: false,
        remainingSeconds: null,
        startDate: '2024-01-01',
        startTime: '00:00',
        status: 'Active', 
        imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop' 
      }
    ];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFlag, setFilterFlag] = useState('All');
  const selection = useTableSelection(sales);

  useEffect(() => {
    localStorage.setItem('feastly_flash_sales', JSON.stringify(sales));
  }, [sales]);

  const handleNextRound = (saleId) => {
    setSales(prev => prev.map(sale => {
      if (sale.id !== saleId) return sale;
      const nextIndex = sale.currentRoundIndex + 1;
      const hasNextRound = nextIndex < sale.rounds.length;
      if (hasNextRound) {
        const nextRound = sale.rounds[nextIndex];
        return {
          ...sale,
          currentRoundIndex: nextIndex,
          roundEndTime: new Date(Date.now() + nextRound.durationMinutes * 60 * 1000).toISOString(),
          isPaused: false
        };
      } else if (sale.isCyclical) {
        const firstRound = sale.rounds[0];
        return {
          ...sale,
          currentRoundIndex: 0,
          roundEndTime: new Date(Date.now() + firstRound.durationMinutes * 60 * 1000).toISOString(),
          isPaused: false
        };
      } else {
        return { ...sale, status: 'Inactive', roundEndTime: null, isPaused: false };
      }
    }));
  };

  const togglePause = (saleId) => {
    setSales(prev => prev.map(sale => {
      if (sale.id !== saleId) return sale;
      if (sale.isPaused) {
        const newEndTime = new Date(Date.now() + (sale.remainingSeconds || 0) * 1000).toISOString();
        return { ...sale, isPaused: false, roundEndTime: newEndTime, remainingSeconds: null };
      } else {
        const remaining = Math.max(0, Math.floor((new Date(sale.roundEndTime) - new Date()) / 1000));
        return { ...sale, isPaused: true, remainingSeconds: remaining, roundEndTime: null };
      }
    }));
    setToast({ type: 'info', message: 'Flash sale timer updated' });
  };

  const resetSale = (saleId) => {
    setSales(prev => prev.map(sale => {
      if (sale.id !== saleId) return sale;
      const firstRound = sale.rounds[0];
      return {
        ...sale,
        currentRoundIndex: 0,
        roundEndTime: new Date(Date.now() + firstRound.durationMinutes * 60 * 1000).toISOString(),
        isPaused: false,
        remainingSeconds: null,
        status: 'Active'
      };
    }));
    setToast({ type: 'success', message: 'Flash sale reset to first round' });
  };

  const handleSave = (formData) => {
    if (editingSale) {
      setSales(prev => prev.map(s => s.id === editingSale.id ? { ...s, ...formData } : s));
      setToast({ type: 'success', message: 'Flash sale updated' });
    } else {
      const firstRound = formData.rounds[0];
      const newSale = {
        ...formData,
        id: Date.now(),
        currentRoundIndex: 0,
        isPaused: false,
        remainingSeconds: null,
        roundEndTime: formData.status === 'Active' 
          ? new Date(Date.now() + firstRound.durationMinutes * 60 * 1000).toISOString() 
          : null
      };
      setSales([newSale, ...sales]);
      setToast({ type: 'success', message: 'Flash sale created' });
    }
    setIsFormOpen(false);
  };

  const getProductData = (pName) => products.find(p => p.name === pName);

  const getSalePriority = (sale) => {
    let score = 0;
    sale.associatedItems.forEach(pName => {
      const p = getProductData(pName);
      if (!p?.computedFlags) return;
      if (p.computedFlags.featured) score += 100;
      if (p.computedFlags.bestSeller) score += 80;
      if (p.computedFlags.new) score += 60;
      if (p.computedFlags.lowStock) score += 40;
      if (p.computedFlags.onSale) score += 20;
      if (p.computedFlags.seasonal) score += 10;
    });
    return score;
  };

  const filtered = useMemo(() => {
    return sales.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFlag = filterFlag === 'All' || s.associatedItems.some(pName => {
        const p = getProductData(pName);
        return p?.computedFlags?.[filterFlag];
      });
      return matchesSearch && matchesFlag;
    }).sort((a, b) => getSalePriority(b) - getSalePriority(a));
  }, [sales, searchQuery, filterFlag, products]);

  const saleColumns = [
    { key: 'name', label: 'Sale Name', render: (s) => (
      <div className="flex items-center space-x-3 text-left">
        <img src={s.imageUrl || 'https://images.unsplash.com/photo-1550547660-d9450f859349'} className="w-10 h-10 rounded-lg object-cover shadow-sm" alt="" />
        <div>
          <span className="font-bold text-gray-900 block">{s.name}</span>
          <div className="flex items-center space-x-2 mt-0.5">
            {s.isCyclical && <span className="text-[8px] px-1.5 py-0.5 bg-orange-50 text-orange-600 font-black rounded border border-orange-100 uppercase">Cyclical</span>}
            <span className="text-[8px] px-1.5 py-0.5 bg-gray-50 text-gray-400 font-bold rounded border border-gray-100 uppercase">Rounds: {s.rounds?.length || 0}</span>
          </div>
        </div>
      </div>
    )},
    { key: 'items', label: 'Target Items', render: (s) => (
      <div className="flex flex-wrap gap-2 max-w-[250px]">
        {s.associatedItems.map(pName => {
          const p = getProductData(pName);
          return (
            <div key={pName} className="flex flex-col space-y-1">
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border transition-all ${p?.computedFlags?.outOfStock ? 'bg-red-50 text-red-400 border-red-100 line-through' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                {pName}
              </span>
              <div className="flex flex-wrap gap-0.5">
                {p?.computedFlags && Object.entries(p.computedFlags)
                  .filter(([f, v]) => v && f !== 'onSale')
                  .map(([f]) => <FlagBadge key={f} flag={f} active={true} />)
                }
              </div>
            </div>
          );
        })}
      </div>
    )},
    { key: 'rounds', label: 'Current Level', render: (s) => (
      <div className="flex flex-col text-left">
        <span className="text-xs font-bold text-gray-900">Step {s.currentRoundIndex + 1}</span>
        <div className="flex items-center text-orange-600 font-extrabold text-[10px]">
          <SafeIcon icon={FiTrendingDown} className="mr-1" />
          {s.rounds[s.currentRoundIndex].discountType === 'percentage' 
            ? `${s.rounds[s.currentRoundIndex].discountValue}%` 
            : `${formatCurrency(s.rounds[s.currentRoundIndex].discountValue)}`} OFF
        </div>
      </div>
    )},
    { key: 'timer', label: 'Time Control', render: (s) => (
      <div className="flex items-center space-x-4">
        {s.status === 'Active' ? (
          s.isPaused ? (
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-red-500 uppercase tracking-tighter leading-none mb-0.5">Paused</span>
              <div className="flex items-center text-gray-400 font-mono font-black text-sm tabular-nums">
                {Math.floor((s.remainingSeconds || 0) / 3600).toString().padStart(2, '0')}:
                {Math.floor(((s.remainingSeconds || 0) % 3600) / 60).toString().padStart(2, '0')}:
                {((s.remainingSeconds || 0) % 60).toString().padStart(2, '0')}
              </div>
            </div>
          ) : (
            <CountdownTimer targetTime={s.roundEndTime} onComplete={() => handleNextRound(s.id)} label="Next Step" />
          )
        ) : (
          <span className="text-gray-400 text-[10px] font-bold uppercase">Inactive</span>
        )}
        {s.status === 'Active' && (
          <div className="flex bg-gray-100 rounded-lg p-0.5 ml-auto">
            <button onClick={() => togglePause(s.id)} className={`p-1.5 rounded-md transition-all ${s.isPaused ? 'bg-green-500 text-white shadow-sm' : 'text-gray-400 hover:text-orange-600'}`} title={s.isPaused ? 'Resume' : 'Pause'}><SafeIcon icon={s.isPaused ? FiPlay : FiPause} className="text-sm" /></button>
            <button onClick={() => resetSale(s.id)} className="p-1.5 text-gray-400 hover:text-orange-600 transition-all" title="Reset to Round 1"><SafeIcon icon={FiRefreshCw} className="text-sm" /></button>
          </div>
        )}
      </div>
    )},
    { key: 'actions', label: 'Manage', render: (s) => (
      <div className="flex items-center space-x-2">
        <button onClick={() => { setEditingSale(s); setIsFormOpen(true); }} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiEdit2} /></button>
        <button onClick={() => setDeleteId(s.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><SafeIcon icon={FiTrash2} /></button>
      </div>
    )}
  ];

  const flagOptions = [
    { id: 'All', label: 'All Sequences', icon: FiFilter },
    { id: 'featured', label: 'Featured Targets', icon: FiStar },
    { id: 'bestSeller', label: 'Best Sellers', icon: FiAward },
    { id: 'lowStock', label: 'Low Stock Alerts', icon: FiPackage },
    { id: 'seasonal', label: 'Seasonal Offers', icon: FiSun }
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="bg-orange-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-orange-600/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center space-x-2 mb-2">
              <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-md"><SafeIcon icon={FiZap} className="text-white" /></div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-100">Flash Sale Hub</span>
            </div>
            <h2 className="text-3xl font-black mb-2">Multi-Step Discount Sequences</h2>
            <p className="text-orange-100 text-sm font-medium leading-relaxed">Boost urgency by layering discounts over time.</p>
          </div>
          <Button onClick={() => { setEditingSale(null); setIsFormOpen(true); }} className="bg-white text-orange-600 hover:bg-orange-50 border-none px-8 h-14 text-sm font-black uppercase tracking-widest shadow-xl shrink-0"><SafeIcon icon={FiPlus} className="mr-2" /> Launch New Sequence</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 flex items-center space-x-4">
          <div className="relative flex-1 max-w-md"><div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SafeIcon icon={FiSearch} /></div><input type="text" placeholder="Search sequences..." className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white focus:border-orange-500 outline-none shadow-sm transition-all text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
          <div className="flex bg-gray-100 p-1 rounded-2xl overflow-x-auto no-scrollbar">
            {flagOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => setFilterFlag(opt.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap text-[10px] font-black uppercase tracking-widest ${filterFlag === opt.id ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <SafeIcon icon={opt.icon} className={filterFlag === opt.id ? 'text-orange-500' : ''} />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner">
            <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}><SafeIcon icon={FiGrid} /></button>
            <button onClick={() => setViewMode('table')} className={`p-2.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}><SafeIcon icon={FiList} /></button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <DataTable columns={saleColumns} data={filtered} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((sale) => (
            <div key={sale.id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border-b-4 border-b-orange-600">
              <div className="h-48 relative">
                <img src={sale.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg ${sale.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>{sale.status}</span>
                  {sale.isCyclical && <span className="px-3 py-1.5 rounded-xl bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider shadow-lg"><SafeIcon icon={FiRepeat} /></span>}
                </div>
                <div className="absolute bottom-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-2xl text-sm font-black shadow-2xl flex items-center"><SafeIcon icon={FiTrendingDown} className="mr-2" />{sale.rounds[sale.currentRoundIndex].discountType === 'percentage' ? `${sale.rounds[sale.currentRoundIndex].discountValue}% OFF` : `${formatCurrency(sale.rounds[sale.currentRoundIndex].discountValue)} OFF`}</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div><h4 className="font-black text-gray-900 text-xl leading-tight mb-1">{sale.name}</h4><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority Score: {getSalePriority(sale)}</span></div>
                  <div className="shrink-0 bg-orange-50 p-2.5 rounded-2xl">{sale.isPaused ? (<div className="flex flex-col items-center"><span className="text-[8px] font-black text-red-500 uppercase mb-0.5">Paused</span><div className="text-gray-400 font-mono font-black text-sm tabular-nums">{Math.floor((sale.remainingSeconds || 0) / 60).toString().padStart(2, '0')}:{(sale.remainingSeconds || 0) % 60}</div></div>) : (<CountdownTimer targetTime={sale.roundEndTime} onComplete={() => handleNextRound(sale.id)} label="Next Step" />)}</div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest px-1"><span>Sequence Progress</span><span className="text-orange-600">Step {sale.currentRoundIndex + 1} of {sale.rounds.length}</span></div>
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-50"><div className="h-full bg-orange-600 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(249,115,22,0.4)]" style={{ width: `${((sale.currentRoundIndex + 1) / sale.rounds.length) * 100}%` }} /></div>
                  <div className="pt-2"><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Target Inventory</p><div className="flex flex-wrap gap-2">{sale.associatedItems.map(pName => {
                    const p = getProductData(pName);
                    return (<div key={pName} className="flex flex-col space-y-1"><span className={`px-2.5 py-1 rounded-xl text-[9px] font-black border transition-all ${p?.computedFlags?.outOfStock ? 'bg-red-50 text-red-400 border-red-100 line-through' : 'bg-gray-50 text-gray-700 border-gray-100'}`}>{pName}</span><div className="flex gap-0.5 ml-1">{p?.computedFlags && Object.entries(p.computedFlags).filter(([f, v]) => v && f !== 'onSale').map(([f]) => <FlagBadge key={f} flag={f} active={true} />)}</div></div>);
                  })}</div></div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto"><div className="flex space-x-2"><button onClick={() => togglePause(sale.id)} className={`flex items-center px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${sale.isPaused ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'}`}><SafeIcon icon={sale.isPaused ? FiPlay : FiPause} className="mr-2" />{sale.isPaused ? 'Resume' : 'Pause'}</button><button onClick={() => resetSale(sale.id)} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all" title="Reset Sequence"><SafeIcon icon={FiRefreshCw} /></button></div><div className="flex space-x-1"><button onClick={() => { setEditingSale(sale); setIsFormOpen(true); }} className="p-2 text-gray-300 hover:text-orange-600 transition-all"><SafeIcon icon={FiEdit2} /></button><button onClick={() => setDeleteId(sale.id)} className="p-2 text-gray-300 hover:text-red-500 transition-all"><SafeIcon icon={FiTrash2} /></button></div></div>
              </div>
            </div>
          ))}
        </div>
      )}
      <FlashSaleForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSave} sale={editingSale} products={products} />
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default FlashSaleManagement;