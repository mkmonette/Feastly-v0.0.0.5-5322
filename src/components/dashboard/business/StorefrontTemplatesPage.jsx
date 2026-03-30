import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import TemplateRenderer from './storefront/TemplateRenderer';
import { StorefrontProvider } from './storefront/StorefrontContext';
import ModernClassicRenderer from './storefront/modernClassic/ModernClassicRenderer';
import { ModernClassicProvider } from './storefront/modernClassic/ModernClassicContext';
import ModernSplitRenderer from './storefront/modernSplit/ModernSplitRenderer';
import { ModernSplitStorefrontProvider } from './storefront/modernSplit/ModernSplitProvider';
import MobileExpressRenderer from './storefront/mobileExpress/MobileExpressRenderer';
import { MobileExpressProvider } from './storefront/mobileExpress/MobileExpressContext';
import QuickOrderRenderer from './storefront/quickOrder/QuickOrderRenderer';
import { QuickOrderProvider } from './storefront/quickOrder/QuickOrderContext';
import WarmCulinaryRenderer from './storefront/warmCulinary/WarmCulinaryRenderer';
import { WarmCulinaryProvider } from './storefront/warmCulinary/WarmCulinaryContext';
import MinimalRecipeRenderer from './storefront/minimalRecipe/MinimalRecipeRenderer';
import { MinimalRecipeProvider } from './storefront/minimalRecipe/MinimalRecipeContext';
import MobileVisualMenuRenderer from './storefront/mobileVisualMenu/MobileVisualMenuRenderer';
import { MobileVisualMenuProvider } from './storefront/mobileVisualMenu/MobileVisualMenuContext';
import MobileCompactMenuRenderer from './storefront/mobileCompactMenu/MobileCompactMenuRenderer';
import { MobileCompactMenuProvider } from './storefront/mobileCompactMenu/MobileCompactMenuContext';
import MobileNativeRenderer from './storefront/mobileNative/MobileNativeRenderer';
import { MobileNativeProvider } from './storefront/mobileNative/MobileNativeContext';
import ModernDashboardPreview from './storefront/modernDashboard/ModernDashboardPreview';
import ModernMenuCartRenderer from './storefront/modernMenuCart/ModernMenuCartRenderer';
import { ModernMenuCartProvider } from './storefront/modernMenuCart/ModernMenuCartContext';

const CATEGORIES = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ordering_form', label: 'Ordering Form' }
];

