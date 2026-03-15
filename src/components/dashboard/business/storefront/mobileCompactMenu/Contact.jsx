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
    <section className="py-6 px-4" style={{ backgroundColor: tokens.colors.background }}>
      <div className="mb-5 text-center">
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className={`text-2xl ${tokens.typography.headingWeight}`}
        />
      </div>

      <div className="space-y-3">
        {phone && (
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: tokens.colors.cardBackground }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: tokens.colors.primary }}>
              <SafeIcon icon={FiIcons.FiPhone} className="text-white text-sm" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Phone</p>
              <p className="text-xs font-extrabold" style={{ color: tokens.colors.primaryText }}>{phone}</p>
            </div>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: tokens.colors.cardBackground }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: tokens.colors.primary }}>
              <SafeIcon icon={FiIcons.FiMail} className="text-white text-sm" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Email</p>
              <p className="text-xs font-extrabold" style={{ color: tokens.colors.primaryText }}>{email}</p>
            </div>
          </div>
        )}
        {address && (
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: tokens.colors.cardBackground }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: tokens.colors.primary }}>
              <SafeIcon icon={FiIcons.FiMapPin} className="text-white text-sm" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Address</p>
              <p className="text-xs font-extrabold" style={{ color: tokens.colors.primaryText }}>{address}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
