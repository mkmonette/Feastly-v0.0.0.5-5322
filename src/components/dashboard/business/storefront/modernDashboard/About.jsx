import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useModernDashboard } from './ModernDashboardContext';

const About = () => {
  const { settings } = useModernDashboard();
  const { tokens } = settings;

  if (!settings.sections.about.visible) return null;

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
          backgroundColor: tokens.cardBackground,
          borderRadius: tokens.borderRadiusXl,
          padding: `${tokens.spacing.xxxl} ${tokens.spacing.xl}`,
          boxShadow: tokens.shadowLg,
          border: `1px solid ${tokens.borderColor}`,
          textAlign: 'center'
        }}
      >
        <Headline
          normalText={settings.about.title}
          highlightText=""
          tokens={{ colors: tokens }}
          className=""
        />

        <p
          style={{
            fontSize: tokens.fontSize.lg,
            color: tokens.sectionTextColor,
            lineHeight: 1.8,
            maxWidth: '800px',
            margin: `${tokens.spacing.xl} auto 0 auto`
          }}
        >
          {settings.about.description}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: tokens.spacing.xl,
            marginTop: tokens.spacing.xxxl
          }}
        >
          <div>
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: `${tokens.accentColor}15`,
                borderRadius: tokens.borderRadius,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                marginBottom: tokens.spacing.md
              }}
            >
              <SafeIcon icon={FiIcons.FiAward} size={32} style={{ color: tokens.accentColor }} />
            </div>
            <h3
              style={{
                fontSize: tokens.fontSize.lg,
                fontWeight: tokens.fontWeight.semibold,
                color: tokens.primaryTextColor,
                marginBottom: tokens.spacing.sm
              }}
            >
              Quality Ingredients
            </h3>
            <p
              style={{
                fontSize: tokens.fontSize.sm,
                color: tokens.sectionTextColor
              }}
            >
              Only the freshest ingredients
            </p>
          </div>

          <div>
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: `${tokens.accentColor}15`,
                borderRadius: tokens.borderRadius,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                marginBottom: tokens.spacing.md
              }}
            >
              <SafeIcon icon={FiIcons.FiClock} size={32} style={{ color: tokens.accentColor }} />
            </div>
            <h3
              style={{
                fontSize: tokens.fontSize.lg,
                fontWeight: tokens.fontWeight.semibold,
                color: tokens.primaryTextColor,
                marginBottom: tokens.spacing.sm
              }}
            >
              Fast Delivery
            </h3>
            <p
              style={{
                fontSize: tokens.fontSize.sm,
                color: tokens.sectionTextColor
              }}
            >
              Hot meals delivered quickly
            </p>
          </div>

          <div>
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: `${tokens.accentColor}15`,
                borderRadius: tokens.borderRadius,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                marginBottom: tokens.spacing.md
              }}
            >
              <SafeIcon icon={FiIcons.FiHeart} size={32} style={{ color: tokens.accentColor }} />
            </div>
            <h3
              style={{
                fontSize: tokens.fontSize.lg,
                fontWeight: tokens.fontWeight.semibold,
                color: tokens.primaryTextColor,
                marginBottom: tokens.spacing.sm
              }}
            >
              Made with Love
            </h3>
            <p
              style={{
                fontSize: tokens.fontSize.sm,
                color: tokens.sectionTextColor
              }}
            >
              Authentic traditional recipes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
