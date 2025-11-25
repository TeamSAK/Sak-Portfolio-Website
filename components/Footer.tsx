import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { PORTFOLIO_DATA } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-gray-200 dark:border-white/5 pt-10 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mb-2">
        
        {/* Left: Copyright */}
        <div className="text-center md:text-left">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} <span className="font-bold text-text tracking-wide">SAIF ALI KHAN</span>. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Built with <span className="text-primary">React</span> & <span className="text-secondary">Tailwind</span>. Powered by Gemini.
          </p>
        </div>

        {/* Right: Socials */}
        <div className="flex items-center gap-4">
           <a 
             href={PORTFOLIO_DATA.socials.github} 
             target="_blank" 
             rel="noopener noreferrer"
             className="p-2 rounded-full bg-background text-gray-500 hover:text-white hover:bg-gray-800 transition-colors border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform duration-200"
           >
              <Github size={18} />
           </a>
           <a 
             href={PORTFOLIO_DATA.socials.linkedin} 
             target="_blank" 
             rel="noopener noreferrer"
             className="p-2 rounded-full bg-background text-gray-500 hover:text-white hover:bg-[#0077b5] transition-colors border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform duration-200"
           >
              <Linkedin size={18} />
           </a>
           <a 
             href={PORTFOLIO_DATA.socials.twitter} 
             target="_blank" 
             rel="noopener noreferrer"
             className="p-2 rounded-full bg-background text-gray-500 hover:text-white hover:bg-black dark:hover:bg-white/20 transition-colors border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform duration-200"
           >
              <Twitter size={18} />
           </a>
        </div>
      </div>

      {/* End Line Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-accent"></div>
    </footer>
  );
};

export default Footer;