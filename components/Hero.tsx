import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter, Sparkles, ShoppingBag } from 'lucide-react';
import { PORTFOLIO_DATA, RECENT_ACTIVITIES } from '../constants';
import Reveal from './Reveal';

interface HeroProps {
  isMuted: boolean;
}

const Hero: React.FC<HeroProps> = ({ isMuted }) => {
  const [currentActivity, setCurrentActivity] = useState(RECENT_ACTIVITIES[0]);
  const [isActivityVisible, setIsActivityVisible] = useState(true);

  // Sound effect logic
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
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActivityVisible(false);
      setTimeout(() => {
        setCurrentActivity(prev => {
          const currentIndex = RECENT_ACTIVITIES.indexOf(prev);
          const nextIndex = (currentIndex + 1) % RECENT_ACTIVITIES.length;
          return RECENT_ACTIVITIES[nextIndex];
        });
        setIsActivityVisible(true);
        playNotificationSound();
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMuted]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background transition-colors duration-300">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-[0.4] will-change-transform"></div>
      
      {/* Performance Optimization: Use radial gradients instead of heavy CSS filters */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div 
            className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] opacity-10 will-change-transform"
            style={{ 
                background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 60%)',
                filter: 'blur(80px)'
            }}
         ></div>
         <div 
            className="absolute bottom-[-10%] right-[-5%] w-[900px] h-[900px] opacity-10 will-change-transform"
            style={{ 
                background: 'radial-gradient(circle, var(--secondary-color) 0%, transparent 60%)',
                filter: 'blur(80px)'
            }}
         ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left relative z-20">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur border border-primary/20 text-secondary text-sm font-medium mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                </span>
                Open to New Opportunities
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-text mb-6 leading-tight tracking-tight">
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">Digital Products</span> That Matter.
              </h1>
            </Reveal>

            <Reveal delay={400}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                I'm Sak, a Senior Frontend Engineer creating pixel-perfect, performant, and accessible web experiences with modern tech stacks.
              </p>
            </Reveal>
            
            <Reveal delay={600}>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                <a 
                  href="#projects" 
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-full font-bold transition-all transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2 shadow-lg shadow-primary/25"
                >
                  View Projects <ArrowRight size={20} />
                </a>
                <a 
                  href="#" 
                  className="px-8 py-4 bg-surface border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-text rounded-full font-bold transition-all flex items-center gap-2 shadow-sm hover:shadow hover:-translate-y-1"
                >
                  <Download size={20} /> Download CV
                </a>
              </div>
            </Reveal>

            <Reveal delay={800}>
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <a href={PORTFOLIO_DATA.socials.github} className="text-gray-500 dark:text-gray-400 hover:text-text hover:scale-110 transition-all"><Github size={24} /></a>
                <a href={PORTFOLIO_DATA.socials.linkedin} className="text-gray-500 dark:text-gray-400 hover:text-text hover:scale-110 transition-all"><Linkedin size={24} /></a>
                <a href={PORTFOLIO_DATA.socials.twitter} className="text-gray-500 dark:text-gray-400 hover:text-text hover:scale-110 transition-all"><Twitter size={24} /></a>
              </div>
            </Reveal>
          </div>

          {/* Right Content - Composition */}
          <div className="flex-1 relative w-full max-w-[320px] lg:max-w-[400px] mt-10 lg:mt-0 perspective-1000">
            <Reveal delay={400} direction="left">
              {/* 
                  Container Wrapper
              */}
              <div className="relative group">
                
                {/* Image Frame - Updated Image */}
                <div className="relative rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-surface aspect-[4/5] z-10 transform transition-transform duration-500 group-hover:scale-[1.01]">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Sak Dev" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                  />
                  {/* Overlay Gradient - Improved for text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>
                  
                  {/* Name Tag on Image - Fixed Visibility */}
                  <div className="absolute bottom-8 left-8 z-20">
                     <p className="text-sm font-mono text-primary mb-1">01</p>
                     <h3 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">Sak Dev</h3>
                     <p className="text-white/80 text-sm font-medium">San Francisco, CA</p>
                  </div>
                </div>

                {/* Floating Notification Card (Top Right) - Moved down to avoid face & Solid Background */}
                <div className={`absolute top-40 right-0 lg:-right-12 z-30 transition-all duration-500 ${isActivityVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                   <div className="bg-surface border border-gray-200 dark:border-white/10 p-4 rounded-xl shadow-2xl max-w-[240px] relative overflow-hidden group/card">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                        <div className="flex items-start gap-3 relative z-10">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                               <Sparkles size={16} className="text-white" />
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Latest Update</p>
                               <p className="text-xs text-text font-semibold leading-snug">{currentActivity}</p>
                            </div>
                        </div>
                   </div>
                </div>

                {/* Floating Status Card (Bottom Left) - IMPROVED CONTRAST & Repositioned for Mobile */}
                <div className="absolute bottom-24 left-0 lg:-left-10 z-30">
                   <div className="bg-surface/95 backdrop-blur-xl border border-gray-200 dark:border-white/20 p-4 rounded-xl shadow-xl flex items-center gap-4 transform hover:scale-105 transition-transform cursor-pointer group/status">
                      <div className="bg-primary/10 p-2.5 rounded-lg text-primary group-hover/status:bg-primary group-hover/status:text-white transition-colors border border-primary/20">
                         <ShoppingBag size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-0.5 font-bold">Current Status</p>
                         <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                            <p className="text-sm font-bold text-text">Available for work</p>
                         </div>
                      </div>
                   </div>
                </div>

              </div>
            </Reveal>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce pointer-events-none">
            <div className="w-5 h-8 border-2 border-text rounded-full flex justify-center pt-1">
                <div className="w-1 h-2 bg-text rounded-full animate-scroll"></div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;