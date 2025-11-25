import React from 'react';
import { TECH_STACK } from '../constants';

const LogoTicker: React.FC = () => {
  // Triple list for smoother infinite scroll on wide screens
  const tickerData = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK]; 

  return (
    <div className="w-full relative overflow-hidden py-12 group select-none">
        
        {/* Modern Gradient Masks for "Fade Out" effect */}
        <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* Track */}
        <div className="flex animate-marquee whitespace-nowrap items-center hover-paused">
            {tickerData.map((tech, idx) => (
                <div 
                  key={`${tech.name}-${idx}`} 
                  className="mx-12 flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default grayscale hover:grayscale-0 transform hover:scale-105"
                >
                    <div className="w-16 h-16 md:w-20 md:h-20 relative">
                        <img 
                            src={tech.url} 
                            alt={tech.name} 
                            className="w-full h-full object-contain" 
                        />
                    </div>
                    <span className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-500 hover:from-text hover:to-text transition-all hidden md:block">
                        {tech.name}
                    </span>
                </div>
            ))}
        </div>

        <style>{`
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.33%); }
            }
            .animate-marquee {
                animation: marquee 40s linear infinite;
                will-change: transform;
            }
            .hover-paused:hover {
                animation-play-state: paused;
            }
        `}</style>
    </div>
  );
};

export default LogoTicker;