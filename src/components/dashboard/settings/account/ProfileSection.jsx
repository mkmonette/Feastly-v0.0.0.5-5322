import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUploadField from '@/components/ui/ImageUploadField';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const ProfileSection = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Thompson',
    email: user?.email || 'alex@example.com',
    phone: user?.phone || '+1 (555) 000-0000',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop'
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  const handleAvatarChange = (val) => {
    setFormData({ ...formData, avatar: val });
    setIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await onSave(formData);
      setIsDirty(false);
    } catch (error) {
      console.error('Save failed', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
        {isDirty && (
          <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
            Unsaved Changes
          </span>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="shrink-0 flex flex-col items-center space-y-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Avatar</label>
          <ImageUploadField
            value={formData.avatar}
            onChange={handleAvatarChange}
            onRemove={() => handleAvatarChange('')}
            className="w-32 h-32 rounded-full"
            disabled={isSaving}
          />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} disabled={isSaving} />
          <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} disabled={isSaving} />
          <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} disabled={isSaving} />
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-50">
        <Button type="submit" disabled={!isDirty || isSaving}>
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

export default ProfileSection;