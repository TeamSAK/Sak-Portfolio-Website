import React, { useState, useEffect, useRef } from 'react';
import { GitCommit, GitPullRequest, Zap, Volume2, VolumeX, X } from 'lucide-react';

const MOCK_EVENTS = [
  { icon: GitCommit, text: "Pushed 3 commits to main", color: "text-blue-400" },
  { icon: Zap, text: "Deployed to production", color: "text-yellow-400" },
  { icon: GitPullRequest, text: "Merged PR: Feature/AI-Chat", color: "text-purple-400" },
  { icon: GitCommit, text: "Refactored Hero component", color: "text-green-400" },
  { icon: Zap, text: "Performance score: 98/100", color: "text-orange-400" },
];

const LiveFeed: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState(MOCK_EVENTS[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted visually, but logic requires user interaction usually
  const [isClosed, setIsClosed] = useState(false);

  const playSound = () => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      // Subtle "pop" sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch(e) { /* ignore */ }
  };

  useEffect(() => {
    if (isClosed) return;

    const showEvent = () => {
      // Pick random event
      const event = MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)];
      setCurrentEvent(event);
      setIsVisible(true);
      playSound();

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Initial delay
    const initialTimer = setTimeout(showEvent, 2000);
    
    // Repeat every 10 seconds
    const interval = setInterval(showEvent, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isClosed, isMuted]);

  if (isClosed) return null;

  return (
    <div className="fixed top-24 right-4 z-40 flex flex-col items-end pointer-events-none">
      <div 
        className={`pointer-events-auto flex items-center gap-3 bg-surface/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-3 pr-8 rounded-xl shadow-2xl transform transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
        }`}
      >
        <div className={`w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/5`}>
          <currentEvent.icon size={16} className={currentEvent.color} />
        </div>
        <div>
           <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Live Activity</p>
           <p className="text-sm font-semibold text-text whitespace-nowrap">{currentEvent.text}</p>
        </div>
        
        {/* Close Button */}
        <button 
            onClick={() => setIsClosed(true)}
            className="absolute top-1 right-1 p-1 text-gray-400 hover:text-red-500 transition-colors"
        >
            <X size={12} />
        </button>
      </div>

      {/* Mute Control Mini */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="pointer-events-auto mt-2 p-2 bg-surface/50 backdrop-blur-md rounded-full text-gray-400 hover:text-text hover:bg-surface border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all scale-90"
        title={isMuted ? "Unmute Live Feed" : "Mute Live Feed"}
      >
         {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      </button>
    </div>
  );
};

export default LiveFeed;