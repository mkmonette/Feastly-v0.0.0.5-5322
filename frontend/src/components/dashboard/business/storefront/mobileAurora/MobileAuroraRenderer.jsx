import React from 'react';
import { useMobileAurora } from './MobileAuroraContext';
import Header from './Header';
import Hero from './Hero';
import Featured from './Featured';
import Menu from './Menu';
import Reviews from './Reviews';
import CTA from './CTA';
import Contact from './Contact';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import CartPill from './CartPill';

function compare(a, op, b) {
  switch (op) {
    case '>': return a > b;
    case '<': return a < b;
    case '=':
    case 'equals': return a === b;
    case '!=':
    case 'not_equals': return a !== b;
    case '>=': return a >= b;
    case '<=': return a <= b;
    default: return false;
  }
}

function evaluateConditions(conditions, ctx) {
  if (!conditions || conditions.length === 0) return true;
  return conditions.every((c) => {
    switch (c.type) {
      case 'auth':
        return compare(ctx.userStatus, c.operator || 'equals', c.value);
      case 'cart_item_count':
        return compare(ctx.cartItemCount, c.operator, c.value);
      default:
        return true;
    }
  });
}

const SectionWrapper = ({ sectionId, children }) => {
  const { sectionsConfig, cartItemCount } = useMobileAurora();
  const section = sectionsConfig.find((s) => s.id === sectionId);
  if (!section || !section.visibility?.enabled) return null;

  const ctx = { userStatus: 'guest', cartItemCount: cartItemCount || 0 };
  if (!evaluateConditions(section.visibility.conditions, ctx)) return null;

  const devices = section.visibility.devices || ['desktop', 'mobile'];
  const hideOnMobile = !devices.includes('mobile');
  const hideOnDesktop = !devices.includes('desktop');
  const classes = [
    hideOnMobile ? 'hidden md:block' : '',
    hideOnDesktop ? 'md:hidden' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

const MobileAuroraRenderer = () => {
  const { tokens, cartItemCount } = useMobileAurora();

  return (
    <div
      className="w-full relative flex justify-center"
      style={{
        background: tokens.colors.background,
        fontFamily: tokens.typography.fontBody,
        color: tokens.colors.text,
      }}
    >
      <div
        className="relative w-full max-w-[440px] overflow-hidden"
        style={{
          background: tokens.colors.background,
          paddingBottom: cartItemCount > 0 ? '88px' : '24px',
        }}
        data-testid="mobile-aurora-frame"
      >
        {/* Decorative gradient orbs that follow the page */}
        <div
          className="pointer-events-none absolute -top-24 -left-20 w-72 h-72 rounded-full opacity-60 blur-3xl"
          style={{ background: tokens.colors.heroGradient }}
        />
        <div
          className="pointer-events-none absolute top-[60%] -right-24 w-80 h-80 rounded-full opacity-30 blur-3xl"
          style={{ background: tokens.colors.auroraGradient }}
        />

        <SectionWrapper sectionId="header"><Header /></SectionWrapper>
        <SectionWrapper sectionId="hero"><Hero /></SectionWrapper>
        <SectionWrapper sectionId="featured"><Featured /></SectionWrapper>
        <SectionWrapper sectionId="menu"><Menu /></SectionWrapper>
        <SectionWrapper sectionId="reviews"><Reviews /></SectionWrapper>
        <SectionWrapper sectionId="cta"><CTA /></SectionWrapper>
        <SectionWrapper sectionId="contact"><Contact /></SectionWrapper>
        <SectionWrapper sectionId="footer"><Footer /></SectionWrapper>

        <CartPill />
        <CartDrawer />
      </div>
    </div>
  );
};

export default MobileAuroraRenderer;
