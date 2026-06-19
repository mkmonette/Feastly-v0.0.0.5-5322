import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import DashboardFooter from '../DashboardFooter';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { ROLES } from '@/common/permissions';

const { FiShield } = FiIcons;

const ReadOnlyBanner = () => (
  <div className="bg-blue-600 text-white px-6 py-2 flex items-center justify-center space-x-3 text-sm font-bold shadow-lg shrink-0">
    <SafeIcon icon={FiShield} className="text-lg" />
    <span>AUDIT MODE: You are viewing this business as an Administrator. All actions are read-only.</span>
  </div>
);

const BaseLayout = ({ role, onLogout }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebar_state');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('sidebar_state', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  // Support mode is active if an Admin is viewing Business-specific pages
  const isSupportMode = role === ROLES.ADMIN && (
    location.pathname.startsWith('/products') || 
    location.pathname.startsWith('/marketing') ||
    location.pathname.startsWith('/orders')
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        role={role}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-[80px]'}`}>
        {isSupportMode && <ReadOnlyBanner />}
        <Header role={role} onLogout={onLogout} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-6 lg:p-10">
            {/* The Outlet renders the child routes */}
            <Outlet />
          </div>
          <DashboardFooter />
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;