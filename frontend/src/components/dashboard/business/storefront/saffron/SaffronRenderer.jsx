import React from 'react';
import { useSaffron } from './SaffronContext';
import Header from './Header';
import Hero from './Hero';
import PopularPicks from './PopularPicks';
import OurMenu from './OurMenu';
import CommitmentBand from './CommitmentBand';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

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
  const { sectionsConfig, cartItemCount } = useSaffron();
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

const SaffronRenderer = () => {
  const { tokens } = useSaffron();

  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundColor: tokens.colors.background,
        color: tokens.colors.text,
        fontFamily: tokens.typography.fontBody,
      }}
      data-testid="saffron-frame"
    >
      <SectionWrapper sectionId="header"><Header /></SectionWrapper>
      <SectionWrapper sectionId="hero"><Hero /></SectionWrapper>
      <SectionWrapper sectionId="popular"><PopularPicks /></SectionWrapper>
      <SectionWrapper sectionId="menu"><OurMenu /></SectionWrapper>
      <SectionWrapper sectionId="commitment"><CommitmentBand /></SectionWrapper>
      <SectionWrapper sectionId="footer"><Footer /></SectionWrapper>
      <CartDrawer />
    </div>
  );
};

export default SaffronRenderer;
