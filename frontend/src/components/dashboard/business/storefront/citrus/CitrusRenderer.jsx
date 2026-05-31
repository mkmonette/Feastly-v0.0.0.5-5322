import React from 'react';
import { useCitrus } from './CitrusContext';
import Header from './Header';
import HeroStrip from './HeroStrip';
import MenuBoard from './MenuBoard';
import OrderSidebar from './OrderSidebar';
import Footer from './Footer';
import MobileCartSheet from './MobileCartSheet';

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
  const { sectionsConfig, cartItemCount } = useCitrus();
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

const CitrusRenderer = () => {
  const { tokens } = useCitrus();

  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundColor: tokens.colors.background,
        color: tokens.colors.text,
        fontFamily: tokens.typography.fontBody,
      }}
      data-testid="citrus-frame"
    >
      <SectionWrapper sectionId="header">
        <Header />
      </SectionWrapper>

      <SectionWrapper sectionId="hero">
        <HeroStrip />
      </SectionWrapper>

      {/* Body: 2-col on desktop, single col on mobile */}
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 pb-12 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-10">
        <SectionWrapper sectionId="menu">
          <MenuBoard />
        </SectionWrapper>

        <SectionWrapper sectionId="sidebar">
          <div className="hidden lg:block">
            <OrderSidebar />
          </div>
        </SectionWrapper>
      </div>

      <SectionWrapper sectionId="footer">
        <Footer />
      </SectionWrapper>

      {/* Mobile cart bottom sheet (always available regardless of section toggles) */}
      <MobileCartSheet />
    </div>
  );
};

export default CitrusRenderer;
