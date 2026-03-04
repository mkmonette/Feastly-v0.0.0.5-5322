import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import ImageUploadField from '@/components/ui/ImageUploadField';
import Input from '@/components/ui/Input';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const BrandingSettings = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(initialData);
    setIsDirty(false);
  }, [initialData]);

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

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setIsDirty(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      setIsDirty(false);
    } catch (error) {
      console.error('[BrandingSettings] Save failed', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 text-left">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Branding Content</h3>
          <p className="text-sm text-gray-500">Manage your store's visual identity and messaging.</p>
        </div>
        {isDirty && (
          <span className="flex items-center text-orange-600 text-[10px] font-black bg-orange-50 px-3 py-1 rounded-full animate-pulse uppercase tracking-widest">
            <SafeIcon icon={FiIcons.FiAlertCircle} className="mr-1" />
            Unsaved Changes
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Business Logo</label>
            <ImageUploadField
              value={formData.logoUrl}
              onChange={(val) => handleChange('logoUrl', val)}
              onRemove={() => handleChange('logoUrl', '')}
              className="w-32 h-32 rounded-2xl"
              disabled={isSaving}
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Store Tagline</label>
            <Input 
              value={formData.tagline || ''}
              onChange={(e) => handleChange('tagline', e.target.value)}
              placeholder="e.g. Crafting Culinary Masterpieces"
              disabled={isSaving}
            />
            <p className="text-[10px] text-gray-400 font-medium">This appears on your home page hero section.</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Cover Banner</label>
          <ImageUploadField
            value={formData.bannerUrl}
            onChange={(val) => handleChange('bannerUrl', val)}
            onRemove={() => handleChange('bannerUrl', '')}
            className="w-full h-48 rounded-2xl"
            disabled={isSaving}
          />
          <p className="text-[10px] text-gray-400 font-medium">Recommended size: 1920x1080px.</p>
        </div>
      </div>

      <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start space-x-4">
        <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
          <SafeIcon icon={FiIcons.FiInfo} className="text-xl" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900">Design System Link</h4>
          <p className="text-sm text-blue-700/70 mt-1">
            Colors, fonts, and layout styles are now managed exclusively in the <b>Storefront Builder</b>. This page handles content only.
          </p>
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
          ) : 'Save Branding'}
        </Button>
      </div>
    </form>
  );
};

export default BrandingSettings;