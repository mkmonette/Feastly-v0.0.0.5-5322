import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const OrderingSettings = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log('[OrderingSettings] Received initialData:', initialData);
    setFormData(initialData);
    setIsDirty(false);
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (parseFloat(formData.minOrderValue) < 0) newErrors.minOrderValue = 'Cannot be negative';
    if (parseFloat(formData.deliveryRadius) < 0) newErrors.deliveryRadius = 'Cannot be negative';
    setErrors(newErrors);
    console.log('[OrderingSettings] Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    setIsDirty(true);
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log('[OrderingSettings] Attempting to save:', formData);
    if (validate()) {
      setIsSaving(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        await onSave(formData);
        setIsDirty(false);
      } catch (error) {
        console.error('[OrderingSettings] Save failed', error);
      } finally {
        setIsSaving(false);
      }
    } else {
      console.warn('[OrderingSettings] Validation failed');
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Ordering Configuration</h3>
          <p className="text-sm text-gray-500">Manage order limits, delivery settings, and timing.</p>
        </div>
        {isDirty && (
          <span className="flex items-center text-orange-600 text-xs font-bold bg-orange-50 px-3 py-1 rounded-full animate-pulse">
            <SafeIcon icon={FiIcons.FiAlertCircle} className="mr-1" />
            Unsaved Changes
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Input
            label="Minimum Order Value ($)"
            name="minOrderValue"
            type="number"
            value={formData.minOrderValue}
            onChange={handleChange}
            placeholder="0.00"
            disabled={isSaving}
          />
          {errors.minOrderValue && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.minOrderValue}</p>}
        </div>
        <div className="space-y-1">
          <Input
            label="Delivery Radius (km)"
            name="deliveryRadius"
            type="number"
            value={formData.deliveryRadius}
            onChange={handleChange}
            placeholder="Enter radius"
            disabled={isSaving}
          />
          {errors.deliveryRadius && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.deliveryRadius}</p>}
        </div>
        <Input
          label="Base Delivery Fee ($)"
          name="baseDeliveryFee"
          type="number"
          value={formData.baseDeliveryFee}
          onChange={handleChange}
          placeholder="0.00"
          disabled={isSaving}
        />
        <Input
          label="Estimated Prep Time (min)"
          name="estimatedPrepTime"
          type="number"
          value={formData.estimatedPrepTime}
          onChange={handleChange}
          placeholder="Enter time"
          disabled={isSaving}
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-50">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Additional Options</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-orange-50/50 transition-colors">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">Allow Pre-Orders</span>
              <span className="text-xs text-gray-500">Customers can schedule orders for later.</span>
            </div>
            <input
              type="checkbox"
              name="allowPreOrders"
              checked={formData.allowPreOrders}
              onChange={handleChange}
              disabled={isSaving}
              className="w-5 h-5 accent-orange-600 cursor-pointer disabled:opacity-50"
            />
          </label>
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-orange-50/50 transition-colors">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">Table Ordering</span>
              <span className="text-xs text-gray-500">Enable dine-in customers to scan and order.</span>
            </div>
            <input
              type="checkbox"
              name="allowTableOrdering"
              checked={formData.allowTableOrdering}
              onChange={handleChange}
              disabled={isSaving}
              className="w-5 h-5 accent-orange-600 cursor-pointer disabled:opacity-50"
            />
          </label>
        </div>
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

export default OrderingSettings;