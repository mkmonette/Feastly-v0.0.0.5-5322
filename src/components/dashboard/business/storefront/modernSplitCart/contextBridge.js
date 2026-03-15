import { useProducts } from '@/context/ProductContext';
import { modernSplitCartTokens } from '../modernSplitCartTokens';
import { useModernSplitCart } from './ModernSplitCartContext';

export const useStorefrontTokens = () => modernSplitCartTokens;

export const useStorefrontBusinessData = () => {
  const productContext = useProducts();
  return productContext?.businessData || {};
};

export const useStorefront = () => {
  const productContext = useProducts();
  return {
    sectionsConfig: productContext?.sectionsConfig || [],
    designTokens: modernSplitCartTokens,
  };
};

export const useStorefrontCart = () => useModernSplitCart();
