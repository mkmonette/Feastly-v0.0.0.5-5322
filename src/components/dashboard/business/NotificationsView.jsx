import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useNotifications } from '@/context/NotificationContext';
import Button from '@/components/ui/Button';

const { 
  FiBell, FiCheckCircle, FiInfo, FiAlertCircle, 
  FiShoppingBag, FiTrendingUp, FiAward, FiTrash2, 
  FiEye, FiEyeOff, FiSearch, FiExternalLink 
} = FiIcons;

const NotificationsView = () => {
  const { 
    notifications, 
    markAsRead, 
    markAsUnread, 
    deleteNotification, 
    markAllAsRead 
  } = useNotifications();

  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredNotifications = useMemo(() => {
    return notifications
      .filter(n => {
        const matchesType = filterType === 'All' || n.type === filterType;
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             n.message.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [notifications, filterType, searchQuery]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map(n => n.id));
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Order': return FiShoppingBag;
      case 'Marketing': return FiTrendingUp;
      case 'Loyalty': return FiAward;
      case 'Finance': return FiCheckCircle;
      case 'System': return FiAlertCircle;
      default: return FiInfo;
    }
  };

  const getColor = (type, priority) => {
    if (priority === 'Critical') return 'bg-rose-100 text-rose-600';
    if (priority === 'Warning') return 'bg-amber-100 text-amber-600';
    
    switch (type) {
      case 'Order': return 'bg-blue-100 text-blue-600';
      case 'Marketing': return 'bg-purple-100 text-purple-600';
      case 'Loyalty': return 'bg-orange-100 text-orange-600';
      case 'Finance': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-3xl font-black text-gray-900 flex items-center tracking-tight">
            <SafeIcon icon={FiBell} className="mr-3 text-orange-600" />
            Notification Center
          </h3>
          <p className="text-sm text-gray-500 font-medium">Manage alerts, updates, and business activities.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={markAllAsRead} className="text-xs">
            Mark All as Read
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <SafeIcon icon={FiSearch} />
              </span>
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-transparent rounded-2xl pl-12 pr-4 py-3 text-sm font-bold focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-600/5 transition-all outline-none"
              />
            </div>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-50 border border-transparent rounded-2xl px-4 py-3 text-sm font-bold focus:bg-white focus:border-orange-500 transition-all outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Order">Orders</option>
              <option value="Marketing">Marketing</option>
              <option value="Loyalty">Loyalty</option>
              <option value="Finance">Finance</option>
              <option value="System">System</option>
            </select>
          </div>

          {selectedIds.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-2xl border border-orange-100"
            >
              <span className="text-xs font-black text-orange-600 uppercase tracking-widest mr-2">{selectedIds.length} Selected</span>
              <button 
                onClick={() => {
                  selectedIds.forEach(id => markAsRead(id));
                  setSelectedIds([]);
                }}
                className="p-2 hover:bg-white rounded-lg text-orange-600 transition-colors" title="Mark as Read"
              >
                <SafeIcon icon={FiEye} />
              </button>
              <button 
                onClick={() => {
                  selectedIds.forEach(id => deleteNotification(id));
                  setSelectedIds([]);
                }}
                className="p-2 hover:bg-white rounded-lg text-rose-600 transition-colors" title="Delete"
              >
                <SafeIcon icon={FiTrash2} />
              </button>
            </motion.div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-6 py-5 w-12">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === filteredNotifications.length && filteredNotifications.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Type</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Message</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Timestamp</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredNotifications.map((n) => (
                  <motion.tr 
                    key={n.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`group transition-colors ${n.status === 'Unread' ? 'bg-orange-50/10' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-6 py-5">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(n.id)}
                        onChange={() => toggleSelect(n.id)}
                        className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl shrink-0 ${getColor(n.type, n.priority)}`}>
                          <SafeIcon icon={getIcon(n.type)} className="text-sm" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black uppercase tracking-widest text-gray-900">{n.type}</span>
                          {n.priority !== 'Info' && (
                            <span className={`text-[8px] font-black uppercase tracking-widest ${n.priority === 'Critical' ? 'text-rose-600' : 'text-amber-600'}`}>
                              {n.priority}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className={`text-sm font-bold text-gray-900 ${n.status === 'Unread' ? 'text-orange-600' : ''}`}>
                            {n.title}
                          </p>
                          {n.status === 'Unread' && <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse"></div>}
                        </div>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-md line-clamp-1 group-hover:line-clamp-none transition-all">
                          {n.message}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs font-bold text-gray-400 whitespace-nowrap">
                        {new Date(n.timestamp).toLocaleDateString()} <br/>
                        <span className="text-[10px] font-medium">
                          {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {n.related_id && (
                          <button 
                            className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-100 rounded-xl transition-all"
                            title="View Related"
                          >
                            <SafeIcon icon={FiExternalLink} />
                          </button>
                        )}
                        <button 
                          onClick={() => n.status === 'Unread' ? markAsRead(n.id) : markAsUnread(n.id)}
                          className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-orange-600 hover:border-orange-100 rounded-xl transition-all"
                          title={n.status === 'Unread' ? "Mark as Read" : "Mark as Unread"}
                        >
                          <SafeIcon icon={n.status === 'Unread' ? FiEye : FiEyeOff} />
                        </button>
                        <button 
                          onClick={() => deleteNotification(n.id)}
                          className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-rose-600 hover:border-rose-100 rounded-xl transition-all"
                          title="Delete"
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

          {filteredNotifications.length === 0 && (
            <div className="py-24 text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                <SafeIcon icon={FiBell} className="text-4xl" />
              </div>
              <div className="max-w-xs mx-auto">
                <h4 className="font-bold text-gray-900 text-lg">Clear as a whistle!</h4>
                <p className="text-sm text-gray-500 font-medium">No notifications match your current filters.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsView;