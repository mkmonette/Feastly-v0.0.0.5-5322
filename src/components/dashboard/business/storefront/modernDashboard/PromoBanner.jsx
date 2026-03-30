import { useModernDashboard } from './ModernDashboardContext';

export const PromoBanner = ({ title, description, ctaText, ctaAction, backgroundImage }) => {
  const { tokens } = useModernDashboard();

  return (
    <section
      style={{
        padding: tokens.spacing.sectionPadding,
        background: tokens.colors.secondaryBg,
      }}
    >
      <div
        style={{
          maxWidth: tokens.spacing.containerMaxWidth,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            position: 'relative',
            borderRadius: tokens.borderRadius.large,
            overflow: 'hidden',
            background: backgroundImage
              ? `url(${backgroundImage})`
              : `linear-gradient(135deg, ${tokens.colors.accentColor} 0%, #FF8C5A 100%)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '4rem',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: tokens.shadows.card,
          }}
        >
          {backgroundImage && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.5)',
              }}
            />
          )}

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              color: '#FFFFFF',
              maxWidth: '600px',
            }}
          >
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                lineHeight: '1.2',
                fontFamily: tokens.typography.fontFamily,
                margin: '0 0 1rem 0',
              }}
            >
              {title || 'Special Offer'}
            </h2>

            {description && (
              <p
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.6',
                  fontFamily: tokens.typography.fontFamily,
                  margin: '0 0 2rem 0',
                  opacity: 0.95,
                }}
              >
                {description}
              </p>
            )}

            {ctaText && (
              <button
                onClick={ctaAction}
                style={{
                  background: '#FFFFFF',
                  color: tokens.colors.accentColor,
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {ctaText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
