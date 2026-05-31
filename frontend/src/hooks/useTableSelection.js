import { useState, useCallback } from 'react';

export const useTableSelection = (data = []) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelect = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAll = useCallback((ids) => {
    setSelectedIds((prev) => {
      const allSelected = ids.every((id) => prev.includes(id));
      if (allSelected) {
        return prev.filter((id) => !ids.includes(id));
      } else {
        const newSelection = [...new Set([...prev, ...ids])];
        return newSelection;
      }
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const isSelected = useCallback((id) => selectedIds.includes(id), [selectedIds]);

  return {
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    clearSelection,
    isSelected,
    count: selectedIds.length
  };
};

export default useTableSelection;