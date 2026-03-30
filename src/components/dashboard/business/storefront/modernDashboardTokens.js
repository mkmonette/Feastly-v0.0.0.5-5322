export const modernDashboardTokens = {
  name: 'Modern Dashboard',
  category: 'modern',
  description: 'Clean, card-based UI with soft shadows and rounded corners',

  layout: {
    type: 'split',
    leftWidth: '65%',
    rightWidth: '35%',
    cartPosition: 'right',
    cartSticky: true
  },

  colors: {
    primaryBg: '#FFFFFF',
    secondaryBg: '#F8F9FA',
    cardBg: '#FFFFFF',
    primaryTextColor: '#1A1D1F',
    secondaryTextColor: '#6F767E',
    accentColor: '#FF6B35',
    heroPreTextColor: '#FF6B35',
    sectionTextColor: '#6F767E',
    sectionHighlightColor: '#FF6B35',
    borderColor: '#E8EAED',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    overlayColor: 'rgba(0, 0, 0, 0.4)'
  },

  spacing: {
    sectionPadding: '4rem 2rem',
    sectionGap: '4rem',
    cardPadding: '1.5rem',
    contentMaxWidth: '100%',
    containerPadding: '1rem'
  },

  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    headingWeight: '700',
    bodyWeight: '400',
    h1Size: '3rem',
    h1LineHeight: '1.2',
    h2Size: '2rem',
    h2LineHeight: '1.3',
    h3Size: '1.5rem',
    h3LineHeight: '1.4',
    bodySize: '1rem',
    bodyLineHeight: '1.6',
    smallSize: '0.875rem'
  },

  components: {
    card: {
      borderRadius: '16px',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      hoverShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    button: {
      borderRadius: '12px',
      padding: '0.875rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      hoverTransform: 'translateY(-1px)'
    },
    input: {
      borderRadius: '12px',
      padding: '0.875rem 1rem',
      border: '1px solid #E8EAED',
      focusBorder: '#FF6B35'
    },
    productCard: {
      borderRadius: '16px',
      imageBorderRadius: '12px',
      padding: '1rem',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      hoverShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      imageHeight: '200px',
      spacing: '0.75rem'
    },
    categoryPill: {
      borderRadius: '24px',
      padding: '0.75rem 1.5rem',
      fontSize: '0.9375rem',
      fontWeight: '600',
      activeBg: '#FF6B35',
      activeColor: '#FFFFFF',
      inactiveBg: '#F8F9FA',
      inactiveColor: '#6F767E'
    },
    cart: {
      borderRadius: '0',
      padding: '2rem',
      itemSpacing: '1.25rem',
      summarySpacing: '1rem'
    },
    header: {
      height: '80px',
      padding: '0 2rem',
      shadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      logoSize: '2rem'
    },
    hero: {
      minHeight: '400px',
      borderRadius: '20px',
      padding: '4rem 3rem',
      overlayOpacity: '0.5'
    }
  },

  sections: {
    header: {
      visible: true,
      sticky: true,
      showLogo: true,
      showSearch: false,
      showCart: false
    },
    hero: {
      visible: true,
      style: 'rounded-container',
      showPreText: true,
      showCTA: true
    },
    categories: {
      visible: true,
      style: 'pills',
      scrollable: true
    },
    featuredProducts: {
      visible: true,
      title: 'Featured Dishes',
      columns: 3,
      showBadge: true
    },
    productGrid: {
      visible: true,
      title: 'Our Menu',
      columns: 3,
      style: 'cards'
    },
    popularDishes: {
      visible: true,
      title: 'Popular Dishes',
      columns: 3
    },
    promoBanner: {
      visible: true,
      style: 'card'
    },
    newItems: {
      visible: true,
      title: 'New Items',
      columns: 3
    },
    testimonials: {
      visible: true,
      title: 'What Our Customers Say',
      columns: 2,
      style: 'cards'
    },
    about: {
      visible: true,
      title: 'About Us',
      style: 'card'
    },
    footer: {
      visible: true,
      style: 'minimal'
    }
  }
};
