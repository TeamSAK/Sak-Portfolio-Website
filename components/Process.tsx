import React from 'react';
import { PROCESS_STEPS } from '../constants';
import { Search, PenTool, Code, Rocket, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const Process: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search size={24} />;
      case 'PenTool': return <PenTool size={24} />;
      case 'Code': return <Code size={24} />;
      case 'Rocket': return <Rocket size={24} />;
      default: return <Search size={24} />;
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
              How I <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Work</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              A structured workflow designed to deliver high-quality results on time, every time.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <Reveal key={step.id} delay={index * 200} direction="up">
                <div className="group relative bg-surface/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full">
                  
                  {/* Number Badge */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface border-2 border-primary flex items-center justify-center text-primary font-bold z-20 shadow-lg">
                    {step.id}
                  </div>

                  <div className="flex flex-col items-center text-center h-full pt-4">
                    <div className="mb-6 p-4 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {getIcon(step.icon)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-text mb-3">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Mobile Connector Arrow */}
                  {index < PROCESS_STEPS.length - 1 && (
                     <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-gray-300 dark:text-gray-700">
                        <ArrowRight size={20} className="rotate-90" />
                     </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;