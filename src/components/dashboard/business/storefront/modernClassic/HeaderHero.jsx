import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from './contextBridge';

const HeaderHero = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();

  const headerSection = sectionsConfig.find(s => s.id === 'header');
  const heroSection = sectionsConfig.find(s => s.id === 'hero');
  const heroContent = heroSection?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};
  const primaryTextStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const secondaryButtonStyle = colors.secondary.startsWith('#') ? { backgroundColor: colors.secondary } : {};

  const showButton1 = heroContent.showButton1 !== false;
  const showButton2 = heroContent.showButton2 !== false;

  return (
    <section className={`relative min-h-screen flex flex-col bg-${colors.background}`}>
      <header className={`sticky top-0 z-50 bg-${colors.background}/95 backdrop-blur-md border-b border-${colors.border} transition-all`}>
        <div className={`${layout.container} ${layout.containerWidth} ${layout.horizontalPadding} py-5 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {businessData.logoUrl ? (
              <img src={businessData.logoUrl} alt={businessData.name} className="h-10 w-10 object-cover rounded-lg" />
            ) : (
              <div className={`h-10 w-10 bg-${colors.primary} ${layout.borderRadiusBase} flex items-center justify-center`} style={primaryStyle}>
                <span className={`text-${colors.textInverse} ${typography.weights.black} text-lg`}>
                  {(headerSection?.content?.logoText || businessData.name || 'F').charAt(0)}
                </span>
              </div>
            )}
            <span className={`${typography.scale.h4} ${typography.weights.bold} text-${colors.textPrimary} ${typography.fontPrimary}`}>
              {headerSection?.content?.logoText || businessData.name}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
              <button
                key={item}
                className={`${typography.scale.bodySmall} ${typography.weights.medium} text-${colors.textMuted} hover:text-${colors.primary} transition-colors ${typography.fontSecondary}`}
              >
                {item}
              </button>
            ))}
          </nav>

          <button className={`md:hidden text-${colors.textPrimary}`}>
            <SafeIcon icon={FiIcons.FiMenu} className="text-2xl" />
          </button>
        </div>
      </header>

      <div className={`flex-1 grid md:grid-cols-2 items-center ${layout.horizontalPadding} ${layout.sectionPaddingLarge}`}>
        <div className={`${layout.container} space-y-8 text-left`}>
          {heroContent.preText && (
            <div className="flex items-center gap-2">
              <div className={`h-px w-12 bg-${colors.primary}`} style={colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {}} />
              <span
                className={`${typography.scale.bodySmall} ${typography.weights.semibold} text-${colors.primary} ${typography.transform.uppercase} ${typography.fontPrimary}`}
                style={primaryTextStyle}
              >
                {heroContent.preText}
              </span>
            </div>
          )}

          <h1 className={`${typography.scale.h1} ${typography.weights.black} text-${colors.textPrimary} ${typography.lineHeights.tight} ${typography.fontPrimary}`}>
            {heroContent.titlePre || businessData.name}
            {heroContent.titleHighlight && (
              <>
                <br />
                <span
                  className={!colors.primary.startsWith('#') ? `text-${colors.primary}` : ''}
                  style={primaryTextStyle}
                >
                  {heroContent.titleHighlight}
                </span>
              </>
            )}
          </h1>

          <p className={`${typography.scale.bodyLarge} text-${colors.textMuted} ${typography.lineHeights.relaxed} max-w-xl ${typography.fontSecondary}`}>
            {heroContent.subtitle || businessData.description}
          </p>

          <div className="flex flex-wrap gap-4">
            {showButton1 && (
              <button
                className={`px-8 py-4 bg-${colors.primary} text-${colors.textInverse} ${typography.scale.body} ${typography.weights.semibold} hover:bg-${colors.primaryHover} transition-all ${layout.borderRadiusBase} ${layout.shadow} ${layout.shadowPrimary} hover:scale-105 ${typography.fontPrimary}`}
                style={primaryStyle}
              >
                {heroContent.button1Text || 'Get Started'}
              </button>
            )}
            {showButton2 && (
              <button
                className={`px-8 py-4 border-2 border-${colors.border} bg-${colors.background} text-${colors.textPrimary} ${typography.scale.body} ${typography.weights.semibold} hover:border-${colors.primary} transition-all ${layout.borderRadiusBase} ${typography.fontPrimary}`}
              >
                {heroContent.button2Text || 'Learn More'}
              </button>
            )}
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className={`relative ${layout.borderRadiusLarge} overflow-hidden ${layout.shadowLarge}`}>
            <img
              src={heroContent.image || businessData.bannerUrl || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"}
              alt="Hero"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className={`absolute -bottom-8 -left-8 bg-${colors.background} p-6 ${layout.borderRadiusLarge} ${layout.shadowLarge} border border-${colors.border}`}>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-${colors.primary} ${layout.borderRadiusBase} flex items-center justify-center`} style={primaryStyle}>
                <SafeIcon icon={FiIcons.FiStar} className={`text-3xl text-${colors.textInverse}`} />
              </div>
              <div className="text-left">
                <div className={`${typography.scale.h3} ${typography.weights.black} text-${colors.textPrimary} ${typography.fontPrimary}`}>
                  4.9/5
                </div>
                <div className={`${typography.scale.bodySmall} text-${colors.textMuted} ${typography.fontSecondary}`}>
                  Customer Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
