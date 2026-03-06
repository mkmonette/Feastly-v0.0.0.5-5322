import { useStorefront as useStorefrontOriginal } from '../StorefrontContext';

export const useStorefront = () => {
  return useStorefrontOriginal();
};
