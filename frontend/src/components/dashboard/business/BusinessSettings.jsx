import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import GeneralSettings from './settings/GeneralSettings';
import BrandingSettings from './settings/BrandingSettings';
import OperatingHoursSettings from './settings/OperatingHoursSettings';
import OrderingSettings from './settings/OrderingSettings';
import { SUPPORTED_CURRENCIES } from '@/common/currency';
import { useNotifications } from '@/context/NotificationContext';

const { FiSettings, FiLayout, FiClock, FiShoppingBag, FiGlobe, FiDollarSign } = FiIcons;

const BusinessSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState(null);
  const { addNotification } = useNotifications();
  
  const [businessData, setBusinessData] = useState(() => {
    const saved = localStorage.getItem('feastly_business_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('[BusinessSettings] Failed to parse settings', e);
      }
    }
    
    return {
      name: 'Feastly Burger Bar',
      email: 'contact@feastly.com',
      phone: '+63 912 345 6789',
      address: '123 Makati Ave, Manila, Philippines',
      description: 'The best burgers in town since 2010.',
      currency: 'PHP',
      timezone: 'Asia/Manila',
      logoUrl: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=200',
      bannerUrl: 'https://images.unsplash.com/photo-1514356425877-05c7300223b2?q=80&w=1200',
      tagline: 'Crafting Culinary Masterpieces',
      operatingHours: {
        monday: { open: '09:00', close: '22:00', isOpen: true },
        tuesday: { open: '09:00', close: '22:00', isOpen: true },
        wednesday: { open: '09:00', close: '22:00', isOpen: true },
        thursday: { open: '09:00', close: '22:00', isOpen: true },
        friday: { open: '09:00', close: '23:00', isOpen: true },
        saturday: { open: '10:00', close: '23:00', isOpen: true },
        sunday: { open: '10:00', close: '21:00', isOpen: true },
      },
      ordering: {
        minOrderValue: 500,
        deliveryRadius: 10,
        baseDeliveryFee: 50,
        allowPreOrders: true,
        allowTableOrdering: true,
      }
    };
  });

  const handleSave = (section, data) => {
    setBusinessData(prev => {
      const updated = { ...prev, [section]: data };
      
      // Sync specific sections to root level for easier access across app
      if (section === 'general') {
        updated.name = data.name;
        updated.email = data.email;
        updated.phone = data.phone;
        updated.address = data.address;
        updated.description = data.description;
      }

      if (section === 'branding') {
        updated.logoUrl = data.logoUrl;
        updated.bannerUrl = data.bannerUrl;
        updated.tagline = data.tagline;
      }
      
      localStorage.setItem('feastly_business_settings', JSON.stringify(updated));
      return updated;
    });

    addNotification({
      type: 'System',
      title: 'Settings Updated',
      message: `${section.charAt(0).toUpperCase() + section.slice(1)} content has been saved.`,
      priority: 'Info'
    });

    setToast({ type: 'success', message: 'Settings saved successfully' });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FiSettings },
    { id: 'branding', label: 'Branding Content', icon: FiLayout },
    { id: 'hours', label: 'Operating Hours', icon: FiClock },
    { id: 'ordering', label: 'Ordering', icon: FiShoppingBag },
    { id: 'localization', label: 'Localization', icon: FiGlobe },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8 text-left">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Business Settings</h2>
        <p className="text-gray-500 mt-1">Configure your store identity, operating rules, and regional preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-3xl border border-gray-100 p-2 shadow-sm sticky top-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all mb-1 last:mb-0 ${
                  activeTab === tab.id
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'general' && (
                <GeneralSettings 
                  initialData={{ 
                    name: businessData.name, 
                    email: businessData.email, 
                    phone: businessData.phone, 
                    address: businessData.address,
                    description: businessData.description
                  }} 
                  onSave={(data) => handleSave('general', data)} 
                />
              )}
              {activeTab === 'branding' && (
                <BrandingSettings 
                  initialData={{ 
                    logoUrl: businessData.logoUrl, 
                    bannerUrl: businessData.bannerUrl,
                    tagline: businessData.tagline 
                  }} 
                  onSave={(data) => handleSave('branding', data)} 
                />
              )}
              {activeTab === 'hours' && (
                <OperatingHoursSettings 
                  initialData={businessData.operatingHours} 
                  onSave={(data) => handleSave('operatingHours', data)} 
                />
              )}
              {activeTab === 'ordering' && (
                <OrderingSettings 
                  initialData={businessData.ordering} 
                  onSave={(data) => handleSave('ordering', data)} 
                />
              )}
              {activeTab === 'localization' && (
                <div className="space-y-6 text-left">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Regional & Currency</h3>
                    <p className="text-sm text-gray-500">Select your preferred currency and timezone for operations.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Store Currency</label>
                      <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                          <SafeIcon icon={FiDollarSign} />
                        </div>
                        <select 
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-orange-500 outline-none appearance-none font-bold text-gray-700"
                          value={businessData.currency}
                          onChange={(e) => handleSave('currency', e.target.value)}
                        >
                          {Object.values(SUPPORTED_CURRENCIES).map(curr => (
                            <option key={curr.code} value={curr.code}>{curr.name} ({curr.symbol})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default BusinessSettings;