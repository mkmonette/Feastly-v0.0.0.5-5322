import React from 'react';
import { modernSplitCartTokens as tokens } from '../modernSplitCartTokens';
import { useStorefront } from './contextBridge';
import Headline from '../Headline';

export default function Hero() {
  const { sectionsConfig } = useStorefront();
  const heroSection = sectionsConfig.find(s => s.id === 'hero');

  const content = heroSection?.content || {};

  return (
    <section
      style={{
        padding: '3rem 2rem',
        backgroundColor: tokens.colors.background,
      }}
    >
      <div style={{ maxWidth: '800px' }}>
        {content.preTitle && (
          <p
            style={{
              fontSize: tokens.typography.fontSize.bodyText,
              color: tokens.colors.heroPreText,
              fontWeight: tokens.typography.fontWeight.subheading,
              margin: '0 0 1rem 0',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {content.preTitle}
          </p>
        )}

        <Headline
          normalText={content.title || 'Delicious Food'}
          highlightText={content.titleHighlight || 'Delivered'}
          tokens={tokens}
          as="h1"
          style={{
            fontSize: tokens.typography.fontSize.heroTitle,
            fontWeight: tokens.typography.fontWeight.heading,
            fontFamily: tokens.typography.fontFamily.heading,
            lineHeight: tokens.typography.lineHeight.heading,
            margin: '0 0 1.5rem 0',
          }}
        />

        {content.description && (
          <p
            style={{
              fontSize: tokens.typography.fontSize.heroSubtitle,
              color: tokens.colors.secondaryText,
              lineHeight: tokens.typography.lineHeight.body,
              margin: '0 0 2rem 0',
              maxWidth: '600px',
            }}
          >
            {content.description}
          </p>
        )}

        {content.ctaText && (
          <button
            style={{
              padding: '0.875rem 2rem',
              backgroundColor: tokens.colors.accent,
              color: tokens.colors.buttonText,
              border: 'none',
              borderRadius: tokens.borderRadius.button,
              fontSize: tokens.typography.fontSize.bodyText,
              fontWeight: tokens.typography.fontWeight.bold,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = tokens.colors.accentHover)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = tokens.colors.accent)}
          >
            {content.ctaText}
          </button>
        )}
      </div>
    </section>
  );
}
