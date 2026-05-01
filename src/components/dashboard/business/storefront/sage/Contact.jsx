import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import { useSage } from './SageContext';

const Contact = () => {
  const { tokens, sectionsConfig } = useSage();
  const [form, setForm] = useState({ name: '', formEmail: '', message: '' });

  const section = sectionsConfig.find(s => s.id === 'contact');
  const { label, title, subtitle, address, phone, email } = section?.content || {};

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => e.preventDefault();

  if (!section) return null;

  const inputStyle = {
    backgroundColor: tokens.colors.inputBg,
    border: `1px solid ${tokens.colors.inputBorder}`,
    color: tokens.colors.textPrimary,
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: 13,
    outline: 'none',
    width: '100%'
  };

  return (
    <section style={{ backgroundColor: tokens.colors.surface }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        {label && (
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: tokens.colors.sectionLabel }}>
            {label}
          </p>
        )}
        <h2 className="text-3xl font-black mb-2" style={{ color: tokens.colors.textPrimary }}>{title}</h2>
        {subtitle && <p className="text-sm mb-10" style={{ color: tokens.colors.textMuted }}>{subtitle}</p>}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: contact info */}
          <div className="flex flex-col gap-6">
            {[
              { icon: FiIcons.FiMapPin, infoLabel: 'Our Location', value: address },
              { icon: FiIcons.FiPhone, infoLabel: 'Phone Number', value: phone },
              { icon: FiIcons.FiMail, infoLabel: 'Email Address', value: email }
            ].map(({ icon, infoLabel, value }) => value && (
              <div key={infoLabel} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: tokens.colors.primaryDim }}
                >
                  <SafeIcon icon={icon} className="text-sm" style={{ color: tokens.colors.primary }} />
                </div>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: tokens.colors.textMuted }}>{infoLabel}</p>
                  <p className="text-sm font-medium" style={{ color: tokens.colors.textPrimary }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                name="formEmail"
                placeholder="Email"
                type="email"
                value={form.formEmail}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              style={{ ...inputStyle, resize: 'none' }}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-85 active:scale-[0.99]"
              style={{ backgroundColor: tokens.colors.primary, color: tokens.colors.textInverse }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
