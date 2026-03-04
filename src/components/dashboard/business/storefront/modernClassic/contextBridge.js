import { useModernClassic } from './ModernClassicContext';

export const useStorefrontTokens = () => {
  const { tokens } = useModernClassic();
  return tokens;
};

export const useStorefrontBusinessData = () => {
  const { businessData } = useModernClassic();
  return businessData;
};

export const useStorefront = () => useModernClassic();
