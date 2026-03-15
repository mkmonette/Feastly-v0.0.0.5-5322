import { useProducts } from '@/context/ProductContext';
import { mobileCompactMenuTokens } from '../mobileCompactMenuTokens';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

export const useStorefrontTokens = () => mobileCompactMenuTokens;

export const useStorefrontBusinessData = () => {
  const productContext = useProducts();
  return productContext?.businessData || {};
};

export const useStorefront = () => {
  const productContext = useProducts();
  return {
    sectionsConfig: productContext?.sectionsConfig || [],
    designTokens: mobileCompactMenuTokens,
  };
};

export const useStorefrontCart = () => useMobileCompactMenu();
