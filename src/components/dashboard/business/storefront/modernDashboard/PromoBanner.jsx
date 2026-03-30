import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernDashboard } from './ModernDashboardContext';

const PromoBanner = () => {
  const { settings } = useModernDashboard();
  const { tokens } = settings;

  if (!settings.sections.promoBanner.visible) return null;

  return (
    <section
      style={{
        padding: `${tokens.spacing.xl} ${tokens.spacing.xl}`,
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <div
        style={{
          backgroundColor: tokens.promoBackground,
          borderRadius: tokens.borderRadiusXl,
          padding: `${tokens.spacing.xxxl} ${tokens.spacing.xl}`,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: tokens.shadowLg
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        />

        <div style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: tokens.spacing.sm,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
              borderRadius: tokens.borderRadius,
              marginBottom: tokens.spacing.lg,
              color: tokens.promoText,
              fontSize: tokens.fontSize.sm,
              fontWeight: tokens.fontWeight.medium
            }}
          >
            <SafeIcon icon={FiIcons.FiZap} size={18} />
            Limited Time Offer
          </div>

          <h2
            style={{
              color: tokens.promoText,
              fontSize: tokens.fontSize.xxxl,
              fontWeight: tokens.fontWeight.bold,
              marginBottom: tokens.spacing.md,
              lineHeight: 1.2
            }}
          >
            {settings.promo.title}
          </h2>

          <p
            style={{
              color: tokens.promoText,
              fontSize: tokens.fontSize.lg,
              marginBottom: tokens.spacing.xl,
              opacity: 0.95,
              maxWidth: '600px',
              margin: `0 auto ${tokens.spacing.xl} auto`
            }}
          >
            {settings.promo.subtitle}
          </p>

          <button
            style={{
              backgroundColor: '#FFFFFF',
              color: tokens.accentColor,
              border: 'none',
              borderRadius: tokens.borderRadius,
              padding: `${tokens.spacing.lg} ${tokens.spacing.xxl}`,
              fontSize: tokens.fontSize.base,
              fontWeight: tokens.fontWeight.bold,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: tokens.spacing.md,
              transition: 'all 0.2s',
              boxShadow: tokens.shadowMd
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = tokens.shadowXl;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = tokens.shadowMd;
            }}
          >
            {settings.promo.ctaText}
            <SafeIcon icon={FiIcons.FiArrowRight} size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
