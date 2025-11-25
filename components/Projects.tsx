import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { ExternalLink, Github, ArrowUpRight, Layers, Sparkles } from 'lucide-react';
import Reveal from './Reveal';
import LogoTicker from './LogoTicker';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(PORTFOLIO_DATA.projects.map(p => p.category)))];

  const filteredProjects = activeCategory === 'All' 
    ? PORTFOLIO_DATA.projects 
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-32 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-surface to-transparent opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <Reveal>
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                  <Sparkles size={14} /> Selected Work
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-text tracking-tight">
                  Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Projects</span>
                </h2>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                            activeCategory === cat 
                            ? 'bg-text text-background border-text shadow-lg' 
                            : 'bg-transparent border-gray-200 dark:border-white/10 text-gray-500 hover:border-text hover:text-text'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
          </Reveal>
        </div>

        {/* Modern Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
           {filteredProjects.map((project, index) => (
             <Reveal 
                key={project.id} 
                delay={index * 100}
                className="h-full"
             >
                <div className="group relative h-full bg-surface rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 flex flex-col">
                   
                   {/* Image Container with Overlay */}
                   <div className="relative h-[300px] overflow-hidden">
                      <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors z-10"></div>
                      <img 
                         src={project.imageUrl} 
                         alt={project.title} 
                         className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out will-change-transform"
                      />
                      
                      {/* Floating Category Badge */}
                      <div className="absolute top-6 left-6 z-20">
                         <span className="px-4 py-2 rounded-full bg-surface/90 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider text-text shadow-sm">
                            {project.category}
                         </span>
                      </div>

                      {/* Action Button Overlay */}
                      <div className="absolute bottom-6 right-6 z-20 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <a href={project.demoUrl} className="flex items-center justify-center w-12 h-12 bg-white text-black rounded-full shadow-lg hover:scale-110 transition-transform">
                              <ArrowUpRight size={20} />
                          </a>
                      </div>
                   </div>

                   {/* Content Body */}
                   <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-bold text-text group-hover:text-primary transition-colors">
                             {project.title}
                          </h3>
                          <div className="flex gap-3">
                              {project.repoUrl && (
                                <a href={project.repoUrl} className="text-gray-400 hover:text-text transition-colors" title="View Code">
                                   <Github size={20} />
                                </a>
                              )}
                              {project.demoUrl && (
                                <a href={project.demoUrl} className="text-gray-400 hover:text-text transition-colors" title="Live Demo">
                                   <ExternalLink size={20} />
                                </a>
                              )}
                          </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 flex-1">
                         {project.description}
                      </p>
                      
                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100 dark:border-white/5">
                         {project.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-lg">
                               {tech}
                            </span>
                         ))}
                         {project.technologies.length > 4 && (
                            <span className="text-xs font-medium text-gray-400 px-2 py-1.5">+{project.technologies.length - 4}</span>
                         )}
                      </div>
                   </div>
                </div>
             </Reveal>
           ))}
        </div>

        {/* Integrated Tech Stack Ticker */}
        <Reveal>
            <div className="relative py-10">
                <div className="flex items-center gap-4 mb-8 justify-center">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent w-24"></div>
                    <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
                        Powering Next-Gen Apps
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent w-24"></div>
                </div>
                <LogoTicker />
            </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Projects;