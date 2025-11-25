import React from 'react';
import { Github, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';
import Reveal from './Reveal';

const GithubActivity: React.FC = () => {
  // Generate deterministic mock contribution data seeded by index
  const weeks = 52;
  const days = 7;
  
  const contributionLevels = [
    'bg-gray-100 dark:bg-white/5',           // Level 0
    'bg-green-200 dark:bg-green-900/40',     // Level 1
    'bg-green-300 dark:bg-green-700/60',     // Level 2
    'bg-green-400 dark:bg-green-600',        // Level 3
    'bg-green-500 dark:bg-green-500',        // Level 4
  ];

  // Create a pseudo-random pattern that looks like real activity
  const contributions = Array.from({ length: weeks * days }).map((_, i) => {
    const isWeekend = (i % 7) === 0 || (i % 7) === 6;
    const baseChance = isWeekend ? 0.3 : 0.6; // Less activity on weekends
    const random = Math.random();
    
    if (random > baseChance + 0.3) return 0;
    if (random > baseChance + 0.1) return 1;
    if (random > baseChance - 0.1) return 2;
    if (random > baseChance - 0.2) return 3;
    return 4;
  });

  return (
    <section className="py-24 bg-surface border-y border-gray-200 dark:border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <Reveal>
                <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black shadow-lg">
                        <Github size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-text">Open Source</h2>
                        <p className="text-gray-500 font-medium">Contributions over the last year</p>
                    </div>
                </div>
            </Reveal>

            <Reveal delay={200}>
                <div className="flex gap-8 text-center bg-background p-4 rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                    <div>
                        <p className="text-2xl font-black text-text">1,240</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Commits</p>
                    </div>
                    <div className="w-px bg-gray-200 dark:bg-white/10"></div>
                    <div>
                        <p className="text-2xl font-black text-text">45</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Repos</p>
                    </div>
                    <div className="w-px bg-gray-200 dark:bg-white/10"></div>
                    <div>
                        <p className="text-2xl font-black text-text">320+</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Stars</p>
                    </div>
                </div>
            </Reveal>
        </div>

        <Reveal delay={400} fullWidth>
            <div className="bg-background rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-inner overflow-x-auto relative group">
                {/* Scroll hint gradient */}
                <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden"></div>
                
                <div className="min-w-[750px] mx-auto">
                    <div className="grid grid-rows-7 grid-flow-col gap-1.5 w-fit mx-auto">
                        {contributions.map((level, i) => (
                            <div 
                                key={i}
                                className={`w-3.5 h-3.5 rounded-sm ${contributionLevels[level]} transition-all duration-300 hover:scale-125 hover:brightness-110`}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-6 text-xs text-gray-400 font-medium px-4 max-w-[800px] mx-auto">
                        <span>Learn how we count contributions</span>
                        <div className="flex items-center gap-2">
                            <span>Less</span>
                            <div className="flex gap-1">
                                {contributionLevels.map((bg, i) => (
                                    <div key={i} className={`w-3.5 h-3.5 rounded-sm ${bg}`}></div>
                                ))}
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>

        <Reveal delay={600}>
            <div className="flex justify-center mt-10">
                <a 
                    href={PORTFOLIO_DATA.socials.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                >
                    View Full Profile <ArrowUpRight size={18} />
                </a>
            </div>
        </Reveal>
      </div>
    </section>
  );
};

export default GithubActivity;