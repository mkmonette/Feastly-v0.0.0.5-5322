import { useModernDashboard } from './ModernDashboardContext';

export const CategoryTabs = () => {
  const { tokens, categories, selectedCategory, setSelectedCategory } = useModernDashboard();
  const { colors, typography, components, spacing } = tokens;

  const allCategories = [
    { id: 'all', name: 'All Items' },
    ...categories
  ];

  const styles = {
    section: {
      padding: '2rem',
      backgroundColor: colors.cardBg,
      borderBottom: `1px solid ${colors.borderColor}`,
      position: 'sticky',
      top: components.header.height,
      zIndex: 90,
    },
    scrollContainer: {
      display: 'flex',
      gap: '0.75rem',
      overflowX: 'auto',
      paddingBottom: '0.5rem',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    },
    categoryPill: (isActive) => ({
      padding: components.categoryPill.padding,
      borderRadius: components.categoryPill.borderRadius,
      fontSize: components.categoryPill.fontSize,
      fontWeight: components.categoryPill.fontWeight,
      fontFamily: typography.fontFamily,
      backgroundColor: isActive ? components.categoryPill.activeBg : components.categoryPill.inactiveBg,
      color: isActive ? components.categoryPill.activeColor : components.categoryPill.inactiveColor,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }),
  };

  return (
    <section style={styles.section}>
      <div style={styles.scrollContainer}>
        {allCategories.map(category => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              style={styles.categoryPill(isActive)}
              onClick={() => setSelectedCategory(category.id)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = colors.borderColor;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = components.categoryPill.inactiveBg;
                }
              }}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
};
