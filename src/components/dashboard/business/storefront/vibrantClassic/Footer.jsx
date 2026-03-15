import React from 'react';
import { useVibrantClassic } from './VibrantClassicContext';

const Footer = () => {
  const { tokens } = useVibrantClassic();
  const { typography, colors, layout } = tokens;

  return (
    <footer className={`${layout.sectionPaddingMedium} ${layout.horizontalPadding}`} style={{
      backgroundColor: colors.background
    }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="text-center space-y-4">
          <p className={`${typography.scale.body} ${typography.weights.bold} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
            © 2024 Vibrant Eats. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-6">
            <button className={`${typography.scale.bodySmall} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
              Privacy
            </button>
            <button className={`${typography.scale.bodySmall} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
