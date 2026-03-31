import React from 'react';
import { useModernMenuCart } from './ModernMenuCartContext';

export default function Gallery() {
  const { tokens, sectionsConfig } = useModernMenuCart();
  const section = sectionsConfig.find(s => s.id === 'gallery');

  if (!section?.visibility?.enabled) return null;

  const content = section.content || {};

  const images = [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];

  return (
    <section style={{
      padding: tokens.spacing.sectionPadding,
      backgroundColor: tokens.colors.background
    }}>
      <div style={{
        maxWidth: tokens.layout.maxWidth,
        margin: '0 auto',
        padding: `0 ${tokens.spacing.lg}`
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: tokens.spacing.xl
        }}>
          <h2 style={{
            fontSize: tokens.typography.fontSize.sectionTitle,
            fontWeight: tokens.typography.fontWeight.bold,
            color: tokens.colors.text,
            margin: 0
          }}>
            <span style={{ color: tokens.colors.sectionHeadlineNormal }}>
              {content.titlePre}{' '}
            </span>
            <span style={{ color: tokens.colors.sectionHeadlineHighlight }}>
              {content.titleHighlight}
            </span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: tokens.spacing.lg
        }}>
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                borderRadius: tokens.borderRadius.card,
                overflow: 'hidden',
                height: '250px',
                boxShadow: tokens.shadows.md,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = tokens.shadows.lg;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = tokens.shadows.md;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
