export default {
  colors: {
    primary: '#F5A623',
    primaryHover: '#E09515',
    secondary: '#2ECC71',
    secondaryHover: '#27AE60',
    background: '#F5F1E8',
    surface: '#FFFFFF',
    surfaceHover: '#F8F8F8',
    text: '#2C3E50',
    textLight: '#7F8C8D',
    textMuted: '#95A5A6',
    border: '#E8E1D3',
    borderLight: '#F0EBE0',
    accent: '#FF6B6B',
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    overlay: 'rgba(0, 0, 0, 0.5)',
    heroBackground: 'linear-gradient(135deg, #3A4A5C 0%, #2C3E50 100%)',
    heroText: '#FFFFFF',
    sectionHeadlineNormal: '#2C3E50',
    sectionHeadlineHighlight: '#F5A623',
    cartItemBg: '#FAFAFA',
    badge: '#2ECC71'
  },

  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '0.9375rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2rem',
      heroTitle: '1.75rem',
      heroSubtitle: '0.9375rem',
      sectionTitle: '1.75rem',
      productTitle: '0.9375rem',
      bodyText: '0.875rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    sectionPadding: '3rem 0',
    cardPadding: '1.25rem'
  },

  borderRadius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    full: '9999px',
    card: '1.25rem',
    button: '0.75rem'
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 16px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 12px 24px -5px rgba(0, 0, 0, 0.12)',
    card: '0 4px 12px rgba(0, 0, 0, 0.08)',
    cardHover: '0 8px 20px rgba(0, 0, 0, 0.12)',
    cartPanel: '0 8px 24px rgba(0, 0, 0, 0.12)'
  },

  layout: {
    maxWidth: '1440px',
    cartWidth: '380px',
    headerHeight: '80px'
  },

  components: {
    header: {
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F0 100%)',
      padding: '1rem 1.5rem',
      borderRadius: '1.5rem',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    },
    hero: {
      background: 'linear-gradient(135deg, #3A4A5C 0%, #2C3E50 100%)',
      padding: '2rem',
      borderRadius: '1.5rem',
      shadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
      textColor: '#FFFFFF'
    },
    card: {
      background: '#FFFFFF',
      borderRadius: '1.25rem',
      padding: '1.5rem',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      hoverShadow: '0 8px 20px rgba(0, 0, 0, 0.12)'
    },
    button: {
      primary: {
        background: '#F5A623',
        color: '#FFFFFF',
        hoverBackground: '#E09515',
        borderRadius: '0.75rem',
        fontSize: '0.9375rem',
        fontWeight: '600'
      },
      secondary: {
        background: '#2ECC71',
        color: '#FFFFFF',
        hoverBackground: '#27AE60',
        borderRadius: '0.75rem',
        fontSize: '0.9375rem',
        fontWeight: '600'
      }
    },
    input: {
      background: '#F8F6F0',
      borderRadius: '0.75rem',
      fontSize: '0.9375rem'
    },
    cartPanel: {
      background: '#FFFFFF',
      width: '380px',
      padding: '1.5rem',
      borderRadius: '1.5rem'
    }
  }
};
