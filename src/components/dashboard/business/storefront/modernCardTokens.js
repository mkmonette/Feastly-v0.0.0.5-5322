const modernCardTokens = {
  colors: {
    primary: '#2D2D2D',
    primaryText: '#1A1A1A',
    secondaryText: '#6B7280',
    accent: '#F0C674',
    accentHover: '#E5B85E',
    background: '#F8F9FA',
    cardBackground: '#FFFFFF',
    border: '#E5E7EB',
    buttonText: '#1A1A1A',
    lightText: '#9CA3AF'
  },
  typography: {
    fontFamily: 'font-serif',
    headingWeight: 'font-bold',
    bodyWeight: 'font-normal',
    buttonWeight: 'font-black'
  },
  layout: {
    maxWidth: 'max-w-md',
    spacing: {
      section: 'py-6 px-6',
      card: 'p-6',
      element: 'gap-4'
    },
    borderRadius: {
      card: 'rounded-[32px]',
      button: 'rounded-full',
      image: 'rounded-[24px]',
      small: 'rounded-2xl'
    }
  },
  effects: {
    shadow: {
      card: 'shadow-lg',
      button: 'shadow-md',
      hover: 'hover:shadow-2xl'
    },
    transition: 'transition-all duration-300'
  }
};

export default modernCardTokens;
