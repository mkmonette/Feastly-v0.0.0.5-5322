import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const Banner = () => {
  const { tokens, sectionsConfig } = useMobileNative();
  const section = sectionsConfig?.find(s => s.id === 'banner');
  const content = section?.content || {};

  const {
    title = 'Special Offer',
    titleHighlight = 'Offer',
    description = 'Get 20% off your first order',
    buttonText = 'Claim Now'
  } = content;

  const parts = title.split(titleHighlight);

  return (
    <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 ${tokens.layout.spacing.section}`}>
      <div
        className={`${tokens.layout.borderRadius.card} p-4 border`}
        style={{
          backgroundColor: tokens.colors.cardBackground,
          borderColor: tokens.colors.border,
          boxShadow: tokens.effects.shadow.card
        }}
      >
        <h3
          className={`text-[18px] ${tokens.typography.headingWeight} mb-2`}
          style={{ color: tokens.colors.primaryText }}
        >
          {parts[0]}
          {titleHighlight && (
            <span style={{ color: tokens.colors.primary }}>
              {titleHighlight}
            </span>
          )}
          {parts[1]}
        </h3>

        {description && (
          <p
            className="text-[14px] mb-3"
            style={{ color: tokens.colors.sectionNormalText }}
          >
            {description}
          </p>
        )}

        {buttonText && (
          <button
            className={`px-4 py-2 ${tokens.layout.borderRadius.button} text-[14px] font-semibold text-white active:scale-95 transition-transform inline-flex items-center gap-2`}
            style={{
              backgroundColor: tokens.colors.primary,
              boxShadow: tokens.effects.shadow.button
            }}
          >
            {buttonText}
            <SafeIcon icon={FiIcons.FiArrowRight} className="text-[14px]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
