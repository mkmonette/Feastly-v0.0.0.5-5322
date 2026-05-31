// Mosaic reuses Bento's exact palette so the visual language is identical
export const mosaicTokens = {
  colors: {
    primary: '#FF5A5F',
    primaryDark: '#E74C50',
    secondary: '#0F172A',
    accent: '#22C55E',
    butter: '#FDE68A',
    mint: '#A7F3D0',
    lavender: '#DDD6FE',
    blush: '#FBCFE8',

    background: '#F7F4EE',
    surface: '#FFFFFF',
    surfaceInk: '#0F172A',
    surfaceMuted: '#EDE7DC',
    border: '#E2DCCF',

    text: '#0F172A',
    textMuted: '#64748B',
    textOnDark: '#FFFFFF',

    danger: '#DC2626',
    star: '#F59E0B',
  },
  typography: {
    fontHeading: "'Outfit', 'Inter', sans-serif",
    fontBody: "'Manrope', 'Inter', sans-serif",
  },
  effects: {
    shadow: {
      tile: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -10px rgba(15,23,42,0.18)',
      hover: '0 18px 40px -18px rgba(15,23,42,0.35)',
      brand: '0 14px 32px -14px rgba(255,90,95,0.55)',
    },
  },
};

// Shared pastel tile palette — identical to Bento's
export const MOSAIC_TILE_PALETTE = [
  { bg: '#FDE68A', ink: '#0F172A' }, // butter
  { bg: '#A7F3D0', ink: '#0F172A' }, // mint
  { bg: '#DDD6FE', ink: '#0F172A' }, // lavender
  { bg: '#FBCFE8', ink: '#0F172A' }, // blush
  { bg: '#BAE6FD', ink: '#0F172A' }, // sky
  { bg: '#FED7AA', ink: '#0F172A' }, // peach
];

export const tileColorForIndex = (i) =>
  MOSAIC_TILE_PALETTE[i % MOSAIC_TILE_PALETTE.length];
