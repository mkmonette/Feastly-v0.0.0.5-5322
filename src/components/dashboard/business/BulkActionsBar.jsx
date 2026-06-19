import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';

const { FiCheckCircle, FiTrash2, FiPlay, FiPause, FiX, FiMoreHorizontal, FiTag, FiDollarSign, FiCalendar } = FiIcons;

const BulkActionsBar = ({ selectedIds, onBulkAction, menuType, onClear, extraActions = [] }) => {
  const [showMore, setShowMore] = useState(false);
  const count = selectedIds.length;

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="bg-gray-900 text-white rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between shadow-2xl mb-6 relative z-30 border border-white/10"
        >
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-600/20">
              <SafeIcon icon={FiCheckCircle} className="text-white text-lg" />
            </div>
            <div className="text-left">
              <p className="text-sm font-black tracking-tight">{count} {menuType}{count > 1 ? 's' : ''} Selected</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Bulk Actions Available</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => onBulkAction('activate')}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-green-600/20 text-green-400 rounded-xl transition-all border border-white/5 font-bold text-xs uppercase tracking-wider group"
            >
              <SafeIcon icon={FiPlay} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Activate</span>
            </button>
            <button
              onClick={() => onBulkAction('deactivate')}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-orange-600/20 text-orange-400 rounded-xl transition-all border border-white/5 font-bold text-xs uppercase tracking-wider group"
            >
              <SafeIcon icon={FiPause} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Deactivate</span>
            </button>
            
            {extraActions.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className={`flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/5 font-bold text-xs uppercase tracking-wider group ${showMore ? 'bg-white/20' : ''}`}
                >
                  <SafeIcon icon={FiMoreHorizontal} className="group-hover:rotate-90 transition-transform" />
                  <span className="hidden sm:inline">More</span>
                </button>
                
                <AnimatePresence>
                  {showMore && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full right-0 mb-4 w-48 bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2"
                    >
                      {extraActions.map(action => (
                        <button
                          key={action.id}
                          onClick={() => {
                            onBulkAction(action.id);
                            setShowMore(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 hover:bg-gray-50 text-left transition-colors"
                        >
                          <SafeIcon icon={action.icon} className="text-orange-600" />
                          <span className="text-xs font-bold">{action.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              onClick={() => onBulkAction('delete')}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-red-600/20 text-red-400 rounded-xl transition-all border border-white/5 font-bold text-xs uppercase tracking-wider group"
            >
              <SafeIcon icon={FiTrash2} className="group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Delete</span>
            </button>
            
            <div className="w-px h-8 bg-white/10 mx-2 hidden md:block"></div>
            
            <button
              onClick={onClear}
              className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-xl transition-all border border-white/5"
              title="Clear Selection"
            >
              <SafeIcon icon={FiX} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BulkActionsBar;