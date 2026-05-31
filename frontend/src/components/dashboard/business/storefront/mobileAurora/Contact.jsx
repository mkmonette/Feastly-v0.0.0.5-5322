import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileAurora } from './MobileAuroraContext';

const Contact = () => {
  const { tokens, sectionsConfig } = useMobileAurora();
  const section = sectionsConfig.find((s) => s.id === 'contact');
  if (!section?.content) return null;

  const { title, address, phone, hours } = section.content;

  const items = [
    { icon: FiIcons.FiMapPin, label: 'Address', value: address },
    { icon: FiIcons.FiPhone, label: 'Call', value: phone },
    { icon: FiIcons.FiClock, label: 'Hours', value: hours },
  ];

  return (
    <section className="relative px-4 pt-6 pb-2" data-testid="aurora-contact">
      <h2
        className="text-xl font-black tracking-tight mb-3"
        style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
      >
        {title}
      </h2>
      <div
        className="rounded-[26px] divide-y"
        style={{
          backgroundColor: tokens.colors.surface,
          border: `1px solid ${tokens.colors.border}`,
          boxShadow: tokens.effects.shadow.card,
          // @ts-ignore – tailwind divide colors aren't picked from inline; using border on items
        }}
      >
        {items.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-3.5 px-4 py-3.5"
            style={{ borderTop: i === 0 ? 'none' : `1px solid ${tokens.colors.border}` }}
          >
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{
                background: tokens.colors.primarySoft,
                color: tokens.colors.primary,
              }}
            >
              <SafeIcon icon={it.icon} className="text-base" />
            </div>
            <div className="flex-1 leading-tight">
              <div
                className="text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ color: tokens.colors.textMuted }}
              >
                {it.label}
              </div>
              <div
                className="text-[13px] font-bold mt-0.5"
                style={{ color: tokens.colors.text }}
              >
                {it.value}
              </div>
            </div>
            <SafeIcon icon={FiIcons.FiChevronRight} className="text-base" style={{ color: tokens.colors.textMuted }} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contact;
