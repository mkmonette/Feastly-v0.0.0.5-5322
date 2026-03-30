import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useModernDashboard } from './ModernDashboardContext';
import { formatCurrency } from '@/common/currency';

const NewItems = () => {
  const { settings, newProducts, addToCart } = useModernDashboard();
  const { tokens } = settings;

  if (!settings.sections.newItems.visible) return null;

  return (
    <section
      style={{
        padding: `${tokens.spacing.xl} ${tokens.spacing.xl}`,
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <Headline
        normalText="New on the Menu"
        highlightText=""
        tokens={{ colors: tokens }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: tokens.spacing.xl,
          marginTop: tokens.spacing.xl
        }}
      >
        {newProducts.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: tokens.cardBackground,
              borderRadius: tokens.borderRadiusLg,
              overflow: 'hidden',
              boxShadow: tokens.shadowMd,
              transition: 'all 0.3s',
              cursor: 'pointer',
              border: `1px solid ${tokens.borderColor}`,
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = tokens.shadowXl;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = tokens.shadowMd;
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: tokens.spacing.md,
                left: tokens.spacing.md,
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                padding: `${tokens.spacing.xs} ${tokens.spacing.md}`,
                borderRadius: tokens.borderRadius,
                fontSize: tokens.fontSize.xs,
                fontWeight: tokens.fontWeight.bold,
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                zIndex: 10
              }}
            >
              <SafeIcon icon={FiIcons.FiStar} size={14} />
              New
            </div>

            <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s'
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: tokens.categoryPillBackground,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <SafeIcon icon={FiIcons.FiImage} size={48} style={{ color: tokens.borderColor }} />
                </div>
              )}
            </div>

            <div style={{ padding: tokens.spacing.lg }}>
              <h3
                style={{
                  fontSize: tokens.fontSize.lg,
                  fontWeight: tokens.fontWeight.semibold,
                  color: tokens.primaryTextColor,
                  marginBottom: tokens.spacing.sm
                }}
              >
                {product.name}
              </h3>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: tokens.spacing.lg
                }}
              >
                <div
                  style={{
                    fontSize: tokens.fontSize.xl,
                    fontWeight: tokens.fontWeight.bold,
                    color: tokens.accentColor
                  }}
                >
                  {formatCurrency(product.price)}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  style={{
                    backgroundColor: tokens.accentColor,
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: tokens.borderRadius,
                    padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
                    fontSize: tokens.fontSize.sm,
                    fontWeight: tokens.fontWeight.semibold,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <SafeIcon icon={FiIcons.FiPlus} size={16} />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewItems;
