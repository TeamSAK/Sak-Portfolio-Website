import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import Reveal from './Reveal';

const CTA: React.FC = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent p-12 md:p-24 text-center shadow-2xl">
            
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-50%] right-[-10%] w-[600px] h-[600px] bg-black opacity-10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                    Ready to scale your <br/> digital presence?
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
                    I'm currently available for new projects. Let's build something extraordinary together that delights your users and grows your business.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a 
                        href="#contact" 
                        className="px-8 py-4 bg-white text-primary text-lg font-bold rounded-full transition-all transform hover:scale-105 hover:shadow-xl flex items-center gap-2"
                    >
                        Start a Project <ArrowRight size={20} />
                    </a>
                    <a 
                        href="mailto:sak.dev@example.com" 
                        className="px-8 py-4 bg-transparent border-2 border-white/30 text-white text-lg font-bold rounded-full transition-all hover:bg-white/10 flex items-center gap-2"
                    >
                        <Mail size={20} /> Email Me
                    </a>
                </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTA;