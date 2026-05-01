import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSage } from './SageContext';

const TESTIMONIALS = [
  { name: 'Alex Rivera', role: 'Head Cook', rating: 4, text: 'The dining experience here is extraordinary. SAGE has set a new standard for quality and taste that I keep coming back to.' },
  { name: 'Priya Sharma', role: 'Food Critic', rating: 5, text: 'Absolutely phenomenal. The seasonal menu is always a surprise and delight. The seasonal menu is always a delight!' },
  { name: 'James Mitchell', role: 'Regular Guest', rating: 5, text: 'A wonderful dining experience every single time. You can feel the warmth and passion that goes into every single dish.' }
];

const StarRow = ({ count, color }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <SafeIcon
        key={i}
        icon={FiIcons.FiStar}
        className="text-xs"
        style={{ color: i <= count ? color : 'rgba(255,255,255,0.15)' }}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const { tokens, sectionsConfig } = useSage();
  const section = sectionsConfig.find(s => s.id === 'testimonials');
  if (!section) return null;
  const { label, title } = section.content || {};

  return (
    <section style={{ backgroundColor: tokens.colors.surface }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          {label && (
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: tokens.colors.sectionLabel }}>
              {label}
            </p>
          )}
          <h2 className="text-3xl font-black" style={{ color: tokens.colors.textPrimary }}>{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl"
              style={{ backgroundColor: tokens.colors.surfaceCard, border: `1px solid ${tokens.colors.border}` }}
            >
              <StarRow count={t.rating} color={tokens.colors.starColor} />
              <p className="text-sm leading-relaxed mt-4 mb-5" style={{ color: tokens.colors.textMuted }}>
                "{t.text}"
              </p>
              <div>
                <p className="text-sm font-bold" style={{ color: tokens.colors.textPrimary }}>{t.name}</p>
                <p className="text-xs" style={{ color: tokens.colors.textSubtle }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
