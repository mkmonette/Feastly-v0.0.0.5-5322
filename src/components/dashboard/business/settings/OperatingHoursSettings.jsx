import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const OperatingHoursSettings = ({ initialData, onSave }) => {
  const dayConfigs = [
    { label: 'Monday', key: 'monday' },
    { label: 'Tuesday', key: 'tuesday' },
    { label: 'Wednesday', key: 'wednesday' },
    { label: 'Thursday', key: 'thursday' },
    { label: 'Friday', key: 'friday' },
    { label: 'Saturday', key: 'saturday' },
    { label: 'Sunday', key: 'sunday' },
  ];

  const [formData, setFormData] = useState(initialData || {});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      console.log('[OperatingHoursSettings] Received initialData:', initialData);
      setFormData(initialData);
      setIsDirty(false);
    }
  }, [initialData]);

  const handleToggle = (key) => {
    setFormData({
      ...formData,
      [key]: { ...formData[key], isOpen: !formData[key]?.isOpen }
    });
    setIsDirty(true);
  };

  const handleTimeChange = (key, field, value) => {
    setFormData({
      ...formData,
      [key]: { ...formData[key], [field]: value }
    });
    setIsDirty(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log('[OperatingHoursSettings] Attempting to save:', formData);
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      await onSave(formData);
      setIsDirty(false);
    } catch (error) {
      console.error('[OperatingHoursSettings] Save failed', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Prevent crash if formData isn't loaded yet
  if (!formData || Object.keys(formData).length === 0) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Operating Hours</h3>
          <p className="text-sm text-gray-500">Set your weekly business hours for orders.</p>
        </div>
        {isDirty && (
          <span className="flex items-center text-orange-600 text-xs font-bold bg-orange-50 px-3 py-1 rounded-full animate-pulse">
            <SafeIcon icon={FiIcons.FiAlertCircle} className="mr-1" />
            Unsaved Changes
          </span>
        )}
      </div>

      <div className="space-y-3">
        {dayConfigs.map((config) => {
          const dayData = formData[config.key] || { isOpen: false, open: '09:00', close: '18:00' };
          return (
            <div 
              key={config.key} 
              className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border transition-all ${
                dayData.isOpen ? 'bg-white border-gray-100 shadow-sm' : 'bg-gray-50 border-transparent opacity-60'
              }`}
            >
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleToggle(config.key)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${dayData.isOpen ? 'bg-orange-600' : 'bg-gray-300'} disabled:opacity-50`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${dayData.isOpen ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
                <span className="font-bold text-gray-900 w-24">{config.label}</span>
                {!dayData.isOpen && (
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest bg-gray-100 px-2 py-0.5 rounded">Closed</span>
                )}
              </div>

              {dayData.isOpen && (
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1">Open</label>
                    <input
                      type="time"
                      disabled={isSaving}
                      value={dayData.open}
                      onChange={(e) => handleTimeChange(config.key, 'open', e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-orange-500 outline-none disabled:bg-gray-50"
                    />
                  </div>
                  <span className="text-gray-300 mt-4">—</span>
                  <div className="flex flex-col">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1">Close</label>
                    <input
                      type="time"
                      disabled={isSaving}
                      value={dayData.close}
                      onChange={(e) => handleTimeChange(config.key, 'close', e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-orange-500 outline-none disabled:bg-gray-50"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-50">
        <Button 
          type="submit" 
          disabled={!isDirty || isSaving}
          className={(!isDirty || isSaving) ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {isSaving ? (
            <span className="flex items-center">
              <SafeIcon icon={FiIcons.FiLoader} className="mr-2 animate-spin" />
              Saving...
            </span>
          ) : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};

export default OperatingHoursSettings;