import { useModernSplitStorefront } from './ModernSplitProvider';

export const useStorefront = () => {
  return useModernSplitStorefront();
};

export const useStorefrontTokens = () => {
  const { tokens } = useModernSplitStorefront();
  return tokens;
};

export const useStorefrontBusinessData = () => {
  const { businessData } = useModernSplitStorefront();
  return businessData;
};
