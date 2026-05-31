import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernBite } from './ModernBiteContext';

const CartPanel = () => {
  const { tokens, cart, updateQuantity, cartTotal } = useModernBite();

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-100 shadow-xl">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <SafeIcon icon={FiIcons.FiShoppingBag} className="text-xl text-gray-700" />
        <h2 className="text-lg font-black text-gray-900 tracking-tight">My Cart</h2>
      </div>
      
      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#fbfbfb]">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
            <SafeIcon icon={FiIcons.FiShoppingBag} className="text-3xl text-gray-300" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2 text-lg">Your cart is empty</h3>
          <p className="text-sm text-gray-500 font-medium">Add some delicious items!</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fbfbfb]">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="font-bold text-sm text-gray-900 mb-1">{item.name}</div>
                <div className="text-xs font-black" style={{ color: tokens.colors.primary }}>${item.price.toFixed(2)}</div>
                <div className="flex items-center gap-3 mt-auto">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <SafeIcon icon={FiIcons.FiMinus} className="text-xs" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white transition-colors"
                    style={{ backgroundColor: tokens.colors.primary }}
                  >
                    <SafeIcon icon={FiIcons.FiPlus} className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="p-6 bg-white border-t border-gray-100 space-y-4">
        <div className="flex items-center justify-between text-sm font-bold text-gray-500">
          <span>Subtotal</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between font-black text-lg text-gray-900">
          <span>Total</span>
          <span style={{ color: tokens.colors.primary }}>${cartTotal.toFixed(2)}</span>
        </div>
        <button 
          className={`w-full py-4 rounded-2xl font-black uppercase tracking-wider transition-all mt-4 shadow-md ${cart.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'text-white hover:opacity-90'}`}
          style={cart.length > 0 ? { backgroundColor: tokens.colors.primary } : {}}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPanel;