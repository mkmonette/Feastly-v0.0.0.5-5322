import React from 'react';
import { useModernCard } from './ModernCardContext';

const HeroCard = () => {
  const { tokens, sectionsConfig } = useModernCard();
  const section = sectionsConfig.find(s => s.id === 'hero');

  if (!section?.content) return null;

  const { title, subtitle, description, showButton, buttonText } = section.content;

  return (
    <section className={tokens.layout.spacing.section}>
      <div className={`${tokens.layout.maxWidth} mx-auto`}>
        <div
          className={`${tokens.layout.borderRadius.card} ${tokens.effects.shadow.card} overflow-hidden bg-white`}
          style={{
            backgroundColor: tokens.colors.cardBackground,
            border: `1px solid ${tokens.colors.border}`
          }}
        >
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p
                  className={`text-sm ${tokens.typography.bodyWeight} mb-2 uppercase tracking-wider`}
                  style={{ color: tokens.colors.secondaryText }}
                >
                  {subtitle}
                </p>
                <h2
                  className={`text-4xl ${tokens.typography.headingWeight} mb-4 ${tokens.typography.fontFamily}`}
                  style={{ color: tokens.colors.primaryText }}
                >
                  {title}
                </h2>
              </div>
              <button
                className={`w-12 h-12 ${tokens.layout.borderRadius.button} flex items-center justify-center ${tokens.effects.shadow.button} ${tokens.effects.transition}`}
                style={{
                  backgroundColor: tokens.colors.accent,
                  color: tokens.colors.buttonText
                }}
              >
                <span className="text-2xl font-black">+</span>
              </button>
            </div>

            <p
              className={`text-base ${tokens.typography.bodyWeight} mb-6 leading-relaxed`}
              style={{ color: tokens.colors.secondaryText }}
            >
              {description}
            </p>

            <div
              className={`${tokens.layout.borderRadius.image} overflow-hidden mb-6`}
              style={{ backgroundColor: '#F5E6D3', minHeight: '320px' }}
            >
              <div className="w-full h-80 flex items-center justify-center">
                <div className="text-center" style={{ color: tokens.colors.lightText }}>
                  <svg className="w-20 h-20 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium">Product Image</p>
                </div>
              </div>
            </div>

            {showButton && (
              <button
                className={`w-full py-4 ${tokens.layout.borderRadius.small} text-sm ${tokens.typography.buttonWeight} uppercase tracking-widest ${tokens.effects.transition} ${tokens.effects.shadow.button}`}
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
      </div>
    </section>
  );
};

export default HeroCard;
