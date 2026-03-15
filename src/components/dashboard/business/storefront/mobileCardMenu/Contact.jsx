import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useMobileCardMenu } from './MobileCardMenuContext';

const Contact = () => {
  const { tokens, sectionsConfig } = useMobileCardMenu();
  const section = sectionsConfig.find(s => s.id === 'contact');

  if (!section?.content) return null;

  const { title, titleHighlight, phone, email, address } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section
      className={tokens.layout.spacing.section}
      style={{ backgroundColor: tokens.colors.cardBackground }}
    >
      <div className="px-4">
        <div className="mb-6 text-center">
          <Headline
            normalText={normalText}
            highlightText={highlightText}
            tokens={tokens}
            className={`text-2xl ${tokens.typography.headingWeight} mb-2`}
          />
        </div>

        <div className="space-y-4 max-w-sm mx-auto">
          {phone && (
            <a
              href={`tel:${phone}`}
              className={`flex items-center gap-4 p-4 ${tokens.layout.borderRadius.card} transition-all ${tokens.effects.shadow.card}`}
              style={{
                backgroundColor: tokens.colors.background,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: tokens.colors.primary }}
              >
                <SafeIcon icon={FiIcons.FiPhone} className="text-white text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm font-bold" style={{ color: tokens.colors.primaryText }}>
                  {phone}
                </p>
              </div>
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className={`flex items-center gap-4 p-4 ${tokens.layout.borderRadius.card} transition-all ${tokens.effects.shadow.card}`}
              style={{
                backgroundColor: tokens.colors.background,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: tokens.colors.accent }}
              >
                <SafeIcon icon={FiIcons.FiMail} className="text-white text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm font-bold" style={{ color: tokens.colors.primaryText }}>
                  {email}
                </p>
              </div>
            </a>
          )}

          {address && (
            <div
              className={`flex items-center gap-4 p-4 ${tokens.layout.borderRadius.card} ${tokens.effects.shadow.card}`}
              style={{
                backgroundColor: tokens.colors.background,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: tokens.colors.secondary }}
              >
                <SafeIcon icon={FiIcons.FiMapPin} className="text-white text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="text-sm font-bold" style={{ color: tokens.colors.primaryText }}>
                  {address}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
