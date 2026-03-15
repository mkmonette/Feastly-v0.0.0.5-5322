import React from 'react';
import { mobileCompactMenuTokens as tokens } from '../mobileCompactMenuTokens';
import { useStorefrontBusinessData, useStorefront } from './contextBridge';

export default function Header() {
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const headerSection = sectionsConfig.find(s => s.id === 'header');

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        backgroundColor: tokens.colors.surface,
        borderBottom: `1px solid ${tokens.colors.border}`,
        padding: '0.875rem 1rem',
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.containerMaxWidth,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          {businessData.logoUrl ? (
            <img
              src={businessData.logoUrl}
              alt={businessData.name}
              style={{
                height: '32px',
                width: '32px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          ) : (
            <div
              style={{
                height: '32px',
                width: '32px',
                borderRadius: '50%',
                backgroundColor: tokens.colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: tokens.typography.fontWeight.heading,
                  color: tokens.colors.buttonText,
                  fontFamily: tokens.typography.fontFamily.heading,
                }}
              >
                {(headerSection?.content?.logoText || businessData.name || 'M').charAt(0)}
              </span>
            </div>
          )}
          <span
            style={{
              fontSize: '1rem',
              fontWeight: tokens.typography.fontWeight.heading,
              color: tokens.colors.primaryText,
              fontFamily: tokens.typography.fontFamily.heading,
            }}
          >
            {businessData.name || 'My Restaurant'}
          </span>
        </div>
      </div>
    </header>
  );
}
