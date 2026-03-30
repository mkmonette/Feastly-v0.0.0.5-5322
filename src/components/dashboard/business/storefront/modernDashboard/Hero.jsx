import { useModernDashboard } from './ModernDashboardContext';

export const Hero = ({ title, subtitle, backgroundImage, ctaText, ctaAction }) => {
  const { tokens } = useModernDashboard();

  return (
    <section
      style={{
        margin: tokens.hero.margin,
        height: tokens.hero.height,
        borderRadius: tokens.hero.borderRadius,
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {tokens.hero.overlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: tokens.colors.overlayBg,
          }}
        />
      )}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: tokens.hero.padding,
          color: '#FFFFFF',
          maxWidth: '800px',
        }}
      >
        {subtitle && (
          <p
            style={{
              fontSize: tokens.typography.heroSubtitle.fontSize,
              fontWeight: tokens.typography.heroSubtitle.fontWeight,
              lineHeight: tokens.typography.heroSubtitle.lineHeight,
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.heroPreTextColor,
              margin: '0 0 1rem 0',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {subtitle}
          </p>
        )}

        <h1
          style={{
            fontSize: tokens.typography.heroTitle.fontSize,
            fontWeight: tokens.typography.heroTitle.fontWeight,
            lineHeight: tokens.typography.heroTitle.lineHeight,
            letterSpacing: tokens.typography.heroTitle.letterSpacing,
            fontFamily: tokens.typography.fontFamily,
            color: '#FFFFFF',
            margin: '0 0 1.5rem 0',
          }}
        >
          {title || 'Delicious Filipino Cuisine'}
        </h1>

        {ctaText && (
          <button
            onClick={ctaAction}
            style={{
              background: tokens.colors.accentColor,
              color: '#FFFFFF',
              border: 'none',
              padding: tokens.button.primary.padding,
              borderRadius: tokens.button.primary.borderRadius,
              fontSize: tokens.button.primary.fontSize,
              fontWeight: tokens.button.primary.fontWeight,
              fontFamily: tokens.typography.fontFamily,
              cursor: 'pointer',
              boxShadow: tokens.shadows.elevated,
              transition: tokens.transitions.fast,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = tokens.shadows.elevated;
            }}
          >
            {ctaText}
          </button>
        )}
      </div>
    </section>
  );
};
