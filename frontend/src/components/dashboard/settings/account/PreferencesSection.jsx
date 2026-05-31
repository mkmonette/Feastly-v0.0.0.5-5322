import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const PreferencesSection = ({ onSave }) => {
  const [prefs, setPrefs] = useState({
    language: 'English',
    timezone: 'UTC-5 (Eastern Time)',
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true
  });
  const [isDirty, setIsDirty] = useState(false);

  const toggle = (field) => {
    setPrefs(prev => ({ ...prev, [field]: !prev[field] }));
    setIsDirty(true);
  };

  const handleSelect = (e) => {
    setPrefs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setIsDirty(true);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(prefs); setIsDirty(false); }} className="bg-white rounded-3xl border border-gray-100 p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">System Preferences</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Language</label>
            <select name="language" value={prefs.language} onChange={handleSelect} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none text-sm">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Timezone</label>
            <select name="timezone" value={prefs.timezone} onChange={handleSelect} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none text-sm">
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC+0 (GMT)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Notifications</label>
          <div className="space-y-3">
            {[
              { id: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
              { id: 'pushNotifications', label: 'Push Notifications', desc: 'Direct alerts to your device' },
              { id: 'orderUpdates', label: 'Order Updates', desc: 'Alerts about your order status' }
            ].map(item => (
              <label key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-orange-50/50 transition-colors">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">{item.label}</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{item.desc}</span>
                </div>
                <input type="checkbox" checked={prefs[item.id]} onChange={() => toggle(item.id)} className="w-5 h-5 accent-orange-600" />
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-50">
        <Button type="submit" disabled={!isDirty}>Update Preferences</Button>
      </div>
    </form>
  );
};

export default PreferencesSection;