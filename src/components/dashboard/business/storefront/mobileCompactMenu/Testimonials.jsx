import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Headline from '../Headline';
import { useMobileCompactMenu } from './MobileCompactMenuContext';

const Testimonials = () => {
  const { tokens, sectionsConfig } = useMobileCompactMenu();
  const section = sectionsConfig.find(s => s.id === 'testimonials');

  if (!section?.content) return null;

  const { title, titleHighlight, testimonials } = section.content;

  const [normalText, highlightText] = title && titleHighlight && title.includes(titleHighlight)
    ? title.split(titleHighlight)
    : [title, titleHighlight];

  return (
    <section className="py-6 px-4" style={{ backgroundColor: tokens.colors.cardBackground }}>
      <div className="mb-5 text-center">
        <Headline
          normalText={normalText}
          highlightText={highlightText}
          tokens={tokens}
          className={`text-2xl ${tokens.typography.headingWeight}`}
        />
      </div>

      <div className="space-y-3">
        {testimonials?.map((testimonial, idx) => (
          <div
            key={idx}
            className="rounded-lg p-4"
            style={{
              backgroundColor: tokens.colors.background,
              border: `1px solid ${tokens.colors.border}`
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-extrabold" style={{ color: tokens.colors.primaryText }}>
                  {testimonial.name}
                </h4>
                <p className="text-[10px] text-gray-500">{testimonial.role}</p>
              </div>
              <div className="ml-auto flex">
                {[...Array(5)].map((_, i) => (
                  <SafeIcon key={i} icon={FiIcons.FiStar} className="text-yellow-400" style={{ fontSize: '10px' }} />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-600">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
