import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMosaic } from './MosaicContext';

const PromoStrip = () => {
  const { tokens, sectionsConfig } = useMosaic();
  const section = sectionsConfig.find((s) => s.id === 'promo');
  if (!section?.content) return null;
  const { eyebrow, title, copy, cta } = section.content;

  return (
    <section className="relative py-10" data-testid="mosaic-promo">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[28px] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center"
          style={{
            backgroundColor: tokens.colors.primary,
            color: '#fff',
            boxShadow: tokens.effects.shadow.brand,
          }}
        >
          <div
            className="absolute -top-12 -right-12 w-44 h-44 rounded-full opacity-40 blur-2xl"
            style={{ background: 'radial-gradient(circle, #fff, transparent 70%)' }}
          />
          <div
            className="absolute -left-10 -bottom-12 w-36 h-36 rounded-full opacity-30 blur-2xl"
            style={{ background: 'radial-gradient(circle, #fff, transparent 70%)' }}
          />
          <div className="relative z-10">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] opacity-80 mb-2">
              {eyebrow}
            </div>
            <h3
              className="text-[26px] lg:text-[34px] font-black leading-[1.05] tracking-tight max-w-[420px]"
              style={{ fontFamily: tokens.typography.fontHeading }}
            >
              {title}
            </h3>
            <p className="text-[12.5px] lg:text-[13px] font-medium mt-2 max-w-[480px] opacity-90 leading-relaxed">
              {copy}
            </p>
          </div>
          <button
            type="button"
            className="relative z-10 inline-flex items-center gap-2 px-5 py-3 rounded-full text-[12px] font-black uppercase tracking-widest transition-all hover:scale-[1.03] active:scale-95 self-start md:self-center"
            style={{ backgroundColor: '#fff', color: tokens.colors.text }}
            data-testid="mosaic-promo-cta"
          >
            {cta}
            <SafeIcon icon={FiIcons.FiArrowRight} className="text-sm" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoStrip;
