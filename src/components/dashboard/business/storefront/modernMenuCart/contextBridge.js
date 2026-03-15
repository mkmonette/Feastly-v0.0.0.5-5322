import { useProducts } from '@/context/ProductContext';
import { modernMenuCartTokens } from '../modernMenuCartTokens';
import { useModernMenuCart } from './ModernMenuCartContext';

export const useStorefrontTokens = () => modernMenuCartTokens;

export const useStorefrontBusinessData = () => {
  const productContext = useProducts();
  return productContext?.businessData || {};
};

export const useStorefront = () => {
  const productContext = useProducts();
  return {
    sectionsConfig: productContext?.sectionsConfig || [],
    designTokens: modernMenuCartTokens,
  };
};

export const useStorefrontCart = () => useModernMenuCart();
