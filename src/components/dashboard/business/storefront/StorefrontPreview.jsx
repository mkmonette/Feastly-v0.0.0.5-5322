import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import TemplateRenderer from './TemplateRenderer';
import { StorefrontProvider } from './StorefrontContext';
import ModernClassicRenderer from './modernClassic/ModernClassicRenderer';
import { ModernClassicProvider } from './modernClassic/ModernClassicContext';
import ModernSplitRenderer from './modernSplit/ModernSplitRenderer';
import { ModernSplitStorefrontProvider } from './modernSplit/ModernSplitProvider';
import MobileExpressRenderer from './mobileExpress/MobileExpressRenderer';
import { MobileExpressProvider } from './mobileExpress/MobileExpressContext';
import QuickOrderRenderer from './quickOrder/QuickOrderRenderer';
import { QuickOrderProvider } from './quickOrder/QuickOrderContext';
import WarmCulinaryRenderer from './warmCulinary/WarmCulinaryRenderer';
import { WarmCulinaryProvider } from './warmCulinary/WarmCulinaryContext';
import MinimalRecipeRenderer from './minimalRecipe/MinimalRecipeRenderer';
import { MinimalRecipeProvider } from './minimalRecipe/MinimalRecipeContext';
import MobileVisualMenuRenderer from './mobileVisualMenu/MobileVisualMenuRenderer';
import { MobileVisualMenuProvider } from './mobileVisualMenu/MobileVisualMenuContext';
import MobileCompactMenuRenderer from './mobileCompactMenu/MobileCompactMenuRenderer';
import { MobileCompactMenuProvider } from './mobileCompactMenu/MobileCompactMenuContext';
import MobileNativeRenderer from './mobileNative/MobileNativeRenderer';
import { MobileNativeProvider } from './mobileNative/MobileNativeContext';
import BoldClassicRenderer from './boldClassic/BoldClassicRenderer';
import { BoldClassicProvider } from './boldClassic/BoldClassicContext';
import FreshCartRenderer from './freshCart/FreshCartRenderer';
import { FreshCartProvider } from './freshCart/FreshCartContext';
import ModernGradientRenderer from './modernGradient/ModernGradientRenderer';
import { ModernGradientProvider } from './modernGradient/ModernGradientContext';

const TEMPLATE_CONFIG = {
  'base-classic': {
    Provider: StorefrontProvider,
    Renderer: TemplateRenderer
  },
  'modern-classic': {
    Provider: ModernClassicProvider,
    Renderer: ModernClassicRenderer
  },
  'bold-classic': {
    Provider: BoldClassicProvider,
    Renderer: BoldClassicRenderer
  },
  'fresh-cart': {
    Provider: FreshCartProvider,
    Renderer: FreshCartRenderer
  },
  'modern-gradient': {
    Provider: ModernGradientProvider,
    Renderer: ModernGradientRenderer
  },
  'modern-split': {
    Provider: ModernSplitStorefrontProvider,
    Renderer: ModernSplitRenderer
  },
  'warm-culinary': {
    Provider: WarmCulinaryProvider,
    Renderer: WarmCulinaryRenderer
  },
  'minimal-recipe': {
    Provider: MinimalRecipeProvider,
    Renderer: MinimalRecipeRenderer
  },
  'mobile-express': {
    Provider: MobileExpressProvider,
    Renderer: MobileExpressRenderer
  },
  'mobile-visual-menu': {
    Provider: MobileVisualMenuProvider,
    Renderer: MobileVisualMenuRenderer
  },
  'mobile-compact-menu': {
    Provider: MobileCompactMenuProvider,
    Renderer: MobileCompactMenuRenderer
  },
  'mobile-native': {
    Provider: MobileNativeProvider,
    Renderer: MobileNativeRenderer
  },
  'quick-order': {
    Provider: QuickOrderProvider,
    Renderer: QuickOrderRenderer
  }
};

const StorefrontPreviewContent = ({ Renderer }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white relative">
      <div className="fixed bottom-8 right-8 z-[60]">
        <button
          onClick={() => navigate('/storefront')}
          className="flex items-center gap-2 px-8 py-4 bg-black text-white text-[12px] font-black uppercase tracking-widest rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/10 group"
        >
          <SafeIcon icon={FiIcons.FiArrowLeft} className="text-lg group-hover:-translate-x-1 transition-transform" />
          Back to Templates
        </button>
      </div>

      <Renderer />
    </div>
  );
};

const StorefrontPreview = () => {
  const { templateSlug } = useParams();
  const config = TEMPLATE_CONFIG[templateSlug] || TEMPLATE_CONFIG['base-classic'];
  const Provider = config.Provider;
  const Renderer = config.Renderer;

  return (
    <Provider>
      <StorefrontPreviewContent Renderer={Renderer} />
    </Provider>
  );
};

export default StorefrontPreview;