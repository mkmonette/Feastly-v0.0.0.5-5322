import { useProducts } from '@/context/ProductContext';
import { mobileCardMenuTokens } from '../mobileCardMenuTokens';
import { useMobileCardMenu } from './MobileCardMenuContext';

export const useStorefrontTokens = () => mobileCardMenuTokens;

export const useStorefrontBusinessData = () => {
  const productContext = useProducts();
  return productContext?.businessData || {};
};

export const useStorefront = () => {
  const productContext = useProducts();
  return {
    sectionsConfig: productContext?.sectionsConfig || [],
    designTokens: mobileCardMenuTokens,
  };
};

export const useStorefrontCart = () => useMobileCardMenu();
