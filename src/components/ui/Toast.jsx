import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiCheckCircle, FiXCircle, FiX } = FiIcons;

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      text: 'text-green-800',
      icon: FiCheckCircle,
      iconColor: 'text-green-500'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      text: 'text-red-800',
      icon: FiXCircle,
      iconColor: 'text-red-500'
    }
  };

  const config = styles[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-[100] flex items-center p-4 rounded-xl border shadow-lg ${config.bg} ${config.border} ${config.text}`}
    >
      <SafeIcon icon={config.icon} className={`text-xl mr-3 ${config.iconColor}`} />
      <span className="font-medium mr-8">{message}</span>
      <button onClick={onClose} className="hover:opacity-70">
        <SafeIcon icon={FiX} />
      </button>
    </motion.div>
  );
};

export default Toast;