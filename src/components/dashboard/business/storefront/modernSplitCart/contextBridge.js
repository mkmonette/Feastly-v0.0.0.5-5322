import { useStorefront as useStorefrontBase } from '../StorefrontContext';

export const useStorefront = useStorefrontBase;

export const useStorefrontTokens = () => {
  const context = useStorefrontBase();
  return context?.tokens || {};
};

export const useStorefrontBusinessData = () => {
  const context = useStorefrontBase();
  return context?.businessData || {};
};
