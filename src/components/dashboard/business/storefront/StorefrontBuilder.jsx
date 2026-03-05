import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import TemplateRenderer from './TemplateRenderer';
import { StorefrontProvider, useStorefront } from './StorefrontContext';
import ModernClassicRenderer from './modernClassic/ModernClassicRenderer';
import { ModernClassicProvider, useModernClassic } from './modernClassic/ModernClassicContext';
import ElegantClassicRenderer from './elegantClassic/ElegantClassicRenderer';
import { ElegantClassicProvider, useElegantClassic } from './elegantClassic/ElegantClassicContext';

const TEMPLATE_CONFIG = {
  'base-classic': {
    Provider: StorefrontProvider,
    Renderer: TemplateRenderer,
    useContext: useStorefront,
    title: 'Base Classic Template'
  },
  'modern-classic': {
    Provider: ModernClassicProvider,
    Renderer: ModernClassicRenderer,
    useContext: useModernClassic,
    title: 'Modern Classic Template'
  },
  'elegant-classic': {
    Provider: ElegantClassicProvider,
    Renderer: ElegantClassicRenderer,
    useContext: useElegantClassic,
    title: 'Elegant Classic Template'
  }
};

const GlobalSettings = ({ useContextHook }) => {
  const { tokens, overrideTokens, setOverrideTokens, resetTokens } = useContextHook();

  const updateToken = (path, value) => {
    setOverrideTokens(prev => {
      const next = { ...prev };
      const keys = path.split('.');
      let current = next;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const fonts = [
    { label: 'Inter (Sans)', value: 'font-sans' },
    { label: 'Merriweather (Serif)', value: 'font-serif' },
    { label: 'JetBrains Mono (Mono)', value: 'font-mono' },
  ];

  const widths = [
    { label: 'Standard', value: 'max-w-7xl' },
    { label: 'Compact', value: 'max-w-5xl' },
    { label: 'Wide', value: 'max-w-[1440px]' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
      <div className="flex justify-end">
        <button 
          onClick={resetTokens}
          className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-600 transition-colors flex items-center gap-2"
        >
          <SafeIcon icon={FiIcons.FiRotateCcw} className="text-sm" />
          Reset to Default
        </button>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block px-1">Brand Colors</label>
        <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Primary Color</span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden relative">
                <input
                  type="color"
                  value={(() => {
                    const value = overrideTokens.colors?.primary || tokens.colors?.primary;
                    return value && value.startsWith('#') ? value : '#2563eb';
                  })()}
                  onChange={(e) => updateToken('colors.primary', e.target.value)}
                  className="absolute inset-0 w-full h-full scale-150 cursor-pointer"
                />
              </div>
              <input
                type="text"
                value={overrideTokens.colors?.primary || tokens.colors?.primary || ''}
                onChange={(e) => updateToken('colors.primary', e.target.value)}
                className="w-24 bg-white border border-gray-100 rounded-lg px-2 py-1 text-[10px] font-mono text-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Accent Color</span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden relative">
                <input
                  type="color"
                  value={(() => {
                    const value = overrideTokens.colors?.secondary || tokens.colors?.secondary;
                    return value && value.startsWith('#') ? value : '#111827';
                  })()}
                  onChange={(e) => updateToken('colors.secondary', e.target.value)}
                  className="absolute inset-0 w-full h-full scale-150 cursor-pointer"
                />
              </div>
              <input
                type="text"
                value={overrideTokens.colors?.secondary || tokens.colors?.secondary || ''}
                onChange={(e) => updateToken('colors.secondary', e.target.value)}
                className="w-24 bg-white border border-gray-100 rounded-lg px-2 py-1 text-[10px] font-mono text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block px-1">Typography</label>
        <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-700">Primary Font (Titles)</span>
            <select 
              value={overrideTokens.typography?.fontPrimary || 'font-sans'}
              onChange={(e) => updateToken('typography.fontPrimary', e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 transition-all outline-none"
            >
              {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-700">Secondary Font (Body)</span>
            <select 
              value={overrideTokens.typography?.fontSecondary || 'font-sans'}
              onChange={(e) => updateToken('typography.fontSecondary', e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 transition-all outline-none"
            >
              {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block px-1">Headline Colors</label>
        <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Hero Pre Text</span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden relative">
                <input
                  type="color"
                  value={(() => {
                    const value = overrideTokens.colors?.heroPreText || overrideTokens.colors?.heroHeadlinePre || tokens.colors?.heroPreText || tokens.colors?.heroHeadlinePre;
                    return value && value.startsWith('#') ? value : '#ffffff';
                  })()}
                  onChange={(e) => updateToken('colors.heroPreText', e.target.value)}
                  className="absolute inset-0 w-full h-full scale-150 cursor-pointer"
                />
              </div>
              <input
                type="text"
                value={overrideTokens.colors?.heroPreText || overrideTokens.colors?.heroHeadlinePre || tokens.colors?.heroPreText || tokens.colors?.heroHeadlinePre || ''}
                onChange={(e) => updateToken('colors.heroPreText', e.target.value)}
                className="w-24 bg-white border border-gray-100 rounded-lg px-2 py-1 text-[10px] font-mono text-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Section Normal Text</span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden relative">
                <input
                  type="color"
                  value={(() => {
                    const value = overrideTokens.colors?.sectionHeadlineNormal || tokens.colors?.sectionHeadlineNormal;
                    return value && value.startsWith('#') ? value : '#1f2937';
                  })()}
                  onChange={(e) => updateToken('colors.sectionHeadlineNormal', e.target.value)}
                  className="absolute inset-0 w-full h-full scale-150 cursor-pointer"
                />
              </div>
              <input
                type="text"
                value={overrideTokens.colors?.sectionHeadlineNormal || tokens.colors?.sectionHeadlineNormal || ''}
                onChange={(e) => updateToken('colors.sectionHeadlineNormal', e.target.value)}
                className="w-24 bg-white border border-gray-100 rounded-lg px-2 py-1 text-[10px] font-mono text-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Section Highlight Text</span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden relative">
                <input
                  type="color"
                  value={(() => {
                    const value = overrideTokens.colors?.sectionHeadlineHighlight || tokens.colors?.sectionHeadlineHighlight || tokens.colors?.sectionHeadlineNormal;
                    return value && value.startsWith('#') ? value : '#1f2937';
                  })()}
                  onChange={(e) => updateToken('colors.sectionHeadlineHighlight', e.target.value)}
                  className="absolute inset-0 w-full h-full scale-150 cursor-pointer"
                />
              </div>
              <input
                type="text"
                value={overrideTokens.colors?.sectionHeadlineHighlight || tokens.colors?.sectionHeadlineHighlight || tokens.colors?.sectionHeadlineNormal || ''}
                onChange={(e) => updateToken('colors.sectionHeadlineHighlight', e.target.value)}
                className="w-24 bg-white border border-gray-100 rounded-lg px-2 py-1 text-[10px] font-mono text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block px-1">Layout</label>
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-700">Content Width</span>
            <div className="grid grid-cols-3 gap-2">
              {widths.map(w => (
                <button
                  key={w.value}
                  onClick={() => updateToken('layout.containerWidth', w.value)}
                  className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    (overrideTokens.layout?.containerWidth || 'max-w-7xl') === w.value
                      ? 'bg-black text-white shadow-lg shadow-black/20'
                      : 'bg-white text-gray-400 hover:text-gray-600 border border-gray-100'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentControls = ({ sectionId, useContextHook }) => {
  const { sectionsConfig, updateSection } = useContextHook();
  const section = sectionsConfig.find(s => s.id === sectionId);

  if (!section || !section.content) return null;

  const updateContent = (field, value) => {
    updateSection(sectionId, {
      content: {
        ...section.content,
        [field]: value
      }
    });
  };

  const updateGalleryImage = (index, value) => {
    const images = section.content.images || [];
    const newImages = [...images];
    newImages[index] = value;
    updateContent('images', newImages);
  };

  const addGalleryImage = () => {
    const images = section.content.images || [];
    updateContent('images', [...images, '']);
  };

  const removeGalleryImage = (index) => {
    const images = section.content.images || [];
    updateContent('images', images.filter((_, i) => i !== index));
  };

  const updateTestimonial = (index, field, value) => {
    const testimonials = section.content.testimonials || [];
    const newTestimonials = [...testimonials];
    newTestimonials[index] = {
      ...newTestimonials[index],
      [field]: value
    };
    updateContent('testimonials', newTestimonials);
  };

  const fields = Object.entries(section.content);

  const getLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
        {fields.map(([key, value]) => {
          if (key === 'images' && sectionId === 'gallery') {
            const images = Array.isArray(value) ? value : [];
            return (
              <div key={key} className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block px-1">
                  Gallery Images
                </label>
                {images.map((img, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={img}
                      onChange={(e) => updateGalleryImage(index, e.target.value)}
                      placeholder="Image URL or upload"
                      className="flex-1 bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                    />
                    <button
                      onClick={() => removeGalleryImage(index)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={addGalleryImage}
                  className="w-full py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  + Add Image
                </button>
              </div>
            );
          }

          if (key === 'testimonials' && sectionId === 'testimonials') {
            const testimonials = Array.isArray(value) ? value : [];
            return (
              <div key={key} className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block px-1">
                  Testimonials
                </label>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 space-y-3 border border-gray-200">
                    <div className="text-xs font-bold text-gray-500">Testimonial {index + 1}</div>
                    <input
                      type="text"
                      value={testimonial.name || ''}
                      onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                      placeholder="Name"
                      className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                    />
                    <input
                      type="text"
                      value={testimonial.role || ''}
                      onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                      placeholder="Role"
                      className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                    />
                    <input
                      type="text"
                      value={testimonial.image || ''}
                      onChange={(e) => updateTestimonial(index, 'image', e.target.value)}
                      placeholder="Person's Image URL"
                      className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                    />
                    <textarea
                      value={testimonial.content || ''}
                      onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                      placeholder="Testimonial content"
                      className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 transition-all outline-none resize-none min-h-[80px]"
                    />
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div key={key} className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block px-1">
                {getLabel(key)}
              </label>
              {key.toLowerCase().includes('description') || key.toLowerCase().includes('subtitle') ? (
                <textarea
                  value={value}
                  onChange={(e) => updateContent(key, e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-orange-500 transition-all outline-none resize-none min-h-[100px]"
                />
              ) : key.toLowerCase().includes('image') ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateContent(key, e.target.value)}
                  placeholder="Image URL"
                  className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateContent(key, e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-xl px-4 py-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const VisibilityControls = ({ sectionId, useContextHook }) => {
  const { sectionsConfig, updateSection } = useContextHook();
  const section = sectionsConfig.find(s => s.id === sectionId);

  if (!section) return null;

  const updateVisibility = (field, value) => {
    updateSection(sectionId, {
      visibility: {
        ...section.visibility,
        [field]: value
      }
    });
  };

  const toggleDevice = (device) => {
    const devices = section.visibility.devices || ['desktop', 'mobile'];
    const newDevices = devices.includes(device)
      ? devices.filter(d => d !== device)
      : [...devices, device];
    
    updateVisibility('devices', newDevices);
  };

  const isDeviceEnabled = (device) => {
    return (section.visibility.devices || ['desktop', 'mobile']).includes(device);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-700">Show Section</span>
            <span className="text-[10px] text-gray-400 font-medium">Toggle visibility on all devices</span>
          </div>
          <button 
            onClick={() => updateVisibility('enabled', !section.visibility.enabled)}
            className={`w-10 h-5 rounded-full transition-all relative ${section.visibility.enabled ? 'bg-orange-500' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${section.visibility.enabled ? 'left-6' : 'left-1'}`} />
          </button>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-700">Hide on Mobile</span>
            <span className="text-[10px] text-gray-400 font-medium">Invisible on small screens</span>
          </div>
          <button 
            onClick={() => toggleDevice('mobile')}
            className={`w-10 h-5 rounded-full transition-all relative ${!isDeviceEnabled('mobile') ? 'bg-orange-500' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${!isDeviceEnabled('mobile') ? 'left-6' : 'left-1'}`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-700">Hide on Desktop</span>
            <span className="text-[10px] text-gray-400 font-medium">Invisible on large screens</span>
          </div>
          <button 
            onClick={() => toggleDevice('desktop')}
            className={`w-10 h-5 rounded-full transition-all relative ${!isDeviceEnabled('desktop') ? 'bg-orange-500' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${!isDeviceEnabled('desktop') ? 'left-6' : 'left-1'}`} />
          </button>
        </div>
      </div>

      <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
            <SafeIcon icon={FiIcons.FiShield} className="text-orange-600" />
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-900">Visibility Engine V2</h4>
            <p className="text-[10px] text-orange-700 leading-relaxed font-medium">
              Your sections now support rule-based visibility. Advanced condition builder coming soon in the next update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionSettings = ({ sectionId, onBack, useContextHook }) => {
  const [activeTab, setActiveTab] = useState('content');
  const { sectionsConfig } = useContextHook();
  const section = sectionsConfig.find(s => s.id === sectionId);

  if (!section) return null;

  return (
    <div className="space-y-6 text-left">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
      >
        <SafeIcon icon={FiIcons.FiArrowLeft} />
        Back to Sections
      </button>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">{section.name} Settings</h3>
        <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${section.visibility.enabled ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {section.visibility.enabled ? 'Visible' : 'Hidden'}
        </div>
      </div>

      <div className="flex bg-gray-50 p-1 rounded-xl">
        {['Content', 'Design', 'Visibility'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
              activeTab === tab.toLowerCase()
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="py-4">
        {activeTab === 'content' && (
          <ContentControls sectionId={sectionId} useContextHook={useContextHook} />
        )}
        {activeTab === 'design' && (
          <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200">
            <SafeIcon icon={FiIcons.FiDroplet} className="text-2xl text-gray-300 mx-auto mb-3" />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Design customization coming soon</p>
          </div>
        )}
        {activeTab === 'visibility' && (
          <VisibilityControls sectionId={sectionId} useContextHook={useContextHook} />
        )}
      </div>
    </div>
  );
};

const BuilderContent = ({ useContextHook, Renderer, templateSlug, templateTitle }) => {
  const [activePanelTab, setActivePanelTab] = useState('sections');
  const [editingSectionId, setEditingSectionId] = useState(null);
  const navigate = useNavigate();
  const { saveTokens, previewDevice, setPreviewDevice, sectionsConfig } = useContextHook();

  const getDeviceWidth = () => {
    switch (previewDevice) {
      case 'tablet': return 'w-[768px]';
      case 'mobile': return 'w-[375px]';
      default: return 'w-full max-w-[1440px]';
    }
  };

  const getDeviceScale = () => {
    switch (previewDevice) {
      case 'tablet': return 'scale-[0.85]';
      case 'mobile': return 'scale-[0.85]';
      default: return 'scale-[0.95]';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Topbar */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-30 shadow-sm shrink-0">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/storefront')}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-400 hover:text-black"
          >
            <SafeIcon icon={FiIcons.FiArrowLeft} className="text-xl" />
          </button>
          <div className="h-6 w-px bg-gray-100" />
          <div className="text-left">
            <h1 className="text-sm font-black uppercase tracking-widest text-gray-900">{templateTitle}</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Editing Storefront</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1 border border-gray-200">
          <button 
            onClick={() => setPreviewDevice('desktop')}
            className={`p-2 rounded-full transition-all ${previewDevice === 'desktop' ? 'text-orange-600 bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            title="Desktop View"
          >
            <SafeIcon icon={FiIcons.FiMonitor} />
          </button>
          <button 
            onClick={() => setPreviewDevice('tablet')}
            className={`p-2 rounded-full transition-all ${previewDevice === 'tablet' ? 'text-orange-600 bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            title="Tablet View"
          >
            <SafeIcon icon={FiIcons.FiTablet} />
          </button>
          <button 
            onClick={() => setPreviewDevice('mobile')}
            className={`p-2 rounded-full transition-all ${previewDevice === 'mobile' ? 'text-orange-600 bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            title="Mobile View"
          >
            <SafeIcon icon={FiIcons.FiSmartphone} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/storefront/templates/classic/${templateSlug}/preview`)}
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
          >
            <SafeIcon icon={FiIcons.FiEye} />
            View Preview
          </button>
          <button 
            onClick={saveTokens}
            className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
          >
            Save Changes
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Editor */}
        <aside className="w-[30%] min-w-[350px] bg-white border-r border-gray-100 flex flex-col z-20 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <div className="flex bg-gray-50 p-1 rounded-xl">
              {['Global', 'Sections'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActivePanelTab(tab.toLowerCase());
                    setEditingSectionId(null);
                  }}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    activePanelTab === tab.toLowerCase()
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {activePanelTab === 'global' ? (
              <GlobalSettings useContextHook={useContextHook} />
            ) : editingSectionId ? (
              <SectionSettings
                sectionId={editingSectionId}
                onBack={() => setEditingSectionId(null)}
                useContextHook={useContextHook}
              />
            ) : (
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block px-1 mb-4">Storefront Sections</label>
                {sectionsConfig.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setEditingSectionId(section.id)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all group"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${section.visibility.enabled ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-400'}`}>
                        <SafeIcon icon={FiIcons.FiBox} />
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold transition-colors ${section.visibility.enabled ? 'text-gray-900' : 'text-gray-400'}`}>
                          {section.name}
                        </span>
                        {!section.visibility.enabled && (
                          <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Hidden</span>
                        )}
                      </div>
                    </div>
                    <SafeIcon icon={FiIcons.FiChevronRight} className="text-gray-300 group-hover:text-black transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Right Panel - Preview */}
        <main className="flex-1 relative overflow-hidden bg-gray-100">
          <div className="absolute inset-0 overflow-y-auto">
            <div className="min-h-full p-8 md:p-12 flex flex-col items-center">
              <div className="flex justify-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
                  {previewDevice} View
                </span>
              </div>

              <div className={`transition-all duration-500 ${getDeviceWidth()}`}>
                <div 
                  className={`bg-white shadow-2xl rounded-[32px] overflow-hidden origin-top transition-all duration-500 ${getDeviceScale()}`}
                >
                  <div className="pointer-events-none select-none">
                    <Renderer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StorefrontBuilder = () => {
  const { templateSlug } = useParams();
  const config = TEMPLATE_CONFIG[templateSlug] || TEMPLATE_CONFIG['base-classic'];
  const Provider = config.Provider;

  return (
    <Provider>
      <BuilderContent
        useContextHook={config.useContext}
        Renderer={config.Renderer}
        templateSlug={templateSlug}
        templateTitle={config.title}
      />
    </Provider>
  );
};

export default StorefrontBuilder;