import React, { useEffect, useState, useRef } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { Code, Database, Cpu, Wrench, Award, Zap, ArrowUpRight, Globe, Smartphone, Shield } from 'lucide-react';
import Reveal from './Reveal';

// Animated Counter Component
const Counter: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const [suffix, setSuffix] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          // Parse the number (e.g., "05+" -> 5)
          const numValue = parseInt(value.replace(/\D/g, ''));
          const textSuffix = value.replace(/[0-9]/g, '');
          setSuffix(textSuffix);

          let start = 0;
          const duration = 2000; // 2 seconds
          const increment = Math.ceil(numValue / (duration / 16)); // 60fps

          const timer = setInterval(() => {
            start += increment;
            if (start >= numValue) {
              setCount(numValue);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-left group p-6 bg-surface rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all">
      <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary mb-2 flex items-baseline tracking-tighter group-hover:scale-105 transition-transform origin-left duration-300">
        {count < 10 && count > 0 ? `0${count}` : count}
        <span className="text-text text-3xl md:text-4xl ml-1 opacity-50">{suffix}</span>
      </div>
      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{label}</p>
    </div>
  );
};

const About: React.FC = () => {
  const getIcon = (categoryName: string) => {
    if (categoryName.includes("Web")) return <Globe size={24} className="text-primary" />;
    if (categoryName.includes("AI")) return <Cpu size={24} className="text-accent" />;
    if (categoryName.includes("Mobile")) return <Smartphone size={24} className="text-secondary" />;
    if (categoryName.includes("DevOps")) return <Wrench size={24} className="text-emerald-500" />;
    if (categoryName.includes("Security")) return <Shield size={24} className="text-rose-500" />;
    return <Code size={24} className="text-text" />;
  };

  return (
    <section id="about" className="py-16 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Narrative & Stats */}
          <div className="flex-1 lg:sticky lg:top-32">
            <Reveal>
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 shadow-sm animate-float">
                  <Award size={14} /> About The Developer
               </div>
            </Reveal>
            
            <Reveal delay={200}>
              <h2 className="text-4xl md:text-6xl font-black text-text mb-8 leading-none tracking-tight">
                More than just <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">clean code.</span>
              </h2>
            </Reveal>

            <Reveal delay={400}>
              <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-light">
                 <p>
                    I'm a <strong className="text-text font-semibold">product-minded engineer</strong> who bridges the gap between design and technology. I don't just build features; I craft digital experiences that perform flawlessly.
                 </p>
                 <p>
                    With a deep focus on <span className="text-secondary font-medium">performance optimization</span> and <span className="text-primary font-medium">AI integration</span>, I help forward-thinking companies scale their technical infrastructure while keeping users delighted.
                 </p>
              </div>
            </Reveal>

            <Reveal delay={600}>
               <div className="grid grid-cols-2 gap-6 mt-12">
                  {PORTFOLIO_DATA.stats.map((stat, idx) => (
                     <Counter key={idx} value={stat.value} label={stat.label} />
                  ))}
               </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Skills Grid */}
          <div className="flex-1 w-full">
             <Reveal delay={200} direction="left">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-bold text-text flex items-center gap-3">
                      <Zap className="text-primary fill-primary" size={24} />
                      Tech Stack & Expertise
                  </h3>
                  <div className="h-px flex-1 bg-gray-200 dark:bg-white/10 ml-6"></div>
                </div>
             </Reveal>

             {/* Bento Grid Layout for Skills */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {PORTFOLIO_DATA.skills.map((category, idx) => (
                   <Reveal 
                      key={category.name} 
                      delay={300 + (idx * 100)} 
                      direction='left'
                      className={idx === 0 ? 'md:col-span-2' : ''}
                   >
                      <div className={`group relative bg-surface/50 backdrop-blur-sm border border-gray-200 dark:border-white/5 rounded-3xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 overflow-hidden h-full flex flex-col`}>
                         
                         {/* Hover Gradient Background */}
                         <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                         
                         <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-background border border-gray-100 dark:border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                        {getIcon(category.name)}
                                    </div>
                                    <div>
                                      <h4 className="text-xl font-bold text-text group-hover:text-primary transition-colors">{category.name}</h4>
                                      <p className="text-xs text-gray-500 font-medium mt-0.5 uppercase tracking-wide">
                                        {category.skills.length} Technologies
                                      </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {/* Add visual flair for the first 'Web' item */}
                                  {idx === 0 && (
                                     <span className="hidden sm:inline-flex px-2 py-1 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                                       CORE FOCUS
                                     </span>
                                  )}
                                  <ArrowUpRight className="text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300" />
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2.5 mt-auto mb-4">
                                {category.skills.map((skill) => (
                                  <span 
                                    key={skill} 
                                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-background border border-gray-200 dark:border-white/5 rounded-xl transition-all duration-300 hover:text-white hover:bg-primary hover:border-primary cursor-default shadow-sm"
                                  >
                                      {skill}
                                  </span>
                                ))}
                            </div>
                            
                            {/* Subtle Progress Bar at bottom */}
                            <div className="w-full h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden mt-2">
                                <div 
                                    className="h-full bg-gradient-to-r from-primary to-secondary" 
                                    style={{ width: `${category.level}%` }}
                                ></div>
                            </div>
                         </div>
                      </div>
                   </Reveal>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;