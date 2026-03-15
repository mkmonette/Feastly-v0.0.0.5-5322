import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';

const Gallery = () => {
  const { tokens, sectionsConfig } = useModernMinimal();

  const section = sectionsConfig.find(s => s.id === 'gallery');
  const content = section?.content || {};

  const images = [
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  return (
    <section
      style={{
        padding: `${tokens.spacing['3xl']} ${tokens.spacing.xl}`,
        background: tokens.colors.surface
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: tokens.spacing['2xl'] }}>
          <h2
            style={{
              fontSize: tokens.typography.fontSize['2xl'],
              fontWeight: tokens.typography.fontWeight.bold,
              color: tokens.colors.text.primary,
              lineHeight: tokens.typography.lineHeight.tight
            }}
          >
            {content.titlePre} <span style={{ color: tokens.colors.accent }}>{content.titleHighlight}</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: tokens.spacing.md }}>
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                borderRadius: tokens.borderRadius.md,
                overflow: 'hidden',
                aspectRatio: '1',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
