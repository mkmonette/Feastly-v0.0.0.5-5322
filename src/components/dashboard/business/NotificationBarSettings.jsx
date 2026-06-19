import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ImageUploadField from '@/components/ui/ImageUploadField';
import NotificationBarRenderer from './NotificationBarRenderer';

const { 
  FiBell, FiEye, FiPlus, FiTrash2, FiEdit3, 
  FiChevronLeft, FiLayout, FiType, FiDroplet, 
  FiClock, FiTarget, FiMonitor, FiSmartphone, 
  FiLayers, FiMove, FiMousePointer, FiImage, FiGlobe, FiSliders, FiZap
} = FiIcons;

const NotificationBarSettings = () => {
  const [bars, setBars] = useState([
    {
      id: '1',
      name: 'Welcome Promo',
      isEnabled: true,
      priority: 1,
      status: 'Active',
      message: '🎉 Get FREE delivery on orders over ₱500! Use code: {{promo_code}}',
      backgroundColor: '#FF4F01',
      textColor: '#FFFFFF',
      buttonText: 'Order Now',
      buttonLink: '/menu',
      backgroundType: 'solid',
      backgroundImage: '',
      backgroundGradient: 'linear-gradient(90deg, #FF4F01 0%, #FF8A00 100%)',
      gradientStart: '#FF4F01',
      gradientEnd: '#FF8A00',
      gradientAngle: 90,
      overlayColor: '#000000',
      overlayOpacity: 0.2,
      textAlign: 'center',
      height: 54,
      padding: 12,
      borderRadius: 0,
      shadow: 'md',
      animation: 'slide-down',
      position: 'top',
      isSticky: true,
      hasCountdown: true,
      startAt: new Date().toISOString(),
      endAt: new Date(Date.now() + 604800000).toISOString(),
      countdownEnd: new Date(Date.now() + 172800000).toISOString(),
      btnBgColor: '#FFFFFF',
      btnTextColor: '#FF4F01',
      delaySeconds: 0,
      autoHideSeconds: 0,
      showCloseButton: true,
      reappearDays: 1,
      showFrequency: 'multiple',
      audience: 'all',
      pages: 'all',
      device: 'both',
      minCartValue: 0,
      timezone: 'Asia/Manila'
    }
  ]);
  
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const activeBar = useMemo(() => 
    editingId ? bars.find(b => b.id === editingId) : null
  , [bars, editingId]);

  const updateActiveBar = (updates) => {
    setBars(prev => prev.map(b => b.id === editingId ? { ...b, ...updates } : b));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditingId(null);
      alert('Notification bar configuration saved!');
    }, 800);
  };

  const formatDateTimeForInput = (isoString) => {
    if (!isoString) return '';
    return isoString.split('.')[0].slice(0, 16);
  };

  return (
    <div className="space-y-8 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
      {!editingId ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <SafeIcon icon={FiBell} className="mr-2 text-orange-600" />
                Notification Bars
              </h3>
              <p className="text-sm text-gray-500">Manage your announcement and promotional bars.</p>
            </div>
            <Button variant="primary" onClick={() => {
              const newBar = { ...bars[0], id: Date.now().toString(), name: 'New Bar', isEnabled: false, status: 'Draft' };
              setBars([...bars, newBar]);
              setEditingId(newBar.id);
            }} className="rounded-2xl">
              <SafeIcon icon={FiPlus} className="mr-2" /> Create New Bar
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {bars.map((bar) => (
              <div key={bar.id} className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-orange-200 transition-all">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-2xl ${bar.isEnabled ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-400'}`}>
                    <SafeIcon icon={FiBell} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{bar.name}</h4>
                    <p className="text-xs text-gray-400 font-medium truncate max-w-sm">{bar.message}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setEditingId(bar.id)} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all">
                    <SafeIcon icon={FiEdit3} />
                  </button>
                  <button onClick={() => setBars(bars.filter(b => b.id !== bar.id))} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                    <SafeIcon icon={FiTrash2} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-8 py-4 border-b border-gray-50 bg-gray-50/50 overflow-x-auto no-scrollbar">
                <button onClick={() => setEditingId(null)} className="flex items-center text-sm font-bold text-gray-500 hover:text-orange-600 shrink-0 mr-4">
                  <SafeIcon icon={FiChevronLeft} className="mr-1" /> Back
                </button>
                <div className="flex space-x-1 shrink-0">
                  {[
                    { id: 'general', label: 'General', icon: FiLayout },
                    { id: 'content', label: 'Content', icon: FiType },
                    { id: 'design', label: 'Design', icon: FiDroplet },
                    { id: 'targeting', label: 'Triggers', icon: FiZap },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                        activeTab === tab.id ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <SafeIcon icon={tab.icon} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8 space-y-8">
                {activeTab === 'general' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                    <Input label="Internal Bar Name" value={activeBar.name} onChange={(e) => updateActiveBar({ name: e.target.value })} />
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Status</label>
                      <select value={activeBar.status} onChange={(e) => updateActiveBar({ status: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none font-medium">
                        <option value="Draft">Draft</option>
                        <option value="Active">Active</option>
                        <option value="Scheduled">Scheduled</option>
                      </select>
                    </div>
                    <Input label="Priority" type="number" value={activeBar.priority} onChange={(e) => updateActiveBar({ priority: parseInt(e.target.value) || 0 })} />
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <span className="text-sm font-bold text-gray-700">Enable Bar</span>
                      <button onClick={() => updateActiveBar({ isEnabled: !activeBar.isEnabled })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${activeBar.isEnabled ? 'bg-orange-600' : 'bg-gray-200'}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${activeBar.isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'content' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <Input label="Announcement Message" value={activeBar.message} onChange={(e) => updateActiveBar({ message: e.target.value })} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="CTA Button Text" value={activeBar.buttonText} onChange={(e) => updateActiveBar({ buttonText: e.target.value })} />
                      <Input label="Button Link" value={activeBar.buttonLink} onChange={(e) => updateActiveBar({ buttonLink: e.target.value })} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="Visibility Start" type="datetime-local" value={formatDateTimeForInput(activeBar.startAt)} onChange={(e) => updateActiveBar({ startAt: new Date(e.target.value).toISOString() })} />
                      <Input label="Visibility End" type="datetime-local" value={formatDateTimeForInput(activeBar.endAt)} onChange={(e) => updateActiveBar({ endAt: new Date(e.target.value).toISOString() })} />
                    </div>

                    <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiClock} className="text-orange-600" />
                          <span className="text-sm font-bold text-gray-900">Countdown Timer</span>
                        </div>
                        <button onClick={() => updateActiveBar({ hasCountdown: !activeBar.hasCountdown })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${activeBar.hasCountdown ? 'bg-orange-600' : 'bg-gray-300'}`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${activeBar.hasCountdown ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      {activeBar.hasCountdown && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input label="Countdown Target Date" type="datetime-local" value={formatDateTimeForInput(activeBar.countdownEnd)} onChange={(e) => updateActiveBar({ countdownEnd: new Date(e.target.value).toISOString() })} />
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center">
                              <SafeIcon icon={FiGlobe} className="mr-1" /> Timezone
                            </label>
                            <select value={activeBar.timezone} onChange={(e) => updateActiveBar({ timezone: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none font-medium">
                              <option value="Asia/Manila">Asia/Manila (GMT+8)</option>
                              <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                              <option value="UTC">UTC</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'design' && (
                  <div className="space-y-10 animate-in fade-in duration-300">
                    {/* Placement Control */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                          <SafeIcon icon={FiLayout} />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">Placement</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4 px-1">
                        {[
                          { id: 'top', label: 'Top of Page', icon: FiIcons.FiArrowUp },
                          { id: 'bottom', label: 'Bottom of Page', icon: FiIcons.FiArrowDown }
                        ].map(pos => (
                          <button
                            key={pos.id}
                            onClick={() => updateActiveBar({ position: pos.id })}
                            className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all ${
                              activeBar.position === pos.id 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20' 
                                : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                            }`}
                          >
                            <SafeIcon icon={pos.icon} className="text-lg" />
                            <span className="text-xs font-bold uppercase tracking-wider">{pos.label}</span>
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 mt-2">
                        <div className="space-y-0.5">
                          <span className="text-sm font-bold text-gray-700">Sticky Position</span>
                          <p className="text-[10px] text-gray-400 font-medium">Stays in view while scrolling</p>
                        </div>
                        <button onClick={() => updateActiveBar({ isSticky: !activeBar.isSticky })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${activeBar.isSticky ? 'bg-orange-600' : 'bg-gray-200'}`}>
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${activeBar.isSticky ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                          <SafeIcon icon={FiLayers} />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">Background Style</h4>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        {['solid', 'gradient', 'image'].map(type => (
                          <button 
                            key={type} 
                            onClick={() => updateActiveBar({ backgroundType: type })} 
                            className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex flex-col items-center justify-center space-y-1 ${
                              activeBar.backgroundType === type 
                                ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/20' 
                                : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                            }`}
                          >
                            <SafeIcon icon={type === 'solid' ? FiDroplet : type === 'gradient' ? FiSliders : FiImage} className="text-lg" />
                            <span>{type}</span>
                          </button>
                        ))}
                      </div>

                      <div className="mt-6 p-6 bg-gray-50 rounded-[32px] border border-gray-100">
                        {activeBar.backgroundType === 'solid' && (
                          <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Solid Color</label>
                            <div className="flex items-center space-x-4">
                              <input 
                                type="color" 
                                value={activeBar.backgroundColor} 
                                onChange={(e) => updateActiveBar({ backgroundColor: e.target.value })} 
                                className="w-16 h-16 rounded-2xl cursor-pointer border-4 border-white shadow-sm" 
                              />
                              <div className="flex-1">
                                <Input 
                                  value={activeBar.backgroundColor} 
                                  onChange={(e) => updateActiveBar({ backgroundColor: e.target.value })} 
                                  placeholder="#HEX"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {activeBar.backgroundType === 'gradient' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Start Color</label>
                                <div className="flex items-center space-x-3">
                                  <input 
                                    type="color" 
                                    value={activeBar.gradientStart} 
                                    onChange={(e) => updateActiveBar({ gradientStart: e.target.value })} 
                                    className="w-12 h-12 rounded-xl cursor-pointer border-2 border-white shadow-sm" 
                                  />
                                  <span className="text-xs font-mono font-bold text-gray-400">{activeBar.gradientStart}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">End Color</label>
                                <div className="flex items-center space-x-3">
                                  <input 
                                    type="color" 
                                    value={activeBar.gradientEnd} 
                                    onChange={(e) => updateActiveBar({ gradientEnd: e.target.value })} 
                                    className="w-12 h-12 rounded-xl cursor-pointer border-2 border-white shadow-sm" 
                                  />
                                  <span className="text-xs font-mono font-bold text-gray-400">{activeBar.gradientEnd}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Angle ({activeBar.gradientAngle || 90}°)</label>
                                <button onClick={() => updateActiveBar({ gradientAngle: 90 })} className="text-[10px] font-bold text-orange-600 hover:underline">Reset</button>
                              </div>
                              <input type="range" min="0" max="360" value={activeBar.gradientAngle || 90} onChange={(e) => updateActiveBar({ gradientAngle: parseInt(e.target.value) })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                            </div>
                          </div>
                        )}

                        {activeBar.backgroundType === 'image' && (
                          <div className="space-y-6">
                            <ImageUploadField label="Background Image" value={activeBar.backgroundImage} onChange={(url) => updateActiveBar({ backgroundImage: url })} />
                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200/50">
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Overlay Color</label>
                                <input type="color" value={activeBar.overlayColor || '#000000'} onChange={(e) => updateActiveBar({ overlayColor: e.target.value })} className="w-10 h-10 rounded-xl cursor-pointer border-2 border-white shadow-sm" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Opacity ({Math.round((activeBar.overlayOpacity || 0.2) * 100)}%)</label>
                                <input type="range" min="0" max="1" step="0.05" value={activeBar.overlayOpacity || 0.2} onChange={(e) => updateActiveBar({ overlayOpacity: parseFloat(e.target.value) })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600 mt-4" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'targeting' && (
                  <div className="space-y-10 animate-in fade-in duration-300">
                    {/* Triggers Section */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                          <SafeIcon icon={FiZap} />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">Trigger Rules</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input label="Show Delay (s)" type="number" value={activeBar.delaySeconds} onChange={(e) => updateActiveBar({ delaySeconds: parseFloat(e.target.value) || 0 })} />
                        <Input label="Auto-Hide after (s)" type="number" value={activeBar.autoHideSeconds} onChange={(e) => updateActiveBar({ autoHideSeconds: parseFloat(e.target.value) || 0 })} />
                        <Input label="Reappear after (days)" type="number" value={activeBar.reappearDays} onChange={(e) => updateActiveBar({ reappearDays: parseFloat(e.target.value) || 0 })} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Showing Frequency</label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: 'multiple', label: 'Show Multiple Times' },
                            { id: 'once', label: 'Show Only Once' }
                          ].map(freq => (
                            <button
                              key={freq.id}
                              onClick={() => updateActiveBar({ showFrequency: freq.id })}
                              className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                                activeBar.showFrequency === freq.id 
                                  ? 'bg-orange-600 text-white border-orange-600' 
                                  : 'bg-white text-gray-400 border-gray-100'
                              }`}
                            >
                              {freq.label}
                            </button>
                          ))}
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium ml-1">
                          {activeBar.showFrequency === 'once' 
                            ? 'Users will only see this bar once in their lifetime (tracked via browser storage).' 
                            : 'Users will see the bar every time they visit eligible pages.'}
                        </p>
                      </div>
                    </div>

                    {/* Targeting Section */}
                    <div className="space-y-6 pt-6 border-t border-gray-50">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                          <SafeIcon icon={FiTarget} />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">Audience & Targeting</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Show to</label>
                          <select value={activeBar.audience} onChange={(e) => updateActiveBar({ audience: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none font-medium">
                            <option value="all">All Visitors</option>
                            <option value="guests">Guests Only</option>
                            <option value="logged_in">Logged-in Users Only</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Device</label>
                          <select value={activeBar.device} onChange={(e) => updateActiveBar({ device: e.target.value })} className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none font-medium">
                            <option value="both">All Devices</option>
                            <option value="desktop">Desktop Only</option>
                            <option value="mobile">Mobile Only</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="xl:w-[500px] space-y-6">
            <div className="bg-gray-50 rounded-[40px] border border-gray-100 p-8 sticky top-10 flex flex-col min-h-[600px] items-center">
              <div className="w-full flex items-center justify-between mb-6">
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center">
                  <SafeIcon icon={FiEye} className="mr-2 text-gray-400" /> Live Preview
                </h4>
                <div className="flex bg-white p-1 rounded-xl border border-gray-200">
                  <button onClick={() => setPreviewDevice('desktop')} className={`p-2 rounded-lg transition-all ${previewDevice === 'desktop' ? 'bg-orange-100 text-orange-600 shadow-sm' : 'text-gray-400'}`}>
                    <SafeIcon icon={FiMonitor} />
                  </button>
                  <button onClick={() => setPreviewDevice('mobile')} className={`p-2 rounded-lg transition-all ${previewDevice === 'mobile' ? 'bg-orange-100 text-orange-600 shadow-sm' : 'text-gray-400'}`}>
                    <SafeIcon icon={FiSmartphone} />
                  </button>
                </div>
              </div>

              <div 
                className={`relative bg-white border-[12px] border-gray-900 overflow-hidden shadow-2xl flex flex-col transition-all duration-500 ease-in-out shrink-0 ${
                  previewDevice === 'mobile' 
                    ? 'w-[375px] h-[667px] rounded-[3.5rem]' 
                    : 'w-full h-[500px] rounded-[2rem]'
                }`}
              >
                {previewDevice === 'mobile' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-2xl z-50 flex items-center justify-center">
                    <div className="w-12 h-1 bg-gray-800 rounded-full" />
                  </div>
                )}

                <div className="bg-gray-100 shrink-0 h-6 flex items-center px-6 space-x-1.5 border-b border-gray-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </div>

                <div className="flex-1 relative bg-gray-50 overflow-hidden flex flex-col">
                  {/* The actual Rendering Engine */}
                  <NotificationBarRenderer 
                    bars={[activeBar]} 
                    isStorefront={true} 
                    user={{ name: 'John' }} 
                    cartTotal={750}
                    forceDevice={previewDevice}
                  />
                  
                  <div className="flex-1 overflow-y-auto no-scrollbar p-6 pt-24">
                    <div className="h-40 bg-white rounded-3xl border border-gray-100 shadow-sm mb-6 flex items-center justify-center font-bold text-gray-300">
                      STOREFRONT CONTENT
                    </div>
                    <div className="space-y-4">
                      <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
                      <div className="h-4 w-1/2 bg-gray-200 rounded-full" />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 bg-white rounded-2xl border border-gray-100" />
                        <div className="h-32 bg-white rounded-2xl border border-gray-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full mt-8 grid grid-cols-2 gap-3">
                <Button variant="secondary" onClick={() => setEditingId(null)} className="rounded-2xl py-4">Cancel</Button>
                <Button variant="primary" onClick={handleSave} loading={saving} className="rounded-2xl py-4">Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBarSettings;