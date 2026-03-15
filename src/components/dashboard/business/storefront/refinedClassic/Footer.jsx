import React from 'react';
import { useRefinedClassic } from './RefinedClassicContext';

const Footer = () => {
  const { tokens } = useRefinedClassic();
  const { typography, colors, layout } = tokens;

  return (
    <footer className={`${layout.sectionPaddingMedium} ${layout.horizontalPadding} border-t`} style={{
      backgroundColor: colors.background,
      borderColor: colors.border
    }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center space-y-4">
          <p className={`${typography.scale.bodySmall} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
            © 2024 Refined Dining. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-8">
            <button className={`${typography.scale.bodySmall} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.textSubtle }}>
              Privacy Policy
            </button>
            <button className={`${typography.scale.bodySmall} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.textSubtle }}>
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
