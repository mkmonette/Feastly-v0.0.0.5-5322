import React from 'react';
import { useLuxuryClassic } from './LuxuryClassicContext';

const Footer = () => {
  const { tokens } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  return (
    <footer className={`${layout.sectionPaddingMedium} ${layout.horizontalPadding} border-t`} style={{
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: '1px'
    }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center space-y-6">
          <p className={`${typography.scale.body} ${typography.weights.light} ${typography.fontSecondary}`} style={{ color: colors.textInverseMuted }}>
            © 2024 Luxury Dining. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-12">
            <button className={`${typography.scale.bodySmall} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.textInverseMuted }}>
              Privacy
            </button>
            <button className={`${typography.scale.bodySmall} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.textInverseMuted }}>
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
