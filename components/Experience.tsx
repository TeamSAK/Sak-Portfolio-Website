import React from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { Briefcase, Calendar } from 'lucide-react';
import Reveal from './Reveal';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Professional Experience</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full"></div>
          </Reveal>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-white/10 before:to-transparent">
          {PORTFOLIO_DATA.experience.map((job, index) => (
            <div key={job.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              
              {/* Icon Marker */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 bg-surface shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-secondary transition-colors">
                <Briefcase size={18} className="text-gray-400 group-hover:text-secondary" />
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]">
                <Reveal 
                  direction={index % 2 === 0 ? 'right' : 'left'} 
                  delay={index * 200}
                  fullWidth
                >
                  <div className="bg-surface p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-lg hover:border-gray-300 dark:hover:border-white/10 transition-all">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <h3 className="font-bold text-xl text-text">{job.company}</h3>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded mt-1 sm:mt-0">
                            <Calendar size={12} className="mr-1" /> {job.period}
                        </div>
                    </div>
                    <p className="text-primary font-medium mb-4 text-sm">{job.role}</p>
                    <ul className="space-y-2 mb-4">
                        {job.description.map((desc, i) => (
                            <li key={i} className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed flex items-start">
                                 <span className="mr-2 mt-1.5 w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full shrink-0"></span>
                                 {desc}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {job.technologies.map(tech => (
                            <span key={tech} className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-background px-2 py-1 rounded border border-gray-200 dark:border-white/5">
                                {tech}
                            </span>
                        ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;