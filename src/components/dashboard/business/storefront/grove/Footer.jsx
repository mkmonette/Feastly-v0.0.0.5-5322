import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useGrove } from './GroveContext';

const Footer = () => {
  const { tokens, sectionsConfig } = useGrove();
  const section = sectionsConfig.find(s => s.id === 'footer');
  const { businessName = 'GROVE', address = '123 Grove St', phone = '+1 (555) 123-4567', hours = '11am – 10pm' } = section?.content || {};

  return (
    <footer style={{ backgroundColor: tokens.colors.footerBg, borderTop: `1px solid ${tokens.colors.footerBorder}` }}>
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Logo + wordmark */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
            style={{ backgroundColor: tokens.colors.primary, color: '#FFFFFF' }}
          >
            {businessName.charAt(0)}
          </div>
          <span className="text-base font-bold tracking-wide" style={{ color: tokens.colors.primaryText }}>
            {businessName}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-wrap items-center gap-6">
          {[
            { icon: FiIcons.FiMapPin, value: address },
            { icon: FiIcons.FiPhone, value: phone },
            { icon: FiIcons.FiClock, value: hours }
          ].map(({ icon, value }) => (
            <div key={value} className="flex items-center gap-1.5">
              <SafeIcon icon={icon} className="text-xs" style={{ color: tokens.colors.mutedText }} />
              <span className="text-xs" style={{ color: tokens.colors.mutedText }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Social */}
        <div className="flex items-center gap-3">
          {[FiIcons.FiInstagram, FiIcons.FiFacebook, FiIcons.FiTwitter].map((Icon, i) => (
            <button key={i} className="transition-all hover:opacity-50">
              <SafeIcon icon={Icon} className="text-base" style={{ color: tokens.colors.mutedText }} />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-4">
        <p className="text-[10px] text-center" style={{ color: tokens.colors.mutedText }}>
          © 2026 {businessName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
