export const modernGradientTokens = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE66D',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    border: '#E9ECEF',
    text: {
      primary: '#2D3748',
      secondary: '#718096',
      tertiary: '#A0AEC0'
    },
    gradients: {
      primary: {
        from: '#667eea',
        to: '#764ba2',
        css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      secondary: {
        from: '#f093fb',
        to: '#f5576c',
        css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      accent: {
        from: '#4facfe',
        to: '#00f2fe',
        css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      }
    },
    cart: {
      background: '#FAFBFC',
      border: '#E9ECEF',
      itemBg: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: 'system-ui, sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '0.9375rem',
      lg: '1rem',
      xl: '1.125rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
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
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.05)',
    md: '0 4px 8px rgba(0, 0, 0, 0.08)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.15)',
    gradient: '0 8px 32px rgba(102, 126, 234, 0.25)'
  },
  layout: {
    maxWidth: '1400px',
    contentWidth: '65%',
    cartWidth: '35%',
    gutter: '2rem'
  },
  components: {
    header: {
      height: '4.5rem',
      background: '#FFFFFF',
      borderBottom: '1px solid #E9ECEF'
    },
    hero: {
      get background() {
        return modernGradientTokens.colors.gradients.primary.css;
      },
      minHeight: '380px',
      padding: '3rem'
    },
    productCard: {
      background: '#FFFFFF',
      border: '1px solid #E9ECEF',
      borderRadius: '1rem',
      padding: '1rem',
      hover: {
        shadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        transform: 'translateY(-4px)'
      }
    },
    button: {
      primary: {
        get background() {
          return modernGradientTokens.colors.gradients.primary.css;
        },
        color: '#FFFFFF',
        borderRadius: '0.75rem',
        padding: '0.75rem 1.5rem',
        fontSize: '0.875rem',
        fontWeight: '600'
      },
      secondary: {
        background: '#F8F9FA',
        color: '#2D3748',
        borderRadius: '0.75rem',
        padding: '0.75rem 1.5rem',
        fontSize: '0.875rem',
        fontWeight: '600'
      }
    },
    cart: {
      background: '#FAFBFC',
      padding: '1.5rem',
      itemSpacing: '1rem',
      get checkoutButtonGradient() {
        return modernGradientTokens.colors.gradients.primary.css;
      }
    }
  }
};
