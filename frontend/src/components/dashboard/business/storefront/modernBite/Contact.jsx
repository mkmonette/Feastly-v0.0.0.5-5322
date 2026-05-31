import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useModernBite } from './ModernBiteContext';

const Contact = () => {
  const { tokens, sectionsConfig } = useModernBite();
  const contactSection = sectionsConfig.find(s => s.id === 'contact');

  if (!contactSection?.visibility.enabled) return null;

  const { badge, title, address, phone, email, hours } = contactSection.content;

  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: tokens.colors.surface }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-sm font-bold tracking-widest uppercase mb-4 block"
            style={{
              fontFamily: tokens.typography.fontFamily.primary,
              color: tokens.colors.primary
            }}
          >
            {badge}
          </span>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{
              fontFamily: tokens.typography.fontFamily.primary,
              color: tokens.colors.text.primary
            }}
          >
            {title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <div className="flex gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: tokens.colors.primary }}
                >
                  <SafeIcon icon={FiIcons.FiMapPin} className="text-white text-xl" />
                </div>
                <div>
                  <h3
                    className="font-bold mb-2"
                    style={{
                      fontFamily: tokens.typography.fontFamily.primary,
                      color: tokens.colors.text.primary
                    }}
                  >
                    Address
                  </h3>
                  <p
                    style={{
                      fontFamily: tokens.typography.fontFamily.secondary,
                      color: tokens.colors.text.secondary
                    }}
                  >
                    {address}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: tokens.colors.primary }}
                >
                  <SafeIcon icon={FiIcons.FiPhone} className="text-white text-xl" />
                </div>
                <div>
                  <h3
                    className="font-bold mb-2"
                    style={{
                      fontFamily: tokens.typography.fontFamily.primary,
                      color: tokens.colors.text.primary
                    }}
                  >
                    Phone
                  </h3>
                  <a
                    href={`tel:${phone}`}
                    style={{
                      fontFamily: tokens.typography.fontFamily.secondary,
                      color: tokens.colors.primary
                    }}
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: tokens.colors.primary }}
                >
                  <SafeIcon icon={FiIcons.FiMail} className="text-white text-xl" />
                </div>
                <div>
                  <h3
                    className="font-bold mb-2"
                    style={{
                      fontFamily: tokens.typography.fontFamily.primary,
                      color: tokens.colors.text.primary
                    }}
                  >
                    Email
                  </h3>
                  <a
                    href={`mailto:${email}`}
                    style={{
                      fontFamily: tokens.typography.fontFamily.secondary,
                      color: tokens.colors.primary
                    }}
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: tokens.colors.primary }}
                >
                  <SafeIcon icon={FiIcons.FiClock} className="text-white text-xl" />
                </div>
                <div>
                  <h3
                    className="font-bold mb-2"
                    style={{
                      fontFamily: tokens.typography.fontFamily.primary,
                      color: tokens.colors.text.primary
                    }}
                  >
                    Hours
                  </h3>
                  <p
                    className="whitespace-pre-line"
                    style={{
                      fontFamily: tokens.typography.fontFamily.secondary,
                      color: tokens.colors.text.secondary
                    }}
                  >
                    {hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="p-8 rounded-2xl"
            style={{
              backgroundColor: tokens.colors.surfaceAlt,
              borderRadius: tokens.typography.radii.card
            }}
          >
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2"
                style={{
                  fontFamily: tokens.typography.fontFamily.secondary,
                  borderColor: tokens.colors.border,
                  backgroundColor: tokens.colors.surface,
                  color: tokens.colors.text.primary,
                  focusRingColor: tokens.colors.primary
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2"
                style={{
                  fontFamily: tokens.typography.fontFamily.secondary,
                  borderColor: tokens.colors.border,
                  backgroundColor: tokens.colors.surface,
                  color: tokens.colors.text.primary
                }}
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 resize-none"
                style={{
                  fontFamily: tokens.typography.fontFamily.secondary,
                  borderColor: tokens.colors.border,
                  backgroundColor: tokens.colors.surface,
                  color: tokens.colors.text.primary
                }}
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 font-black rounded-lg transition-all hover:scale-105 active:scale-95"
                style={{
                  fontFamily: tokens.typography.fontFamily.primary,
                  backgroundColor: tokens.colors.primary,
                  color: 'white'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;