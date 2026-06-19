import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const { FiTruck, FiMapPin, FiClock } = FiIcons;

const DeliverySettings = () => {
  return (
    <div className="space-y-6 text-left">
      <div>
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <SafeIcon icon={FiTruck} className="mr-2 text-orange-600" />
          Delivery Configuration
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Manage your delivery zones, fees, and estimated times.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label="Maximum Delivery Distance (km)" 
          type="number" 
          placeholder="5"
          icon={<SafeIcon icon={FiMapPin} />}
        />
        <Input 
          label="Average Delivery Time (mins)" 
          type="number" 
          placeholder="45"
          icon={<SafeIcon icon={FiClock} />}
        />
      </div>

      <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex items-start space-x-4">
        <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
          <SafeIcon icon={FiIcons.FiNavigation} className="text-xl" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900">Zone-Based Delivery</h4>
          <p className="text-sm text-blue-700/70 mt-1">
            Setting up custom delivery zones allows you to charge different fees based on the customer's district or neighborhood.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-bold text-gray-900">Order Fulfillment Types</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['Delivery', 'Pickup', 'Dine-in'].map((mode) => (
            <div key={mode} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <span className="font-semibold text-gray-700">{mode}</span>
              <button className="w-12 h-6 rounded-full bg-orange-600 relative">
                <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <Button variant="primary" className="px-8">Save Delivery Config</Button>
      </div>
    </div>
  );
};

export default DeliverySettings;