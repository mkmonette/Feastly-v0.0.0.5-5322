import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiXCircle, FiClock } = FiIcons;

/**
 * NotificationBarRenderer
 * The core engine that decides which bar to show and handles placement/triggers.
 */
const NotificationBarRenderer = ({ 
  bars = [], 
  user = null, 
  cartTotal = 0, 
  isStorefront = true,
  forceDevice = null 
}) => {
  const location = useLocation();
  const [activeBar, setActiveBar] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  // 1. Filtering & Priority Logic
  const eligibleBars = useMemo(() => {
    const now = new Date();
    const isMobile = forceDevice ? forceDevice === 'mobile' : window.innerWidth < 768;

    const filtered = bars.filter(bar => {
      if (!bar.isEnabled || bar.status !== 'Active') return false;

      // Schedule Check
      if (bar.startAt && new Date(bar.startAt) > now) return false;
      if (bar.endAt && new Date(bar.endAt) < now) return false;

      // Device Check
      if (bar.device === 'desktop' && isMobile) return false;
      if (bar.device === 'mobile' && !isMobile) return false;

      // Audience Check
      if (bar.audience === 'guests' && user) return false;
      if (bar.audience === 'logged_in' && !user) return false;

      // Page Check
      if (isStorefront && !forceDevice) {
        const path = location.pathname;
        if (bar.pages === 'home' && path !== '/') return false;
        if (bar.pages === 'cart' && !path.includes('/cart')) return false;
        if (bar.pages === 'product' && !path.includes('/product')) return false;
        if (bar.pages === 'custom' && bar.customUrlPattern) {
          try {
            const regex = new RegExp(bar.customUrlPattern.replace('*', '.*'));
            if (!regex.test(path)) return false;
          } catch (e) { return false; }
        }
      }

      // Cart Value Check
      if (bar.minCartValue > 0 && cartTotal < bar.minCartValue) return false;

      // Frequency & Dismissal Check (localStorage) - Bypass in preview mode
      if (!forceDevice) {
        const seenKey = `nb_seen_${bar.id}`;
        const dismissedKey = `nb_dismissed_${bar.id}`;
        
        // If frequency is 'once' and user has seen it
        if (bar.showFrequency === 'once' && localStorage.getItem(seenKey)) return false;

        const dismissedAt = localStorage.getItem(dismissedKey);
        if (dismissedAt) {
          const daysSinceDismissal = (now - new Date(dismissedAt)) / (1000 * 60 * 60 * 24);
          if (daysSinceDismissal < (bar.reappearDays || 0)) return false;
        }
      }

      return true;
    });

    return filtered.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }, [bars, location.pathname, user, cartTotal, forceDevice, isStorefront]);

  useEffect(() => {
    const bar = eligibleBars[0];
    if (bar) {
      setIsVisible(false);
      // Trigger: Show after X seconds
      const delay = forceDevice ? 0 : (bar.delaySeconds || 0);
      const timer = setTimeout(() => {
        setActiveBar(bar);
        setIsVisible(true);
        
        // Track seen status for 'once' frequency
        if (!forceDevice && bar.showFrequency === 'once') {
          localStorage.setItem(`nb_seen_${bar.id}`, 'true');
        }
      }, delay * 1000);

      // Trigger: Auto-hide after X seconds
      let hideTimer;
      if (bar.autoHideSeconds > 0 && !forceDevice) {
        hideTimer = setTimeout(() => {
          setIsVisible(false);
        }, (delay + bar.autoHideSeconds) * 1000);
      }

      return () => {
        clearTimeout(timer);
        if (hideTimer) clearTimeout(hideTimer);
      };
    } else {
      setIsVisible(false);
      setActiveBar(null);
    }
  }, [eligibleBars, forceDevice]);

  // 2. Countdown Timer Engine
  useEffect(() => {
    if (!activeBar?.hasCountdown || !activeBar?.countdownEnd) return;

    const updateTimer = () => {
      const end = new Date(activeBar.countdownEnd);
      const now = new Date();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('00:00:00');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days > 0 ? days + 'd ' : ''}${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeBar]);

  const handleClose = () => {
    setIsVisible(false);
    if (activeBar && !forceDevice) {
      localStorage.setItem(`nb_dismissed_${activeBar.id}`, new Date().toISOString());
    }
  };

  const getBarStyles = (bar) => {
    const isBottom = bar.position === 'bottom';
    const styles = {
      color: bar.textColor,
      textAlign: bar.textAlign,
      padding: `${bar.padding}px`,
      borderRadius: `${bar.borderRadius}px`,
      minHeight: `${bar.height}px`,
      position: forceDevice ? 'absolute' : (bar.isSticky ? 'fixed' : 'relative'),
      [bar.position || 'top']: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: bar.textAlign === 'center' ? 'center' : bar.textAlign === 'right' ? 'flex-end' : 'flex-start'
    };

    if (bar.backgroundType === 'solid' || (!bar.backgroundGradient && !bar.backgroundImage && bar.backgroundType !== 'gradient')) {
      styles.backgroundColor = bar.backgroundColor || '#FF4F01';
    } else if (bar.backgroundType === 'gradient') {
      if (bar.gradientStart && bar.gradientEnd) {
        const angle = bar.gradientAngle !== undefined ? bar.gradientAngle : 90;
        styles.background = `linear-gradient(${angle}deg, ${bar.gradientStart} 0%, ${bar.gradientEnd} 100%)`;
      } else {
        styles.background = bar.backgroundGradient || 'linear-gradient(90deg, #FF4F01 0%, #FF8A00 100%)';
      }
    } else if (bar.backgroundType === 'image') {
      styles.backgroundImage = `url(${bar.backgroundImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400'})`;
      styles.backgroundSize = 'cover';
      styles.backgroundPosition = 'center';
    }
    return styles;
  };

  if (!isStorefront || !activeBar) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={`bar-${activeBar.id}-${activeBar.position}`}
          initial={activeBar.animation === 'slide-down' ? { y: activeBar.position === 'bottom' ? 100 : -100 } : { opacity: 0 }}
          animate={activeBar.animation === 'slide-down' ? { y: 0 } : { opacity: 1 }}
          exit={activeBar.animation === 'slide-down' ? { y: activeBar.position === 'bottom' ? 100 : -100 } : { opacity: 0 }}
          style={getBarStyles(activeBar)}
          className={`${activeBar.shadow !== 'none' ? 'shadow-lg' : ''} overflow-hidden`}
        >
          {activeBar.backgroundType === 'image' && (
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ backgroundColor: activeBar.overlayColor || '#000000', opacity: activeBar.overlayOpacity || 0.2 }} 
            />
          )}

          <div className="relative z-10 w-full px-4 flex items-center justify-between gap-3">
            <div className={`flex-1 min-w-0 ${activeBar.textAlign === 'center' ? 'text-center' : activeBar.textAlign === 'right' ? 'text-right' : 'text-left'}`}>
              <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${activeBar.textAlign === 'center' ? 'justify-center' : activeBar.textAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
                <p className="text-xs sm:text-sm font-bold tracking-tight">
                  {activeBar.message
                    .replace(/{{customer_name}}/g, user?.name || 'Customer')
                    .replace(/{{cart_total}}/g, `₱${cartTotal}`)
                    .replace(/{{promo_code}}/g, 'FREESHIP')
                  }
                </p>
                {activeBar.hasCountdown && (
                  <div className="flex items-center space-x-1.5 bg-black/20 px-2 py-0.5 rounded-md text-[10px] font-mono font-black border border-white/10">
                    <SafeIcon icon={FiClock} />
                    <span>{timeLeft}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {activeBar.buttonText && (
                <a
                  href={activeBar.buttonLink}
                  onClick={(e) => forceDevice && e.preventDefault()}
                  style={{ backgroundColor: activeBar.btnBgColor, color: activeBar.btnTextColor }}
                  className="whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm hover:scale-105 transition-transform"
                >
                  {activeBar.buttonText}
                </a>
              )}
              {activeBar.showCloseButton && (
                <button onClick={handleClose} className="text-current opacity-60 hover:opacity-100 transition-opacity">
                  <SafeIcon icon={FiXCircle} className="text-base" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBarRenderer;