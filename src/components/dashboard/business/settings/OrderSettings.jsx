import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const { FiHash, FiFileText, FiLayout, FiEye, FiSettings, FiCheck, FiScissors, FiMapPin, FiPhone } = FiIcons;

// Sub-components for different Receipt Previews
const DefaultReceipt = ({ orderId }) => (
  <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 max-w-sm mx-auto space-y-6 border border-gray-50 text-center">
    <div className="space-y-1">
      <div className="w-12 h-12 bg-orange-600 rounded-2xl mx-auto flex items-center justify-center mb-2">
        <SafeIcon icon={FiIcons.FiLayers} className="text-white text-xl" />
      </div>
      <h4 className="font-black text-gray-900">Feastly Store</h4>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">123 Foodie Lane, Manila</p>
    </div>
    <div className="border-t border-b border-dashed border-gray-200 py-4 flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
      <span>Order: {orderId}</span>
      <span>{new Date().toLocaleDateString()}</span>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="font-bold text-gray-700">2x Truffle Burger</span>
        <span className="font-black text-gray-900">₱750.00</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="font-bold text-gray-700">1x French Fries</span>
        <span className="font-black text-gray-900">₱150.00</span>
      </div>
    </div>
    <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
      <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Total</span>
      <span className="text-2xl font-black text-orange-600">₱900.00</span>
    </div>
    <div className="text-center pt-4">
      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">Thank you for your order!</p>
    </div>
  </div>
);

const ModernCompactReceipt = ({ orderId }) => (
  <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-6 max-w-sm mx-auto space-y-4 border border-gray-100">
    <div className="flex justify-between items-start">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center">
          <SafeIcon icon={FiIcons.FiLayers} className="text-white text-sm" />
        </div>
        <h4 className="font-black text-gray-900 text-sm">FEASTLY</h4>
      </div>
      <div className="text-right">
        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Order ID</p>
        <p className="text-xs font-black text-gray-900">{orderId}</p>
      </div>
    </div>
    <div className="space-y-2 bg-gray-50 p-4 rounded-2xl">
      <div className="flex justify-between text-xs font-bold text-gray-600">
        <span>Truffle Burger x2</span>
        <span>₱750</span>
      </div>
      <div className="flex justify-between text-xs font-bold text-gray-600">
        <span>French Fries x1</span>
        <span>₱150</span>
      </div>
    </div>
    <div className="flex justify-between items-center px-2">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subtotal</span>
      <span className="text-lg font-black text-gray-900">₱900.00</span>
    </div>
    <div className="text-center border-t border-gray-100 pt-3">
      <p className="text-[8px] font-bold text-gray-400">Paid via GCash • {new Date().toLocaleDateString()}</p>
    </div>
  </div>
);

const MinimalReceipt = ({ orderId }) => (
  <div className="bg-white p-8 max-w-sm mx-auto space-y-6 text-left border-t-8 border-orange-600 shadow-lg">
    <div className="space-y-1">
      <h4 className="text-2xl font-black text-gray-900 tracking-tighter">Receipt</h4>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">#{orderId}</p>
    </div>
    <div className="space-y-4">
      <div className="flex justify-between items-baseline border-b border-gray-50 pb-2">
        <span className="text-sm font-medium text-gray-600">Truffle Burger x2</span>
        <span className="text-sm font-bold text-gray-900">₱750.00</span>
      </div>
      <div className="flex justify-between items-baseline border-b border-gray-50 pb-2">
        <span className="text-sm font-medium text-gray-600">French Fries x1</span>
        <span className="text-sm font-bold text-gray-900">₱150.00</span>
      </div>
    </div>
    <div className="flex justify-between items-center pt-2">
      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Amount Due</span>
      <span className="text-3xl font-black text-gray-900 tracking-tighter">₱900</span>
    </div>
    <p className="text-[9px] text-gray-400 font-medium italic text-center pt-4">Verified by Feastly Systems</p>
  </div>
);

const ModernCardReceipt = ({ orderId }) => (
  <div className="bg-orange-600 rounded-[2.5rem] p-1 shadow-2xl shadow-orange-200 max-w-sm mx-auto">
    <div className="bg-white rounded-[2.3rem] p-8 space-y-6">
      <div className="text-center">
        <div className="bg-orange-50 w-16 h-16 rounded-3xl mx-auto flex items-center justify-center mb-3">
          <SafeIcon icon={FiCheck} className="text-orange-600 text-3xl" />
        </div>
        <h4 className="text-xl font-black text-gray-900">Order Successful</h4>
        <p className="text-xs font-bold text-gray-400 mt-1">Order ID: {orderId}</p>
      </div>
      <div className="space-y-3 bg-gray-50 p-5 rounded-3xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm text-xs font-black text-orange-600">2x</div>
            <span className="text-xs font-bold text-gray-700">Truffle Burger</span>
          </div>
          <span className="text-xs font-black text-gray-900">₱750</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm text-xs font-black text-orange-600">1x</div>
            <span className="text-xs font-bold text-gray-700">French Fries</span>
          </div>
          <span className="text-xs font-black text-gray-900">₱150</span>
        </div>
      </div>
      <div className="flex justify-between items-center px-2">
        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Paid</span>
        <span className="text-2xl font-black text-gray-900">₱900.00</span>
      </div>
    </div>
  </div>
);

const InvoiceReceipt = ({ orderId }) => (
  <div className="bg-white border border-gray-200 p-8 max-w-sm mx-auto space-y-6 shadow-sm font-sans">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <h4 className="text-lg font-black text-gray-900 uppercase">INVOICE</h4>
        <p className="text-[10px] font-bold text-gray-400">NO. {orderId}</p>
      </div>
      <div className="text-right text-[10px] font-bold text-gray-500">
        <p>FEASTLY FOOD INC.</p>
        <p>TIN: 000-123-456-789</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 text-[10px] border-y border-gray-100 py-4">
      <div className="space-y-1">
        <p className="font-black text-gray-400 uppercase tracking-widest">Bill To</p>
        <p className="font-bold text-gray-900 uppercase">CASH CUSTOMER</p>
      </div>
      <div className="text-right space-y-1">
        <p className="font-black text-gray-400 uppercase tracking-widest">Date</p>
        <p className="font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-gray-100">
          <th className="py-2 text-[10px] font-black text-gray-400 uppercase">Item</th>
          <th className="py-2 text-[10px] font-black text-gray-400 uppercase text-right">Price</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        <tr>
          <td className="py-3 text-[11px] font-bold text-gray-700">Truffle Burger x2</td>
          <td className="py-3 text-[11px] font-black text-gray-900 text-right">750.00</td>
        </tr>
        <tr>
          <td className="py-3 text-[11px] font-bold text-gray-700">French Fries x1</td>
          <td className="py-3 text-[11px] font-black text-gray-900 text-right">150.00</td>
        </tr>
      </tbody>
    </table>
    <div className="pt-4 space-y-2">
      <div className="flex justify-between items-center text-[10px] font-bold">
        <span className="text-gray-400 uppercase">VAT Exclusive</span>
        <span className="text-gray-900">₱803.57</span>
      </div>
      <div className="flex justify-between items-center text-[10px] font-bold">
        <span className="text-gray-400 uppercase">VAT (12%)</span>
        <span className="text-gray-900">₱96.43</span>
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <span className="text-xs font-black text-gray-900 uppercase">Total Amount</span>
        <span className="text-xl font-black text-gray-900 font-mono">₱900.00</span>
      </div>
    </div>
  </div>
);

const OrderSettings = () => {
  const [settings, setSettings] = useState({
    prefix: 'ORD',
    suffix: '-2026',
    numberPadding: 4,
    nextNumber: 5,
    receiptTemplate: 'Modern (Compact)'
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // In a real app, fetch from Supabase here
    // const fetchSettings = async () => {
    //   const { data } = await supabase.from('order_settings').select('*').single();
    //   if (data) setSettings(data);
    // };
    // fetchSettings();
    console.log("Fetching order settings for business...");
  }, []);

  const templates = [
    { id: 'Default', name: 'Default', description: 'Standard business receipt' },
    { id: 'Modern (Compact)', name: 'Modern (Compact)', description: 'Sleek, space-saving design' },
    { id: 'Minimal', name: 'Minimal', description: 'Clean and simple layout' },
    { id: 'Modern (Card)', name: 'Modern (Card)', description: 'Card-based stylish format' },
    { id: 'Invoice', name: 'Invoice', description: 'Professional tax invoice style' }
  ];

  const generatePreviewId = () => {
    const numStr = String(settings.nextNumber).padStart(settings.numberPadding, '0');
    return `${settings.prefix}${numStr}${settings.suffix}`;
  };

  const handleSave = () => {
    setSaving(true);
    // Simulate API call to save per businessId
    setTimeout(() => {
      setSaving(false);
      alert(`Settings saved for business! Template: ${settings.receiptTemplate}`);
    }, 1000);
  };

  const renderReceiptPreview = () => {
    const orderId = generatePreviewId();
    switch (settings.receiptTemplate) {
      case 'Modern (Compact)': return <ModernCompactReceipt orderId={orderId} />;
      case 'Minimal': return <MinimalReceipt orderId={orderId} />;
      case 'Modern (Card)': return <ModernCardReceipt orderId={orderId} />;
      case 'Invoice': return <InvoiceReceipt orderId={orderId} />;
      default: return <DefaultReceipt orderId={orderId} />;
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8 text-left">
      <div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Order Settings</h2>
        <p className="text-gray-500 mt-1 font-medium">Configure how your orders are identified and how receipts look.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order ID Configuration */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <SafeIcon icon={FiHash} className="mr-2 text-orange-600" />
              Order ID Format
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Prefix"
                value={settings.prefix}
                onChange={(e) => setSettings({ ...settings, prefix: e.target.value })}
                placeholder="e.g. ORD-"
              />
              <Input
                label="Suffix"
                value={settings.suffix}
                onChange={(e) => setSettings({ ...settings, suffix: e.target.value })}
                placeholder="e.g. -2026"
              />
              <Input
                label="Number Padding"
                type="number"
                min="1"
                value={settings.numberPadding}
                onChange={(e) => setSettings({ ...settings, numberPadding: parseInt(e.target.value) || 1 })}
              />
              <Input
                label="Next Number"
                type="number"
                min="1"
                value={settings.nextNumber}
                onChange={(e) => setSettings({ ...settings, nextNumber: parseInt(e.target.value) || 1 })}
              />
            </div>

            <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
              <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2">Live Preview (Next Order)</p>
              <div className="text-2xl font-black text-gray-900 tracking-tighter">
                {generatePreviewId()}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <SafeIcon icon={FiLayout} className="mr-2 text-orange-600" />
              Receipt Template
            </h3>
            
            <div className="space-y-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSettings({ ...settings, receiptTemplate: t.id })}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    settings.receiptTemplate === t.id 
                      ? 'border-orange-600 bg-orange-50/50' 
                      : 'border-gray-100 hover:border-orange-200'
                  }`}
                >
                  <div className="text-left">
                    <p className={`font-bold text-sm ${settings.receiptTemplate === t.id ? 'text-orange-600' : 'text-gray-900'}`}>{t.name}</p>
                    <p className="text-xs text-gray-400 font-medium">{t.description}</p>
                  </div>
                  {settings.receiptTemplate === t.id && (
                    <SafeIcon icon={FiCheck} className="text-orange-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Receipt Preview Area */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-[40px] border border-gray-100 p-8 sticky top-10 flex flex-col min-h-[700px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center">
                <SafeIcon icon={FiEye} className="mr-2 text-gray-400" />
                Live Preview
              </h3>
              <span className="text-[10px] font-black bg-white px-3 py-1 rounded-full border border-gray-100 text-orange-600 uppercase tracking-widest shadow-sm">
                {settings.receiptTemplate}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={settings.receiptTemplate + generatePreviewId()}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  {renderReceiptPreview()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10">
              <Button 
                variant="primary" 
                fullWidth 
                onClick={handleSave} 
                loading={saving}
                className="rounded-2xl py-4 text-lg"
              >
                Save All Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSettings;