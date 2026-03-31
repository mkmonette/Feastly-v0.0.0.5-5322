import React from 'react';
import { useModernMenuCart } from './ModernMenuCartContext';

export default function Banner() {
  const { tokens, sectionsConfig } = useModernMenuCart();
  const section = sectionsConfig.find(s => s.id === 'banner');

  if (!section?.visibility?.enabled) return null;

  const content = section.content || {};

  return (
    <section style={{
      padding: '1.5rem 0',
      backgroundColor: tokens.colors.primary,
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        animation: 'marquee 20s linear infinite'
      }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
            padding: '0 1.5rem'
          }}>
            <span style={{
              fontSize: tokens.typography.fontSize['2xl'],
              fontWeight: tokens.typography.fontWeight.bold,
              color: 'rgba(255, 255, 255, 0.3)'
            }}>
              {content.textPre}
            </span>
            <span style={{
              fontSize: tokens.typography.fontSize['2xl'],
              fontWeight: tokens.typography.fontWeight.bold,
              color: '#fff'
            }}>
              {content.textHighlight}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
