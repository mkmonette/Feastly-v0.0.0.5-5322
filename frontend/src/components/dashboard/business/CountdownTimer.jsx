import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '@/common/SafeIcon';

const { FiClock, FiZap } = FiIcons;

/**
 * CountdownTimer Component
 * Calculates and displays a live countdown.
 * Supports "targetTime" (ISO string or Date) for exact end times.
 */
const CountdownTimer = ({ targetTime, onComplete, label = "Ends in" }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!targetTime) return;

    const calculateTimeLeft = () => {
      const target = new Date(targetTime);
      const now = new Date();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft('00:00:00');
        setIsExpired(true);
        if (onComplete) onComplete();
        return false;
      }

      setIsExpired(false);
      const hours = Math.floor((difference / (1000 * 60 * 60)));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const formatted = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':');

      setTimeLeft(formatted);
      return true;
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetTime, onComplete]);

  if (isExpired) {
    return (
      <div className="flex items-center text-red-500 font-bold text-[10px] uppercase tracking-wider">
        <SafeIcon icon={FiZap} className="mr-1" />
        Expired
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col items-start">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter leading-none mb-0.5">
          {label}
        </span>
        <div className="flex items-center text-orange-600 font-mono font-black text-sm tabular-nums">
          <SafeIcon icon={FiClock} className="mr-1.5 text-xs animate-pulse" />
          {timeLeft}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;