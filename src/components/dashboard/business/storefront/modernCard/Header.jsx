import React from 'react';
import { useModernCard } from './ModernCardContext';

const Header = () => {
  const { tokens, sectionsConfig } = useModernCard();
  const section = sectionsConfig.find(s => s.id === 'header');

  if (!section?.content) return null;

  const { logoText } = section.content;

  return (
    <header className="py-6 px-6">
      <div className={`${tokens.layout.maxWidth} mx-auto flex items-center justify-between`}>
        <h1
          className={`text-2xl ${tokens.typography.headingWeight} tracking-tight ${tokens.typography.fontFamily}`}
          style={{ color: tokens.colors.primaryText }}
        >
          {logoText}
        </h1>
      </div>
    </header>
  );
};

export default Header;
