import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useMobileYumm } from './MobileYummContext';

const Contact = () => {
  const { tokens, sectionsConfig } = useMobileYumm();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const section = sectionsConfig.find(s => s.id === 'contact');

  if (!section?.content) return null;

  const { title, address, phone, hours } = section.content;

  const infoItems = [
    { icon: FiIcons.FiMapPin, label: 'Address', value: address },
    { icon: FiIcons.FiPhone, label: 'Phone', value: phone },
    { icon: FiIcons.FiClock, label: 'Hours', value: hours }
  ].filter(item => item.value);

  return (
    <section className="px-4 pt-5 pb-4 bg-white">
      <h2 className="text-base font-black mb-4" style={{ color: tokens.colors.primaryText }}>{title}</h2>

      <div className="space-y-3 mb-6">
        {infoItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${tokens.colors.primary}18` }}
            >
              <SafeIcon icon={item.icon} className="text-sm" style={{ color: tokens.colors.primary }} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-medium">{item.label}</p>
              <p className="text-sm font-black" style={{ color: tokens.colors.primaryText }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-sm font-black mb-3" style={{ color: tokens.colors.primaryText }}>Send Message</h3>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-all"
          style={{ borderColor: tokens.colors.border }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
          className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-all"
          style={{ borderColor: tokens.colors.border }}
        />
        <textarea
          placeholder="Message"
          rows={3}
          value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none resize-none transition-all"
          style={{ borderColor: tokens.colors.border }}
        />
        <button
          className="w-full py-3 rounded-full font-black text-sm text-white transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: tokens.colors.primary }}
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default Contact;
