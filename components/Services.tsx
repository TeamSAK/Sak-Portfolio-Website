import React, { useState, useEffect } from 'react';
import { ArrowRight, Code, Cpu, Zap, Palette, Smartphone, Cloud, ChevronLeft, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';
import Reveal from './Reveal';

const Services: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    // Initial call
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = PORTFOLIO_DATA.services.length;
  const maxIndex = Math.max(0, totalItems - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return <Code size={28} />;
      case 'cpu': return <Cpu size={28} />;
      case 'zap': return <Zap size={28} />;
      case 'palette': return <Palette size={28} />;
      case 'smartphone': return <Smartphone size={28} />;
      case 'cloud': return <Cloud size={28} />;
      default: return <Code size={28} />;
    }
  };

  return (
    <section id="services" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
              Expertise & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Services</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              I help ambitious companies build modern digital products. Here is how I can help you.
            </p>
          </Reveal>
        </div>

        {/* Slider Container */}
        <div className="relative group">
          
          {/* Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-4 z-20">
             <button 
                onClick={prevSlide}
                className="p-3 rounded-full bg-surface border border-gray-200 dark:border-white/10 shadow-lg text-text hover:bg-primary hover:text-white transition-all transform hover:scale-110 focus:outline-none"
             >
                <ChevronLeft size={24} />
             </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-4 z-20">
             <button 
                onClick={nextSlide}
                className="p-3 rounded-full bg-surface border border-gray-200 dark:border-white/10 shadow-lg text-text hover:bg-primary hover:text-white transition-all transform hover:scale-110 focus:outline-none"
             >
                <ChevronRight size={24} />
             </button>
          </div>

          {/* Viewport */}
          <div className="overflow-hidden px-2 py-4 -mx-2">
             <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
             >
                {PORTFOLIO_DATA.services.map((service) => (
                  <div 
                    key={service.id} 
                    className="shrink-0 px-3"
                    style={{ width: `${100 / itemsPerPage}%` }}
                  >
                     <div className="bg-surface p-8 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-all group h-full flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1">
                        <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 border border-gray-100 dark:border-white/5">
                          {getIcon(service.icon)}
                        </div>
                        
                        <h3 className="text-xl font-bold text-text mb-4">{service.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                          {service.description}
                        </p>

                        <ul className="space-y-2 mb-8">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                              <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <a href="#contact" className="inline-flex items-center text-sm font-bold text-primary hover:text-text transition-colors mt-auto">
                          Learn more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                  </div>
                ))}
             </div>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
             {Array.from({ length: totalItems - itemsPerPage + 1 }).map((_, idx) => (
                <button
                   key={idx}
                   onClick={() => setCurrentIndex(idx)}
                   className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-primary/50'
                   }`}
                />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;