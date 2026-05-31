import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const GeneralSettings = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log('[GeneralSettings] Received initialData:', initialData);
    setFormData(initialData);
    setIsDirty(false);
  }, [initialData]);

  // Warn before leaving if dirty
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Business name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    console.log('[GeneralSettings] Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log('[GeneralSettings] Attempting to save:', formData);
    if (validate()) {
      setIsSaving(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('[GeneralSettings] Validation passed, calling onSave');
        await onSave(formData);
        setIsDirty(false);
      } catch (error) {
        console.error('[GeneralSettings] Save failed', error);
      } finally {
        setIsSaving(false);
      }
    } else {
      console.warn('[GeneralSettings] Validation failed');
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">General Information</h3>
          <p className="text-sm text-gray-500">Update your business profile and contact details.</p>
        </div>
        {isDirty && (
          <span className="flex items-center text-orange-600 text-[10px] font-black bg-orange-50 px-3 py-1 rounded-full animate-pulse uppercase tracking-widest">
            <SafeIcon icon={FiIcons.FiAlertCircle} className="mr-1" />
            Unsaved Changes
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Input
            label="Business Name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Enter business name"
            disabled={isSaving}
          />
          {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.name}</p>}
        </div>
        <div className="space-y-1">
          <Input
            label="Business Email"
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange}
            placeholder="Enter business email"
            disabled={isSaving}
          />
          {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.email}</p>}
        </div>
        <Input
          label="Phone Number"
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          placeholder="Enter phone number"
          disabled={isSaving}
        />
        <Input
          label="Address"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          placeholder="Enter business address"
          disabled={isSaving}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Business Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows={4}
          disabled={isSaving}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none text-sm transition-all disabled:bg-gray-50 disabled:text-gray-400"
          placeholder="Describe your business..."
        />
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

export default GeneralSettings;