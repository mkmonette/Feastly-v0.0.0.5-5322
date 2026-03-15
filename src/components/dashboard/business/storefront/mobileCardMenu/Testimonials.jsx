import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useMobileCardMenu } from './MobileCardMenuContext';

const Testimonials = () => {
  const { tokens, sectionsConfig } = useMobileCardMenu();
  const section = sectionsConfig.find(s => s.id === 'testimonials');

  if (!section?.content) return null;

  const { title, titleHighlight, testimonials } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section
      className={tokens.layout.spacing.section}
      style={{ backgroundColor: tokens.colors.background }}
    >
      <div className="px-4">
        <div className="mb-6 text-center">
          <Headline
            normalText={normalText}
            highlightText={highlightText}
            tokens={tokens}
            className={`text-2xl ${tokens.typography.headingWeight} mb-2`}
          />
        </div>

        <div className="space-y-4">
          {testimonials && testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${tokens.layout.borderRadius.card} p-6 ${tokens.effects.shadow.card}`}
              style={{
                backgroundColor: tokens.colors.cardBackground,
                border: `1px solid ${tokens.colors.border}`
              }}
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon key={i} icon={FiIcons.FiStar} className="text-yellow-400 text-sm fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold" style={{ color: tokens.colors.primaryText }}>
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
