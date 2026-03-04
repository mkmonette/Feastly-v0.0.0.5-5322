import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'Order',
      priority: 'Info',
      title: 'New Order Received',
      message: 'You have a new order #ORD-7742 from Sarah Jenkins.',
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      status: 'Unread',
      related_id: 'ORD-7742'
    },
    {
      id: '2',
      type: 'System',
      priority: 'Warning',
      title: 'Low Stock Alert',
      message: 'Gourmet Pepperoni Pizza is running low on stock (5 remaining).',
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      status: 'Unread',
      related_id: 'PROD-101'
    }
  ]);

  const unreadCount = useMemo(() => 
    notifications.filter(n => n.status === 'Unread').length, 
  [notifications]);

  const addNotification = useCallback(({ type, title, message, priority = 'Info', related_id = null }) => {
    const newNotification = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      priority,
      title,
      message,
      related_id,
      timestamp: new Date().toISOString(),
      status: 'Unread'
    };
    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, status: 'Read' } : n
    ));
  };

  const markAsUnread = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, status: 'Unread' } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, status: 'Read' })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAsUnread,
      deleteNotification,
      markAllAsRead,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};