import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useStorefrontTokens, useStorefront } from '../StorefrontContext';

const testimonials = [
  {
    id: 1,
    name: "James Wilson",
    role: "Food Critic",
    content: "The attention to detail in every dish is remarkable. Feastly has set a new standard for gourmet delivery.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Regular Customer",
    content: "Finally, a service that doesn't compromise on quality for convenience. The seasonal menu is always a delight.",
    rating: 5
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Local Chef",
    content: "Impressive techniques and perfectly balanced flavors. It's rare to find such consistency in every order.",
    rating: 5
  }
];

const Testimonials = () => {
  const { typography, colors, layout } = useStorefrontTokens();
  const { sectionsConfig } = useStorefront();

  const section = sectionsConfig.find(s => s.id === 'testimonials');
  const content = section?.content || {};

  const primaryStyle = colors.primary.startsWith('#') ? { color: colors.primary } : {};
  const primaryBgStyle = colors.primary.startsWith('#') ? { backgroundColor: colors.primary } : {};

  return (
    <section className={`${layout.sectionPaddingLarge} ${layout.horizontalPadding} bg-${colors.background} ${typography.fontSecondary}`}>
      <div className={`${layout.container} ${layout.containerWidth} text-center mb-16`}>
        <span 
          className={`text-${colors.primary} ${typography.weights.black} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4} mb-4 block ${typography.fontPrimary}`}
          style={primaryStyle}
        >
          {content.subtitle}
        </span>
        <h2 className={`${typography.scale.h2} ${typography.weights.black} text-${colors.textPrimary} ${typography.transform.uppercase} ${typography.tracking.tighter} ${typography.fontPrimary}`}>
          {content.titlePre} <span style={primaryStyle}>{content.titleHighlight}</span>
        </h2>
      </div>
      
      <div className={`${layout.container} ${layout.containerWidth} grid md:grid-cols-3 ${layout.gridGapMedium}`}>
        {testimonials.map((t) => (
          <div key={t.id} className={`bg-${colors.surface} p-10 ${layout.borderRadiusSmall} border border-${colors.border} relative`}>
            <div 
              className={`absolute -top-5 left-10 w-10 h-10 bg-${colors.primary} flex items-center justify-center rounded-full shadow-lg`}
              style={primaryBgStyle}
            >
              <SafeIcon icon={FiIcons.FiMessageSquare} className="text-white text-lg" />
            </div>
            <div className="flex gap-1 mb-6 text-orange-400">
              {[...Array(t.rating)].map((_, i) => (
                <SafeIcon key={i} icon={FiIcons.FiStar} className="fill-current" />
              ))}
            </div>
            <p className={`text-${colors.textPrimary} ${typography.scale.body} ${typography.weights.medium} ${typography.lineHeights.relaxed} mb-8 italic text-left`}>
              "{t.content}"
            </p>
            <div className="text-left">
              <h4 className={`${typography.weights.black} text-${colors.textPrimary} ${typography.transform.uppercase} ${typography.tracking.widest} ${typography.scale.h4_xs} ${typography.fontPrimary}`}>{t.name}</h4>
              <p className={`text-${colors.textMuted} text-xs font-bold uppercase tracking-widest ${typography.fontPrimary}`}>{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;