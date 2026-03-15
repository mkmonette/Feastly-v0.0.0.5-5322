import React from 'react';
import { useMobileNative } from './MobileNativeContext';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const Contact = () => {
  const { tokens, sectionsConfig } = useMobileNative();
  const section = sectionsConfig?.find(s => s.id === 'contact');
  const content = section?.content || {};

  const {
    title = 'Get in Touch',
    titleHighlight = 'Touch',
    phone = '(555) 123-4567',
    email = 'hello@restaurant.com',
    address = '123 Main St, City, State'
  } = content;

  const parts = title.split(titleHighlight);

  const contactItems = [
    { icon: FiIcons.FiPhone, label: 'Phone', value: phone },
    { icon: FiIcons.FiMail, label: 'Email', value: email },
    { icon: FiIcons.FiMapPin, label: 'Address', value: address }
  ];

  return (
    <div className={`${tokens.layout.mobileMaxWidth} mx-auto px-4 ${tokens.layout.spacing.section}`}>
      <h2
        className={`text-[22px] ${tokens.typography.headingWeight} mb-3`}
        style={{ color: tokens.colors.primaryText }}
      >
        {parts[0]}
        {titleHighlight && (
          <span style={{ color: tokens.colors.primary }}>
            {titleHighlight}
          </span>
        )}
        {parts[1]}
      </h2>

      <div className="space-y-2">
        {contactItems.map((item, index) => (
          <div
            key={index}
            className={`bg-white ${tokens.layout.borderRadius.card} p-3 border flex items-center gap-3`}
            style={{
              borderColor: tokens.colors.border,
              boxShadow: tokens.effects.shadow.card
            }}
          >
            <div
              className={`w-10 h-10 ${tokens.layout.borderRadius.button} flex items-center justify-center flex-shrink-0`}
              style={{ backgroundColor: `${tokens.colors.primary}15` }}
            >
              <SafeIcon
                icon={item.icon}
                className="text-[18px]"
                style={{ color: tokens.colors.primary }}
              />
            </div>

            <div className="flex-1">
              <p
                className="text-[12px] mb-0.5"
                style={{ color: tokens.colors.sectionNormalText }}
              >
                {item.label}
              </p>
              <p
                className={`text-[14px] ${tokens.typography.headingWeight}`}
                style={{ color: tokens.colors.primaryText }}
              >
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
