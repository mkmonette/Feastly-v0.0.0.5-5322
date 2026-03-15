import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const CTABanner = () => {
  const { tokens, sectionsConfig } = useMobileNative();
  const section = sectionsConfig?.find(s => s.id === 'cta');
  const content = section?.content || {};

  const {
    title = 'Ready to Order?',
    titleHighlight = 'Order',
    subtitle = 'Download our app for exclusive deals',
    buttonText = 'Get Started'
  } = content;

  const parts = title.split(titleHighlight);

  return (
    <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 ${tokens.layout.spacing.section}`}>
      <div
        className={`${tokens.layout.borderRadius.card} p-6 text-center`}
        style={{
          backgroundColor: tokens.colors.primary
        }}
      >
        <h2 className={`text-[24px] ${tokens.typography.headingWeight} text-white mb-2`}>
          {parts[0]}
          {titleHighlight && (
            <span className="text-white/90">
              {titleHighlight}
            </span>
          )}
          {parts[1]}
        </h2>

        {subtitle && (
          <p className="text-[15px] text-white/90 mb-4">
            {subtitle}
          </p>
        )}

        {buttonText && (
          <button
            className={`px-6 py-3 ${tokens.layout.borderRadius.button} text-[15px] font-semibold active:scale-95 transition-transform inline-flex items-center gap-2`}
            style={{
              backgroundColor: tokens.colors.cardBackground,
              color: tokens.colors.primary,
              boxShadow: tokens.effects.shadow.button
            }}
          >
            {buttonText}
            <SafeIcon icon={FiIcons.FiArrowRight} className="text-[16px]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CTABanner;
