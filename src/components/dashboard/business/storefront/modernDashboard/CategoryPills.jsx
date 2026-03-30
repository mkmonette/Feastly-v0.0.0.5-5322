import React, { useRef } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernDashboard } from './ModernDashboardContext';

const CategoryPills = () => {
  const { settings, categories, selectedCategory, setSelectedCategory } = useModernDashboard();
  const { tokens } = settings;
  const scrollRef = useRef(null);

  if (!settings.sections.categoryPills.visible) return null;

  const allCategories = [
    { id: 'all', name: 'All Items', icon: FiIcons.FiGrid },
    ...categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: FiIcons.FiPackage
    }))
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      style={{
        padding: `${tokens.spacing.lg} ${tokens.spacing.xl}`,
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => scroll('left')}
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: tokens.cardBackground,
            border: `1px solid ${tokens.borderColor}`,
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: tokens.shadowMd,
            color: tokens.primaryTextColor
          }}
        >
          <SafeIcon icon={FiIcons.FiChevronLeft} size={20} />
        </button>

        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: tokens.spacing.md,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: `${tokens.spacing.xs} ${tokens.spacing.xxxl}`
          }}
          className="hide-scrollbar"
        >
          {allCategories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  backgroundColor: isActive ? tokens.categoryPillActiveBackground : tokens.categoryPillBackground,
                  color: isActive ? tokens.categoryPillActiveText : tokens.primaryTextColor,
                  border: 'none',
                  borderRadius: tokens.borderRadius,
                  padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: tokens.spacing.sm,
                  cursor: 'pointer',
                  fontSize: tokens.fontSize.sm,
                  fontWeight: tokens.fontWeight.medium,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? tokens.shadowMd : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = tokens.borderColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = tokens.categoryPillBackground;
                  }
                }}
              >
                <SafeIcon icon={category.icon} size={18} />
                {category.name}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scroll('right')}
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: tokens.cardBackground,
            border: `1px solid ${tokens.borderColor}`,
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: tokens.shadowMd,
            color: tokens.primaryTextColor
          }}
        >
          <SafeIcon icon={FiIcons.FiChevronRight} size={20} />
        </button>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CategoryPills;
