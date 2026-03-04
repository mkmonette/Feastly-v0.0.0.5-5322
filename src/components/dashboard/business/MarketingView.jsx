import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import UpsellManagement from './UpsellManagement';
import BumpManagement from './BumpManagement';
import FlashSaleManagement from './FlashSaleManagement';
import CouponManagement from './CouponManagement';
import NotificationBarSettings from './NotificationBarSettings';
import { useProducts } from '@/context/ProductContext';

const { FiTrendingUp, FiZap, FiTarget, FiActivity, FiTag, FiBell } = FiIcons;

/**
 * MarketingView Component
 * Refactored to use a scalable configuration-based system for tab management.
 */
const MarketingView = () => {
  const { products } = useProducts();

  // Centralized Tab Configuration
  // This object defines the structure, labels, icons and components for the marketing center
  const marketingTabs = useMemo(() => ({
    upsells: {
      label: 'Upsells',
      icon: FiTrendingUp,
      description: 'High-value suggestions shown during selection',
      component: <UpsellManagement products={products} />
    },
    bumps: {
      label: 'Bumps',
      icon: FiZap,
      description: 'Impulse additions shown at checkout',
      component: <BumpManagement products={products} />
    },
    'flash-sales': {
      label: 'Flash Sales',
      icon: FiActivity,
      description: 'Limited-time aggressive discounts',
      component: <FlashSaleManagement products={products} />
    },
    coupons: {
      label: 'Coupons',
      icon: FiTag,
      description: 'Promotional codes for checkout discounts',
      component: <CouponManagement products={products} />
    },
    'notification-bar': {
      label: 'Notification Bar',
      icon: FiBell,
      description: 'Store-wide announcement banner',
      component: <NotificationBarSettings />
    }
  }), [products]);

  // Safely initialize the default active tab from the first key in the config
  const [activeTab, setActiveTab] = useState(Object.keys(marketingTabs)[0]);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-gray-100 pb-8">
        <div className="text-left">
          <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-wider mb-3">
            <SafeIcon icon={FiTarget} className="mr-1.5" /> Growth Tools
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-left">Marketing Center</h2>
          <p className="text-gray-500 mt-1 max-w-md text-left">
            Boost your Average Order Value (AOV) and conversion with strategic marketing tools.
          </p>
        </div>
        
        {/* Dynamic Nav Tabs */}
        <div className="flex p-1.5 bg-gray-100 rounded-2xl w-full md:w-auto overflow-x-auto shrink-0 no-scrollbar">
          {Object.entries(marketingTabs).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === key 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon icon={tab.icon} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Rendering */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Direct lookup rendering - no switch/if-else needed */}
          {marketingTabs[activeTab]?.component || (
            <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest">
              Section under development
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MarketingView;