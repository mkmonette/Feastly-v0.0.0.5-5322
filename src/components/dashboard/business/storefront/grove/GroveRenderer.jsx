import React from 'react';
import { useGrove } from './GroveContext';
import Header from './Header';
import Hero from './Hero';
import PopularPicks from './PopularPicks';
import FullMenu from './FullMenu';
import CartDrawer from './CartDrawer';
import Footer from './Footer';

function compare(a, operator, b) {
  switch (operator) {
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

function evaluateConditions(conditions, context) {
  if (!conditions || conditions.length === 0) return true;
  return conditions.every(condition => {
    switch (condition.type) {
      case 'auth': return compare(context.userStatus, condition.operator || 'equals', condition.value);
      case 'cart_item_count': return compare(context.cartItemCount, condition.operator, condition.value);
      default: return true;
    }
  });
}

const SectionWrapper = ({ sectionId, children }) => {
  const { sectionsConfig, cartItemCount } = useGrove();
  const section = sectionsConfig.find(s => s.id === sectionId);
  if (!section || !section.visibility?.enabled) return null;
  const context = { userStatus: 'guest', cartItemCount: cartItemCount || 0 };
  if (!evaluateConditions(section.visibility.conditions, context)) return null;
  const devices = section.visibility.devices || ['desktop', 'mobile'];
  const hideOnMobile = !devices.includes('mobile');
  const hideOnDesktop = !devices.includes('desktop');
  const visibilityClasses = [
    hideOnMobile ? 'hidden md:block' : '',
    hideOnDesktop ? 'md:hidden' : ''
  ].filter(Boolean).join(' ');
  return <div className={visibilityClasses}>{children}</div>;
};

const GroveRenderer = () => {
  const { tokens } = useGrove();

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: tokens.colors.background }}>
      <SectionWrapper sectionId="header"><Header /></SectionWrapper>
      <SectionWrapper sectionId="hero"><Hero /></SectionWrapper>
      <SectionWrapper sectionId="popular"><PopularPicks /></SectionWrapper>
      <SectionWrapper sectionId="menu"><FullMenu /></SectionWrapper>
      <SectionWrapper sectionId="footer"><Footer /></SectionWrapper>
      <CartDrawer />
    </div>
  );
};

export default GroveRenderer;
