import React from 'react';
import { mobileCardMenuTokens as tokens } from '../mobileCardMenuTokens';
import { useStorefront } from './contextBridge';
import Headline from '../Headline';

export default function Hero() {
  const { sectionsConfig } = useStorefront();
  const heroSection = sectionsConfig.find(s => s.id === 'hero');

  if (!heroSection?.visible) return null;

  const content = heroSection.content || {};

  return (
    <section
      style={{
        padding: tokens.spacing.sectionPadding,
        backgroundColor: tokens.colors.background,
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.containerMaxWidth,
          margin: '0 auto',
        }}
      >
        {content.preTitle && (
          <p
            style={{
              fontSize: tokens.typography.fontSize.smallText,
              color: tokens.colors.heroPreText,
              fontWeight: tokens.typography.fontWeight.subheading,
              margin: '0 0 0.75rem 0',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {content.preTitle}
          </p>
        )}

        <Headline
          normalText={content.title || 'Order'}
          highlightText={content.titleHighlight || 'Fresh Food'}
          tokens={tokens}
          as="h1"
          style={{
            fontSize: tokens.typography.fontSize.heroTitle,
            fontWeight: tokens.typography.fontWeight.heading,
            fontFamily: tokens.typography.fontFamily.heading,
            lineHeight: tokens.typography.lineHeight.heading,
            margin: '0 0 1rem 0',
          }}
        />

        {content.description && (
          <p
            style={{
              fontSize: tokens.typography.fontSize.heroSubtitle,
              color: tokens.colors.secondaryText,
              lineHeight: tokens.typography.lineHeight.body,
              margin: 0,
            }}
          >
            {content.description}
          </p>
        )}
      </div>
    </section>
  );
}
