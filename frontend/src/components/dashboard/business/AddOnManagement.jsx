import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import AddOnForm from './AddOnForm';
import Toast from '@/components/ui/Toast';
import DataTable from './DataTable';
import BulkActionsBar from './BulkActionsBar';
import BulkActionModal from './BulkActionModal';
import useTableSelection from '@/hooks/useTableSelection';
import { formatCurrency } from '@/common/currency';

const { FiPlus, FiEdit2, FiTrash2, FiCopy, FiSearch, FiGrid, FiList, FiPackage, FiDownload, FiUpload, FiFile } = FiIcons;

const AddOnManagement = ({ products = [], readOnly = false }) => {
  const [viewMode, setViewMode] = useState('table');
  const [addOns, setAddOns] = useState([
    { id: 1, name: 'Extra Cheddar', associatedProducts: ['Truffle Burger', 'Double Cheeseburger'], price: '1.50', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1523305148316-291771960205?q=80&w=1000&auto=format&fit=crop', description: 'Creamy melted cheddar cheese.' },
    { id: 2, name: 'Truffle Mayo', associatedProducts: ['Truffle Burger', 'French Fries'], price: '2.00', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?q=80&w=1000&auto=format&fit=crop', description: 'House-made truffle infused mayonnaise.' },
    { id: 3, name: 'Spicy Jalapeños', associatedProducts: ['Margherita Pizza'], price: '0.75', status: 'Inactive', imageUrl: 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?q=80&w=1000&auto=format&fit=crop', description: 'Freshly sliced hot jalapeños.' },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddOn, setEditingAddOn] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [bulkModal, setBulkModal] = useState({ isOpen: false, action: null });
  const fileInputRef = useRef(null);

  const selection = useTableSelection(addOns);

  const handleBulkAction = (action) => {
    if (readOnly) return;
    if (action === 'delete') {
      setBulkModal({ isOpen: true, action });
    } else {
      executeBulkAction(action);
    }
  };

  const executeBulkAction = (action, data = null) => {
    if (readOnly) return;
    setAddOns(prev => {
      let updated = [...prev];
      if (action === 'delete') {
        updated = updated.filter(a => !selection.selectedIds.includes(a.id));
      } else if (action === 'activate') {
        updated = updated.map(a => selection.selectedIds.includes(a.id) ? { ...a, status: 'Active' } : a);
      } else if (action === 'deactivate') {
        updated = updated.map(a => selection.selectedIds.includes(a.id) ? { ...a, status: 'Inactive' } : a);
      }
      return updated;
    });

    setToast({ 
      type: 'success', 
      message: `Bulk ${action} performed on ${selection.count} add-ons.` 
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
    if (readOnly) return;
    if (editingAddOn) {
      setAddOns(prev => prev.map(a => a.id === editingAddOn.id ? { ...a, ...formData } : a));
      setToast({ type: 'success', message: 'Add-on updated' });
    } else {
      setAddOns([{ ...formData, id: Date.now() }, ...addOns]);
      setToast({ type: 'success', message: 'Add-on created' });
    }
    setIsFormOpen(false);
  };

  const filteredAddOns = addOns.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.associatedProducts.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())))
  .sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleExport = () => {
    const headers = ['Name', 'Price', 'Status', 'ImageURL', 'AssociatedProducts', 'Description'];
    const csvData = filteredAddOns.map(a => [a.name, a.price, a.status, a.imageUrl, a.associatedProducts.join("|"), a.description || '']);
    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "addons_export.csv";
    link.click();
    setToast({ type: 'success', message: 'Add-ons exported successfully' });
  };

  const handleImport = (event) => {
    if (readOnly) return;
    const file = event.target.files[0];
    if (file) {
      setToast({ type: 'success', message: `Importing add-ons from ${file.name}...` });
      setTimeout(() => setToast({ type: 'success', message: 'Add-ons imported successfully' }), 1000);
    }
  };

  const handleDownloadTemplate = () => {
    const headers = ['Name', 'Price', 'Status', 'ImageURL', 'AssociatedProducts', 'Description'];
    const csvContent = headers.join(",");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "addons_template.csv";
    link.click();
    setToast({ type: 'success', message: 'Template downloaded' });
  };

  const addOnColumns = [
    { key: 'name', label: 'Add-On Name', sortable: true, render: (a) => (<div className="flex items-center space-x-3 text-left"><img src={a.imageUrl} className="w-10 h-10 rounded-lg object-cover shadow-sm" alt="" /><span className="font-bold text-gray-900">{a.name}</span></div>) },
    { key: 'associatedProducts', label: 'Associated Products', render: (a) => (<div className="flex flex-wrap gap-1">{a.associatedProducts.map(p => (<span key={p} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-md text-[9px] font-bold border border-gray-100">{p}</span>))}</div>) },
    { key: 'price', label: 'Price', sortable: true, render: (a) => <span className="font-bold text-orange-600">{formatCurrency(a.price)}</span> },
    { key: 'status', label: 'Status', sortable: true, render: (a) => (<span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${a.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{a.status}</span>) },
    { key: 'actions', label: 'Actions', render: (a) => (
      <div className="flex items-center space-x-2">
        {!readOnly && (
          <>
            <button onClick={() => { setAddOns([{ ...a, id: Date.now(), name: `Copy of ${a.name}` }, ...addOns]); setToast({ type: 'success', message: 'Add-on duplicated' }); }} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiCopy} /></button>
            <button onClick={() => { setEditingAddOn(a); setIsFormOpen(true); }} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiEdit2} /></button>
            <button onClick={() => setDeleteId(a.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><SafeIcon icon={FiTrash2} /></button>
          </>
        )}
      </div>
    )}
  ];

  return (
    <div className="space-y-8 text-left">
      {!readOnly && (
        <BulkActionsBar 
          selectedIds={selection.selectedIds} 
          onBulkAction={handleBulkAction} 
          menuType="Add-On" 
          onClear={selection.clearSelection} 
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 relative max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SafeIcon icon={FiSearch} /></div>
          <input type="text" placeholder="Search add-ons or products..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
          {!readOnly && (
            <Button onClick={() => { setEditingAddOn(null); setIsFormOpen(true); }} className="shadow-lg"><SafeIcon icon={FiPlus} className="mr-2" /> New Add-On</Button>
          )}
        </div>
      </div>

      {viewMode === 'table' ? (
        <DataTable columns={addOnColumns} data={filteredAddOns} onSort={handleSort} sortConfig={sortConfig} selection={{ selectedIds: selection.selectedIds, onSelect: selection.toggleSelect, onSelectAll: selection.toggleSelectAll }} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <AnimatePresence mode="popLayout">
            {filteredAddOns.map((item) => (
              <motion.div layout key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition-all group p-5 relative ${selection.isSelected(item.id) ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-100'}`}>
                <div className="absolute top-4 left-4 z-20"><input type="checkbox" checked={selection.isSelected(item.id)} onChange={() => selection.toggleSelect(item.id)} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer shadow-sm" /></div>
                <div className="flex items-start space-x-4 mb-4"><div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0 ml-8"><img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /></div><div className="flex-1 text-left"><div className="flex justify-between items-start"><h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4><span className="text-orange-600 font-bold ml-2">{formatCurrency(item.price)}</span></div></div></div><div className="mb-4 text-left"><p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Available for:</p><div className="flex flex-wrap gap-1.5">{item.associatedProducts.map((p, idx) => (<span key={idx} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-md text-[10px] font-medium border border-gray-100">{p}</span>))}</div></div><div className="flex items-center justify-between pt-4 border-t border-gray-50"><div className="flex space-x-1">
                  {!readOnly && (
                    <>
                      <button onClick={() => { setAddOns([{ ...item, id: Date.now(), name: `Copy of ${item.name}` }, ...addOns]); setToast({ type: 'success', message: 'Duplicated' }); }} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"><SafeIcon icon={FiCopy} /></button>
                      <button onClick={() => { setEditingAddOn(item); setIsFormOpen(true); }} className="p-2 text-gray-300 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"><SafeIcon icon={FiEdit2} /></button>
                    </>
                  )}
                </div>
                {!readOnly && (
                  <button onClick={() => setDeleteId(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-all"><SafeIcon icon={FiTrash2} /></button>
                )}
                </div>
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Remove Add-On?</h3>
              <p className="text-gray-500 mb-8 text-sm">This will remove the option from all associated products.</p>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</Button>
                <Button variant="primary" className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => { setAddOns(prev => prev.filter(a => a.id !== deleteId)); setDeleteId(null); setToast({ type: 'success', message: 'Add-on deleted' }); }}>Delete</Button>
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
        menuType="Add-On"
      />

      <AddOnForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSave} addOn={editingAddOn} products={products} />
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AddOnManagement;