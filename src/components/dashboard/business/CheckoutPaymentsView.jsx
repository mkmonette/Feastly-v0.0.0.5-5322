import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiFileText, FiTruck, FiDollarSign, FiCreditCard, FiLayout, FiAward, FiGrid, FiSettings } = FiIcons;

/**
 * Parent Layout for Checkout & Payments Settings
 * Uses React Router's <Outlet /> to render child components
 */
const CheckoutPaymentsView = () => {
  const location = useLocation();

  const tabs = [
    { id: 'general', label: 'General Settings', icon: FiSettings, path: '/settings/checkout/general' },
    { id: 'tax', label: 'Tax Rules', icon: FiFileText, path: '/settings/checkout/tax' },
    { id: 'delivery', label: 'Delivery', icon: FiTruck, path: '/settings/checkout/delivery' },
    { id: 'charges', label: 'Misc Charges', icon: FiDollarSign, path: '/settings/checkout/charges' },
    { id: 'payments', label: 'Payments', icon: FiCreditCard, path: '/settings/checkout/payments' },
    { id: 'fields', label: 'Custom Fields', icon: FiGrid, path: '/settings/checkout/fields' },
    { id: 'form', label: 'Checkout Form', icon: FiLayout, path: '/settings/checkout/form' },
    { id: 'success', label: 'Success Page', icon: FiAward, path: '/settings/checkout/success' },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8 text-left">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Checkout & Payments</h2>
        <p className="text-gray-500 mt-1">Manage your checkout flow, tax configuration, and custom field preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Tab Navigation Sidebar */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white rounded-3xl border border-gray-100 p-2 shadow-sm sticky top-10">
            {tabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all mb-1 last:mb-0 ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={tab.icon} />
                <span>{tab.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Dynamic Content Area rendering Child Routes */}
        <div className="flex-1 bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentsView;