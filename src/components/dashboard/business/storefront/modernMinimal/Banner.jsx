import React from 'react';
import { useModernMinimal } from './ModernMinimalContext';

const Banner = () => {
  const { tokens, sectionsConfig } = useModernMinimal();

  const section = sectionsConfig.find(s => s.id === 'banner');
  const content = section?.content || {};

  return (
    <div
      style={{
        background: tokens.colors.surface,
        borderTop: `1px solid ${tokens.colors.border}`,
        borderBottom: `1px solid ${tokens.colors.border}`,
        padding: `${tokens.spacing.md} ${tokens.spacing.xl}`,
        textAlign: 'center'
      }}
    >
      <p
        style={{
          fontSize: tokens.typography.fontSize.sm,
          color: tokens.colors.text.secondary,
          margin: 0
        }}
      >
        {content.textPre}
        <span style={{ color: tokens.colors.accent, fontWeight: tokens.typography.fontWeight.semibold }}>
          {content.textHighlight}
        </span>
      </p>
    </div>
  );
};

export default Banner;
