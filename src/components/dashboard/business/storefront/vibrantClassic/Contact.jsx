import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useVibrantClassic } from './VibrantClassicContext';

const Contact = () => {
  const { tokens } = useVibrantClassic();
  const { typography, colors, layout } = tokens;

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding}`} style={{ backgroundColor: colors.surface }}>
      <div className={`${layout.container} ${layout.containerWidth}`}>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className={`${typography.scale.h2} ${typography.weights.black} ${typography.fontPrimary} mb-8`} style={{ color: colors.textPrimary }}>
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 flex items-center justify-center ${layout.borderRadiusIcon}`} style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: colors.textInverse
                }}>
                  <SafeIcon icon={FiIcons.FiMapPin} className="text-xl" />
                </div>
                <div>
                  <p className={`${typography.scale.body} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                    456 Happy Street<br />Los Angeles, CA 90028
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 flex items-center justify-center ${layout.borderRadiusIcon}`} style={{
                  background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                  color: colors.textInverse
                }}>
                  <SafeIcon icon={FiIcons.FiPhone} className="text-xl" />
                </div>
                <p className={`${typography.scale.body} ${typography.weights.medium} ${typography.fontSecondary}`} style={{ color: colors.textPrimary }}>
                  (555) 987-6543
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full p-4 ${layout.borderRadiusBase} border-2 ${typography.fontSecondary}`}
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }}
              />
              <input
                type="email"
                placeholder="Email"
                className={`w-full p-4 ${layout.borderRadiusBase} border-2 ${typography.fontSecondary}`}
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.textPrimary
                }}
              />
              <button className={`w-full py-4 ${layout.borderRadiusBase} ${typography.scale.body} ${typography.weights.bold} ${typography.fontSecondary}`} style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: colors.textInverse
              }}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
