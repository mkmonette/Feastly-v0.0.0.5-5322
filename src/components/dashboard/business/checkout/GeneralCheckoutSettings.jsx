import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const { FiSettings, FiUserPlus, FiDollarSign, FiAlertCircle, FiCheck, FiInfo } = FiIcons;

const GeneralCheckoutSettings = () => {
  const [settings, setSettings] = useState({
    guestCheckout: true,
    enableTipping: true,
    minOrderValue: 100,
    minOrderFee: 20
  });

  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simulate API call to save per businessId
    setTimeout(() => {
      setSaving(false);
      alert('General checkout settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiSettings} className="mr-2 text-orange-600" />
          General Checkout Settings
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Configure core checkout behavior like guest access, tipping, and order minimums.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Guest Checkout Toggle */}
        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUserPlus} className="text-gray-400" />
                <h4 className="font-bold text-gray-900">Guest Checkout</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Allow customers to place orders without creating an account.
              </p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, guestCheckout: !settings.guestCheckout })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                settings.guestCheckout ? 'bg-orange-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.guestCheckout ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="mt-4 p-3 bg-white rounded-xl border border-gray-100">
            <span className={`text-[10px] font-black uppercase tracking-widest ${settings.guestCheckout ? 'text-green-600' : 'text-gray-400'}`}>
              Status: {settings.guestCheckout ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        {/* Tipping Toggle */}
        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiDollarSign} className="text-gray-400" />
                <h4 className="font-bold text-gray-900">Enable Tipping</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Show a tipping option during the checkout process.
              </p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, enableTipping: !settings.enableTipping })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                settings.enableTipping ? 'bg-orange-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableTipping ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="mt-4 p-3 bg-white rounded-xl border border-gray-100">
            <span className={`text-[10px] font-black uppercase tracking-widest ${settings.enableTipping ? 'text-green-600' : 'text-gray-400'}`}>
              Status: {settings.enableTipping ? 'Accepting Tips' : 'Tips Hidden'}
            </span>
          </div>
        </div>
      </div>

      {/* Minimum Order Value Section */}
      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiAlertCircle} className="text-orange-600" />
          <h4 className="font-bold text-gray-900">Minimum Order Rules</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Minimum Order Value (PHP)"
            type="number"
            min="0"
            value={settings.minOrderValue}
            onChange={(e) => setSettings({ ...settings, minOrderValue: parseFloat(e.target.value) || 0 })}
            placeholder="e.g. 100"
          />
          <Input
            label="Adjustment Fee (PHP)"
            type="number"
            min="0"
            value={settings.minOrderFee}
            onChange={(e) => setSettings({ ...settings, minOrderFee: parseFloat(e.target.value) || 0 })}
            placeholder="e.g. 20"
          />
        </div>

        {settings.minOrderValue > 0 && (
          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start space-x-3">
            <SafeIcon icon={FiInfo} className="text-orange-600 mt-1 shrink-0" />
            <div className="text-xs text-orange-800 font-medium leading-relaxed">
              If a customer's cart is less than <span className="font-bold">PHP {settings.minOrderValue}</span>, 
              an adjustment fee of <span className="font-bold">PHP {settings.minOrderFee}</span> will be added to their total automatically.
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          variant="primary" 
          onClick={handleSave} 
          loading={saving}
          className="px-8 rounded-2xl"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default GeneralCheckoutSettings;