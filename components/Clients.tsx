import React, { useState, useEffect, useRef } from 'react';

// Verified Simple Icons slugs with distinct brand colors
const CLIENTS = [
  { name: "Google", url: "https://cdn.simpleicons.org/google" },
  { name: "OpenAI", url: "https://cdn.simpleicons.org/openai" },
  { name: "Meta", url: "https://cdn.simpleicons.org/meta" },
  { name: "Facebook", url: "https://cdn.simpleicons.org/facebook" },
  { name: "Instagram", url: "https://cdn.simpleicons.org/instagram" },
  { name: "Nvidia", url: "https://cdn.simpleicons.org/nvidia" },
  { name: "Netflix", url: "https://cdn.simpleicons.org/netflix" },
  { name: "Tesla", url: "https://cdn.simpleicons.org/tesla" },
  { name: "Spotify", url: "https://cdn.simpleicons.org/spotify" },
  { name: "Stripe", url: "https://cdn.simpleicons.org/stripe" },
  { name: "Shopify", url: "https://cdn.simpleicons.org/shopify" },
  { name: "Vercel", url: "https://cdn.simpleicons.org/vercel" },
  { name: "Figma", url: "https://cdn.simpleicons.org/figma" },
  { name: "Docker", url: "https://cdn.simpleicons.org/docker" },
  { name: "Airbnb", url: "https://cdn.simpleicons.org/airbnb" },
  { name: "Samsung", url: "https://cdn.simpleicons.org/samsung" },
  { name: "Slack", url: "https://cdn.simpleicons.org/slack" },
  { name: "PlayStation", url: "https://cdn.simpleicons.org/playstation" },
  { name: "Uber", url: "https://cdn.simpleicons.org/uber" },
  { name: "Intel", url: "https://cdn.simpleicons.org/intel" },
];

const Clients: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Triple the list for smooth infinite scrolling
  const marqueeList = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background border-y border-gray-200 dark:border-white/5 relative overflow-hidden z-20">
      
      {/* Section Header */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em] opacity-80">
          Trusted by Industry Leaders
        </p>
      </div>
      
      {/* Scrolling Container */}
      <div className="relative w-full overflow-hidden select-none group">
        
        {/* Modern Gradient Masks for "Fade Out" effect */}
        <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        {/* Track */}
        <div className={`flex animate-marquee items-center hover-paused gap-16 pl-16 py-12 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            {marqueeList.map((client, idx) => (
                <div 
                  key={`${client.name}-${idx}`} 
                  className="group/item flex flex-col items-center justify-center gap-4 relative min-w-[100px]"
                  style={{
                    animation: isVisible ? 'slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
                    opacity: 0,
                    animationDelay: `${Math.min(idx * 50, 3000)}ms` // Stagger effect, capped to prevent huge delays
                  }}
                >
                    <div className="w-16 h-16 md:w-20 md:h-20 relative transition-all duration-500 transform group-hover/item:-translate-y-3 group-hover/item:scale-110 grayscale opacity-50 group-hover/item:grayscale-0 group-hover/item:opacity-100 will-change-transform">
                        <img 
                            src={client.url} 
                            alt={client.name} 
                            className="w-full h-full object-contain drop-shadow-sm" 
                            loading="lazy"
                        />
                    </div>
                    
                    {/* Name Reveal Animation */}
                    <span className="absolute -bottom-8 text-sm font-bold text-text tracking-wide opacity-0 transform translate-y-2 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all duration-300 delay-75 whitespace-nowrap">
                        {client.name}
                    </span>
                </div>
            ))}
        </div>

        <style>{`
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-33.33%); }
            }
            @keyframes slideInUp {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .animate-marquee {
                animation: marquee 20s linear infinite;
                will-change: transform;
            }
            .hover-paused:hover {
                animation-play-state: paused;
            }
        `}</style>
      </div>
    </section>
  );
};

export default Clients;