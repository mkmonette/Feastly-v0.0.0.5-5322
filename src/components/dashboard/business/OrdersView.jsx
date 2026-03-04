import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import { useNotifications } from '@/context/NotificationContext';

const { FiShoppingBag, FiCheck, FiX, FiPrinter, FiMoreVertical, FiTruck, FiRefreshCw } = FiIcons;

const OrdersView = ({ readOnly = false }) => {
  const { addNotification } = useNotifications();
  const [toast, setToast] = useState(null);
  
  const [orders, setOrders] = useState([
    { id: 'ORD-7742', customer: 'Sarah Jenkins', total: 1250, status: 'Pending', timestamp: '2 mins ago' },
    { id: 'ORD-7741', customer: 'Mark Thompson', total: 850, status: 'Completed', timestamp: '1 hour ago' },
    { id: 'ORD-7740', customer: 'Emma Watson', total: 540, status: 'Cancelled', timestamp: '3 hours ago' }
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        // Trigger Notifications based on status change
        if (newStatus === 'Completed') {
          addNotification({
            type: 'Order',
            title: 'Payment Confirmed',
            message: `Payment confirmed for order #${id} by ${order.customer}.`,
            priority: 'Info',
            related_id: id
          });
        } else if (newStatus === 'Cancelled') {
          addNotification({
            type: 'Order',
            title: 'Order Cancelled',
            message: `Order #${id} has been cancelled and is awaiting refund processing.`,
            priority: 'Warning',
            related_id: id
          });
        }
        return { ...order, status: newStatus };
      }
      return order;
    }));
    setToast({ type: 'success', message: `Order ${id} marked as ${newStatus}` });
  };

  const simulateNewOrder = () => {
    const newId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = { 
      id: newId, 
      customer: 'Juan Dela Cruz', 
      total: 1500, 
      status: 'Pending', 
      timestamp: 'Just now' 
    };
    setOrders(prev => [newOrder, ...prev]);
    
    // Trigger Real-Time Notification
    addNotification({
      type: 'Order',
      title: 'New Order Received',
      message: `New order #${newId} placed by Juan Dela Cruz for ₱1,500.00.`,
      priority: 'Info',
      related_id: newId
    });
    
    setToast({ type: 'success', message: 'Simulated new order received!' });
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-3xl font-black text-gray-900 flex items-center tracking-tight">
            <SafeIcon icon={FiShoppingBag} className="mr-3 text-orange-600" />
            Order Management
          </h3>
          <p className="text-sm text-gray-500 font-medium tracking-tight">Track, process, and manage your incoming customer orders.</p>
        </div>
        {!readOnly && (
          <Button onClick={simulateNewOrder} className="flex items-center space-x-2 shadow-lg shadow-orange-600/20">
            <SafeIcon icon={FiRefreshCw} />
            <span>Simulate New Order</span>
          </Button>
        )}
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Total</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Timestamp</th>
                {!readOnly && <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 font-black text-sm text-gray-900">{order.id}</td>
                  <td className="px-6 py-5 font-bold text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-5 font-black text-sm text-orange-600">₱{order.total.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      order.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' :
                      order.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-gray-50 text-gray-400 border-gray-100'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-gray-400 text-xs font-bold">{order.timestamp}</td>
                  {!readOnly && (
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {order.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => updateStatus(order.id, 'Completed')}
                              className="p-2.5 bg-green-50 text-green-600 border border-green-100 hover:bg-green-600 hover:text-white rounded-xl transition-all"
                              title="Accept & Complete"
                            >
                              <SafeIcon icon={FiCheck} />
                            </button>
                            <button 
                              onClick={() => updateStatus(order.id, 'Cancelled')}
                              className="p-2.5 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white rounded-xl transition-all"
                              title="Cancel Order"
                            >
                              <SafeIcon icon={FiX} />
                            </button>
                          </>
                        )}
                        <button className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-gray-900 rounded-xl transition-all">
                          <SafeIcon icon={FiMoreVertical} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default OrdersView;