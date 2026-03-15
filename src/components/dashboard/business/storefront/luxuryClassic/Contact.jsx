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
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className={`${typography.scale.h2} ${typography.weights.light} ${typography.fontPrimary} mb-12`} style={{ color: colors.textPrimary }}>
              Visit Us
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 flex items-center justify-center border`} style={{
                  borderColor: colors.border,
                  color: colors.primary
                }}>
                  <SafeIcon icon={FiIcons.FiMapPin} className="text-xl" />
                </div>
                <div>
                  <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                    123 Fifth Avenue<br />New York, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 flex items-center justify-center border`} style={{
                  borderColor: colors.border,
                  color: colors.primary
                }}>
                  <SafeIcon icon={FiIcons.FiPhone} className="text-xl" />
                </div>
                <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                  (212) 555-0123
                </p>
              </div>

              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 flex items-center justify-center border`} style={{
                  borderColor: colors.border,
                  color: colors.primary
                }}>
                  <SafeIcon icon={FiIcons.FiClock} className="text-xl" />
                </div>
                <p className={`${typography.scale.body} ${typography.weights.regular} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                  Tue-Sun: 6:00 PM - 11:00 PM
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`${typography.scale.h3} ${typography.weights.regular} ${typography.fontPrimary} mb-8`} style={{ color: colors.textPrimary }}>
              Reservations
            </h3>

            <div className="space-y-6">
              <input
                type="text"
                placeholder="Name"
                className={`w-full p-5 border ${typography.fontSecondary}`}
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  borderWidth: '1px'
                }}
              />
              <input
                type="email"
                placeholder="Email"
                className={`w-full p-5 border ${typography.fontSecondary}`}
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  borderWidth: '1px'
                }}
              />
              <button className={`w-full py-5 ${typography.scale.bodySmall} ${typography.weights.semibold} ${typography.tracking.widest} ${typography.transform.uppercase} ${typography.fontSecondary} transition-all`} style={{
                backgroundColor: colors.primary,
                color: colors.surface
              }}>
                Reserve Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
