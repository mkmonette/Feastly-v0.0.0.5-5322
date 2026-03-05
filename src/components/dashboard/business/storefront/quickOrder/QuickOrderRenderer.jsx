import React from 'react';
import { useQuickOrder } from './QuickOrderContext';
import Header from './Header';
import Hero from './Hero';
import CategoryTabs from './CategoryTabs';
import ProductGrid from './ProductGrid';
import CartPanel from './CartPanel';

function compare(a, operator, b) {
  switch (operator) {
    case ">": return a > b;
    case "<": return a < b;
    case "=":
    case "equals": return a === b;
    case "!=":
    case "not_equals": return a !== b;
    case ">=": return a >= b;
    case "<=": return a <= b;
    default: return false;
  }
}

function evaluateConditions(conditions, context) {
  if (!conditions || conditions.length === 0) return true;

  return conditions.every(condition => {
    switch (condition.type) {
      case "auth":
        return compare(context.userStatus, condition.operator || 'equals', condition.value);
      case "cart_item_count":
        return compare(context.cartItemCount, condition.operator, condition.value);
      default:
        return true;
    }
  });
}

const SectionWrapper = ({ sectionId, children }) => {
  const { sectionsConfig, cartItemCount } = useQuickOrder();
  const section = sectionsConfig.find(s => s.id === sectionId);

  if (!section || !section.visibility?.enabled) return null;

  const context = {
    userStatus: 'guest',
    cartItemCount: cartItemCount || 0
  };

  if (!evaluateConditions(section.visibility.conditions, context)) {
    return null;
  }

  const devices = section.visibility.devices || ['desktop', 'mobile'];
  const hideOnMobile = !devices.includes('mobile');
  const hideOnDesktop = !devices.includes('desktop');

  const visibilityClasses = [
    hideOnMobile ? 'hidden md:block' : '',
    hideOnDesktop ? 'md:hidden' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={visibilityClasses}>
      {children}
    </div>
  );
};

const QuickOrderRenderer = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <SectionWrapper sectionId="header">
        <Header />
      </SectionWrapper>

      <SectionWrapper sectionId="hero">
        <Hero />
      </SectionWrapper>

      <SectionWrapper sectionId="categories">
        <CategoryTabs />
      </SectionWrapper>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="md:grid md:grid-cols-[1fr_350px] md:gap-6 lg:gap-8">
          <div>
            <SectionWrapper sectionId="products">
              <ProductGrid />
            </SectionWrapper>
          </div>

          <div>
            <SectionWrapper sectionId="cart">
              <CartPanel />
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickOrderRenderer;
