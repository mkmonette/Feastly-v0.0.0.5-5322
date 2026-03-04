import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const SecuritySection = ({ onSave }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.currentPassword || !formData.newPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await onSave(formData);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
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
        <div>
          <h3 className="text-xl font-bold text-gray-900">Security</h3>
          <p className="text-sm text-gray-500">Manage your password and account security settings.</p>
        </div>
      </div>

      <div className="max-w-md space-y-6">
        <Input 
          label="Current Password" 
          name="currentPassword" 
          type="password" 
          value={formData.currentPassword} 
          onChange={handleChange} 
          disabled={isSaving}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="New Password" 
            name="newPassword" 
            type="password" 
            value={formData.newPassword} 
            onChange={handleChange} 
            disabled={isSaving}
          />
          <Input 
            label="Confirm New Password" 
            name="confirmPassword" 
            type="password" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            disabled={isSaving}
          />
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-50">
        <Button type="submit" disabled={!isDirty || isSaving}>
          {isSaving ? (
            <span className="flex items-center">
              <SafeIcon icon={FiIcons.FiLoader} className="mr-2 animate-spin" />
              Updating...
            </span>
          ) : 'Update Password'}
        </Button>
      </div>
    </form>
  );
};

export default SecuritySection;