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
  const accentStyle = (colors.accent || colors.secondary).startsWith('#') ? { backgroundColor: (colors.accent || colors.secondary) } : {};
  const accentBorderStyle = (colors.accent || colors.secondary).startsWith('#') ? { borderColor: (colors.accent || colors.secondary) } : {};
  const heroPreTextStyle = { color: colors.heroPreText || colors.heroHeadlinePre || '#10b981' };
  const heroNormalStyle = { color: colors.heroHeadlinePre || '#FFFFFF' };
  const heroHighlightStyle = { color: colors.primary };
  const sectionHeadlineNormalStyle = { color: colors.sectionHeadlineNormal };
  const sectionHeadlineHighlightStyle = { color: colors.sectionHeadlineHighlight || colors.sectionHeadlineNormal };

  const showButton1 = heroContent.showButton1 !== false;
  const showButton2 = heroContent.showButton2 !== false;

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br from-${colors.surface} via-black to-${colors.surface} opacity-90`} style={colors.surface.startsWith('#') ? { background: `linear-gradient(to bottom right, ${colors.surface}, black, ${colors.surface})`, opacity: 0.9 } : {}} />

      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div
          className="absolute top-20 right-20 w-96 h-96 blur-3xl"
          style={{ background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.accent || colors.secondary})` }}
        />
        <div
          className="absolute bottom-20 right-40 w-80 h-80 blur-3xl"
          style={{ background: `linear-gradient(to top right, ${colors.accent || colors.secondary}, ${colors.primary})` }}
        />
      </div>

      <header className={`relative z-20 ${layout.horizontalPadding} py-6 border-b border-white/10`}>
        <div className={`${layout.container} ${layout.containerWidth} flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            {businessData.logoUrl ? (
              <img src={businessData.logoUrl} alt={businessData.name} className="h-12 w-12 object-cover" />
            ) : (
              <div className={`h-12 w-12 bg-${colors.primary} flex items-center justify-center`} style={primaryStyle}>
                <span className={`text-${colors.textInverse} ${typography.weights.black} ${typography.scale.h4} ${typography.fontPrimary}`}>
                  {(headerSection?.content?.logoText || businessData.name || 'F').charAt(0)}
                </span>
              </div>
            )}
            <span className={`${typography.scale.h4} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.fontPrimary}`}>
              {headerSection?.content?.logoText || businessData.name}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
              <button
                key={item}
                className={`${typography.scale.bodySmall} ${typography.weights.semibold} text-${colors.textInverseMuted} hover:text-${colors.textInverse} transition-colors ${typography.fontSecondary}`}
              >
                {item}
              </button>
            ))}
          </nav>

          <button className="md:hidden text-white">
            <SafeIcon icon={FiIcons.FiMenu} className="text-2xl" />
          </button>
        </div>
      </header>

      <div className={`relative z-10 ${layout.horizontalPadding} ${layout.sectionPaddingLarge}`}>
        <div className={`${layout.container} ${layout.containerWidth} grid md:grid-cols-12 gap-12 items-center`}>
          <div className="md:col-span-7 space-y-12 text-left">
            {heroContent.preText && (
              <div className="inline-block">
                <div
                  className="inline-flex items-center gap-3 px-6 py-3"
                  style={{
                    backgroundColor: `${colors.heroPreText || colors.heroHeadlinePre || colors.primary}1A`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: `${colors.heroPreText || colors.heroHeadlinePre || colors.primary}4D`
                  }}
                >
                  <div className="w-2 h-2 animate-pulse" style={{ backgroundColor: colors.heroPreText || colors.heroHeadlinePre || colors.primary }} />
                  <span
                    className={`${typography.scale.bodySmall} ${typography.weights.bold} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.fontPrimary}`}
                    style={heroPreTextStyle}
                  >
                    {heroContent.preText}
                  </span>
                </div>
              </div>
            )}

            <h1 className={`${typography.scale.h1} ${typography.weights.black} ${typography.lineHeights.none} ${typography.transform.uppercase} ${typography.fontPrimary}`}>
              <span style={heroNormalStyle}>{heroContent.titlePre || businessData.name}</span>
              {heroContent.titleHighlight && (
                <>
                  <br />
                  <span className="relative inline-block" style={heroHighlightStyle}>
                    {heroContent.titleHighlight}
                    <div className="absolute -bottom-4 left-0 w-full h-2" style={{ backgroundColor: colors.accent || colors.secondary }} />
                  </span>
                </>
              )}
            </h1>

            <p className={`${typography.scale.bodyLarge} text-${colors.textInverseMuted} ${typography.lineHeights.relaxed} max-w-2xl ${typography.fontSecondary}`}>
              {heroContent.subtitle || businessData.description}
            </p>

            <div className="flex flex-wrap gap-6">
              {showButton1 && (
                <button
                  className={`group relative px-12 py-6 text-black ${typography.scale.body} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.wide} overflow-hidden transition-all hover:scale-105 ${typography.fontPrimary}`}
                  style={primaryStyle}
                >
                  <span className="relative z-10">{heroContent.button1Text || 'Get Started'}</span>
                  <div className="absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={accentStyle} />
                </button>
              )}
              {showButton2 && (
                <button
                  className={`px-12 py-6 border-2 border-white text-white ${typography.scale.body} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.wide} hover:bg-white hover:text-black transition-all ${typography.fontPrimary}`}
                >
                  {heroContent.button2Text || 'Learn More'}
                </button>
              )}
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="relative aspect-[3/4]">
              <div className="absolute -top-12 -left-12 w-full h-full border-4" style={{ borderColor: colors.primary }} />
              <img
                src={heroContent.image || businessData.bannerUrl || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"}
                alt="Hero"
                className="relative z-10 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute -bottom-8 -right-8 p-8 z-20" style={accentStyle}>
                <div className={`${typography.scale.h2} ${typography.weights.black} text-black ${typography.fontPrimary}`}>
                  15+
                </div>
                <div className={`${typography.scale.xs} ${typography.weights.bold} ${typography.transform.uppercase} text-black mt-2 ${typography.fontSecondary}`}>
                  Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent || colors.secondary}, ${colors.primary})` }}
      />
    </section>
  );
};

export default HeaderHero;
