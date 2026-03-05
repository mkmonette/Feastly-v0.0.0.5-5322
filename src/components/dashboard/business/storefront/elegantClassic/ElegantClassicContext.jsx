import React, { createContext } from 'react';

export const ElegantClassicContext = createContext(null);

export const ElegantClassicProvider = ({ children, tokens, businessData, sectionsConfig, updateSectionContent }) => {
  return (
    <ElegantClassicContext.Provider
      value={{
        tokens,
        businessData,
        sectionsConfig,
        updateSectionContent,
      }}
    >
      {children}
    </ElegantClassicContext.Provider>
  );
};
