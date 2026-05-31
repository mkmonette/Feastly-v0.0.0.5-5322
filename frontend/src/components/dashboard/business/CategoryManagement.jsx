import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import CategoryForm from './CategoryForm';
import Toast from '@/components/ui/Toast';
import DataTable from './DataTable';
import BulkActionsBar from './BulkActionsBar';
import BulkActionModal from './BulkActionModal';
import useTableSelection from '@/hooks/useTableSelection';
import { useNotifications } from '@/context/NotificationContext';

const { FiPlus, FiEdit2, FiTrash2, FiCopy, FiSearch, FiGrid, FiList, FiDownload, FiUpload, FiFile } = FiIcons;

const CategoryManagement = ({ categories = [], setCategories, readOnly = false }) => {
  const [viewMode, setViewMode] = useState('table');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [bulkModal, setBulkModal] = useState({ isOpen: false, action: null });
  const fileInputRef = useRef(null);
  const { addNotification } = useNotifications();

  const selection = useTableSelection(categories);

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
    console.log(`[CategoryManagement] Executing bulk action: ${action}`, data);
    setCategories(prev => {
      let updated = [...prev];
      if (action === 'delete') {
        updated = updated.filter(c => !selection.selectedIds.includes(c.id));
      } else if (action === 'activate') {
        updated = updated.map(c => selection.selectedIds.includes(c.id) ? { ...c, status: 'Active' } : c);
      } else if (action === 'deactivate') {
        updated = updated.map(c => selection.selectedIds.includes(c.id) ? { ...c, status: 'Inactive' } : c);
      }
      return updated;
    });

    addNotification({
      type: 'Inventory',
      title: 'Bulk Category Action',
      message: `Bulk ${action} performed on ${selection.count} categories.`,
      priority: 'Info'
    });

    setToast({ 
      type: 'success', 
      message: `Bulk ${action} performed on ${selection.count} categories.` 
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
    console.log('[CategoryManagement] Saving category:', formData);
    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...c, ...formData } : c));
      
      addNotification({
        type: 'Inventory',
        title: 'Category Updated',
        message: `Category ${formData.name} has been updated.`,
        priority: 'Info'
      });
      setToast({ type: 'success', message: 'Category updated' });
    } else {
      setCategories([{ ...formData, id: Date.now(), items: 0 }, ...categories]);
      
      addNotification({
        type: 'Inventory',
        title: 'Category Created',
        message: `New category ${formData.name} has been created.`,
        priority: 'Info'
      });
      setToast({ type: 'success', message: 'Category created' });
    }
    setIsFormOpen(false);
  };

  const filteredCategories = categories.filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()))
  .sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleExport = () => {
    console.log('[CategoryManagement] Exporting categories...');
    const headers = ['Name', 'Description', 'ImageURL', 'Items', 'Status'];
    const csvData = filteredCategories.map(c => [c.name, c.description || '', c.imageUrl, c.items, c.status]);
    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "categories_export.csv";
    link.click();

    addNotification({
      type: 'System',
      title: 'Export Successful',
      message: 'Category data has been exported to CSV.',
      priority: 'Info'
    });
    setToast({ type: 'success', message: 'Categories exported successfully' });
  };

  const handleImport = (event) => {
    if (readOnly) return;
    const file = event.target.files[0];
    if (file) {
      console.log('[CategoryManagement] Importing file:', file.name);
      setToast({ type: 'success', message: `Importing categories from ${file.name}...` });
      setTimeout(() => {
        addNotification({
          type: 'System',
          title: 'Import Successful',
          message: `Categories have been imported from ${file.name}.`,
          priority: 'Info'
        });
        setToast({ type: 'success', message: 'Categories imported successfully' });
      }, 1000);
    }
  };

  const handleDownloadTemplate = () => {
    const headers = ['Name', 'Description', 'ImageURL', 'Status'];
    const csvContent = headers.join(",");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "categories_template.csv";
    link.click();
    setToast({ type: 'success', message: 'Template downloaded' });
  };

  const categoryColumns = [
    { key: 'name', label: 'Category Name', sortable: true, render: (c) => (<div className="flex items-center space-x-3 text-left"><img src={c.imageUrl} className="w-10 h-10 rounded-lg object-cover shadow-sm" alt="" /><div><span className="font-bold text-gray-900 block">{c.name}</span><span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">{c.items} Items</span></div></div>) },
    { key: 'description', label: 'Description', render: (c) => <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px] text-left">{c.description || '-'}</p> },
    { key: 'status', label: 'Status', sortable: true, render: (c) => (<span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${c.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{c.status}</span>) },
    { key: 'actions', label: 'Actions', render: (c) => (
      <div className="flex items-center space-x-2">
        {!readOnly && (
          <>
            <button onClick={() => { 
                console.log('[CategoryManagement] Duplicating category:', c.id);
                setCategories([{ ...c, id: Date.now(), name: `Copy of ${c.name}`, items: 0 }, ...categories]); 
                addNotification({ type: 'Inventory', title: 'Category Duplicated', message: `Created copy of ${c.name}`, priority: 'Info' });
                setToast({ type: 'success', message: 'Category duplicated' }); 
            }} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiCopy} /></button>
            <button onClick={() => { setEditingCategory(c); setIsFormOpen(true); }} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiEdit2} /></button>
            <button onClick={() => setDeleteId(c.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><SafeIcon icon={FiTrash2} /></button>
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
          menuType="Category" 
          onClear={selection.clearSelection} 
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 relative max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SafeIcon icon={FiSearch} /></div>
          <input type="text" placeholder="Search categories..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
            <Button onClick={() => { setEditingCategory(null); setIsFormOpen(true); }} className="shadow-lg"><SafeIcon icon={FiPlus} className="mr-2" /> New Category</Button>
          )}
        </div>
      </div>

      {viewMode === 'table' ? (
        <DataTable columns={categoryColumns} data={filteredCategories} onSort={handleSort} sortConfig={sortConfig} selection={{ selectedIds: selection.selectedIds, onSelect: selection.toggleSelect, onSelectAll: selection.toggleSelectAll }} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category) => (
              <motion.div layout key={category.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition-all group relative ${selection.isSelected(category.id) ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-100'}`}>
                <div className="absolute top-4 left-4 z-20"><input type="checkbox" checked={selection.isSelected(category.id)} onChange={() => selection.toggleSelect(category.id)} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer shadow-sm" /></div>
                <div className="h-40 relative overflow-hidden">
                  <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-12"><span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${category.status === 'Active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>{category.status}</span></div>
                  {!readOnly && (
                    <div className="absolute top-4 right-4 flex space-x-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button onClick={() => { 
                          console.log('[CategoryManagement] Duplicating category:', category.id);
                          setCategories([{ ...category, id: Date.now(), name: `Copy of ${category.name}`, items: 0 }, ...categories]); 
                          addNotification({ type: 'Inventory', title: 'Category Duplicated', message: `Created copy of ${category.name}`, priority: 'Info' });
                          setToast({ type: 'success', message: 'Duplicated' }); 
                      }} className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm text-gray-600 transition-colors"><SafeIcon icon={FiCopy} /></button>
                      <button onClick={() => { setEditingCategory(category); setIsFormOpen(true); }} className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm text-orange-600 transition-colors"><SafeIcon icon={FiEdit2} /></button>
                    </div>
                  )}
                </div>
                <div className="p-6 text-left">
                  <div className="flex justify-between items-start mb-2"><h4 className="text-xl font-bold text-gray-900 line-clamp-1">{category.name}</h4><span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full uppercase tracking-wider">{category.items} Items</span></div>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 min-h-[40px] text-left">{category.description || 'No description provided.'}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">ID: {category.id.toString().slice(-4)}</span>
                    {!readOnly && (
                      <button onClick={() => setDeleteId(category.id)} className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"><SafeIcon icon={FiTrash2} /></button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-sm rounded-3xl p-8 text-center shadow-2xl">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600"><SafeIcon icon={FiTrash2} className="text-3xl" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Category?</h3>
              <p className="text-gray-500 mb-8 text-sm">All items in this category will become uncategorized.</p>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>Cancel</Button>
                <Button variant="primary" className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => { 
                    console.log('[CategoryManagement] Deleting category:', deleteId);
                    setCategories(prev => prev.filter(c => c.id !== deleteId)); 
                    addNotification({ type: 'Inventory', title: 'Category Deleted', message: 'Category has been removed.', priority: 'Warning' });
                    setDeleteId(null); 
                    setToast({ type: 'success', message: 'Category deleted' }); 
                }}>Delete</Button>
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
        menuType="Category"
      />

      <CategoryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSave={handleSave} category={editingCategory} />
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CategoryManagement;