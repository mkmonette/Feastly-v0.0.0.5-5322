import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileAurora } from './MobileAuroraContext';

const Reviews = () => {
  const { tokens, sectionsConfig } = useMobileAurora();
  const section = sectionsConfig.find((s) => s.id === 'reviews');
  if (!section?.content) return null;
  const { title, reviews = [] } = section.content;
  if (reviews.length === 0) return null;

  return (
    <section className="relative pt-8 pb-2" data-testid="aurora-reviews">
      <div className="px-4 mb-3 flex items-end justify-between">
        <h2
          className="text-xl font-black tracking-tight"
          style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
        >
          {title}
        </h2>
        <div className="flex items-center gap-1 text-[11px] font-bold" style={{ color: tokens.colors.textMuted }}>
          <SafeIcon icon={FiIcons.FiStar} className="text-[12px]" style={{ color: tokens.colors.star }} />
          <span style={{ color: tokens.colors.text }}>4.9</span>
          <span>· 1.2k reviews</span>
        </div>
      </div>

      <div
        className="flex gap-3 overflow-x-auto pb-3 px-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[270px] snap-start p-4 rounded-[24px]"
            style={{
              backgroundColor: tokens.colors.surface,
              border: `1px solid ${tokens.colors.border}`,
              boxShadow: tokens.effects.shadow.card,
            }}
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div
                className="w-10 h-10 rounded-full p-[2px]"
                style={{ background: tokens.colors.auroraGradient }}
              >
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-full h-full rounded-full object-cover"
                  style={{ border: `2px solid ${tokens.colors.surface}` }}
                />
              </div>
              <div className="leading-tight">
                <div
                  className="text-[13px] font-black"
                  style={{ color: tokens.colors.text, fontFamily: tokens.typography.fontHeading }}
                >
                  {r.name}
                </div>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SafeIcon
                      key={i}
                      icon={FiIcons.FiStar}
                      className="text-[11px]"
                      style={{
                        color: i < r.rating ? tokens.colors.star : tokens.colors.border,
                        fill: i < r.rating ? tokens.colors.star : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p
              className="text-[12.5px] font-medium leading-relaxed"
              style={{ color: tokens.colors.textMuted }}
            >
              “{r.text}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
