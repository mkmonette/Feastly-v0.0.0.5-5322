import React from 'react';
import { useWarmCulinary } from './WarmCulinaryContext';
import { useStorefront } from './contextBridge';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const { tokens } = useWarmCulinary();
  const { businessName } = useStorefront();

  const footerLinks = {
    'Quick Links': ['Menu', 'About', 'Gallery', 'Contact'],
    'Information': ['Privacy Policy', 'Terms of Service', 'Delivery Info', 'FAQs'],
  };

  const socialLinks = [
    { icon: FiInstagram, href: '#' },
    { icon: FiFacebook, href: '#' },
    { icon: FiTwitter, href: '#' },
  ];

  return (
    <footer style={{ backgroundColor: tokens.colors.textPrimary }}>
      <div className={`${tokens.layout.container} ${tokens.layout.containerWidth} ${tokens.layout.horizontalPadding} py-16`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3
              className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.h3} ${tokens.typography.weights.bold} mb-4`}
              style={{ color: tokens.colors.textInverse }}
            >
              {businessName || 'Culinary Delights'}
            </h3>
            <p
              className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.body} mb-6 max-w-md`}
              style={{ color: tokens.colors.textInverseMuted }}
            >
              Crafting memorable dining experiences with passion, tradition, and the finest ingredients.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tokens.colors.primary}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                  >
                    <Icon className="w-5 h-5" style={{ color: tokens.colors.textInverse }} />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.body} ${tokens.typography.weights.bold} mb-4`}
                style={{ color: tokens.colors.textInverse }}
              >
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(' ', '-')}`}
                      className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall} transition-colors`}
                      style={{ color: tokens.colors.textInverseMuted }}
                      onMouseEnter={(e) => e.target.style.color = tokens.colors.primary}
                      onMouseLeave={(e) => e.target.style.color = tokens.colors.textInverseMuted}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <p
            className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall} text-center`}
            style={{ color: tokens.colors.textInverseMuted }}
          >
            &copy; {new Date().getFullYear()} {businessName || 'Culinary Delights'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
