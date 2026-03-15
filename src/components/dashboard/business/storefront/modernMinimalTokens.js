export const modernMinimalTokens = {
  colors: {
    primary: '#000000',
    secondary: '#6B7280',
    accent: '#3B82F6',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    border: '#E5E7EB',
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      tertiary: '#9CA3AF'
    },
    cart: {
      background: '#FAFAFA',
      border: '#E5E7EB',
      itemBg: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: 'Inter, system-ui, sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '0.9375rem',
      lg: '1rem',
      xl: '1.125rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  },
  layout: {
    maxWidth: '1400px',
    contentWidth: '65%',
    cartWidth: '35%',
    gutter: '2rem'
  },
  components: {
    header: {
      height: '4rem',
      background: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB'
    },
    hero: {
      background: 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%)',
      minHeight: '320px',
      padding: '3rem'
    },
    productCard: {
      background: '#FFFFFF',
      border: '1px solid #E5E7EB',
      borderRadius: '0.75rem',
      padding: '1.25rem',
      hover: {
        shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transform: 'translateY(-2px)'
      }
    },
    button: {
      primary: {
        background: '#000000',
        color: '#FFFFFF',
        borderRadius: '0.5rem',
        padding: '0.625rem 1.25rem',
        fontSize: '0.875rem',
        fontWeight: '600'
      },
      secondary: {
        background: '#F3F4F6',
        color: '#111827',
        borderRadius: '0.5rem',
        padding: '0.625rem 1.25rem',
        fontSize: '0.875rem',
        fontWeight: '600'
      }
    },
    cart: {
      background: '#FAFAFA',
      padding: '1.5rem',
      itemSpacing: '1rem',
      checkoutButtonColor: '#000000'
    }
  }
};
