import { useBoldClassic } from './BoldClassicContext';

export const useStorefrontTokens = () => {
  const { tokens } = useBoldClassic();
  return tokens;
};

export const useStorefrontBusinessData = () => {
  const { businessData } = useBoldClassic();
  return businessData;
};

export const useStorefront = () => useBoldClassic();
