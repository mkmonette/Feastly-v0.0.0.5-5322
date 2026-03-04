import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { ROLES } from '@/common/permissions';

const { 
  FiChevronLeft, FiChevronRight, FiGrid, FiShoppingBag, 
  FiSettings, FiLayers, FiTarget, FiChevronDown, 
  FiUser, FiBriefcase, FiTrendingUp, FiZap, FiActivity, FiTag, FiShield, FiCreditCard, FiHash, FiAward, FiBell, FiMonitor
} = FiIcons;

const Sidebar = ({ isOpen, toggleSidebar, role }) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const activeSubmenu = menuConfig.find(item => 
      item.hasSubmenu && item.submenus.some(sub => location.pathname.startsWith(sub.path))
    );
    if (activeSubmenu) {
      setExpandedMenus(prev => prev.includes(activeSubmenu.id) ? prev : [...prev, activeSubmenu.id]);
    }
  }, [location.pathname]);

  const toggleExpand = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
    );
  };

  const menuConfig = [
    { 
      id: 'Overview', 
      icon: FiGrid, 
      label: 'Overview', 
      path: '/dashboard', 
      roles: [ROLES.ADMIN, ROLES.BUSINESS]
    },
    { 
      id: 'Products', 
      icon: FiLayers, 
      label: role === ROLES.ADMIN ? 'Audit Products' : 'Products', 
      path: '/products', 
      roles: [ROLES.ADMIN, ROLES.BUSINESS]
    },
    { 
      id: 'Marketing', 
      icon: FiTarget, 
      label: 'Marketing', 
      path: '/marketing',
      roles: [ROLES.ADMIN, ROLES.BUSINESS]
    },
    { 
      id: 'LoyaltyProgram', 
      icon: FiAward, 
      label: 'Loyalty Program', 
      path: '/loyalty-program',
      roles: [ROLES.ADMIN, ROLES.BUSINESS]
    },
    { 
      id: 'Storefront', 
      icon: FiMonitor, 
      label: 'Storefront', 
      path: '/storefront',
      roles: [ROLES.ADMIN, ROLES.BUSINESS]
    },
    { 
      id: 'Notifications', 
      icon: FiBell, 
      label: 'Notifications', 
      path: '/notifications',
      roles: [ROLES.ADMIN, ROLES.BUSINESS]
    },
    { 
      id: 'Orders', 
      icon: FiShoppingBag, 
      label: 'Orders', 
      path: '/orders', 
      roles: [ROLES.ADMIN, ROLES.BUSINESS, ROLES.CUSTOMER] 
    },
    { 
      id: 'Settings', 
      icon: FiSettings, 
      label: 'Settings', 
      hasSubmenu: true,
      roles: [ROLES.ADMIN, ROLES.BUSINESS, ROLES.CUSTOMER],
      submenus: [
        { 
          id: 'BusinessSettings', 
          label: 'Business Settings', 
          icon: FiBriefcase, 
          path: '/settings/business',
          roles: [ROLES.BUSINESS] 
        },
        { 
          id: 'CheckoutPayments', 
          label: 'Checkout & Payments', 
          icon: FiCreditCard, 
          path: '/settings/checkout/tax',
          roles: [ROLES.BUSINESS],
          matchPaths: ['/settings/checkout']
        },
        { 
          id: 'OrderSettings', 
          label: 'Order Settings', 
          icon: FiHash, 
          path: '/settings/order',
          roles: [ROLES.BUSINESS] 
        },
        { 
          id: 'AccountSettings', 
          label: 'Account Settings', 
          icon: FiUser, 
          path: '/settings/account',
          roles: [ROLES.ADMIN, ROLES.BUSINESS, ROLES.CUSTOMER] 
        },
        { 
          id: 'Shortcodes', 
          label: 'Shortcodes', 
          icon: FiZap, 
          path: '/settings/shortcodes',
          roles: [ROLES.ADMIN, ROLES.BUSINESS] 
        },
      ]
    },
  ];

  const isItemActive = (item) => {
    if (item.path && location.pathname === item.path) return true;
    if (item.matchPaths && item.matchPaths.some(p => location.pathname.startsWith(p))) return true;
    if (item.hasSubmenu) {
      return item.submenus.some(sub => {
        if (location.pathname === sub.path) return true;
        if (sub.matchPaths && sub.matchPaths.some(p => location.pathname.startsWith(p))) return true;
        return false;
      });
    }
    return false;
  };

  const filteredMenus = menuConfig
    .filter(item => item.roles.includes(role))
    .map(item => ({
      ...item,
      submenus: item.submenus?.filter(sub => sub.roles.includes(role))
    }))
    .filter(item => !item.hasSubmenu || (item.submenus && item.submenus.length > 0));

  return (
    <motion.div
      animate={{ width: isOpen ? (isMobile ? '100vw' : '260px') : '80px' }}
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 z-40 flex flex-col transition-all duration-300 ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}`}
    >
      <div className="h-20 flex items-center px-6 border-b border-gray-50 overflow-hidden shrink-0">
        <div className="bg-orange-600 p-2 rounded-lg shrink-0">
          <SafeIcon icon={FiIcons.FiLayers} className="text-white text-xl" />
        </div>
        {isOpen && <motion.span className="ml-3 font-bold text-xl text-gray-900">Feastly</motion.span>}
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto no-scrollbar">
        {filteredMenus.map((item) => {
          const active = isItemActive(item);
          return (
            <div key={item.id} className="relative group">
              {item.hasSubmenu ? (
                <button
                  onClick={() => isOpen && toggleExpand(item.id)}
                  className={`w-full flex items-center p-3 rounded-xl transition-all ${active ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <SafeIcon icon={item.icon} className="text-xl" />
                  {isOpen && (
                    <div className="ml-3 flex-1 flex items-center justify-between">
                      <span className="font-semibold text-sm">{item.label}</span>
                      <SafeIcon icon={FiChevronDown} className={`text-xs transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`} />
                    </div>
                  )}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `w-full flex items-center p-3 rounded-xl transition-all ${isActive ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <SafeIcon icon={item.icon} className="text-xl" />
                  {isOpen && <span className="ml-3 font-semibold text-sm">{item.label}</span>}
                </NavLink>
              )}

              <AnimatePresence mode="wait">
                {isOpen && item.hasSubmenu && expandedMenus.includes(item.id) && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    className="overflow-hidden mt-1 space-y-1"
                  >
                    {item.submenus.map((sub) => {
                      const subActive = location.pathname === sub.path || (sub.matchPaths && sub.matchPaths.some(p => location.pathname.startsWith(p)));
                      return (
                        <NavLink
                          key={sub.id}
                          to={sub.path}
                          className={`w-full flex items-center p-3 pl-8 rounded-xl transition-all ${subActive ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                          <SafeIcon icon={sub.icon} className="text-xl" />
                          <span className="ml-3 font-semibold text-sm">{sub.label}</span>
                        </NavLink>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;