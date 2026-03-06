import React from 'react';
import { useWarmCulinary } from './WarmCulinaryContext';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const Contact = () => {
  const { tokens } = useWarmCulinary();

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Visit Us',
      content: '123 Culinary Street, Food District, NY 10001',
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
    },
    {
      icon: FiMail,
      title: 'Email Us',
      content: 'hello@culinarydelights.com',
    },
    {
      icon: FiClock,
      title: 'Hours',
      content: 'Mon-Sun: 11:00 AM - 10:00 PM',
    },
  ];

  return (
    <section id="contact" className={`${tokens.layout.sectionPadding}`} style={{ backgroundColor: tokens.colors.background }}>
      <div className={`${tokens.layout.container} ${tokens.layout.containerWidth} ${tokens.layout.horizontalPadding}`}>
        <div className="text-center mb-12">
          <div
            className={`inline-block px-4 py-2 rounded-full ${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall} ${tokens.typography.weights.semibold} ${tokens.typography.transform.uppercase} ${tokens.typography.tracking.wider} mb-4`}
            style={{ backgroundColor: tokens.colors.surfaceAlt, color: tokens.colors.primary }}
          >
            Get In Touch
          </div>
          <h2
            className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.h2} ${tokens.typography.weights.bold}`}
            style={{ color: tokens.colors.textPrimary }}
          >
            We'd Love to Hear From You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: tokens.colors.cardBackground,
                  boxShadow: `0 4px 20px ${tokens.colors.cardShadow}`
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: tokens.colors.surfaceAlt }}
                >
                  <Icon className="w-6 h-6" style={{ color: tokens.colors.primary }} />
                </div>
                <h3
                  className={`${tokens.typography.fontPrimary} ${tokens.typography.scale.body} ${tokens.typography.weights.bold} mb-2`}
                  style={{ color: tokens.colors.textPrimary }}
                >
                  {info.title}
                </h3>
                <p
                  className={`${tokens.typography.fontSecondary} ${tokens.typography.scale.bodySmall}`}
                  style={{ color: tokens.colors.textSecondary }}
                >
                  {info.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
