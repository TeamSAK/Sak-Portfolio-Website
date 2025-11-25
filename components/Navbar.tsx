import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Volume2, VolumeX, Sun, Moon, Palette } from 'lucide-react';

interface NavbarProps {
  isMuted: boolean;
  toggleMute: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  cycleColor: () => void;
}

// Moved outside component to prevent "ReferenceError: Cannot access 'navLinks' before initialization"
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'AI Spark', href: '#ai-spark' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC<NavbarProps> = ({ isMuted, toggleMute, isDark, toggleTheme, cycleColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Handle styling state
          setIsScrolled(window.scrollY > 20);
          
          // Calculate scroll progress
          const totalScroll = document.documentElement.scrollTop;
          const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = totalScroll / windowHeight;
          setScrollProgress(scrolled);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Refined Scroll Spy Logic
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // 1. Check if we're at the very bottom of the page (activate last section)
      if (scrollY + viewportHeight >= documentHeight - 50) {
        setActiveSection(sections[sections.length - 1]);
        return;
      }

      // 2. Dynamic focus point strategy
      // A section becomes active when it enters the "reading zone" (top 30% of screen)
      // This provides a more natural feel than waiting for it to hit the very top.
      const focusPoint = scrollY + (viewportHeight * 0.3);
      const headerHeight = 80;

      let current = sections[0];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          // If the top of the section (minus header offset) is above our focus point, 
          // it is the potential active section. We loop through all to find the *last* 
          // one that meets this criteria (the one furthest down).
          if ((element.offsetTop - headerHeight) <= focusPoint) {
            current = sectionId;
          }
        }
      }
      
      setActiveSection(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollSpy();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check on mount
    handleScrollSpy();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 80; // Height of nav (h-20 = 5rem = 80px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL and state immediately for responsiveness
      window.history.pushState(null, '', href);
      setActiveSection(targetId);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 will-change-transform ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group">
              <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                 <Code2 className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-bold text-xl tracking-wider text-text">SAK<span className="text-primary group-hover:text-accent transition-colors">DEV</span></span>
            </a>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-sm font-medium transition-all relative group py-2 ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    {link.name}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    ></span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3 border-l border-gray-300 dark:border-gray-700 pl-6 ml-6">
            <button 
              onClick={toggleMute}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-gray-200 dark:hover:bg-white/5 rounded-full transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button 
              onClick={cycleColor}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-gray-200 dark:hover:bg-white/5 rounded-full transition-colors"
              title="Change Theme Color"
            >
              <Palette size={20} />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300 hover:bg-gray-200 dark:hover:bg-white/5 rounded-full transition-colors"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
             <button 
              onClick={toggleMute}
              className="p-2 text-gray-500 dark:text-gray-400"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-gray-200 dark:hover:bg-gray-700/20 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar - Optimized with Transform instead of Width */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary z-50 transition-transform duration-100 ease-out w-full origin-left will-change-transform" 
        style={{ transform: `scaleX(${scrollProgress})` }}
      ></div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-surface/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 absolute w-full shadow-2xl`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-white/5 ${
                  isActive 
                    ? 'text-primary bg-primary/5' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="flex items-center gap-4 px-3 py-4 border-t border-gray-200 dark:border-white/10 mt-2">
            <button 
              onClick={cycleColor}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
            >
              <Palette size={20} /> Color
            </button>
            <button 
              onClick={toggleTheme}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />} Theme
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;