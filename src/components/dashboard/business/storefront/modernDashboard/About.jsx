import { useModernDashboard } from './ModernDashboardContext';

export const About = ({ title, description, image }) => {
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
            display: 'grid',
            gridTemplateColumns: image ? '1fr 1fr' : '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: tokens.typography.sectionTitle.fontSize,
                fontWeight: tokens.typography.sectionTitle.fontWeight,
                lineHeight: tokens.typography.sectionTitle.lineHeight,
                fontFamily: tokens.typography.fontFamily,
                color: tokens.colors.primaryTextColor,
                margin: '0 0 1.5rem 0',
              }}
            >
              {title || 'About FoodiePinoy'}
            </h2>

            <div
              style={{
                fontSize: tokens.typography.body.fontSize,
                lineHeight: tokens.typography.body.lineHeight,
                fontFamily: tokens.typography.fontFamily,
                color: tokens.colors.sectionTextColor,
              }}
            >
              {description ? (
                <p style={{ margin: 0 }}>{description}</p>
              ) : (
                <>
                  <p style={{ margin: '0 0 1rem 0' }}>
                    Welcome to FoodiePinoy, where authentic Filipino cuisine meets modern convenience.
                    We're passionate about bringing the rich flavors of the Philippines to your table.
                  </p>
                  <p style={{ margin: '0 0 1rem 0' }}>
                    Our chefs use traditional recipes passed down through generations, combined with
                    fresh, locally-sourced ingredients to create dishes that warm your heart and satisfy your soul.
                  </p>
                  <p style={{ margin: 0 }}>
                    Whether you're craving classic adobo, savory sinigang, or sweet halo-halo, we've got
                    something special waiting for you. Order now and taste the difference!
                  </p>
                </>
              )}
            </div>
          </div>

          {image && (
            <div
              style={{
                borderRadius: tokens.borderRadius.large,
                overflow: 'hidden',
                boxShadow: tokens.shadows.card,
              }}
            >
              <img
                src={image}
                alt="About us"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
