import React from 'react';
import { useMobileYumm } from './MobileYummContext';

const Hero = () => {
  const { tokens, sectionsConfig } = useMobileYumm();
  const section = sectionsConfig.find(s => s.id === 'hero');

  if (!section?.content) return null;

  const { preText, headline, headlineHighlight, subtitle, backgroundImage, stats } = section.content;

  const renderHeadline = () => {
    if (!headlineHighlight || !headline.includes(headlineHighlight)) {
      return <span className="text-white">{headline}</span>;
    }
    const parts = headline.split(headlineHighlight);
    return (
      <>
        <span className="text-white">{parts[0]}</span>
        <span style={{ color: tokens.colors.heroHeadlineHighlight }}>{headlineHighlight}</span>
        <span className="text-white">{parts[1]}</span>
      </>
    );
  };

  return (
    <div className="relative mx-3 mt-3 rounded-2xl overflow-hidden" style={{ minHeight: 180 }}>
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(180,70,20,0.72)' }} />

      <div className="relative px-5 py-6">
        {preText && (
          <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 mb-3">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-white text-xs font-bold">{preText}</span>
          </div>
        )}

        <h1 className="text-2xl font-black leading-tight mb-1">
          {renderHeadline()}
        </h1>

        {subtitle && (
          <p className="text-white/80 text-xs font-medium mb-4">{subtitle}</p>
        )}

        {stats && stats.length > 0 && (
          <div className="flex gap-5 mt-2">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-white font-black text-base leading-none">{stat.value}</div>
                <div className="text-white/70 text-[10px] font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
