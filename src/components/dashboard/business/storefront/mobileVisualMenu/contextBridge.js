import { useProducts } from '@/context/ProductContext';
import { mobileVisualMenuTokens } from '../mobileVisualMenuTokens';
import { useMobileVisualMenu } from './MobileVisualMenuContext';

export const useStorefrontTokens = () => mobileVisualMenuTokens;

export const useStorefrontBusinessData = () => {
  const productContext = useProducts();
  return productContext?.businessData || {};
};

export const useStorefront = () => {
  const productContext = useProducts();
  return {
    sectionsConfig: productContext?.sectionsConfig || [],
    designTokens: mobileVisualMenuTokens,
  };
};

export const useStorefrontCart = () => useMobileVisualMenu();
