import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/context/NotificationContext';

const { FiBell, FiSearch, FiLogOut, FiMenu, FiShoppingBag, FiAlertCircle, FiCheckCircle, FiInfo, FiTrendingUp, FiAward } = FiIcons;

const Header = ({ role, onLogout, toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const latestNotifications = notifications.slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSeeAll = () => {
    setShowNotifications(false);
    navigate('/notifications');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Order': return FiShoppingBag;
      case 'Marketing': return FiTrendingUp;
      case 'Loyalty': return FiAward;
      case 'Finance': return FiCheckCircle;
      default: return FiInfo;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'Order': return 'bg-blue-100 text-blue-600';
      case 'Marketing': return 'bg-purple-100 text-purple-600';
      case 'Loyalty': return 'bg-orange-100 text-orange-600';
      case 'Finance': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="lg:hidden mr-4 p-2 text-gray-500">
          <SafeIcon icon={FiMenu} className="text-2xl" />
        </button>
        <div className="hidden md:flex items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 w-64 lg:w-96">
          <SafeIcon icon={FiSearch} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search orders, customers..." 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-lg transition-colors ${showNotifications ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <SafeIcon icon={FiBell} className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[10px] font-black rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-80 bg-white rounded-[32px] border border-gray-100 shadow-2xl overflow-hidden"
              >
                <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                  <h4 className="font-black text-gray-900">Recent Notifications</h4>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
                    {unreadCount} Unread
                  </span>
                </div>

                <div className="max-h-[360px] overflow-y-auto no-scrollbar">
                  {latestNotifications.length > 0 ? (
                    latestNotifications.map((notification) => (
                      <div 
                        key={notification.id}
                        onClick={() => {
                          markAsRead(notification.id);
                          setShowNotifications(false);
                        }}
                        className={`p-4 flex items-start space-x-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0 ${notification.status === 'Unread' ? 'bg-orange-50/20' : ''}`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${getColor(notification.type)}`}>
                          <SafeIcon icon={getIcon(notification.type)} className="text-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-sm font-bold text-gray-900 truncate">{notification.title}</p>
                            <span className="text-[10px] text-gray-400 font-bold whitespace-nowrap">
                              {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{notification.message}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center text-gray-400 text-xs font-bold uppercase">No new alerts</div>
                  )}
                </div>

                <button 
                  onClick={handleSeeAll}
                  className="w-full p-4 text-xs font-black text-orange-600 hover:bg-orange-50 transition-colors border-t border-gray-50 uppercase tracking-widest"
                >
                  See all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-px bg-gray-100 mx-2"></div>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">Alex Johnson</p>
            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white shadow-sm flex items-center justify-center text-orange-600 font-bold">
            {role[0]}
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <SafeIcon icon={FiLogOut} className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;