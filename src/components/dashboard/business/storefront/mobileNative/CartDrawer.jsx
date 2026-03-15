import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { formatCurrency } from '@/common/currency';

const CartDrawer = ({ isOpen, onClose }) => {
  const { tokens, cart, removeFromCart, updateCartQuantity } = useMobileNative();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: tokens.colors.background }}
      >
        <div className="flex flex-col h-full">
          <div
            className="flex items-center justify-between px-4 h-14 bg-white border-b"
            style={{ borderColor: tokens.colors.border }}
          >
            <h2
              className={`text-[17px] ${tokens.typography.headingWeight}`}
              style={{ color: tokens.colors.primaryText }}
            >
              Cart
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg active:scale-95 transition-transform"
              style={{ color: tokens.colors.sectionNormalText }}
            >
              <SafeIcon icon={FiIcons.FiX} className="text-[24px]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <SafeIcon
                  icon={FiIcons.FiShoppingBag}
                  className="text-6xl mb-3"
                  style={{ color: tokens.colors.border }}
                />
                <p
                  className="text-[15px]"
                  style={{ color: tokens.colors.sectionNormalText }}
                >
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white ${tokens.layout.borderRadius.card} p-2.5 border`}
                    style={{
                      borderColor: tokens.colors.border,
                      boxShadow: tokens.effects.shadow.card
                    }}
                  >
                    <div className="flex gap-2.5">
                      <div className={`w-16 h-16 ${tokens.layout.borderRadius.image} overflow-hidden bg-gray-100 flex-shrink-0`}>
                        {item.images?.[0] ? (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <SafeIcon icon={FiIcons.FiImage} className="text-xl text-gray-300" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-[14px] ${tokens.typography.headingWeight} mb-1`}
                          style={{ color: tokens.colors.primaryText }}
                        >
                          {item.name}
                        </h3>

                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[15px] ${tokens.typography.headingWeight}`}
                            style={{ color: tokens.colors.primary }}
                          >
                            {formatCurrency(item.price * item.quantity)}
                          </span>

                          <div className="flex items-center gap-2">
                            <div
                              className="flex items-center gap-1 rounded-lg border"
                              style={{ borderColor: tokens.colors.border }}
                            >
                              <button
                                onClick={() => updateCartQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="w-7 h-7 flex items-center justify-center active:scale-90 transition-transform"
                                style={{ color: tokens.colors.primary }}
                              >
                                <SafeIcon icon={FiIcons.FiMinus} className="text-[14px]" />
                              </button>
                              <span
                                className="text-[14px] font-semibold w-6 text-center"
                                style={{ color: tokens.colors.primaryText }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center active:scale-90 transition-transform"
                                style={{ color: tokens.colors.primary }}
                              >
                                <SafeIcon icon={FiIcons.FiPlus} className="text-[14px]" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg active:scale-90 transition-transform"
                              style={{ color: tokens.colors.systemRed }}
                            >
                              <SafeIcon icon={FiIcons.FiTrash2} className="text-[14px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div
              className="border-t bg-white px-4 py-3"
              style={{ borderColor: tokens.colors.border }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[15px]"
                  style={{ color: tokens.colors.sectionNormalText }}
                >
                  Total
                </span>
                <span
                  className={`text-[22px] ${tokens.typography.headingWeight}`}
                  style={{ color: tokens.colors.primaryText }}
                >
                  {formatCurrency(total)}
                </span>
              </div>

              <button
                className={`w-full py-3 ${tokens.layout.borderRadius.button} text-[15px] font-semibold text-white active:scale-[0.98] transition-transform`}
                style={{
                  backgroundColor: tokens.colors.primary,
                  boxShadow: tokens.effects.shadow.button
                }}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
