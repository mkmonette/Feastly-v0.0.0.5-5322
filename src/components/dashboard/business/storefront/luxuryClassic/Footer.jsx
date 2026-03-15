import React from 'react';
import { useLuxuryClassic } from './LuxuryClassicContext';

const Footer = () => {
  const { tokens } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  return (
    <footer className={`${layout.sectionPaddingMedium} ${layout.horizontalPadding} border-t`} style={{
      backgroundColor: colors.surface,
      borderColor: colors.border
    }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center space-y-4">
          <p className={`${typography.scale.bodySmall} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
            © 2024 Luxury Dining. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-8">
            <button className={`${typography.scale.bodySmall} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.textSubtle }}>
              Privacy Policy
            </button>
            <button className={`${typography.scale.bodySmall} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.textSubtle }}>
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
