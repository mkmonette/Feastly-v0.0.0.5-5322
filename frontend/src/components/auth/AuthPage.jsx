import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toast from '@/components/ui/Toast';

const { FiMail, FiLock, FiUser, FiShield, FiBriefcase, FiShoppingBag, FiChevronDown } = FiIcons;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('Customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const roles = [
    { id: 'Admin', icon: FiShield, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'Business', icon: FiBriefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'Customer', icon: FiShoppingBag, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const dummyCredentials = {
    Admin: { email: 'admin@example.com', password: 'admin123' },
    Business: { email: 'business@example.com', password: 'business123' },
    Customer: { email: 'customer@example.com', password: 'customer123' },
  };

  const handleAutofill = (selectedRole) => {
    setRole(selectedRole);
    setFormData({
      ...formData,
      email: dummyCredentials[selectedRole].email,
      password: dummyCredentials[selectedRole].password,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!isLogin && !formData.name) newErrors.name = 'Name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setToast({
        type: 'success',
        message: `${isLogin ? 'Login' : 'Registration'} successful as ${role}!`,
      });
    } else {
      setToast({
        type: 'error',
        message: 'Please fix the errors below.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-600 p-3 rounded-2xl shadow-lg">
            <SafeIcon icon={FiIcons.FiLayers} className="text-white text-3xl" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Welcome back to Feastly' : 'Create your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }}
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            {isLogin ? 'Register now' : 'Login here'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-gray-100">
          
          {/* Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                !isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'register'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {!isLogin && (
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    icon={<SafeIcon icon={FiUser} />}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                  />
                )}

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  icon={<SafeIcon icon={FiMail} />}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  icon={<SafeIcon icon={FiLock} />}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  error={errors.password}
                />

                {/* Role Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 ml-1">
                    Select Role
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {roles.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                          role === r.id 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                      >
                        <div className={`p-2 rounded-lg mb-2 ${r.bg} ${r.color}`}>
                          <SafeIcon icon={r.icon} className="text-xl" />
                        </div>
                        <span className={`text-xs font-bold ${role === r.id ? 'text-orange-700' : 'text-gray-500'}`}>
                          {r.id}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div>
              <Button variant="primary" className="w-full py-4 text-lg">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </div>
          </form>

          {/* Quick Login Section */}
          {isLogin && (
            <div className="mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-medium">Quick Demo Access</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleAutofill(r.id)}
                    className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${r.bg} ${r.color}`}>
                        <SafeIcon icon={r.icon} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                        Login as {r.id}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">Autofill</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;