import { useModernSplitCartStorefront } from './ModernSplitCartProvider';

export const useStorefront = () => {
  return useModernSplitCartStorefront();
};

export const useStorefrontTokens = () => {
  const context = useModernSplitCartStorefront();
  return context?.tokens || {};
};

export const useStorefrontBusinessData = () => {
  const context = useModernSplitCartStorefront();
  return context?.businessData || {};
};
