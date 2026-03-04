import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { 
  FiShoppingBag, FiSearch, FiFilter, FiDownload, FiCheckCircle, 
  FiClock, FiXCircle, FiMoreVertical, FiTrendingUp, FiDollarSign,
  FiEye, FiChevronRight, FiUser, FiCalendar, FiPackage, FiCreditCard,
  FiPlus, FiMapPin, FiTruck
} = FiIcons;

const INITIAL_CUSTOMER_ORDERS = [
  {
    id: 'ORD-7721',
    businessId: 'biz_123',
    businessName: 'Burger King',
    customerId: 'cust_001',
    products: [
      { id: 'p1', name: 'Classic Burger', quantity: 2, price: 12.00, addons: ['Extra Cheese'], upsells: [], flashSaleApplied: false },
      { id: 'p2', name: 'Large Fries', quantity: 1, price: 4.50, addons: [], upsells: [], flashSaleApplied: true }
    ],
    totalAmount: 28.50,
    discountsApplied: [{ type: 'Coupon', code: 'WELCOME10', amount: 3.00 }],
    status: 'pending',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'ORD-7720',
    businessId: 'biz_456',
    businessName: 'Pizza Hut',
    customerId: 'cust_001',
    products: [
      { id: 'p3', name: 'Pepperoni Pizza', quantity: 1, price: 18.00, addons: [], upsells: ['Coke 500ml'], flashSaleApplied: false }
    ],
    totalAmount: 18.00,
    discountsApplied: [],
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'preparing': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="text-xl font-black text-gray-900">Order Details</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{order.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
            <SafeIcon icon={FiXCircle} className="text-2xl text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="flex items-center justify-between p-6 bg-orange-50/50 rounded-2xl border border-orange-100/50">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <SafeIcon icon={FiPackage} className="text-2xl text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">Status</p>
                <p className={`text-lg font-black uppercase ${getStatusStyles(order.status).split(' ')[1]}`}>
                  {order.status}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment</p>
              <p className="text-sm font-black text-gray-900 uppercase">{order.paymentStatus}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                <SafeIcon icon={FiShoppingBag} className="mr-1" /> Merchant
              </span>
              <p className="font-bold text-gray-900">{order.businessName}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                <SafeIcon icon={FiCalendar} className="mr-1" /> Placed On
              </span>
              <p className="font-bold text-gray-900">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider">Order Items</h4>
            <div className="space-y-3">
              {order.products.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-orange-600 border border-gray-100">
                      {item.quantity}x
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      {item.addons?.length > 0 && (
                        <p className="text-[11px] text-gray-500">Add-ons: {item.addons.join(', ')}</p>
                      )}
                      {item.upsells?.length > 0 && (
                        <p className="text-[11px] text-orange-600 font-bold">Upsell: {item.upsells.join(', ')}</p>
                      )}
                    </div>
                  </div>
                  <span className="font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-2xl space-y-3">
            <div className="flex justify-between text-sm opacity-60">
              <span>Subtotal</span>
              <span>${(order.totalAmount + (order.discountsApplied?.reduce((a, b) => a + b.amount, 0) || 0)).toFixed(2)}</span>
            </div>
            {order.discountsApplied?.map((d, i) => (
              <div key={i} className="flex justify-between text-sm text-green-400">
                <span>Discount ({d.code})</span>
                <span>-${d.amount.toFixed(2)}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-white/10 flex justify-between items-end">
              <span className="text-lg font-bold">Total Paid</span>
              <span className="text-3xl font-black text-orange-500">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-center space-x-4">
    <div className={`p-4 rounded-2xl ${colorClass}`}>
      <SafeIcon icon={Icon} className="text-xl text-white" />
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{title}</p>
      <h4 className="text-2xl font-black text-gray-900">{value}</h4>
    </div>
  </div>
);

const CustomerOrdersView = () => {
  const [orders, setOrders] = useState(INITIAL_CUSTOMER_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const currentCustomerId = 'cust_001';

  const stats = useMemo(() => {
    const customerOrders = orders.filter(o => o.customerId === currentCustomerId);
    const pending = customerOrders.filter(o => o.status === 'pending' || o.status === 'preparing');
    const completed = customerOrders.filter(o => o.status === 'completed');
    const totalSpent = customerOrders
      .filter(o => o.paymentStatus === 'paid')
      .reduce((acc, curr) => acc + curr.totalAmount, 0);

    return {
      total: customerOrders.length,
      pending: pending.length,
      completed: completed.length,
      spent: totalSpent.toFixed(2)
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      if (order.customerId !== currentCustomerId) return false;
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.businessName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || order.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const createTestOrder = () => {
    const id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const merchants = ['Starbucks', 'McDonalds', 'KFC', 'Taco Bell'];
    const newOrder = {
      id,
      businessId: `biz_${Math.floor(Math.random() * 1000)}`,
      businessName: merchants[Math.floor(Math.random() * merchants.length)],
      customerId: currentCustomerId,
      products: [
        { id: 'tp1', name: 'Delicious Test Item', quantity: 1, price: 15.99, addons: [], upsells: [], flashSaleApplied: false }
      ],
      totalAmount: 15.99,
      discountsApplied: [],
      status: 'pending',
      paymentStatus: 'paid',
      createdAt: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'preparing': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Orders</h2>
          <p className="text-gray-500 mt-1">Track your orders and order history across all businesses.</p>
        </div>
        <button 
          onClick={createTestOrder}
          className="flex items-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-2xl text-sm font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
        >
          <SafeIcon icon={FiPlus} />
          <span>Place Test Order</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Orders" value={stats.total} icon={FiShoppingBag} colorClass="bg-orange-600" />
        <SummaryCard title="In Progress" value={stats.pending} icon={FiClock} colorClass="bg-blue-600" />
        <SummaryCard title="Completed" value={stats.completed} icon={FiCheckCircle} colorClass="bg-green-600" />
        <SummaryCard title="Total Spent" value={`$${stats.spent}`} icon={FiDollarSign} colorClass="bg-purple-600" />
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID or Restaurant..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-orange-500/10 outline-none transition-all"
            />
          </div>
          <div className="flex items-center space-x-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-50 border-none rounded-xl text-sm font-bold text-gray-700 px-4 py-2.5 outline-none cursor-pointer"
            >
              <option value="All">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Business</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Items</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <motion.tr 
                      key={order.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-gray-900">{order.id}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                            <SafeIcon icon={FiPackage} className="text-orange-600 text-sm" />
                          </div>
                          <span className="text-sm font-bold text-gray-700">{order.businessName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-0.5">
                          {order.products.map((p, i) => (
                            <span key={i} className="text-[11px] text-gray-500 font-medium">
                              {p.quantity}x {p.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs font-bold text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-black text-gray-900">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                        >
                          <SafeIcon icon={FiEye} className="text-lg" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-20 text-center text-gray-400">
                      No orders matching your search.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsModal 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerOrdersView;