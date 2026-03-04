import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiAward, FiExternalLink } = FiIcons;

const SuccessPageSettings = () => {
  return (
    <div className="space-y-6 text-left">
      <div>
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiAward} className="mr-2 text-orange-600" />
          Order Success Experience
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Define what happens after a customer successfully places an order.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-4">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Custom Redirect URL</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
              <SafeIcon icon={FiExternalLink} />
            </div>
            <input 
              type="text" 
              placeholder="https://yourwebsite.com/thank-you"
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 bg-white focus:border-orange-500 outline-none font-bold text-sm"
            />
          </div>
          <p className="text-xs text-gray-400 italic">Leave empty to use the default Feastly success page.</p>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-[2rem] shadow-sm space-y-3">
          <h4 className="font-bold text-gray-900">Default Page Customization</h4>
          <textarea 
            placeholder="Thank you for your order! We will begin preparing your meal shortly."
            className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-orange-500 outline-none min-h-[100px] text-sm font-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessPageSettings;