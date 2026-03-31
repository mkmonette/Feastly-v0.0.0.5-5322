import React from 'react';
import { useModernMenuCart } from './ModernMenuCartContext';

export default function Footer() {
  const { tokens, sectionsConfig, businessData } = useModernMenuCart();
  const section = sectionsConfig.find(s => s.id === 'footer');

  if (!section?.visibility?.enabled) return null;

  const content = section.content || {};

  return (
    <footer style={{
      padding: `${tokens.spacing.xl} ${tokens.spacing.lg}`,
      backgroundColor: tokens.colors.text,
      color: '#fff'
    }}>
      <div style={{
        maxWidth: tokens.layout.maxWidth,
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h3 style={{
          fontSize: tokens.typography.fontSize.xl,
          fontWeight: tokens.typography.fontWeight.bold,
          marginBottom: tokens.spacing.md
        }}>
          {businessData.name}
        </h3>
        <p style={{
          fontSize: tokens.typography.fontSize.base,
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: tokens.spacing.lg,
          maxWidth: '600px',
          margin: `0 auto ${tokens.spacing.lg} auto`
        }}>
          {content.footerDescription}
        </p>
        <div style={{
          fontSize: tokens.typography.fontSize.sm,
          color: 'rgba(255, 255, 255, 0.6)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: tokens.spacing.md
        }}>
          {content.copyrightText || `© ${new Date().getFullYear()} ${businessData.name}. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
}
