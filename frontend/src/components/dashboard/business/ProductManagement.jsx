import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import ProductForm from './ProductForm';
import Toast from '@/components/ui/Toast';
import DataTable from './DataTable';
import BulkActionsBar from './BulkActionsBar';
import BulkActionModal from './BulkActionModal';
import useTableSelection from '@/hooks/useTableSelection';
import { formatCurrency } from '@/common/currency';
import { useNotifications } from '@/context/NotificationContext';

const { 
  FiPlus, FiEdit2, FiTrash2, FiCopy, FiSearch, FiTrendingDown, FiGrid, 
  FiList, FiDownload, FiUpload, FiZap, FiTag, FiDollarSign, FiStar, 
  FiSun, FiSlash, FiPackage, FiClock, FiAward, FiFilter, FiCheckCircle, FiXCircle 
} = FiIcons;

const ProductManagement = ({ categories = [], products = [], setProducts, readOnly = false }) => {
  const [viewMode, setViewMode] = useState('table');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterFlag, setFilterFlag] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [bulkModal, setBulkModal] = useState({ isOpen: false, action: null });
  const fileInputRef = useRef(null);
  const { addNotification } = useNotifications();

  const selection = useTableSelection(products);

  /**
   * Computed Product Flags (Automatic + Manual)
   */
  const computedProducts = useMemo(() => {
    const now = new Date();
    const newThresholdDays = 7;
    const lowStockThreshold = 10;
    const topSalesThreshold = 100;

    return products.map(p => {
      const createdDate = new Date(p.createdAt || Date.now());
      const diffDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
      
      const autoFlags = {
        bestSeller: (p.salesCount || 0) >= topSalesThreshold,
        new: diffDays <= newThresholdDays,
        lowStock: (p.stock || 0) > 0 && (p.stock || 0) <= lowStockThreshold,
        onSale: !!p.salePrice && parseFloat(p.salePrice) < parseFloat(p.price)
      };

      return {
        ...p,
        computedFlags: {
          ...p.flags,
          ...autoFlags,
          outOfStock: p.flags?.outOfStock || (p.stock || 0) <= 0
        }
      };
    });
  }, [products]);

  const handleBulkAction = (action) => {
    if (readOnly) return;
    if (action === 'delete' || action === 'assign-category' || action === 'apply-sale') {
      setBulkModal({ isOpen: true, action });
    } else {
      executeBulkAction(action);
    }
  };

  const executeBulkAction = (action, data = null) => {
    if (readOnly) return;
    console.log(`[ProductManagement] Executing bulk action: ${action}`, data);
    setProducts(prev => {
      let updated = [...prev];
      if (action === 'delete') {
        updated = updated.filter(p => !selection.selectedIds.includes(p.id));
      } else if (action === 'activate') {
        updated = updated.map(p => selection.selectedIds.includes(p.id) ? { ...p, status: 'Active' } : p);
      } else if (action === 'deactivate') {
        updated = updated.map(p => selection.selectedIds.includes(p.id) ? { ...p, status: 'Inactive' } : p);
      } else if (action === 'assign-category') {
        updated = updated.map(p => selection.selectedIds.includes(p.id) ? { ...p, category: data } : p);
      } else if (action === 'apply-sale') {
        updated = updated.map(p => selection.selectedIds.includes(p.id) ? { ...p, salePrice: data } : p);
      }
      return updated;
    });

    addNotification({
      type: 'Inventory',
      title: 'Bulk Action Complete',
      message: `Bulk ${action.replace('-', ' ')} performed on ${selection.count} products.`,
      priority: 'Info'
    });

    setToast({ 
      type: 'success', 
      message: `Bulk ${action.replace('-', ' ')} performed on ${selection.count} products.` 
    });
    selection.clearSelection();
    setBulkModal({ isOpen: false, action: null });
  };

  const toggleManualFlag = (id, flag) => {
    if (readOnly) return;
    console.log(`[ProductManagement] Toggling flag: ${flag} for product: ${id}`);
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        flags: {
          ...p.flags,
          [flag]: !p.flags?.[flag]
        }
      };
    }));
  };

  const productExtraActions = [
    { id: 'assign-category', label: 'Assign Category', icon: FiTag },
    { id: 'apply-sale', label: 'Apply Sale Price', icon: FiDollarSign },
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const filteredProducts = computedProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    
    let matchesFlag = true;
    if (filterFlag !== 'All') {
      matchesFlag = p.computedFlags[filterFlag];
    }

    return matchesSearch && matchesCategory && matchesFlag;
  }).sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleExport = () => {
    console.log('[ProductManagement] Exporting products...');
    const headers = ['Name', 'Category', 'Price', 'SalePrice', 'Status', 'Stock', 'Featured', 'Seasonal', 'Disabled'];
    const csvData = filteredProducts.map(p => [
      p.name, 
      p.category, 
      p.price, 
      p.salePrice || '', 
      p.status, 
      p.stock,
      p.flags?.featured ? 'Yes' : 'No',
      p.flags?.seasonal ? 'Yes' : 'No',
      p.flags?.outOfStock ? 'Yes' : 'No'
    ]);
    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "products_export.csv";
    link.click();
    
    addNotification({
      type: 'System',
      title: 'Export Successful',
      message: 'Product data has been exported to CSV.',
      priority: 'Info'
    });
    setToast({ type: 'success', message: 'Products exported successfully' });
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
      outOfStock: { icon: FiSlash, label: 'Out of Stock', color: 'bg-red-600 text-white' }
    };
    const { icon, label, color } = config[flag];
    return (
      <div className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-lg ${color} shadow-sm`}>
        <SafeIcon icon={icon} className="text-[10px]" />
        <span className="text-[9px] font-black uppercase tracking-tighter whitespace-nowrap">{label}</span>
      </div>
    );
  };

  const productColumns = [
    { key: 'image', label: 'Item', render: (p) => (
      <div className="flex items-center space-x-3 text-left">
        <div className="relative">
          <img src={p.imageUrl} className="w-10 h-10 rounded-lg object-cover shadow-sm" alt="" />
          {p.computedFlags.featured && <div className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white p-0.5 rounded-full border border-white shadow-sm"><SafeIcon icon={FiStar} className="text-[8px]" /></div>}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-900 leading-tight">{p.name}</span>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{p.category}</span>
        </div>
      </div>
    )},
    { key: 'flags', label: 'Flags & Badges', render: (p) => (
      <div className="flex flex-wrap gap-1 max-w-[200px]">
        {Object.entries(p.computedFlags)
          .filter(([_, active]) => active)
          .map(([flag]) => <FlagBadge key={flag} flag={flag} active={true} />)
        }
      </div>
    )},
    { key: 'stock', label: 'Inventory', sortable: true, render: (p) => (
      <div className="flex flex-col">
        <span className={`text-xs font-bold ${p.computedFlags.lowStock ? 'text-amber-600' : p.computedFlags.outOfStock ? 'text-red-500' : 'text-gray-700'}`}>
          {p.stock} units
        </span>
        {p.computedFlags.lowStock && <span className="text-[8px] font-black uppercase text-amber-500">Restock Soon</span>}
      </div>
    )},
    { key: 'price', label: 'Price', render: (p) => (
      <div className="flex flex-col">
        {p.salePrice ? (
          <>
            <span className="text-orange-600 font-black text-sm">{formatCurrency(p.salePrice)}</span>
            <span className="text-[10px] text-gray-400 line-through">{formatCurrency(p.price)}</span>
          </>
        ) : (
          <span className="text-sm font-bold text-gray-700">{formatCurrency(p.price)}</span>
        )}
      </div>
    )},
    { key: 'status', label: 'Status', render: (p) => (
      <div className="flex items-center space-x-3">
        <button 
          disabled={readOnly}
          onClick={() => toggleManualFlag(p.id, 'outOfStock')}
          className={`p-1.5 rounded-lg border transition-all ${p.flags?.outOfStock ? 'bg-red-50 border-red-100 text-red-500' : 'bg-green-50 border-green-100 text-green-500'} ${readOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
          title={p.flags?.outOfStock ? 'Enable Item' : 'Disable Item'}
        >
          <SafeIcon icon={p.flags?.outOfStock ? FiXCircle : FiCheckCircle} />
        </button>
        <span className={`px-2 py-1 rounded-full text-[9px] font-bold uppercase ${p.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>{p.status}</span>
      </div>
    )},
    { key: 'actions', label: 'Actions', render: (p) => (
      <div className="flex items-center space-x-2">
        {!readOnly && (
          <>
            <button onClick={() => { setEditingProduct(p); setIsFormOpen(true); }} className="p-2 text-gray-300 hover:text-orange-600 transition-colors"><SafeIcon icon={FiEdit2} /></button>
            <button onClick={() => setDeleteId(p.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><SafeIcon icon={FiTrash2} /></button>
          </>
        )}
      </div>
    )}
  ];

  const flagOptions = [
    { id: 'All', label: 'All Items', icon: FiFilter },
    { id: 'featured', label: 'Featured', icon: FiStar },
    { id: 'bestSeller', label: 'Best Sellers', icon: FiAward },
    { id: 'new', label: 'New Arrivals', icon: FiClock },
    { id: 'onSale', label: 'On Sale', icon: FiTrendingDown },
    { id: 'lowStock', label: 'Low Stock', icon: FiPackage },
    { id: 'seasonal', label: 'Seasonal', icon: FiSun },
    { id: 'outOfStock', label: 'Unavailable', icon: FiSlash }
  ];

  return (
    <div className="space-y-8">
      {!readOnly && (
        <BulkActionsBar 
          selectedIds={selection.selectedIds} 
          onBulkAction={handleBulkAction} 
          menuType="Product" 
          onClear={selection.clearSelection} 
          extraActions={productExtraActions}
        />
      )}

      {/* Flag Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
        {flagOptions.map(opt => (
          <button
            key={opt.id}
            onClick={() => setFilterFlag(opt.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-2xl border transition-all whitespace-nowrap text-xs font-bold ${
              filterFlag === opt.id 
                ? 'bg-gray-900 border-gray-900 text-white shadow-lg' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
            }`}
          >
            <SafeIcon icon={opt.icon} className={filterFlag === opt.id ? 'text-orange-500' : ''} />
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 relative max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SafeIcon icon={FiSearch} /></div>
          <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none shadow-sm transition-all text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 p-1 rounded-xl shadow-sm">
            <button onClick={handleExport} className="p-2.5 text-gray-500 hover:text-orange-600 hover:bg-white transition-all border-r border-gray-200" title="Export CSV"><SafeIcon icon={FiDownload} /></button>
            <button onClick={() => fileInputRef.current?.click()} className="p-2.5 text-gray-500 hover:text-orange-600 hover:bg-white transition-all" title="Import CSV"><SafeIcon icon={FiUpload} /></button>
            <input type="file" ref={fileInputRef} className="hidden" />
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl shadow-sm">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}><SafeIcon icon={FiGrid} /></button>
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}><SafeIcon icon={FiList} /></button>
          </div>
          {!readOnly && (
            <Button onClick={() => { setEditingProduct(null); setIsFormOpen(true); }} className="shadow-lg px-6"><SafeIcon icon={FiPlus} className="mr-2" /> Add Product</Button>
          )}
        </div>
      </div>

      {viewMode === 'table' ? (
        <DataTable columns={productColumns} data={filteredProducts} onSort={handleSort} sortConfig={sortConfig} selection={{ selectedIds: selection.selectedIds, onSelect: selection.toggleSelect, onSelectAll: selection.toggleSelectAll }} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div layout key={product.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`bg-white rounded-[2rem] border overflow-hidden shadow-sm hover:shadow-xl transition-all group relative flex flex-col ${selection.isSelected(product.id) ? 'border-orange-500 ring-4 ring-orange-100' : 'border-gray-100'}`}>
                <div className="absolute top-4 left-4 z-20"><input type="checkbox" checked={selection.isSelected(product.id)} onChange={() => selection.toggleSelect(product.id)} className="w-6 h-6 rounded-lg border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer shadow-sm" /></div>
                
                <div className="h-56 relative overflow-hidden bg-gray-100">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-14 flex flex-col space-y-1.5 z-10">
                    {Object.entries(product.computedFlags)
                      .filter(([_, active]) => active)
                      .slice(0, 3) // Show top 3 badges to avoid clutter
                      .map(([flag]) => <FlagBadge key={flag} flag={flag} active={true} />)
                    }
                  </div>

                  {!readOnly && (
                    <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 flex space-x-2">
                      <button onClick={() => toggleManualFlag(product.id, 'featured')} className={`p-2.5 rounded-xl shadow-lg backdrop-blur bg-white/90 transition-all ${product.flags?.featured ? 'text-orange-500 bg-white' : 'text-gray-400 hover:text-orange-500'}`}><SafeIcon icon={FiStar} /></button>
                      <button onClick={() => { setEditingProduct(product); setIsFormOpen(true); }} className="p-2.5 rounded-xl shadow-lg backdrop-blur bg-white/90 text-blue-600 hover:bg-white transition-all"><SafeIcon icon={FiEdit2} /></button>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">{product.category}</p>
                      <h4 className="text-xl font-black text-gray-900 leading-tight line-clamp-1">{product.name}</h4>
                    </div>
                    <div className="text-right">
                      {product.salePrice ? (
                        <div className="flex flex-col">
                          <span className="text-xl font-black text-orange-600 leading-none">{formatCurrency(product.salePrice)}</span>
                          <span className="text-xs text-gray-400 line-through leading-none mt-1">{formatCurrency(product.price)}</span>
                        </div>
                      ) : (
                        <span className="text-xl font-black text-gray-900 leading-none">{formatCurrency(product.price)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 font-medium leading-relaxed">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${product.computedFlags.outOfStock ? 'bg-red-500' : 'bg-green-500'} shadow-sm animate-pulse`} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {product.computedFlags.outOfStock ? 'Out of Stock' : `${product.stock} in stock`}
                      </span>
                    </div>
                    {!readOnly && (
                      <button onClick={() => setDeleteId(product.id)} className="text-gray-200 hover:text-red-500 transition-colors p-2"><SafeIcon icon={FiTrash2} /></button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ProductForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={(data) => { 
          console.log('[ProductManagement] Saving product:', data);
          if (editingProduct) {
            setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...data } : p));
          } else {
            setProducts([{ 
              ...data, 
              id: Date.now(), 
              salesCount: 0, 
              createdAt: new Date().toISOString().split('T')[0] 
            }, ...products]);
          }

          addNotification({
            type: 'Inventory',
            title: editingProduct ? 'Product Updated' : 'Product Created',
            message: `${data.name} has been ${editingProduct ? 'updated' : 'added to your menu'}.`,
            priority: 'Info'
          });

          setToast({ type: 'success', message: `Product ${editingProduct ? 'updated' : 'created'}` });
        }} 
        product={editingProduct} 
        categories={categories} 
      />
      
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-sm rounded-[2rem] p-10 text-center shadow-2xl">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 shadow-inner"><SafeIcon icon={FiTrash2} className="text-3xl" /></div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Delete Product?</h3>
              <p className="text-gray-500 mb-10 text-sm font-medium">Remove this item from your menu permanently.</p>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1 rounded-2xl" onClick={() => setDeleteId(null)}>Cancel</Button>
                <Button variant="primary" className="flex-1 bg-red-600 hover:bg-red-700 rounded-2xl shadow-lg shadow-red-600/20" onClick={() => { 
                  console.log('[ProductManagement] Deleting product:', deleteId);
                  setProducts(prev => prev.filter(p => p.id !== deleteId)); 
                  
                  addNotification({
                    type: 'Inventory',
                    title: 'Product Deleted',
                    message: `Item has been removed from your menu.`,
                    priority: 'Warning'
                  });

                  setDeleteId(null); 
                  setToast({ type: 'success', message: 'Product deleted' }); 
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
        menuType="Product"
        meta={{ categories }}
      />

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ProductManagement;