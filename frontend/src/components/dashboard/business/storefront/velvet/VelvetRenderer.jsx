import React from 'react';
import { useVelvet } from './VelvetContext';
import Header from './Header';
import Hero from './Hero';
import MenuList from './MenuList';
import OrderCard from './OrderCard';
import Footer from './Footer';
import MobileSheet from './MobileSheet';

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
  const { sectionsConfig, cartItemCount } = useVelvet();
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

const VelvetRenderer = () => {
  const { tokens } = useVelvet();

  return (
    <div
      className="w-full min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: tokens.colors.background,
        color: tokens.colors.text,
        fontFamily: tokens.typography.fontBody,
      }}
      data-testid="velvet-frame"
    >
      {/* Subtle ambient gold orb */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: tokens.colors.primary }}
      />
      <div
        className="pointer-events-none absolute top-[40%] -left-40 w-[420px] h-[420px] rounded-full opacity-[0.05] blur-3xl"
        style={{ background: tokens.colors.accent }}
      />

      <SectionWrapper sectionId="header">
        <Header />
      </SectionWrapper>

      <SectionWrapper sectionId="hero">
        <Hero />
      </SectionWrapper>

      {/* Two-column body */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 pb-14 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
        <SectionWrapper sectionId="menu">
          <MenuList />
        </SectionWrapper>
        <SectionWrapper sectionId="sidebar">
          <div className="hidden lg:block">
            <OrderCard />
          </div>
        </SectionWrapper>
      </div>

      <SectionWrapper sectionId="footer">
        <Footer />
      </SectionWrapper>

      <MobileSheet />
    </div>
  );
};

export default VelvetRenderer;
