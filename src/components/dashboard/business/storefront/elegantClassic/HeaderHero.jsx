import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefrontBusinessData, useStorefront } from './contextBridge';

const HeaderHero = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();
  const businessData = useStorefrontBusinessData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerSection = sectionsConfig.find(s => s.id === 'header');
  const heroSection = sectionsConfig.find(s => s.id === 'hero');
  const heroContent = heroSection?.content || {};

  const accentBgStyle = { backgroundColor: colors.accent };
  const accentHoverStyle = { backgroundColor: colors.accentHover || colors.accent };
  const heroPreTextStyle = { color: colors.heroPreText };
  const heroNormalStyle = { color: colors.heroHeadlineNormal };
  const heroHighlightStyle = { color: colors.accent };

  const showButton1 = heroContent.showButton1 !== false;
  const showButton2 = heroContent.showButton2 !== false;

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroContent.image || businessData.bannerUrl || "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1920"})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <header className={`relative z-30 ${layout.horizontalPadding} py-6`}>
        <div className={`${layout.container} ${layout.containerWidth} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            {businessData.logoUrl ? (
              <img src={businessData.logoUrl} alt={businessData.name} className="h-14 w-14 object-cover rounded-full" />
            ) : (
              <div className="h-14 w-14 rounded-full flex items-center justify-center" style={accentBgStyle}>
                <span className={`${typography.scale.h5} ${typography.weights.bold} ${typography.fontPrimary}`} style={{ color: colors.textInverse }}>
                  {(headerSection?.content?.logoText || businessData.name || 'R').charAt(0)}
                </span>
              </div>
            )}
            <span className={`${typography.scale.h5} ${typography.weights.semibold} text-white ${typography.fontPrimary}`}>
              {headerSection?.content?.logoText || businessData.name}
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map((item) => (
              <button
                key={item}
                className={`${typography.scale.bodySmall} ${typography.weights.medium} transition-colors ${typography.fontSecondary}`}
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.accent}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'}
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <SafeIcon icon={mobileMenuOpen ? FiIcons.FiX : FiIcons.FiMenu} className="text-3xl" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg">
            <nav className={`${layout.horizontalPadding} py-8 flex flex-col gap-6`}>
              {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  className={`${typography.scale.body} ${typography.weights.medium} text-white text-left ${typography.fontSecondary}`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <div className={`relative z-20 ${layout.horizontalPadding} ${layout.sectionPaddingLarge}`}>
        <div className={`${layout.container} ${layout.containerWidth}`}>
          <div className="max-w-3xl">
            {heroContent.preText && (
              <div className="mb-6">
                <span
                  className={`${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.widest} ${typography.transform.uppercase} ${typography.fontSecondary}`}
                  style={heroPreTextStyle}
                >
                  {heroContent.preText}
                </span>
              </div>
            )}

            <h1 className={`${typography.scale.h1} ${typography.weights.bold} ${typography.lineHeights.tight} mb-8 ${typography.fontPrimary}`}>
              <span style={heroNormalStyle}>
                {heroContent.titlePre || businessData.name}
              </span>
              {heroContent.titleHighlight && (
                <>
                  {' '}
                  <span className="relative inline-block" style={heroHighlightStyle}>
                    {heroContent.titleHighlight}
                  </span>
                </>
              )}
            </h1>

            <p className={`${typography.scale.bodyLarge} text-white/80 ${typography.lineHeights.relaxed} mb-12 max-w-2xl ${typography.fontSecondary}`}>
              {heroContent.subtitle || businessData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {showButton1 && (
                <button
                  className={`px-8 py-4 ${typography.scale.body} ${typography.weights.semibold} transition-all hover:scale-105 ${typography.fontSecondary}`}
                  style={{ backgroundColor: colors.accent, color: colors.textInverse }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.accentHover || colors.accent}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.accent}
                >
                  {heroContent.button1Text || 'Order Now'}
                </button>
              )}
              {showButton2 && (
                <button
                  className={`px-8 py-4 border-2 ${typography.scale.body} ${typography.weights.semibold} transition-all ${typography.fontSecondary}`}
                  style={{ borderColor: colors.textInverse, color: colors.textInverse }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.textInverse;
                    e.currentTarget.style.color = colors.textPrimary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = colors.textInverse;
                  }}
                >
                  {heroContent.button2Text || 'View Menu'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
};

export default HeaderHero;
