import React from 'react';
import { useModernBite } from './ModernBiteContext';

const Ticker = ({ section }) => {
  const { tokens } = useModernBite();
  const items = section?.content?.items || [];

  return (
    <div className="bg-[#1a1a1a] rounded-2xl py-5 overflow-hidden mt-20 flex items-center relative">
      <div className="flex items-center gap-12 px-6 text-xs font-black text-white uppercase tracking-widest whitespace-nowrap animate-marquee">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span>{item}</span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.colors.primary }} />
          </React.Fragment>
        ))}
        {items.map((item, idx) => (
          <React.Fragment key={`dup-${idx}`}>
            <span>{item}</span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tokens.colors.primary }} />
          </React.Fragment>
        ))}
      </div>
      {/* CSS for marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Ticker;