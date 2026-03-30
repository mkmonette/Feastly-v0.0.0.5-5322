export const modernDashboardTokens = {
  id: 'modernDashboard',
  layout: 'split',

  colors: {
    primaryBg: '#FFFFFF',
    secondaryBg: '#F8F9FA',
    cardBg: '#FFFFFF',
    primaryTextColor: '#1A1A1A',
    secondaryTextColor: '#6B7280',
    accentColor: '#FF6B35',
    heroPreTextColor: '#FF6B35',
    sectionTextColor: '#4B5563',
    sectionHighlightColor: '#FF6B35',
    borderColor: '#E5E7EB',
    overlayBg: 'rgba(0, 0, 0, 0.4)',
  },

  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: '700',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      fontWeight: '400',
      lineHeight: '1.6',
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      lineHeight: '1.3',
    },
    productTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      lineHeight: '1.4',
    },
    productPrice: {
      fontSize: '1.25rem',
      fontWeight: '700',
      lineHeight: '1.4',
    },
    body: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.6',
    },
  },

  spacing: {
    sectionPadding: '4rem 2rem',
    sectionGap: '5rem',
    cardPadding: '1.5rem',
    cardGap: '1.5rem',
    containerMaxWidth: '1400px',
  },

  borderRadius: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    full: '9999px',
  },

  shadows: {
    card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    cardHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    button: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    elevated: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  transitions: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  header: {
    height: '80px',
    padding: '1rem 2rem',
    background: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    sticky: true,
  },

  hero: {
    height: '500px',
    padding: '4rem',
    borderRadius: '1.5rem',
    margin: '2rem',
    overlay: true,
  },

  categoryTabs: {
    padding: '1rem 2rem',
    gap: '1rem',
    itemPadding: '0.75rem 1.5rem',
    borderRadius: '9999px',
    activeIndicator: 'background',
  },

  productCard: {
    borderRadius: '1rem',
    padding: '0',
    imageHeight: '240px',
    contentPadding: '1.5rem',
    hoverEffect: 'lift',
  },

  cart: {
    width: '420px',
    padding: '2rem',
    background: '#FFFFFF',
    borderLeft: '1px solid #E5E7EB',
    sticky: true,
  },

  button: {
    primary: {
      padding: '0.875rem 1.75rem',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      fontWeight: '600',
    },
    secondary: {
      padding: '0.75rem 1.5rem',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      fontWeight: '500',
    },
  },
};
