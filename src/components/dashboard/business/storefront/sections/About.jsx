import React from 'react';
import { useStorefrontTokens, useStorefront } from '../StorefrontContext';

const About = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'about');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary + '20' } : {};
  const borderStyle = colors.primary.startsWith('#') ? { borderColor: colors.primary } : {};

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding} bg-${colors.background} ${typography.fontSecondary}`}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className={`grid md:grid-cols-2 ${layout.gridGapLarge} items-center`}>
          <div className="relative">
            <div 
              className={`absolute -top-4 -left-4 w-24 h-24 bg-${colors.primaryLight} rounded-full -z-10`}
              style={primaryBgStyle}
            />
            <img 
              src={content.image || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop"} 
              alt="Our Kitchen" 
              className={`${layout.borderRadiusSmall} ${layout.shadowLarge}`}
            />
            {content.experienceYears && (
              <div className={`absolute -bottom-10 -right-10 bg-${colors.background} p-8 ${layout.borderRadiusSmall} shadow-xl hidden lg:block border border-${colors.border}`}>
                <span 
                  className={`block text-4xl ${typography.weights.black} text-${colors.primary} ${typography.fontPrimary}`}
                  style={primaryStyle}
                >{content.experienceYears}</span>
                <span className={`${typography.scale.h4} ${typography.weights.bold} text-${colors.textMuted} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.fontPrimary}`}>
                  {content.experienceText || 'Years of Experience'}
                </span>
              </div>
            )}
          </div>
          
          <div>
            <span 
              className={`text-${colors.primary} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4} mb-4 block ${typography.fontPrimary}`}
              style={primaryStyle}
            >Our Story</span>
            <h2 className={`${typography.scale.h2} ${typography.weights.black} text-${colors.textPrimary} ${typography.lineHeights.tight} ${typography.transform.uppercase} ${typography.tracking.tighter} mb-8 ${typography.fontPrimary}`}>
              {content.titlePre} <br />
              <span style={primaryStyle}>{content.titleHighlight}</span>
            </h2>
            <p className={`text-gray-600 ${typography.scale.body} ${typography.lineHeights.relaxed} mb-12 text-left`}>
              {content.description}
            </p>
            <button 
              className={`text-${colors.secondary} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4} border-b-2 border-${colors.primary} pb-1 hover:text-${colors.primary} transition-colors ${typography.fontPrimary}`}
              style={{ ...borderStyle, color: colors.secondary.startsWith('#') ? colors.secondary : undefined }}
            >
              {content.buttonText || 'Learn More'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;