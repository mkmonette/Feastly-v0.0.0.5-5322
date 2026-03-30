import { useState, useRef } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernMenuCart } from './ModernMenuCartContext';

const CategoryTabs = ({ categories = [] }) => {
  const { tokens } = useModernMenuCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollContainerRef = useRef(null);

  const allCategories = [{ id: 'all', name: 'All Items' }, ...categories];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ padding: '1rem 1rem 0.5rem', position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => scroll('left')}
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: tokens.colors.surface,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: tokens.shadows.card,
          }}
        >
          <SafeIcon icon={FiIcons.FiChevronLeft} style={{ fontSize: '1rem', color: tokens.colors.primaryText }} />
        </button>

        <div
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '0 2.5rem',
          }}
        >
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: tokens.typography.fontSize.categoryTab,
                fontWeight: tokens.typography.fontWeight.subheading,
                fontFamily: tokens.typography.fontFamily.body,
                backgroundColor: activeCategory === category.id ? tokens.colors.categoryTabActive : tokens.colors.background,
                color: activeCategory === category.id ? '#ffffff' : tokens.colors.categoryTabInactive,
                transition: 'all 0.2s ease',
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: tokens.colors.surface,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: tokens.shadows.card,
          }}
        >
          <SafeIcon icon={FiIcons.FiChevronRight} style={{ fontSize: '1rem', color: tokens.colors.primaryText }} />
        </button>
      </div>
    </div>
  );
};

export default CategoryTabs;
