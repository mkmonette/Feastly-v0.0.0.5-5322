import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileNeon } from './MobileNeonContext';

const Contact = () => {
  const { tokens, sectionsConfig } = useMobileNeon();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const section = sectionsConfig.find(s => s.id === 'contact');

  if (!section?.content) return null;

  const { title, address, phone, hours } = section.content;

  const infoItems = [
    { icon: FiIcons.FiMapPin, label: 'Address', value: address },
    { icon: FiIcons.FiPhone, label: 'Phone', value: phone },
    { icon: FiIcons.FiClock, label: 'Hours', value: hours }
  ].filter(item => item.value);

  const inputStyle = {
    backgroundColor: tokens.colors.cardBackground,
    border: `1px solid ${tokens.colors.border}`,
    color: tokens.colors.primaryText
  };

  return (
    <section className="px-4 pt-5 pb-4">
      <h2 className="text-base font-black mb-4" style={{ color: tokens.colors.primaryText }}>{title}</h2>

      <div className="space-y-2.5 mb-5">
        {infoItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl p-3"
            style={{ backgroundColor: tokens.colors.cardBackground, border: `1px solid ${tokens.colors.border}` }}
          >
            <SafeIcon icon={item.icon} className="text-sm flex-shrink-0" style={{ color: tokens.colors.primary }} />
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider" style={{ color: tokens.colors.muted }}>{item.label}</p>
              <p className="text-sm font-black" style={{ color: tokens.colors.primaryText }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-black mb-3" style={{ color: tokens.colors.primaryText }}>Send Message</h3>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
          style={inputStyle}
        />
        <textarea
          placeholder="Message"
          rows={3}
          value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
          style={inputStyle}
        />
        <button
          className="w-full py-3 rounded-full font-black text-sm transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.secondary }}
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default Contact;
