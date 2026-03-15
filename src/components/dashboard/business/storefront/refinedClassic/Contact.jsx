import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useRefinedClassic } from './RefinedClassicContext';

const Contact = () => {
  const { tokens } = useRefinedClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className={`${typography.scale.h2} ${typography.weights.bold} ${typography.fontPrimary} mb-8`} style={{ color: colors.textPrimary }}>
              Contact Us
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 flex items-center justify-center ${layout.borderRadiusIcon}`} style={{
                  backgroundColor: colors.primaryLight,
                  color: colors.primary
                }}>
                  <SafeIcon icon={FiIcons.FiMapPin} className="text-xl" />
                </div>
                <div>
                  <p className={`${typography.scale.body} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                    789 Business Plaza<br />Chicago, IL 60601
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 flex items-center justify-center ${layout.borderRadiusIcon}`} style={{
                  backgroundColor: colors.primaryLight,
                  color: colors.primary
                }}>
                  <SafeIcon icon={FiIcons.FiPhone} className="text-xl" />
                </div>
                <p className={`${typography.scale.body} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                  (555) 246-8135
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 flex items-center justify-center ${layout.borderRadiusIcon}`} style={{
                  backgroundColor: colors.primaryLight,
                  color: colors.primary
                }}>
                  <SafeIcon icon={FiIcons.FiMail} className="text-xl" />
                </div>
                <p className={`${typography.scale.body} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                  info@refined.com
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`${typography.scale.h3} ${typography.weights.semibold} ${typography.fontPrimary} mb-6`} style={{ color: colors.textPrimary }}>
              Reservation
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className={`w-full p-4 ${layout.borderRadiusBase} border ${typography.fontSecondary}`}
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }}
              />
              <input
                type="email"
                placeholder="Email"
                className={`w-full p-4 ${layout.borderRadiusBase} border ${typography.fontSecondary}`}
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }}
              />
              <button className={`w-full py-4 ${layout.borderRadiusBase} ${typography.scale.body} ${typography.weights.semibold} ${typography.fontSecondary}`} style={{
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
