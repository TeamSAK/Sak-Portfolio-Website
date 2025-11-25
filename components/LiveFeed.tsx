import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle, Volume2, VolumeX } from 'lucide-react';
import { RECENT_ACTIVITIES } from '../constants';

interface Activity {
  id: number;
  text: string;
}

const LiveFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const nextId = useRef(0);

  // Sound generation using Web Audio API
  const playNotificationSound = () => {
    if (isMuted) return;
    
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Modern "glass" ping sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1); // A6
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  };

  useEffect(() => {
    // Initial delay
    const initialTimer = setTimeout(() => {
      addActivity();
    }, 1500);

    const interval = setInterval(() => {
      addActivity();
    }, 4000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isMuted]); // Re-bind if mute state changes to ensure sound works

  const addActivity = () => {
    const randomActivity = RECENT_ACTIVITIES[Math.floor(Math.random() * RECENT_ACTIVITIES.length)];
    const newActivity = { id: nextId.current++, text: randomActivity };
    
    setActivities(prev => {
      const updated = [newActivity, ...prev].slice(0, 3); // Keep max 3
      return updated;
    });

    playNotificationSound();
  };

  return (
    <div className="absolute right-0 top-20 md:top-1/4 w-full max-w-xs p-4 z-30 pointer-events-none">
      <div className="flex flex-col gap-3 items-end">
        {/* Controls */}
        <div className="pointer-events-auto mb-2">
            <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-surface/80 backdrop-blur-md border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title={isMuted ? "Unmute notifications" : "Mute notifications"}
            >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
        </div>

        {/* Feed Items */}
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="pointer-events-auto animate-slide-in-right w-full bg-surface/90 backdrop-blur-lg border border-white/10 p-4 rounded-xl shadow-2xl flex items-start gap-3 transform transition-all hover:scale-105"
          >
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle size={16} className="text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white leading-tight">
                {activity.text}
              </p>
              <span className="text-[10px] text-gray-400 mt-1 block">Just now</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px) scale(0.9); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default LiveFeed;