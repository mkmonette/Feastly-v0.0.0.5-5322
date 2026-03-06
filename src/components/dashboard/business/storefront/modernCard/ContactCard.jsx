import React from 'react';
import { useModernCard } from './ModernCardContext';

const ContactCard = () => {
  const { tokens, sectionsConfig } = useModernCard();
  const section = sectionsConfig.find(s => s.id === 'contact');

  if (!section?.content) return null;

  const { title, description, showButton, buttonText } = section.content;

  return (
    <section className={tokens.layout.spacing.section}>
      <div className={`${tokens.layout.maxWidth} mx-auto`}>
        <div
          className={`${tokens.layout.borderRadius.card} ${tokens.effects.shadow.card} p-8 text-center`}
          style={{
            backgroundColor: tokens.colors.cardBackground,
            border: `1px solid ${tokens.colors.border}`
          }}
        >
          <h2
            className={`text-3xl ${tokens.typography.headingWeight} mb-4 ${tokens.typography.fontFamily}`}
            style={{ color: tokens.colors.primaryText }}
          >
            {title}
          </h2>
          <p
            className={`text-base ${tokens.typography.bodyWeight} leading-relaxed mb-6`}
            style={{ color: tokens.colors.secondaryText }}
          >
            {description}
          </p>
          {showButton && (
            <button
              className={`px-8 py-3 ${tokens.layout.borderRadius.button} text-sm ${tokens.typography.buttonWeight} uppercase tracking-widest ${tokens.effects.transition} ${tokens.effects.shadow.button}`}
              style={{
                backgroundColor: tokens.colors.primary,
                color: '#FFFFFF'
              }}
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactCard;
