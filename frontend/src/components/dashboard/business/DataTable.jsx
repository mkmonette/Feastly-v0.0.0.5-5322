import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiChevronUp, FiChevronDown } = FiIcons;

const DataTable = ({ 
  columns, 
  data, 
  onSort, 
  sortConfig, 
  className = "",
  selection = null // { selectedIds, onSelect, onSelectAll }
}) => {
  const isAllSelected = selection && data.length > 0 && data.every(item => selection.selectedIds.includes(item.id));
  const isSomeSelected = selection && data.some(item => selection.selectedIds.includes(item.id)) && !isAllSelected;

  return (
    <div className={`overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            {selection && (
              <th className="px-6 py-4 w-10">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isSomeSelected;
                    }}
                    onChange={() => selection.onSelectAll(data.map(d => d.id))}
                  />
                </div>
              </th>
            )}
            {columns.map((column) => (
              <th 
                key={column.key}
                className={`px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest ${column.sortable ? 'cursor-pointer hover:text-orange-600 transition-colors' : ''}`}
                onClick={() => column.sortable && onSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {column.sortable && sortConfig?.key === column.key && (
                    <SafeIcon 
                      icon={sortConfig.direction === 'asc' ? FiChevronUp : FiChevronDown} 
                      className="text-orange-500"
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((row, rowIndex) => (
            <motion.tr 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: rowIndex * 0.03 }}
              key={row.id || rowIndex} 
              className={`hover:bg-orange-50/30 transition-colors group ${selection?.selectedIds.includes(row.id) ? 'bg-orange-50/20' : ''}`}
            >
              {selection && (
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                    checked={selection.selectedIds.includes(row.id)}
                    onChange={() => selection.onSelect(row.id)}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={`${rowIndex}-${column.key}`} className="px-6 py-4">
                  {column.render ? column.render(row) : (
                    <span className="text-sm font-medium text-gray-700">{row[column.key]}</span>
                  )}
                </td>
              ))}
            </motion.tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + (selection ? 1 : 0)} className="px-6 py-12 text-center text-gray-400 italic text-sm">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;