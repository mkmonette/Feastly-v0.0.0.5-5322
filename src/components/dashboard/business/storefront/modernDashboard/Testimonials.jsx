import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useModernDashboard } from './ModernDashboardContext';

const Testimonials = () => {
  const { settings } = useModernDashboard();
  const { tokens } = settings;

  if (!settings.sections.testimonials.visible) return null;

  return (
    <section
      style={{
        padding: `${tokens.spacing.xl} ${tokens.spacing.xl}`,
        maxWidth: '1400px',
        margin: '0 auto'
      }}
    >
      <Headline
        normalText="What Our Customers Say"
        highlightText=""
        tokens={{ colors: tokens }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: tokens.spacing.xl,
          marginTop: tokens.spacing.xl
        }}
      >
        {settings.testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            style={{
              backgroundColor: tokens.cardBackground,
              borderRadius: tokens.borderRadiusLg,
              padding: tokens.spacing.xl,
              boxShadow: tokens.shadowMd,
              border: `1px solid ${tokens.borderColor}`,
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = tokens.shadowLg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = tokens.shadowMd;
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: tokens.spacing.xs,
                marginBottom: tokens.spacing.lg
              }}
            >
              {[...Array(testimonial.rating)].map((_, i) => (
                <SafeIcon
                  key={i}
                  icon={FiIcons.FiStar}
                  size={18}
                  style={{ color: '#FFD700', fill: '#FFD700' }}
                />
              ))}
            </div>

            <p
              style={{
                fontSize: tokens.fontSize.base,
                color: tokens.sectionTextColor,
                lineHeight: 1.6,
                marginBottom: tokens.spacing.lg,
                fontStyle: 'italic'
              }}
            >
              "{testimonial.text}"
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacing.md
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: tokens.accentColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: tokens.fontSize.lg,
                  fontWeight: tokens.fontWeight.bold
                }}
              >
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <div
                  style={{
                    fontSize: tokens.fontSize.base,
                    fontWeight: tokens.fontWeight.semibold,
                    color: tokens.primaryTextColor
                  }}
                >
                  {testimonial.name}
                </div>
                <div
                  style={{
                    fontSize: tokens.fontSize.sm,
                    color: tokens.sectionTextColor
                  }}
                >
                  Verified Customer
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
