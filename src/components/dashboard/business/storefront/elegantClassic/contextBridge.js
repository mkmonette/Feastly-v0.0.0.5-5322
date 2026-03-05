import { useContext } from 'react';
import { ElegantClassicContext } from './ElegantClassicContext';

export const useStorefrontTokens = () => {
  const context = useContext(ElegantClassicContext);
  if (!context) {
    throw new Error('useStorefrontTokens must be used within ElegantClassicContext');
  }
  return {
    typography: context.tokens.typography,
    colors: context.tokens.colors,
    layout: context.tokens.layout,
    spacing: context.tokens.spacing,
    borderRadius: context.tokens.borderRadius,
  };
};

export const useStorefrontBusinessData = () => {
  const context = useContext(ElegantClassicContext);
  if (!context) {
    throw new Error('useStorefrontBusinessData must be used within ElegantClassicContext');
  }
  return context.businessData;
};

export const useStorefront = () => {
  const context = useContext(ElegantClassicContext);
  if (!context) {
    throw new Error('useStorefront must be used within ElegantClassicContext');
  }
  return {
    sectionsConfig: context.sectionsConfig,
    updateSectionContent: context.updateSectionContent,
  };
};
