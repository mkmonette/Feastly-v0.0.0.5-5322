import React from 'react';
import { createRoot } from 'react-dom/client';
import { LuxuryClassicProvider } from './src/components/dashboard/business/storefront/luxuryClassic/LuxuryClassicContext.jsx';
import LuxuryClassicRenderer from './src/components/dashboard/business/storefront/luxuryClassic/LuxuryClassicRenderer.jsx';

// Simple test to see if component renders
console.log('LuxuryClassicProvider:', LuxuryClassicProvider);
console.log('LuxuryClassicRenderer:', LuxuryClassicRenderer);

const App = () => (
  <LuxuryClassicProvider>
    <LuxuryClassicRenderer />
  </LuxuryClassicProvider>
);

console.log('Test successful - components can be imported');
