import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { formatCurrency } from '@/common/currency';

const {
  FiTrendingUp,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiClock,
  FiStar,
  FiHeart,
  FiPieChart 
} = FiIcons;

const MetricCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <SafeIcon icon={Icon} className="text-xl" />
      </div>
      {change && (
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {change}
        </span>
      )}
    </div>
    <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
    <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
  </div>
);

const RoleOverview = ({ role }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const renderAdmin = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total Revenue" value={formatCurrency(428500)} change="+12.5%" icon={FiDollarSign} color="bg-green-100 text-green-600" />
        <MetricCard title="Total Merchants" value="1,240" change="+4.2%" icon={FiShoppingBag} color="bg-blue-100 text-blue-600" />
        <MetricCard title="Active Users" value="45.2k" change="+18.7%" icon={FiUsers} color="bg-purple-100 text-purple-600" />
        <MetricCard title="System Load" value="24%" change="-2.1%" icon={FiTrendingUp} color="bg-orange-100 text-orange-600" />
      </div>
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiPieChart} className="text-3xl text-gray-300" />
          </div>
          <h5 className="text-lg font-bold text-gray-900">Advanced Analytics</h5>
          <p className="text-gray-500 max-w-xs mx-auto">Full platform performance reports will appear here in the next update.</p>
        </div>
      </div>
    </>
  );

  const renderBusiness = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Today's Orders" value="42" change="+5" icon={FiShoppingBag} color="bg-orange-100 text-orange-600" />
        <MetricCard title="Daily Revenue" value={formatCurrency(1840)} change={`+${formatCurrency(320)}`} icon={FiDollarSign} color="bg-green-100 text-green-600" />
        <MetricCard title="Avg. Prep Time" value="18m" change="-2m" icon={FiClock} color="bg-blue-100 text-blue-600" />
        <MetricCard title="Customer Rating" value="4.8" change="+0.1" icon={FiStar} color="bg-yellow-100 text-yellow-600" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h5 className="font-bold text-gray-900 mb-4">Pending Orders</h5>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xs font-bold mr-3 border border-gray-100">#{1024 + i}</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Custom Burger Set</p>
                    <p className="text-[10px] text-gray-500">2 mins ago • Carry out</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-orange-600 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors">Accept</button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center">
          <p className="text-gray-400 text-sm italic">Menu performance chart coming soon...</p>
        </div>
      </div>
    </>
  );

  const renderCustomer = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Active Orders" value="1" icon={FiClock} color="bg-orange-100 text-orange-600" />
        <MetricCard title="Reward Points" value="1,240" icon={FiStar} color="bg-yellow-100 text-yellow-600" />
        <MetricCard title="Favorites" value="12" icon={FiHeart} color="bg-red-100 text-red-600" />
      </div>
      <h5 className="font-bold text-gray-900 mb-4">Recent Deliveries</h5>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { name: 'Burger King', date: 'Yesterday', price: formatCurrency(24.50), status: 'Delivered' },
          { name: 'Pizza Hut', date: '3 days ago', price: formatCurrency(42.00), status: 'Delivered' }
        ].map((order, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                <SafeIcon icon={FiShoppingBag} className="text-gray-400" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{order.name}</p>
                <p className="text-xs text-gray-500">{order.date} • {order.price}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full">{order.status}</span>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 lg:p-10"
    >
      <motion.div variants={item} className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {role}!</h2>
        <p className="text-gray-500">Here's what's happening with your account today.</p>
      </motion.div>

      <motion.div variants={item}>
        {role === 'Admin' && renderAdmin()}
        {role === 'Business' && renderBusiness()}
        {role === 'Customer' && renderCustomer()}
      </motion.div>
    </motion.div>
  );
};

export default RoleOverview;