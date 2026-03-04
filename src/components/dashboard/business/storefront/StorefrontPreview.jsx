import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import TemplateRenderer from './TemplateRenderer';
import { StorefrontProvider } from './StorefrontContext';

const StorefrontPreviewContent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative">
      {/* Back Button Overlay - Relocated to Bottom Right */}
      <div className="fixed bottom-8 right-8 z-[60]">
        <button 
          onClick={() => navigate('/storefront')}
          className="flex items-center gap-2 px-8 py-4 bg-black text-white text-[12px] font-black uppercase tracking-widest rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/10 group"
        >
          <SafeIcon icon={FiIcons.FiArrowLeft} className="text-lg group-hover:-translate-x-1 transition-transform" />
          Back to Templates
        </button>
      </div>

      {/* Full Template Rendering */}
      <TemplateRenderer />
    </div>
  );
};

const StorefrontPreview = () => {
  return (
    <StorefrontProvider>
      <StorefrontPreviewContent />
    </StorefrontProvider>
  );
};

export default StorefrontPreview;