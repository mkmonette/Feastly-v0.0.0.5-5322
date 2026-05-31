import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const { FiPercent, FiFileText } = FiIcons;

const TaxSettings = () => {
  return (
    <div className="space-y-6 text-left">
      <div>
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiFileText} className="mr-2 text-orange-600" />
          Tax Configuration
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Set up your tax rates and how they are applied to orders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label="Default Tax Rate (%)" 
          type="number" 
          placeholder="12"
          icon={<SafeIcon icon={FiPercent} />}
        />
        <div className="space-y-2">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Tax Calculation</label>
          <select className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-orange-500 outline-none font-bold text-sm text-gray-700">
            <option>Inclusive (Tax is built into the price)</option>
            <option>Exclusive (Tax is added on top of the price)</option>
          </select>
        </div>
      </div>

      <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
        <h4 className="font-bold text-gray-900 mb-4">Tax Exemptions</h4>
        <div className="space-y-3">
          {['Senior Citizens', 'PWD', 'Diplomats'].map((type) => (
            <label key={type} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 cursor-pointer">
              <span className="font-semibold text-gray-700">{type}</span>
              <input type="checkbox" className="w-5 h-5 accent-orange-600" />
            </label>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <Button variant="primary" className="px-8">Save Tax Rules</Button>
      </div>
    </div>
  );
};

export default TaxSettings;