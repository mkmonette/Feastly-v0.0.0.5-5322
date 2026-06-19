import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiUploadCloud, FiLink, FiX, FiImage, FiCheck, FiAlertCircle } = FiIcons;

/**
 * Universal Image Upload Component
 * Supports: Image URL input, File Upload (Base64), Preview Thumbnail
 * Features: 2MB limit, File type validation, Auto-fill URL field
 */
const ImageUploadField = ({ label, value, onChange, placeholder = "Image URL", className = "" }) => {
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file (PNG, JPG, WEBP)");
      return;
    }

    // 2. Limit size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      setError("File is too large. Maximum size is 2MB.");
      return;
    }

    setError(null);

    // 3. Convert to Base64
    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(event.target.result);
    };
    reader.onerror = () => {
      setError("Failed to read file");
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (e) => {
    setError(null);
    onChange(e.target.value);
  };

  const clearImage = (e) => {
    e.stopPropagation();
    onChange('');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 text-left ${className}`}>
      {label && <label className="block text-xs font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>}
      
      <div className="flex flex-col gap-3">
        {/* URL Input & Upload Button Combined */}
        <div className="flex gap-2">
          <div className="relative flex-1 group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
              <SafeIcon icon={FiLink} />
            </div>
            <input
              type="text"
              placeholder={placeholder}
              value={value?.startsWith('data:image') ? 'Uploaded Image' : (value || '')}
              onChange={handleUrlChange}
              readOnly={value?.startsWith('data:image')}
              className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none transition-all ${
                value?.startsWith('data:image') ? 'text-orange-600 font-bold' : 'text-gray-700 dark:text-gray-300'
              } focus:border-orange-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-950/20`}
            />
            {value && (
              <button 
                onClick={clearImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <SafeIcon icon={FiX} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:border-orange-500 hover:text-orange-600 transition-all flex items-center gap-2 shadow-sm shrink-0"
          >
            <SafeIcon icon={FiUploadCloud} />
            <span className="text-xs font-bold uppercase tracking-wider">Upload</span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950/20 p-2 rounded-lg overflow-hidden"
            >
              <SafeIcon icon={FiAlertCircle} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Preview Thumbnail */}
        {value && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-32 w-full rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-inner group"
          >
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={clearImage}
                className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <SafeIcon icon={FiX} />
              </button>
              <div className="p-2 bg-green-500 text-white rounded-full shadow-lg cursor-default">
                <SafeIcon icon={FiCheck} />
              </div>
            </div>
            {value.startsWith('data:image') && (
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-orange-500 text-white text-[8px] font-black uppercase rounded shadow-lg">
                Original Local File
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadField;