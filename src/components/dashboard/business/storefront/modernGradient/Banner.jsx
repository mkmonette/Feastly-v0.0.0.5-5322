import React from 'react';
import { useModernGradient } from './ModernGradientContext';

const Banner = () => {
  const { tokens, sectionsConfig } = useModernGradient();

  const section = sectionsConfig.find(s => s.id === 'banner');
  const content = section?.content || {};

  return (
    <div
      style={{
        background: content.useGradient
          ? `linear-gradient(90deg, ${tokens.colors.gradients.primary.from} 0%, ${tokens.colors.gradients.primary.to} 100%)`
          : tokens.colors.surface,
        padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
        textAlign: 'center'
      }}
    >
      <p
        style={{
          fontSize: tokens.typography.fontSize.sm,
          color: content.useGradient ? tokens.colors.text.inverse : tokens.colors.text.secondary,
          margin: 0
        }}
      >
        {content.textPre}
        <span style={{ fontWeight: tokens.typography.fontWeight.bold, opacity: content.useGradient ? 1 : 0.9 }}>
          {content.textHighlight}
        </span>
      </p>
    </div>
  );
};

export default Banner;
