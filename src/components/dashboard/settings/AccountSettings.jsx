import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Toast from '@/components/ui/Toast';
import ProfileSection from './account/ProfileSection';
import SecuritySection from './account/SecuritySection';
import PreferencesSection from './account/PreferencesSection';

const AccountSettings = ({ role }) => {
  const [toast, setToast] = useState(null);

  const handleSave = (section, data) => {
    console.log(`Saving ${section} settings:`, data);
    setToast({ type: 'success', message: `${section} updated successfully!` });
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Account Settings</h1>
        <p className="text-gray-500">Manage your personal profile, security, and preferences.</p>
      </div>

      <div className="space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <ProfileSection onSave={(data) => handleSave('Profile', data)} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SecuritySection onSave={(data) => handleSave('Security', data)} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <PreferencesSection onSave={(data) => handleSave('Preferences', data)} />
        </motion.div>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AccountSettings;