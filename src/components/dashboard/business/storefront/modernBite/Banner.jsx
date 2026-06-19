import React from 'react';
import { useModernBite } from './ModernBiteContext';

const Banner = () => {
  const { sectionsConfig } = useModernBite();
  const section = sectionsConfig.find(s => s.id === 'banner');
  
  return (
    <div className="bg-[#111827] py-3 overflow-hidden w-full">
      <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
        <div className="text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 flex items-center gap-8">
          {section.content.text.split('•').map((text, i) => (
            <React.Fragment key={i}>
              <span>{text.trim()}</span>
              {i < section.content.text.split('•').length - 1 && (
                <span className="text-[#e05a3d]">•</span>
              )}
            </React.Fragment>
          ))}
          <span className="text-[#e05a3d] mx-8">•</span>
          {section.content.text.split('•').map((text, i) => (
            <React.Fragment key={`repeat-${i}`}>
              <span>{text.trim()}</span>
              {i < section.content.text.split('•').length - 1 && (
                <span className="text-[#e05a3d]">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;