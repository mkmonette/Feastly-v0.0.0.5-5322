import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

const Contact = () => {
  const { tokens, sectionsConfig } = useMobileCompactMenu();
  const section = sectionsConfig.find(s => s.id === 'contact');

  if (!section?.content) return null;

  const { title, titleHighlight, phone, email, address } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-center">
          <Headline
            normalText={normalText}
            highlightText={highlightText}
            tokens={tokens}
            className={`text-3xl ${tokens.typography.headingWeight} mb-2`}
          />
        </div>

        <div className="space-y-4">
          {phone && (
            <a
              href={`tel:${phone}`}
              className={`flex items-center gap-4 p-4 ${tokens.layout.borderRadius.card} transition-all hover:scale-105 active:scale-95`}
              style={{
                backgroundColor: tokens.colors.cardBackground,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${tokens.colors.primary}15` }}
              >
                <SafeIcon
                  icon={FiIcons.FiPhone}
                  className="text-xl"
                  style={{ color: tokens.colors.primary }}
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Phone</p>
                <p
                  className="text-base font-black"
                  style={{ color: tokens.colors.primaryText }}
                >
                  {phone}
                </p>
              </div>
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className={`flex items-center gap-4 p-4 ${tokens.layout.borderRadius.card} transition-all hover:scale-105 active:scale-95`}
              style={{
                backgroundColor: tokens.colors.cardBackground,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${tokens.colors.primary}15` }}
              >
                <SafeIcon
                  icon={FiIcons.FiMail}
                  className="text-xl"
                  style={{ color: tokens.colors.primary }}
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p
                  className="text-base font-black"
                  style={{ color: tokens.colors.primaryText }}
                >
                  {email}
                </p>
              </div>
            </a>
          )}

          {address && (
            <div
              className={`flex items-center gap-4 p-4 ${tokens.layout.borderRadius.card}`}
              style={{
                backgroundColor: tokens.colors.cardBackground,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${tokens.colors.primary}15` }}
              >
                <SafeIcon
                  icon={FiIcons.FiMapPin}
                  className="text-xl"
                  style={{ color: tokens.colors.primary }}
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Address</p>
                <p
                  className="text-base font-black"
                  style={{ color: tokens.colors.primaryText }}
                >
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
