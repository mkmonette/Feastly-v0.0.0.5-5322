import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { motion, Reorder, AnimatePresence } from 'framer-motion';

const { FiPlus, FiTrash2, FiEdit2, FiMove, FiCheck, FiX, FiSettings, FiGrid } = FiIcons;

const CustomFieldsSettings = () => {
  const [fields, setFields] = useState([
    {
      id: '1',
      label: 'Special Instructions',
      type: 'textarea',
      required: false,
      placeholder: 'Enter cooking preferences...',
      options: [],
      active: true,
      order: 1
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const fieldTypes = [
    { value: 'text', label: 'Short Text' },
    { value: 'textarea', label: 'Long Text' },
    { value: 'number', label: 'Number' },
    { value: 'select', label: 'Dropdown' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date' },
  ];

  const handleAddField = () => {
    setEditingField({
      label: '',
      type: 'text',
      required: false,
      placeholder: '',
      options: [],
      active: true
    });
    setIsAdding(true);
  };

  const handleSaveField = () => {
    if (isAdding) {
      setFields([...fields, { ...editingField, id: Date.now().toString(), order: fields.length + 1 }]);
    } else {
      setFields(fields.map(f => f.id === editingField.id ? editingField : f));
    }
    setIsAdding(false);
    setEditingField(null);
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const toggleStatus = (id) => {
    setFields(fields.map(f => f.id === id ? { ...f, active: !f.active } : f));
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <SafeIcon icon={FiGrid} className="mr-2 text-orange-600" />
            Custom Checkout Fields
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Collect additional information from customers during checkout.
          </p>
        </div>
        {!editingField && (
          <Button variant="primary" onClick={handleAddField} className="flex items-center space-x-2">
            <SafeIcon icon={FiPlus} />
            <span>Add Field</span>
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {editingField ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Field Label"
                value={editingField.label}
                onChange={(e) => setEditingField({ ...editingField, label: e.target.value })}
                placeholder="e.g. Birthday"
              />
              <div className="space-y-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Field Type</label>
                <select
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:border-orange-500 outline-none font-bold text-sm text-gray-700"
                  value={editingField.type}
                  onChange={(e) => setEditingField({ ...editingField, type: e.target.value })}
                >
                  {fieldTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <Input
                label="Placeholder Text"
                value={editingField.placeholder}
                onChange={(e) => setEditingField({ ...editingField, placeholder: e.target.value })}
                placeholder="e.g. Select your date"
              />
              <div className="flex items-center space-x-4 h-full pt-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingField.required}
                    onChange={(e) => setEditingField({ ...editingField, required: e.target.checked })}
                    className="w-5 h-5 accent-orange-600"
                  />
                  <span className="text-sm font-bold text-gray-700">Required Field</span>
                </label>
              </div>
            </div>

            {['select', 'radio', 'checkbox'].includes(editingField.type) && (
              <div className="space-y-4">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Options (Comma separated)</label>
                <textarea
                  className="w-full p-4 rounded-2xl bg-white border border-gray-200 focus:border-orange-500 outline-none min-h-[80px] text-sm font-medium"
                  placeholder="Option 1, Option 2, Option 3"
                  value={editingField.options.join(', ')}
                  onChange={(e) => setEditingField({ ...editingField, options: e.target.value.split(',').map(o => o.trim()) })}
                />
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setEditingField(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveField} disabled={!editingField.label}>
                {isAdding ? 'Create Field' : 'Update Field'}
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {fields.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                <SafeIcon icon={FiSettings} className="mx-auto text-4xl text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">No custom fields created yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-3xl shadow-sm group hover:border-orange-200 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 group-hover:text-orange-600 transition-colors">
                        <SafeIcon icon={FiMove} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-gray-900">{field.label}</h4>
                          {field.required && (
                            <span className="text-[10px] font-black uppercase text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Required</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{field.type}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${field.active ? 'text-green-500' : 'text-gray-400'}`}>
                            {field.active ? 'Active' : 'Disabled'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleStatus(field.id)}
                        className={`p-2 rounded-xl transition-all ${field.active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                        title={field.active ? 'Disable' : 'Enable'}
                      >
                        <SafeIcon icon={field.active ? FiCheck : FiX} />
                      </button>
                      <button
                        onClick={() => setEditingField(field)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Edit"
                      >
                        <SafeIcon icon={FiEdit2} />
                      </button>
                      <button
                        onClick={() => handleDeleteField(field.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete"
                      >
                        <SafeIcon icon={FiTrash2} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomFieldsSettings;