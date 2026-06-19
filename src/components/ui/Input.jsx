import React from 'react';

const Input = ({ label, error, icon: Icon, ...props }) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
            {Icon}
          </div>
        )}
        <input
          className={`w-full px-4 py-3 rounded-xl border transition-all outline-none text-gray-700
            ${Icon ? 'pl-10' : 'pl-4'}
            ${error 
              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
              : 'border-gray-200 bg-gray-50 focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
            }`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 font-medium ml-1">{error}</p>}
    </div>
  );
};

export default Input;