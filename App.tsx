import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChatBot from './components/AIChatBot';
import Process from './components/Process';
import CTA from './components/CTA';
import IdeaGenerator from './components/IdeaGenerator';
import Pricing from './components/Pricing';
import Clients from './components/Clients';
import GithubActivity from './components/GithubActivity';
import LiveFeed from './components/LiveFeed';

// Define color palettes
const COLORS = [
  { primary: '#6366f1', secondary: '#ec4899', accent: '#8b5cf6' }, // Indigo/Pink
  { primary: '#10b981', secondary: '#3b82f6', accent: '#06b6d4' }, // Emerald/Blue
  { primary: '#f97316', secondary: '#ef4444', accent: '#eab308' }, // Orange/Red
  { primary: '#8b5cf6', secondary: '#d946ef', accent: '#6366f1' }, // Violet/Fuchsia
];

const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);

  // Handle Dark Mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Handle Color Palette
  useEffect(() => {
    const root = window.document.documentElement;
    const colors = COLORS[colorIndex];
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--accent-color', colors.accent);
  }, [colorIndex]);

  const cycleColor = () => {
    setColorIndex((prev) => (prev + 1) % COLORS.length);
  };

  return (
    <div className="bg-background text-text min-h-screen selection:bg-primary selection:text-white transition-colors duration-300">
      <Navbar 
        isMuted={isMuted} 
        toggleMute={() => setIsMuted(!isMuted)}
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
        cycleColor={cycleColor}
      />
      <LiveFeed />
      <main>
        <Hero isMuted={isMuted} />
        <About />
        <Services />
        <Process />
        <Projects />
        <Pricing />
        <GithubActivity />
        <Clients />
        <Testimonials />
        <IdeaGenerator />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <AIChatBot />
    </div>
  );
};

export default App;