export const mobileAuroraTokens = {
  colors: {
    // Brand
    primary: '#7C3AED',           // vibrant violet
    primarySoft: '#EDE9FE',
    accent: '#FF6B9D',            // hot pink accent
    accentSoft: '#FFE4EF',
    sky: '#6FB1FC',
    peach: '#FFD6BA',
    lavender: '#E0CCFF',

    // Surfaces
    background: '#FAF7FF',         // very soft lavender white
    surface: '#FFFFFF',
    surfaceMuted: '#F4F0FB',
    glassBorder: 'rgba(255,255,255,0.6)',
    border: '#ECE6F7',

    // Text
    text: '#1B1B3A',               // deep ink
    textMuted: '#6B6890',
    textOnPrimary: '#FFFFFF',

    // Gradients (string templates)
    heroGradient:
      'linear-gradient(135deg, #FFD6BA 0%, #FFB3D9 40%, #C589E8 70%, #6FB1FC 100%)',
    auroraGradient:
      'linear-gradient(120deg, #FF6B9D 0%, #C589E8 50%, #6FB1FC 100%)',
    softGradient:
      'linear-gradient(135deg, #FAF7FF 0%, #FFF5F5 100%)',

    danger: '#EF4444',
    success: '#10B981',
    star: '#F59E0B',
  },
  typography: {
    fontHeading: "'Outfit', 'Inter', sans-serif",
    fontBody: "'Manrope', 'Inter', sans-serif",
    headingWeight: 'font-black',
    bodyWeight: 'font-medium',
  },
  layout: {
    mobileMaxWidth: 'max-w-[440px]',
    spacing: {
      section: 'py-5',
    },
    borderRadius: {
      card: 'rounded-[28px]',
      button: 'rounded-full',
      image: 'rounded-[22px]',
    },
  },
  effects: {
    shadow: {
      card: '0 10px 30px -12px rgba(124, 58, 237, 0.18)',
      floating: '0 20px 50px -15px rgba(124, 58, 237, 0.35)',
      soft: '0 6px 18px -8px rgba(27, 27, 58, 0.18)',
    },
  },
};
