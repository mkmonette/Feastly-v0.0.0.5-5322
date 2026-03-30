import { useModernMenuCart } from './ModernMenuCartContext';

const About = ({ config }) => {
  const { tokens } = useModernMenuCart();

  return (
    <section style={{ padding: '1.5rem 1rem' }}>
      <div
        style={{
          backgroundColor: tokens.colors.surface,
          borderRadius: tokens.borderRadius.card,
          padding: '1.5rem',
          boxShadow: tokens.shadows.card,
        }}
      >
        <h2
          style={{
            fontFamily: tokens.typography.fontFamily.heading,
            fontSize: tokens.typography.fontSize.sectionTitle,
            fontWeight: tokens.typography.fontWeight.heading,
            color: tokens.colors.sectionHeadlineNormal,
            marginBottom: '1rem',
          }}
        >
          About <span style={{ color: tokens.colors.sectionHeadlineHighlight }}>Us</span>
        </h2>
        <p
          style={{
            fontSize: tokens.typography.fontSize.bodyText,
            color: tokens.colors.secondaryText,
            lineHeight: tokens.typography.lineHeight.body,
          }}
        >
          {config?.about || 'We serve authentic Filipino cuisine made with fresh ingredients and traditional recipes. Our mission is to bring the taste of home-cooked Filipino food right to your doorstep.'}
        </p>
      </div>
    </section>
  );
};

export default About;
