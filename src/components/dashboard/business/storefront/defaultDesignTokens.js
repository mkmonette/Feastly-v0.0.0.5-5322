/**
 * Default Design Tokens for Base Classic Template
 * Extracted from current production styles.
 * NO VISUAL CHANGES ALLOWED.
 */

export const defaultDesignTokens = {
  typography: {
    fontPrimary: 'font-sans',
    fontSecondary: 'font-sans',
    scale: {
      h1: 'text-5xl md:text-7xl',
      h2: 'text-4xl md:text-5xl',
      h2_alt: 'text-4xl md:text-6xl',
      h3: 'text-xl',
      h4: 'text-sm',
      h4_xs: 'text-xs',
      bodyLarge: 'text-xl',
      bodyLarge_alt: 'text-lg',
      body: 'text-lg',
      bodySmall: 'text-sm',
      xs: 'text-[10px]',
      xs_alt: 'text-xs',
    },
    weights: {
      black: 'font-black',
      extrabold: 'font-extrabold',
      bold: 'font-bold',
      semibold: 'font-semibold',
      medium: 'font-medium',
      normal: 'font-normal',
    },
    tracking: {
      tighter: 'tracking-tighter',
      tight: 'tracking-tight',
      normal: 'tracking-normal',
      wide: 'tracking-wide',
      widest: 'tracking-widest',
    },
    lineHeights: {
      none: 'leading-none',
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    },
    transform: {
      uppercase: 'uppercase',
      capitalize: 'capitalize',
      none: 'normal-case',
    }
  },
  colors: {
    primary: '#EA580C',
    primaryHover: '#C2410C',
    primaryLight: '#FFF7ED',
    primaryDim: 'rgba(234, 88, 12, 0.2)',
    secondary: '#000000',
    secondaryHover: '#1F2937',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    surfaceAlt: '#F3F4F6',
    textPrimary: '#111827',
    textMuted: '#6B7280',
    textSubtle: '#9CA3AF',
    textInverse: '#FFFFFF',
    textInverseMuted: '#D1D5DB',
    border: '#F3F4F6',
    borderLight: '#F9FAFB',
    accent: '#EA580C',
    heroPreText: '#EA580C',
    heroHeadlinePre: '#FFFFFF',
    heroHeadlineNormal: '#1F2937',
    heroHeadlineHighlight: '#EA580C',
    sectionHeadlineNormal: '#1F2937',
    sectionHeadlineHighlight: '#1F2937',
  },
  layout: {
    container: 'mx-auto',
    containerWidth: 'max-w-7xl',
    sectionPaddingLarge: 'py-24',
    sectionPaddingMedium: 'py-20',
    sectionPaddingSmall: 'py-12',
    horizontalPadding: 'px-6 md:px-12',
    gridGapLarge: 'gap-20',
    gridGapMedium: 'gap-12',
    gridGapSmall: 'gap-8',
    borderRadiusLarge: 'rounded-[40px]',
    borderRadiusMedium: 'rounded-[32px]',
    borderRadiusSmall: 'rounded-3xl',
    borderRadiusBase: 'rounded-xl',
    borderRadiusIcon: 'rounded-2xl',
    shadow: 'shadow-sm',
    shadowLarge: 'shadow-2xl',
    shadowPrimary: 'shadow-orange-600/20',
  }
};

export default defaultDesignTokens;