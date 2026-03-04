import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import CouponForm from './CouponForm';
import Toast from '@/components/ui/Toast';
import DataTable from './DataTable';
import BulkActionsBar from './BulkActionsBar';
import BulkActionModal from './BulkActionModal';
import useTableSelection from '@/hooks/useTableSelection';
import { formatCurrency, CURRENCY_CONFIG } from '@/common/currency';

const { FiPlus, FiEdit2, FiTrash2, FiCopy, FiSearch, FiTag, FiGrid, FiList, FiDownload, FiUpload, FiFile, FiCalendar } = FiIcons;

const CouponManagement = ({ products }) => {
  const [viewMode, setViewMode] = useState('table');
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'WELCOME20', discountType: 'percentage', discountValue: '20', minPurchase: '50.00', maxUses: '100', status: 'Active', startDate: '2024-01-01', startTime: '00:00', endDate: '2024-12-31', endTime: '23:59', associatedItems: [] },
    { id: 2, code: 'SAVE10', discountType: 'fixed', discountValue: '10', minPurchase: '30.00', maxUses: '500', status: 'Active', startDate: '2024-01-01', startTime: '00:00', endDate: '2024-06-30', endTime: '23:59', associatedItems: ['Truffle Burger'] },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'code', direction: 'asc' });
  const [bulkModal, setBulkModal] = useState({ isOpen: false, action: null });
  const fileInputRef = useRef(null);

  const selection = useTableSelection(coupons);

  const handleBulkAction = (action) => {
    if (action === 'delete' || action === 'update-dates') {
      setBulkModal({ isOpen: true, action });
    } else {
      executeBulkAction(action);
    }
  };

  const executeBulkAction = (action, data = null) => {
    setCoupons(prev => {
      let updated = [...prev];
      if (action === 'delete') {
        updated = updated.filter(c => !selection.selectedIds.includes(c.id));
      } else if (action === 'activate') {
        updated = updated.map(c => selection.selectedIds.includes(c.id) ? { ...c, status: 'Active' } : c);
      } else if (action === 'deactivate') {
        updated = updated.map(c => selection.selectedIds.includes(c.id) ? { ...c, status: 'Inactive' } : c);
      } else if (action === 'update-dates') {
        updated = updated.map(c => selection.selectedIds.includes(c.id) ? { ...c, startDate: data.start, endDate: data.end } : c);
      }
      return updated;
    });

    setToast({ 
      type: 'success', 
      message: `Bulk ${action.replace('-', ' ')} performed on ${selection.count} coupons.` 
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
    if (editingCoupon) {
      setCoupons(prev => prev.map(c => c.id === editingCoupon.id ? { ...c, ...formData } : c));
      setToast({ type: 'success', message: 'Coupon updated' });
    } else {
      setCoupons([{ ...formData, id: Date.now() }, ...coupons]);
      setToast({ type: 'success', message: 'Coupon created' });
    }
    setIsFormOpen(false);
  };

  const filtered = coupons.filter(c => c.code.toLowerCase().includes(searchQuery.toLowerCase()))
  .sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const couponColumns = [
    { key: 'code', label: 'Promo Code', sortable: true, render: (c) => (<div className="flex items-center space-x-3 text-left"><div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-black text-[10px]">{c.code.slice(0, 2)}</div><span className="font-black text-gray-900 tracking-tight">{c.code}</span></div>) },
    { key: 'discount', label: 'Discount', render: (c) => (<span className="font-bold text-orange-600">{c.discountType === 'percentage' ? `${c.discountValue}%` : formatCurrency(c.discountValue)} OFF</span>) },
    { key: 'minPurchase', label: 'Min. Spent', sortable: true, render: (c) => <span className="text-gray-500 font-medium">{formatCurrency(c.minPurchase)}</span> },
    { key: 'validity', label: 'Validity Period', render: (c) => (<div className="flex flex-col text-[10px] font-bold text-gray-400 uppercase tracking-widest"><span>{c.startDate}</span><span className="text-orange-600/50">to {c.endDate}</span></div>) },
    { key: 'status', label: 'Status', sortable: true, render: (c) => (<span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${c.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{c.status}</span>) },
    { key: 'actions', label: 'Actions', render: (c) => (<div className="flex items-center space-x-2"><button onClick={() => { setCoupons([{ ...c, id: Date.now(), code: `${c.code}_COPY` }, ...coupons]); setToast({ type: 'success', message: 'Coupon duplicated' }); }} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiCopy} /></button><button onClick={() => { setEditingCoupon(c); setIsFormOpen(true); }} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiEdit2} /></button><button onClick={() => setDeleteId(c.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><SafeIcon icon={FiTrash2} /></button></div>) }
  ];

  const extraActions = [
    { id: 'update-dates', label: 'Update Dates', icon: FiCalendar },
  ];

  return (
    <div className="space-y-6 text-left">
      <BulkActionsBar 
        selectedIds={selection.selectedIds} 
        onBulkAction={handleBulkAction} 
        menuType="Coupon" 
        onClear={selection.clearSelection} 
        extraActions={extraActions}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 relative max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SafeIcon icon={FiSearch} /></div>
          <input type="text" placeholder="Search promo codes..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 p-1 rounded-xl shadow-sm">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}><SafeIcon icon={FiGrid} /></button>
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}><SafeIcon icon={FiList} /></button>
          </div>
          <Button onClick={() => { setEditingCoupon(null); setIsFormOpen(true); }} className="shadow-lg"><SafeIcon icon={FiPlus} className="mr-2" /> New Coupon</Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <DataTable columns={couponColumns} data={filtered} onSort={handleSort} sortConfig={sortConfig} selection={{ selectedIds: selection.selectedIds, onSelect: selection.toggleSelect, onSelectAll: selection.toggleSelectAll }} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <AnimatePresence mode="popLayout">
            {filtered.map((coupon) => (
              <motion.div layout key={coupon.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition-all group relative p-6 flex flex-col ${selection.isSelected(coupon.id) ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-100'}`}>
                <div className="absolute top-4 left-4 z-20"><input type="checkbox" checked={selection.isSelected(coupon.id)} onChange={() => selection.toggleSelect(coupon.id)} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer shadow-sm" /></div>
                <div className="flex justify-between items-start mb-6 shrink-0">
                  <div className="ml-8"><h4 className="text-xl font-black text-gray-900 tracking-tight">{coupon.code}</h4><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Status: <span className={coupon.status === 'Active' ? 'text-green-500' : 'text-gray-400'}>{coupon.status}</span></p></div>
                  <div className="bg-orange-50 px-3 py-2 rounded-xl text-center"><span className="block text-[10px] font-black text-orange-400 uppercase tracking-tighter">Discount</span><span className="text-lg font-black text-orange-600 leading-none">{coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : formatCurrency(coupon.discountValue)}</span></div>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100"><span>Min. Purchase</span><span className="text-gray-900">{formatCurrency(coupon.minPurchase)}</span></div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 bg-gray-50 p-2.5 rounded-xl border border-gray-100"><span>Valid Until</span><span className="text-gray-900">{coupon.endDate}</span></div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-6"><div className="flex space-x-1"><button onClick={() => { setCoupons([{ ...coupon, id: Date.now(), code: `${coupon.code}_COPY` }, ...coupons]); setToast({ type: 'success', message: 'Duplicated' }); }} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"><SafeIcon icon={FiCopy} /></button><button onClick={() => { setEditingCoupon(coupon); setIsFormOpen(true); }} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"><SafeIcon icon={FiEdit2} /></button></div><button onClick={() => setDeleteId(coupon.id)} className="p-2 text-gray-200 hover:text-red-500 transition-all"><SafeIcon icon={FiTrash2} /></button></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600"><SafeIcon icon={FiTrash2} className="text-3xl" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Coupon?</h3>
              <p className="text-gray-500 mb-8 text-sm">This promo code will be permanently deactivated.</p>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</Button>
                <Button variant="primary" className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => { setCoupons(prev => prev.filter(c => c.id !== deleteId)); setDeleteId(null); setToast({ type: 'success', message: 'Coupon deleted' }); }}>Delete</Button>
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
        menuType="Coupon"
      />

      <CouponForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSave} coupon={editingCoupon} products={products} />
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CouponManagement;