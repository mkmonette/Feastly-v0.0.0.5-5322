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
    primary: 'orange-600',
    primaryHover: 'orange-700',
    primaryLight: 'orange-50',
    primaryDim: 'orange-600/20',
    secondary: 'black',
    secondaryHover: 'gray-800',
    background: 'white',
    surface: 'gray-50',
    surfaceAlt: 'gray-100',
    textPrimary: 'gray-900',
    textMuted: 'gray-500',
    textSubtle: 'gray-400',
    textInverse: 'white',
    textInverseMuted: 'gray-300',
    border: 'gray-100',
    borderLight: 'gray-50',
    heroHeadlinePre: '#FFFFFF',
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