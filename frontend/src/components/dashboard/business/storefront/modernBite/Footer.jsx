import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernBite } from './ModernBiteContext';

const Footer = () => {
  const { tokens, sectionsConfig } = useModernBite();
  const footerSection = sectionsConfig.find(s => s.id === 'footer');
  const contactSection = sectionsConfig.find(s => s.id === 'contact');

  if (!footerSection?.visibility.enabled) return null;

  const { brandText, copyright } = footerSection.content;
  const { address, phone, email } = contactSection?.content || {};

  return (
    <footer
      style={{ backgroundColor: tokens.colors.secondary }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl font-black mb-4 text-white"
              style={{ fontFamily: tokens.typography.fontFamily.primary }}
            >
              BITE
            </h3>
            <p
              className="text-white/70"
              style={{ fontFamily: tokens.typography.fontFamily.secondary }}
            >
              {brandText}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold text-white mb-4"
              style={{ fontFamily: tokens.typography.fontFamily.primary }}
            >
              Menu
            </h4>
            <ul className="space-y-2">
              {['Home', 'Menu', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white transition-colors"
                    style={{ fontFamily: tokens.typography.fontFamily.secondary }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold text-white mb-4"
              style={{ fontFamily: tokens.typography.fontFamily.primary }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              <a href={`tel:${phone}`} className="flex items-start gap-3 text-white/70 hover:text-white transition-colors">
                <SafeIcon icon={FiIcons.FiPhone} className="mt-1" />
                <span style={{ fontFamily: tokens.typography.fontFamily.secondary }}>{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="flex items-start gap-3 text-white/70 hover:text-white transition-colors">
                <SafeIcon icon={FiIcons.FiMail} className="mt-1" />
                <span style={{ fontFamily: tokens.typography.fontFamily.secondary }}>{email}</span>
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4
              className="font-bold text-white mb-4"
              style={{ fontFamily: tokens.typography.fontFamily.primary }}
            >
              Follow Us
            </h4>
            <div className="flex gap-4">
              {[FiIcons.FiFacebook, FiIcons.FiInstagram, FiIcons.FiTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <SafeIcon icon={Icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-t pt-8"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <p
            className="text-center text-white/60"
            style={{ fontFamily: tokens.typography.fontFamily.secondary }}
          >
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;