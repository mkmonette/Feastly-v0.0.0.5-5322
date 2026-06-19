import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiCheckCircle, FiLayout } = FiIcons;

const CheckoutFormSettings = () => {
  return (
    <div className="space-y-6 text-left">
      <div>
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiLayout} className="mr-2 text-orange-600" />
          Checkout Form Fields
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Customize what information you collect from customers during checkout.
        </p>
      </div>

      <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-start space-x-4">
        <div className="p-2 bg-orange-100 rounded-xl text-orange-600">
          <SafeIcon icon={FiIcons.FiInfo} className="text-xl" />
        </div>
        <div>
          <h4 className="font-bold text-orange-900">Custom Form Builder</h4>
          <p className="text-sm text-orange-700/70 mt-1 text-left">
            Drag and drop fields to build your perfect checkout experience. This feature is coming soon to your dashboard.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: 'Full Name', required: true },
          { label: 'Phone Number', required: true },
          { label: 'Delivery Address', required: true },
          { label: 'Special Instructions', required: false },
          { label: 'Vat/Tax ID', required: false },
        ].map((field, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-orange-600">
                <SafeIcon icon={FiCheckCircle} />
              </div>
              <span className="font-semibold text-gray-700">{field.label}</span>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${field.required ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
              {field.required ? 'Required' : 'Optional'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutFormSettings;