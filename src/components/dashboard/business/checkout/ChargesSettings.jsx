import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { CURRENCY_CONFIG } from '@/common/currency';

const { FiDollarSign, FiPlusCircle } = FiIcons;

const ChargesSettings = () => {
  return (
    <div className="space-y-6 text-left">
      <div>
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiDollarSign} className="mr-2 text-orange-600" />
          Service & Misc Charges
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Configure additional fees like service charges, packaging, or handling.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { label: 'Service Charge (%)', value: '10' },
          { label: `Packaging Fee (${CURRENCY_CONFIG.symbol})`, value: '25.00' },
          { label: `Holiday Surcharge (${CURRENCY_CONFIG.symbol})`, value: '50.00' },
        ].map((charge, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <Input 
              label={charge.label} 
              type="number" 
              defaultValue={charge.value}
              icon={<SafeIcon icon={FiDollarSign} />}
            />
            <div className="flex space-x-2">
              <select className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-orange-500 outline-none font-bold text-sm text-gray-700">
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <Button variant="outline" className="p-3 text-red-500 border-red-100 hover:bg-red-50">
                <SafeIcon icon={FiIcons.FiTrash2} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button className="flex items-center space-x-2 text-sm font-black text-orange-600 uppercase tracking-widest hover:underline">
        <SafeIcon icon={FiPlusCircle} />
        <span>Add New Charge Type</span>
      </button>

      <div className="pt-4">
        <Button variant="primary" className="px-8">Update Charges</Button>
      </div>
    </div>
  );
};

export default ChargesSettings;