const TemplatePreviewCard = ({ categoryId, templateSlug, title, label, description, ProviderComponent, RendererComponent }) => {
  const navigate = useNavigate();

  const handleAction = (type) => {
    if (type === 'view') {
      navigate(`/storefront/templates/${categoryId}/${templateSlug}/preview`);
    } else if (type === 'edit') {
      navigate(`/storefront/templates/${categoryId}/${templateSlug}/edit`);
    }
  };

  const Provider = ProviderComponent || StorefrontProvider;
  const Renderer = RendererComponent || TemplateRenderer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
        {/* Real Scaled Preview */}
        <div className="absolute inset-0 scale-[0.25] origin-top-left pointer-events-none select-none overflow-hidden" style={{ width: '400%', height: '400%' }}>
          <Provider>
            <Renderer />
          </Provider>
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 px-6 z-10">
          <button 
            onClick={() => handleAction('view')}
            className="flex-1 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl text-center"
          >
            View
          </button>
          <button 
            onClick={() => handleAction('edit')}
            className="flex-1 py-3 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl text-center"
          >
            Edit
          </button>
        </div>
      </div>
      <div className="p-8 text-left">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{title}</h3>
          <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest rounded-full">{label}</span>
        </div>
        <p className="text-gray-500 text-sm font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const StorefrontTemplatesPage = () => {
  const [activeTab, setActiveTab] = useState('classic');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-12 text-left">
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase mb-3">
          Template Gallery
        </h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm max-w-2xl">
          Choose a professionally designed base template to jumpstart your storefront.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex items-center space-x-10 mb-12 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`text-sm font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
              activeTab === category.id ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {activeTab === 'classic' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TemplatePreviewCard
              categoryId="classic"
              templateSlug="base-classic"
              title="Base Classic"
              label="Classic"
              description="A timeless multi-section layout perfect for restaurants and food businesses."
            />
            <TemplatePreviewCard
              categoryId="classic"
              templateSlug="modern-classic"
              title="Modern Classic"
              label="Classic"
              description="A contemporary take on classic design with split hero layout and horizontal product carousel."
              ProviderComponent={ModernClassicProvider}
              RendererComponent={ModernClassicRenderer}
            />
            <TemplatePreviewCard
              categoryId="classic"
              templateSlug="warm-culinary"
              title="Warm Culinary"
              label="Classic"
              description="A warm, inviting design with rounded cards, elegant serif typography, and cozy beige tones perfect for culinary businesses."
              ProviderComponent={WarmCulinaryProvider}
              RendererComponent={WarmCulinaryRenderer}
            />
            <TemplatePreviewCard
              categoryId="classic"
              templateSlug="minimal-recipe"
              title="Minimal Recipe"
              label="Classic"
              description="A clean, minimalist design with serif typography, rounded cards, and soft neutrals inspired by modern recipe cards."
              ProviderComponent={MinimalRecipeProvider}
              RendererComponent={MinimalRecipeRenderer}
            />
          </div>
        ) : activeTab === 'modern' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TemplatePreviewCard
              categoryId="modern"
              templateSlug="modern-split"
              title="Modern Split"
              label="Modern"
              description="A modern food ordering layout with content on the left and a full-height cart panel on the right."
              ProviderComponent={ModernSplitStorefrontProvider}
              RendererComponent={ModernSplitRenderer}
            />
            <TemplatePreviewCard
              categoryId="modern"
              templateSlug="modern-dashboard"
              title="Modern Dashboard"
              label="Modern"
              description="A clean, dashboard-style UI with soft cards, rounded corners, and premium design inspired by modern food ordering apps."
              ProviderComponent={React.Fragment}
              RendererComponent={ModernDashboardPreview}
            />
            <TemplatePreviewCard
              categoryId="modern"
              templateSlug="modern-menu-cart"
              title="Modern Menu Cart"
              label="Modern"
              description="A compact, efficient template with content on the left and a full-height cart on the right. Dense, app-like interface perfect for quick ordering."
              ProviderComponent={ModernMenuCartProvider}
              RendererComponent={ModernMenuCartRenderer}
            />
          </div>
        ) : activeTab === 'mobile' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TemplatePreviewCard
              categoryId="mobile"
              templateSlug="mobile-express"
              title="Mobile Express"
              label="Mobile"
              description="A mobile-first food ordering template optimized for phone users, with large touch targets and vertical layout."
              ProviderComponent={MobileExpressProvider}
              RendererComponent={MobileExpressRenderer}
            />
            <TemplatePreviewCard
              categoryId="mobile"
              templateSlug="mobile-visual-menu"
              title="Mobile Visual Menu"
              label="Mobile"
              description="Visual-rich mobile template with emphasis on food photography, large images, and modern card-based design."
              ProviderComponent={MobileVisualMenuProvider}
              RendererComponent={MobileVisualMenuRenderer}
            />
            <TemplatePreviewCard
              categoryId="mobile"
              templateSlug="mobile-compact-menu"
              title="Mobile Compact Menu"
              label="Mobile"
              description="Space-efficient mobile template with compact list layout for quick browsing and fast ordering."
              ProviderComponent={MobileCompactMenuProvider}
              RendererComponent={MobileCompactMenuRenderer}
            />
            <TemplatePreviewCard
              categoryId="mobile"
              templateSlug="mobile-native"
              title="Mobile Native"
              label="Mobile"
              description="iOS-inspired native app design with compact elements, search, and smooth interactions for app-like experience."
              ProviderComponent={MobileNativeProvider}
              RendererComponent={MobileNativeRenderer}
            />
          </div>
        ) : activeTab === 'ordering_form' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TemplatePreviewCard
              categoryId="ordering_form"
              templateSlug="quick-order"
              title="Quick Order Form"
              label="Ordering Form"
              description="Fast ordering layout with 2-column products on mobile and sticky cart panel on desktop."
              ProviderComponent={QuickOrderProvider}
              RendererComponent={QuickOrderRenderer}
            />
          </div>
        ) : (
          <div className="bg-gray-50 rounded-[40px] border border-dashed border-gray-200 min-h-[400px] flex flex-col items-center justify-center p-12 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 border border-gray-100">
                  <SafeIcon icon={FiIcons.FiClock} className="text-3xl text-orange-600" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">
                  Coming Soon
                </h2>
                <p className="text-gray-500 max-w-sm font-medium">
                  We're currently crafting beautiful {CATEGORIES.find(c => c.id === activeTab)?.label} templates. Stay tuned!
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorefrontTemplatesPage;