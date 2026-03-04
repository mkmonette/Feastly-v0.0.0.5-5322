import React, { useState, useRef } from 'react';
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
import { formatCurrency, CURRENCY_CONFIG } from '@/common/currency';

const { FiPlus, FiEdit2, FiTrash2, FiCopy, FiSearch, FiZap, FiGrid, FiList, FiPackage, FiDownload, FiUpload, FiFile } = FiIcons;

const BumpManagement = ({ products }) => {
  const [viewMode, setViewMode] = useState('table');
  const [bumps, setBumps] = useState([
    { id: 1, name: 'Dip Sauce Bundle', associatedProducts: ['French Fries', 'Truffle Burger'], price: '1.25', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808b71e40?q=80&w=1000&auto=format&fit=crop', discountType: 'fixed', discountValue: 0.25 },
    { id: 2, name: 'Bottle of Water', associatedProducts: ['Double Cheeseburger'], price: '1.50', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1523362628744-0c14a37ef2f6?q=80&w=1000&auto=format&fit=crop', discountType: 'none', discountValue: 0 },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [bulkModal, setBulkModal] = useState({ isOpen: false, action: null });
  const fileInputRef = useRef(null);

  const selection = useTableSelection(bumps);

  const handleBulkAction = (action) => {
    if (action === 'delete') {
      setBulkModal({ isOpen: true, action });
    } else {
      executeBulkAction(action);
    }
  };

  const executeBulkAction = (action, data = null) => {
    setBumps(prev => {
      let updated = [...prev];
      if (action === 'delete') {
        updated = updated.filter(b => !selection.selectedIds.includes(b.id));
      } else if (action === 'activate') {
        updated = updated.map(b => selection.selectedIds.includes(b.id) ? { ...b, status: 'Active' } : b);
      } else if (action === 'deactivate') {
        updated = updated.map(b => selection.selectedIds.includes(b.id) ? { ...b, status: 'Inactive' } : b);
      }
      return updated;
    });

    setToast({ 
      type: 'success', 
      message: `Bulk ${action} performed on ${selection.count} bumps.` 
    });
    selection.clearSelection();
    setBulkModal({ isOpen: false, action: null });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleSave = (formData) => {
    if (editingItem) {
      setBumps(prev => prev.map(b => b.id === editingItem.id ? { ...b, ...formData } : b));
      setToast({ type: 'success', message: 'Bump offer updated' });
    } else {
      setBumps([{ ...formData, id: Date.now() }, ...bumps]);
      setToast({ type: 'success', message: 'Bump offer created' });
    }
    setIsFormOpen(false);
  };

  const getFinalPrice = (item) => {
    const original = parseFloat(item.price);
    const val = parseFloat(item.discountValue);
    if (item.discountType === 'percentage') return (original - (original * (val / 100))).toFixed(2);
    if (item.discountType === 'fixed') return (original - val).toFixed(2);
    return original.toFixed(2);
  };

  const filtered = bumps.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.associatedProducts.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())))
  .sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleExport = () => {
    const headers = ['Name', 'Price', 'DiscountType', 'DiscountValue', 'FinalPrice', 'Status', 'AssociatedProducts'];
    const csvData = filtered.map(b => [b.name, b.price, b.discountType, b.discountValue, getFinalPrice(b), b.status, b.associatedProducts.join("|")]);
    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bumps_export.csv";
    link.click();
    setToast({ type: 'success', message: 'Bumps exported successfully' });
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      setToast({ type: 'success', message: `Importing bumps from ${file.name}...` });
      setTimeout(() => setToast({ type: 'success', message: 'Bumps imported successfully' }), 1000);
    }
  };

  const handleDownloadTemplate = () => {
    const headers = ['Name', 'Price', 'DiscountType', 'DiscountValue', 'Status', 'AssociatedProducts', 'ImageURL'];
    const csvContent = headers.join(",");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bumps_template.csv";
    link.click();
    setToast({ type: 'success', message: 'Template downloaded' });
  };

  const bumpColumns = [
    { key: 'name', label: 'Offer Name', sortable: true, render: (b) => (<div className="flex items-center space-x-3 text-left"><img src={b.imageUrl} className="w-10 h-10 rounded-lg object-cover shadow-sm" alt="" /><span className="font-bold text-gray-900">{b.name}</span></div>) },
    { key: 'associatedProducts', label: 'Checkout For', render: (b) => (<div className="flex flex-wrap gap-1">{b.associatedProducts.map(p => (<span key={p} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-md text-[9px] font-bold border border-gray-100">{p}</span>))}</div>) },
    { key: 'price', label: 'Original', sortable: true, render: (b) => <span className="text-gray-400 line-through">{formatCurrency(b.price)}</span> },
    { key: 'finalPrice', label: 'Sale Price', render: (b) => <span className="text-orange-600 font-extrabold">{formatCurrency(getFinalPrice(b))}</span> },
    { key: 'discount', label: 'Discount', render: (b) => b.discountType !== 'none' ? (<span className="bg-orange-600 text-white px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase">{b.discountType === 'percentage' ? `${b.discountValue}%` : `${CURRENCY_CONFIG.symbol}${b.discountValue}`} OFF</span>) : <span className="text-gray-300">-</span> },
    { key: 'status', label: 'Status', sortable: true, render: (b) => (<span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${b.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{b.status}</span>) },
    { key: 'actions', label: 'Actions', render: (b) => (<div className="flex items-center space-x-2"><button onClick={() => { setBumps([{ ...b, id: Date.now(), name: `Copy of ${b.name}` }, ...bumps]); setToast({ type: 'success', message: 'Bump duplicated' }); }} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiCopy} /></button><button onClick={() => { setEditingItem(b); setIsFormOpen(true); }} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiEdit2} /></button><button onClick={() => setDeleteId(b.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><SafeIcon icon={FiTrash2} /></button></div>) }
  ];

  return (
    <div className="space-y-6 text-left">
      <BulkActionsBar 
        selectedIds={selection.selectedIds} 
        onBulkAction={handleBulkAction} 
        menuType="Bump" 
        onClear={selection.clearSelection} 
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 relative max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SafeIcon icon={FiSearch} /></div>
          <input type="text" placeholder="Search bump offers or products..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 p-1 rounded-xl overflow-hidden shadow-sm">
            <button onClick={handleExport} className="p-2.5 text-gray-500 hover:text-orange-600 hover:bg-white transition-all border-r border-gray-200" title="Export CSV"><SafeIcon icon={FiDownload} /></button>
            <button onClick={() => fileInputRef.current?.click()} className="p-2.5 text-gray-500 hover:text-orange-600 hover:bg-white transition-all border-r border-gray-200" title="Import CSV"><SafeIcon icon={FiUpload} /></button>
            <button onClick={handleDownloadTemplate} className="p-2.5 text-gray-500 hover:text-orange-600 hover:bg-white transition-all" title="Download Template"><SafeIcon icon={FiFile} /></button>
            <input type="file" ref={fileInputRef} onChange={handleImport} className="hidden" accept=".csv" />
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl shadow-sm">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}><SafeIcon icon={FiGrid} /></button>
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}><SafeIcon icon={FiList} /></button>
          </div>
          <Button onClick={() => { setEditingItem(null); setIsFormOpen(true); }} className="shadow-lg"><SafeIcon icon={FiPlus} className="mr-2" /> New Bump</Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <DataTable columns={bumpColumns} data={filtered} onSort={handleSort} sortConfig={sortConfig} selection={{ selectedIds: selection.selectedIds, onSelect: selection.toggleSelect, onSelectAll: selection.toggleSelectAll }} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const finalPrice = getFinalPrice(item);
              const hasDiscount = item.discountType !== 'none' && parseFloat(item.discountValue) > 0;
              return (
                <motion.div layout key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-lg transition-all p-5 flex flex-col group relative ${selection.isSelected(item.id) ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-100'}`}>
                  <div className="absolute top-4 left-4 z-20"><input type="checkbox" checked={selection.isSelected(item.id)} onChange={() => selection.toggleSelect(item.id)} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer shadow-sm" /></div>
                  <div className="flex items-start space-x-4 mb-4"><div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0 ml-8"><img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /></div><div className="flex-1 text-left"><div className="flex justify-between items-start"><h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4><div className="flex flex-col items-end shrink-0 ml-2">{hasDiscount && <span className="text-[10px] text-gray-400 line-through font-bold">{formatCurrency(item.price)}</span>}<span className="text-orange-600 font-extrabold text-lg leading-none">{formatCurrency(finalPrice)}</span></div></div></div></div><div className="mb-4 text-left"><p className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center"><SafeIcon icon={FiPackage} className="mr-1.5" /> Checkout addition for:</p><div className="flex flex-wrap gap-1">{item.associatedProducts.map((p, idx) => (<span key={idx} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-md text-[9px] font-medium border border-gray-100 group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">{p}</span>))}</div></div><div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto"><div className="flex space-x-1"><button onClick={() => { setBumps([{ ...item, id: Date.now(), name: `Copy of ${item.name}` }, ...bumps]); setToast({ type: 'success', message: 'Duplicated' }); }} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"><SafeIcon icon={FiCopy} /></button><button onClick={() => { setEditingItem(item); setIsFormOpen(true); }} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"><SafeIcon icon={FiEdit2} /></button></div><button onClick={() => setDeleteId(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-all"><SafeIcon icon={FiTrash2} /></button></div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600"><SafeIcon icon={FiTrash2} className="text-3xl" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Bump Offer?</h3>
              <p className="text-gray-500 mb-8 text-sm">Remove this impulse-buy offer from checkout.</p>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</Button>
                <Button variant="primary" className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => { setBumps(prev => prev.filter(b => b.id !== deleteId)); setDeleteId(null); setToast({ type: 'success', message: 'Bump deleted' }); }}>Delete</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BulkActionModal 
        isOpen={bulkModal.isOpen}
        onClose={() => setBulkModal({ isOpen: false, action: null })}
        onConfirm={(data) => executeBulkAction(bulkModal.action, data)}
        action={bulkModal.action}
        count={selection.count}
        menuType="Bump"
      />

      <MarketingForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSave} item={editingItem} products={products} type="Bump" />
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default BumpManagement;