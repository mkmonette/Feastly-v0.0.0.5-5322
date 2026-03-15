import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useLuxuryClassic } from './LuxuryClassicContext';

const Contact = () => {
  const { tokens } = useLuxuryClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.background }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.fontPrimary} mb-8`} style={{ color: colors.textPrimary }}>
              Visit Us
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <SafeIcon icon={FiIcons.FiMapPin} className="text-xl" style={{ color: colors.primary }} />
                <div>
                  <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
                    123 Luxury Avenue<br />New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <SafeIcon icon={FiIcons.FiPhone} className="text-xl" style={{ color: colors.primary }} />
                <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
                  (555) 123-4567
                </p>
              </div>

              <div className="flex items-start gap-4">
                <SafeIcon icon={FiIcons.FiMail} className="text-xl" style={{ color: colors.primary }} />
                <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.textMuted }}>
                  reservations@luxury.com
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`${typography.scale.h3} ${typography.weights.light} ${typography.fontPrimary} mb-6`} style={{ color: colors.textPrimary }}>
              Reserve a Table
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className={`w-full p-4 border ${typography.fontSecondary}`}
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }}
              />
              <input
                type="email"
                placeholder="Email"
                className={`w-full p-4 border ${typography.fontSecondary}`}
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }}
              />
              <button className={`w-full py-4 ${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.wide} ${typography.transform.uppercase} ${typography.fontSecondary}`} style={{
                backgroundColor: colors.primary,
                color: colors.textInverse
              }}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
