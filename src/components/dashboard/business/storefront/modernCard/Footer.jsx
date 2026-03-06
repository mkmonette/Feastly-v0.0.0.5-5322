import React from 'react';
import { useModernCard } from './ModernCardContext';

const Footer = () => {
  const { tokens, sectionsConfig } = useModernCard();
  const section = sectionsConfig.find(s => s.id === 'footer');

  if (!section?.content) return null;

  const { copyrightText } = section.content;

  return (
    <footer className="py-8 px-6">
      <div className={`${tokens.layout.maxWidth} mx-auto text-center`}>
        <p
          className={`text-sm ${tokens.typography.bodyWeight}`}
          style={{ color: tokens.colors.secondaryText }}
        >
          {copyrightText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
