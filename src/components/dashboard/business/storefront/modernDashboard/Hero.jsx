import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernDashboard } from './ModernDashboardContext';

const Hero = () => {
  const { settings } = useModernDashboard();
  const { tokens } = settings;

  if (!settings.sections.hero.visible) return null;

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
          borderRadius: tokens.borderRadiusXl,
          overflow: 'hidden',
          position: 'relative',
          height: '280px',
          boxShadow: tokens.shadowLg
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${settings.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)'
          }}
        />

        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${tokens.spacing.xxl} ${tokens.spacing.xxxl}`,
            gap: tokens.spacing.xl
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                color: tokens.heroPreTextColor,
                fontSize: tokens.fontSize.sm,
                fontWeight: tokens.fontWeight.medium,
                marginBottom: tokens.spacing.sm,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                opacity: 0.9
              }}
            >
              Welcome to
            </p>
            <h1
              style={{
                color: '#FFFFFF',
                fontSize: tokens.fontSize.xxxxl,
                fontWeight: tokens.fontWeight.bold,
                marginBottom: tokens.spacing.md,
                lineHeight: 1.2
              }}
            >
              {settings.businessName}
            </h1>
            <p
              style={{
                color: '#FFFFFF',
                fontSize: tokens.fontSize.lg,
                fontWeight: tokens.fontWeight.normal,
                opacity: 0.95,
                maxWidth: '500px'
              }}
            >
              {settings.tagline}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: tokens.spacing.lg,
              flexWrap: 'wrap'
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                padding: tokens.spacing.lg,
                borderRadius: tokens.borderRadius,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '120px',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontSize: tokens.fontSize.xxl,
                  fontWeight: tokens.fontWeight.bold,
                  marginBottom: tokens.spacing.xs
                }}
              >
                {settings.stats.totalItems}
              </div>
              <div
                style={{
                  color: '#FFFFFF',
                  fontSize: tokens.fontSize.sm,
                  opacity: 0.9
                }}
              >
                Menu Items
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                padding: tokens.spacing.lg,
                borderRadius: tokens.borderRadius,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '120px',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontSize: tokens.fontSize.xxl,
                  fontWeight: tokens.fontWeight.bold,
                  marginBottom: tokens.spacing.xs
                }}
              >
                {settings.stats.categories}
              </div>
              <div
                style={{
                  color: '#FFFFFF',
                  fontSize: tokens.fontSize.sm,
                  opacity: 0.9
                }}
              >
                Categories
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                padding: tokens.spacing.lg,
                borderRadius: tokens.borderRadius,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '120px',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontSize: tokens.fontSize.xxl,
                  fontWeight: tokens.fontWeight.bold,
                  marginBottom: tokens.spacing.xs
                }}
              >
                {settings.stats.outlets}
              </div>
              <div
                style={{
                  color: '#FFFFFF',
                  fontSize: tokens.fontSize.sm,
                  opacity: 0.9
                }}
              >
                Outlets
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
