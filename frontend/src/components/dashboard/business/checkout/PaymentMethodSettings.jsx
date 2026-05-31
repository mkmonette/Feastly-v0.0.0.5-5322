import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUploadField from '@/components/ui/ImageUploadField';
import { motion, AnimatePresence } from 'framer-motion';

const { FiCreditCard, FiPlus, FiTrash2, FiEdit2, FiCheck, FiX, FiInfo, FiImage } = FiIcons;

const PaymentMethodSettings = () => {
  const [methods, setMethods] = useState([
    {
      id: '1',
      name: 'GCash Personal',
      accountName: 'John Doe',
      accountNumber: '09123456789',
      details: 'Please send a screenshot of the receipt via Viber.',
      qrImageUrl: '',
      active: true
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);

  const handleAddMethod = () => {
    setEditingMethod({
      name: '',
      accountName: '',
      accountNumber: '',
      details: '',
      qrImageUrl: '',
      active: true
    });
    setIsAdding(true);
  };

  const handleSaveMethod = () => {
    if (isAdding) {
      setMethods([...methods, { ...editingMethod, id: Date.now().toString() }]);
    } else {
      setMethods(methods.map(m => m.id === editingMethod.id ? editingMethod : m));
    }
    setIsAdding(false);
    setEditingMethod(null);
  };

  const handleDeleteMethod = (id) => {
    setMethods(methods.filter(m => m.id !== id));
  };

  const toggleStatus = (id) => {
    setMethods(methods.map(m => m.id === id ? { ...m, active: !m.active } : m));
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <SafeIcon icon={FiCreditCard} className="mr-2 text-orange-600" />
            Payment Methods
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Configure how customers can pay for their orders.
          </p>
        </div>
        {!editingMethod && (
          <Button variant="primary" onClick={handleAddMethod} className="flex items-center space-x-2">
            <SafeIcon icon={FiPlus} />
            <span>Add Payment Method</span>
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {editingMethod ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Input
                  label="Method Name"
                  value={editingMethod.name}
                  onChange={(e) => setEditingMethod({ ...editingMethod, name: e.target.value })}
                  placeholder="e.g. Bank Transfer (BDO)"
                />
                <Input
                  label="Account Name"
                  value={editingMethod.accountName}
                  onChange={(e) => setEditingMethod({ ...editingMethod, accountName: e.target.value })}
                  placeholder="e.g. Juan Dela Cruz"
                />
                <Input
                  label="Account Number"
                  value={editingMethod.accountNumber}
                  onChange={(e) => setEditingMethod({ ...editingMethod, accountNumber: e.target.value })}
                  placeholder="e.g. 1234 5678 9012"
                />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">QR Code (Optional)</label>
                  <ImageUploadField 
                    value={editingMethod.qrImageUrl}
                    onChange={(url) => setEditingMethod({ ...editingMethod, qrImageUrl: url })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Additional Details</label>
              <textarea
                className="w-full p-4 rounded-2xl bg-white border border-gray-200 focus:border-orange-500 outline-none min-h-[100px] text-sm font-medium"
                placeholder="e.g. Please send payment confirmation to our Viber number."
                value={editingMethod.details}
                onChange={(e) => setEditingMethod({ ...editingMethod, details: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setEditingMethod(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveMethod} disabled={!editingMethod.name}>
                {isAdding ? 'Create Method' : 'Update Method'}
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {methods.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                <SafeIcon icon={FiCreditCard} className="mx-auto text-4xl text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No payment methods configured yet.</p>
              </div>
            ) : (
              methods.map((method) => (
                <div
                  key={method.id}
                  className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm hover:border-orange-200 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-4 rounded-2xl shrink-0 transition-colors ${method.active ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <SafeIcon icon={FiCreditCard} className="text-2xl" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-lg font-bold text-gray-900">{method.name}</h4>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${method.active ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}>
                            {method.active ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                          {method.accountName && (
                            <div className="flex items-center text-xs text-gray-500">
                              <span className="font-bold text-gray-400 uppercase mr-2 truncate">Name:</span>
                              <span className="font-semibold text-gray-700">{method.accountName}</span>
                            </div>
                          )}
                          {method.accountNumber && (
                            <div className="flex items-center text-xs text-gray-500">
                              <span className="font-bold text-gray-400 uppercase mr-2 truncate">Number:</span>
                              <span className="font-semibold text-gray-700">{method.accountNumber}</span>
                            </div>
                          )}
                        </div>
                        {method.details && (
                          <div className="mt-3 flex items-start space-x-2">
                            <SafeIcon icon={FiInfo} className="text-gray-400 mt-0.5" />
                            <p className="text-xs text-gray-500 leading-relaxed italic">{method.details}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 md:self-start">
                      {method.qrImageUrl && (
                        <div className="p-2 text-orange-600 bg-orange-50 rounded-xl" title="Has QR Code">
                          <SafeIcon icon={FiImage} />
                        </div>
                      )}
                      <button
                        onClick={() => toggleStatus(method.id)}
                        className={`p-2 rounded-xl transition-all ${method.active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                      >
                        <SafeIcon icon={method.active ? FiCheck : FiX} />
                      </button>
                      <button
                        onClick={() => setEditingMethod(method)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <SafeIcon icon={FiEdit2} />
                      </button>
                      <button
                        onClick={() => handleDeleteMethod(method.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <SafeIcon icon={FiTrash2} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentMethodSettings;